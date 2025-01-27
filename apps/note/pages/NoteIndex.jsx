import { NoteList } from "../cmps/NoteList.jsx";

const { useNavigate } = ReactRouterDOM

export function NoteIndex() {

  const navigate = useNavigate()

  function handleClick() {
    navigate('/note/edit')
  }

  return <section className="main">
    <h2 className='notes-main-title'>
      Your Notes
    </h2>
    <button className="add-note" onClick={handleClick}>
      Add Note
      <svg xmlns="http://www.w3.org/2000/svg" className="add-note-img" viewBox="0 -960 960 960" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
    </button>
    <section className="notes-list">
      <NoteList/>
    </section>
  </section>
}
