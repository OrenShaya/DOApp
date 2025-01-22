import { noteService } from '../services/notes.service.js'

const { useEffect, useState } = React

export function NoteIndex() {
  
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.query().then((fetchedNotes) => {
      console.log(fetchedNotes) 
      setNotes(fetchedNotes)
    })
  }, [])

  return <section className="main">
    <h2>Note App</h2>
    <section className='notes'>
      {notes.map(note => 
        <div key={note.id}>
          <h3 className='note-title'>
            {note.info.title}
          </h3>
          <p className='note-txt'>
            {note.info.txt}
          </p>
        </div>)}
    </section>
  </section>
}
