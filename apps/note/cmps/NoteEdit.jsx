import { noteService } from "../services/notes.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NoteEdit({ incomingNote }) {

    const navigate = useNavigate()
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [noteType, setNoteType] = useState('text')

    useEffect(() => {
        if (incomingNote) setNewNote(incomingNote)
      }, [])

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
        if (['title', 'text', 'url', 'todos'].includes(field)) {
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
            showSuccessMsg('Note saved successfuly')
          })
          .catch((err) => {
            console.error('error onSaveNote', err)
            showErrorMsg('Cannot save note')
          })
          .finally(() => navigate('/note'))
    }

    function onChangeNoteType(ev) {
        ev.stopPropagation()
        const incomingType = ev.target.value
        let newType
        setNoteType(incomingType)
        switch (incomingType) {
            case 'text':
                newType = 'NoteTxt'
                break
            case 'img':
                newType = 'NoteImg'
                break
            case 'todo':
                newType = 'NoteTodos'
                break
        }
        setNewNote({ ...newNote, ['type']: newType} )
    }

    return (
        <section className="edit-note">
            <h2>Edit Note</h2>
            <form className="note-form" onSubmit={onSaveNote}>
                <input 
                    onChange={handleChange} 
                    name="title" 
                    className="note-title" 
                    type="text" 
                    placeholder="Title"
                    value={(newNote) ? newNote.info.title : ''}
                />
                {noteType === 'text' && 
                <textarea onChange={handleChange} 
                    name="txt" 
                    className="edit-note-txt" 
                    placeholder="Note"
                    value={(newNote) ? newNote.info.txt : ''}>
                </textarea>}
                {noteType === 'img' &&
                <input 
                    className="image-src"
                    name="url"
                    type="text" 
                    placeholder="Enter an image URL..."
                    onChange={handleChange}
                    value={(newNote) ? newNote.info.url : ''}>
                </input>}
                <button className='save-button'>Save</button>
            </form>
            <div className="note-type-buttons">
                <button onClick={onChangeNoteType}>
                    <img onClick={(ev) => {
                        ev.target.value = 'text'
                        onChangeNoteType(ev, 'text')
                    }} 
                    src="../../../assets/img/text icon.svg"></img>
                </button>
                <button onClick={(ev) => onChangeNoteType(ev, 'todo')}>To-Do Note</button>
                <button onClick={onChangeNoteType}>
                    <img onClick={(ev) => {
                        ev.target.value = 'img'
                        onChangeNoteType(ev, 'img')
                    }} 
                    src="../../../assets/img/image.svg"></img>
                </button>
                <button onClick={(ev) => onChangeNoteType(ev, 'video')}>Video</button>
            </div>
        </section>
    )
}