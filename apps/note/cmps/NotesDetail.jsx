

export function NoteDetail({ note }) {
    return (
        <section className="note-detail">
            <dialog>
                <h3>{note.info.title}</h3>
                <pre className="note-txt">{note.info.txt}</pre>
                <p className="updated-date">Edited at {note.updatedAt}</p>
            </dialog>
        </section>
    )
}