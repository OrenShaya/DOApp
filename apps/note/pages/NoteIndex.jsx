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
      <img className="add-note-img" src="./../../../assets/img/write.svg" alt="add-note-image"/> 
      {/* <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg> */}
    </button>
    <section className="notes-list">
      <NoteList/>
    </section>
  </section>
}
