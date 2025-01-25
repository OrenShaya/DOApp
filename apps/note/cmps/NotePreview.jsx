import { ColorPicker } from "../../../cmps/ColorPicker.jsx"
import { noteService } from "../services/notes.service.js"
const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, changeCmp }) {
    const [noteStyle, setNoteStyle] = useState((note) ? note.style : {'backgroundColor': ''})
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
    const navigate = useNavigate()

    function handleClick(note) {
        changeCmp('detail')
        navigate(`/note/${note.id}`)
    }

    function onDeleteNote(ev) {
        ev.stopPropagation()
        console.log(`deleting ${note.id}`)
        noteService.remove(note.id)
    }

    useEffect(() => {}, [isColorPickerVisible])
    useEffect(() => {}, [noteStyle])

    function changeNoteColor(color) {
        note.style = {'backgroundColor': color}
        noteService.save(note)
        setNoteStyle(note.style)
    }

    function toggleColorPicker(ev) {
        ev.stopPropagation()
        setIsColorPickerVisible(!isColorPickerVisible)
    }

    return (
        <section className='note-preview'
        onClick={() => handleClick(note)}
        style={noteStyle}>
            <h3 className='note-title'>
                {note.info.title}
            </h3>
            {note.type === 'NoteTxt' &&
            <p className='note-txt'>
                {note.info.txt}
            </p>}
            {note.type === 'NoteImg' &&
            <img className='note-img'
            src={note.info.url}>
            </img>}
            <div className="invisable-buttons">
                <img onClick={toggleColorPicker} className="color-picker-button hover-buttons" src="../../../assets/img/palette.svg"/>
                <img onClick={onDeleteNote} className="delete-icon hover-buttons" src="../../../assets/img/delete.svg"/>
            </div>
            {isColorPickerVisible && <div className="color-picker"> <ColorPicker changeNoteColorFunc={changeNoteColor} /> </div>} 
        </section>
    )
}
