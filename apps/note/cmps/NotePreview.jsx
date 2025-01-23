import { noteService } from "../services/notes.service.js"
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note }) {

    const navigate = useNavigate()

    function handleClick(note) {
        navigate(`/note/${note.id}`)
    }

    function onDeleteNote(ev) {
        ev.stopPropagation()
        console.log(`deleting ${note.id}`)
        noteService.remove(note.id)
    }

    return (
        <section className='note-preview'
        onClick={() => handleClick(note)}>
            <h3 className='note-title'>
                {note.info.title}
            </h3>
            <pre className='note-txt'>
                {note.info.txt}
            </pre>
            <img onClick={onDeleteNote} className="delete-icon" src="../../../assets/img/delete.svg"/>
        </section>
    )
}