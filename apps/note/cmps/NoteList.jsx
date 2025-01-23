import { noteService } from '../services/notes.service.js'
import { NotePreview } from './NotePreview.jsx'

const { useEffect, useState } = React

export function NoteList() {
  const [notes, setNotes] = useState([])
  const [cmp, setCmp] = useState('notes')

  useEffect(() => {
    noteService.query().then((fetchedNotes) => {
      setNotes(fetchedNotes)
    })
  }, [notes])

  function changeCmp(cmpMode) {
    setCmp(cmpMode)
  }

  return (
    <section className='notes'>
      {cmp === 'notes' && notes.map(note => 
        <div key={note.id}>
          <NotePreview note={note} changeCmp={changeCmp}/>
        </div>)
      }
      {cmp === 'detail' && <NotePreview/>}
    </section>
  )
}
