import { noteService } from "../services/notes.service.js"
const { useEffect, useState } = React
const { useParams } = ReactRouterDOM

export function NoteDetail() {
    const { noteId } = useParams()
    const [ note, setNote ] = useState(null)

    useEffect(() => {
        console.log('noteId:', noteId)
        noteService.get(noteId).then(fetchedNote => {
            setNote(fetchedNote)
            console.log(fetchedNote)
        })
    }, [])


    return (
        <section className="note-detail">
            {note && <section>
                <h3>{note.info.title}</h3>
                <pre className="note-txt">{note.info.txt}</pre>
                <p className="updated-date">Edited at {note.updatedAt}</p>
            </section>}
        </section>
    )
}