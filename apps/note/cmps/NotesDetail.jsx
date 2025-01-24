import { noteService } from "../services/notes.service.js"
import { NoteEdit } from "./NoteEdit.jsx"
const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function NoteDetail() {
    const { noteId } = useParams()
    const [ note, setNote ] = useState(null)
    const [editNote, setEditNote] = useState(false) 
    const navigate = useNavigate()

    
    useEffect(() => {
        noteService.get(noteId).then(fetchedNote => {
            setNote(fetchedNote)
        })
    }, [])
    
    function formatDate(date) {
        const newDate = new Date(date)
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return newDate.toLocaleDateString('en-IL', options)
    }
    
    function onCloseClick() {
        navigate('/note')        
    }

    function onNoteClick() {
        console.log(note.id)
        setEditNote(true)
        note
    }


    return (
        <section className="note-detail-body">
            {note && !editNote && <section className="note-detail" onClick={onNoteClick}>
                <h3>{note.info.title}</h3>
                <pre className="detail-note-txt">{note.info.txt}</pre>
                <p className="updated-date">Edited at {formatDate(note.updatedAt)}</p>
            </section>}
            {editNote && <NoteEdit incomingNote={note}/>}
            <button className="note-close-button" onClick={onCloseClick}>close</button>
        </section>
    )
}