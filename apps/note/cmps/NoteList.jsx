import { noteService } from '../services/notes.service.js'
import { NotePreview } from './NotePreview.jsx'

const { useEffect, useState } = React

export function NoteList() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.query().then((fetchedNotes) => {
      setNotes(fetchedNotes)
    })
  }, [])

  return (
    <section className='notes'>
      {notes.map(note => 
        <div key={note.id}>
          <NotePreview note={note}/>
        </div>)
      }
    </section>
  )
}
