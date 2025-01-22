import { NoteList } from "../cmps/NoteList.jsx";

export function NoteIndex() {

  return <section className="main">
    <h2 className='notes-main-title'>Your Notes</h2>
    <section className="notes-list">
      <NoteList/>
    </section>
  </section>
}
