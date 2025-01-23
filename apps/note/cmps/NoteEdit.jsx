import { noteService } from "../services/notes.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState } = React
const { useNavigate } = ReactRouterDOM

export function NoteEdit() {

    const navigate = useNavigate()
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
    
        switch (target.type) {
          case 'number':
          case 'range':
            value = +value
            break
    
          case 'checkbox':
            value = target.checked
            break;  
    
          default:
            break
        }
        if (Object.keys(newNote.info).includes(field)) {
            const newInfo = { ...newNote.info, [field]: value}           
            setNewNote({ ...newNote, ['info']: newInfo, })
        }
        else setNewNote(() => {
            return {...newNote, [field]: value, } 
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault()        
    
        noteService
          .save(newNote)
          .then(() => {
            console.log(newNote)                     
            showSuccessMsg('Note saved successfuly')
          })
          .catch((err) => {
            console.error('error onSaveNote', err)
            showErrorMsg('Cannot save note')
          })
          .finally(() => navigate('/note'))
      }

    return (
        <section className="edit-note">
            <h2>Edit Note</h2>
            <form className="note-form" onSubmit={onSaveNote}>
                <input onChange={handleChange} name="title" className="note-title" type="text" placeholder="Title" />
                <textarea onChange={handleChange} name="txt" className="note-txt" placeholder="Note"></textarea>
                <button>Save</button>
            </form>
        </section>
    )
}