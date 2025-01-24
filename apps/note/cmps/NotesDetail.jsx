import { noteService } from "../services/notes.service.js"
const { useEffect, useState } = React
const { useParams } = ReactRouterDOM

export function NoteDetail() {
    const { noteId } = useParams()
    const [ note, setNote ] = useState(null)

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


    return (
        <section className="note-detail">
            {note && <section>
                <h3>{note.info.title}</h3>
                <pre className="detail-note-txt">{note.info.txt}</pre>
                <p className="updated-date">Edited at {formatDate(note.updatedAt)}</p>
            </section>}
        </section>
    )
}