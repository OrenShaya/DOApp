
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note }) {

    const navigate = useNavigate()

    function handleClick(note) {
        navigate(`/note/${note.id}`)
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
        </section>
    )
}