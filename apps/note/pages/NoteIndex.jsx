import { NoteList } from "../cmps/NoteList.jsx";

const { useNavigate } = ReactRouterDOM

export function NoteIndex() {

  const navigate = useNavigate()

  function handleClick() {
    navigate('/note/edit')
  }

  return <section className="main">
    <h2 className='notes-main-title'>Your Notes</h2>
    <button className="add-note" onClick={handleClick}>Add Note</button>
    <section className="notes-list">
      <NoteList/>
    </section>
  </section>
}
