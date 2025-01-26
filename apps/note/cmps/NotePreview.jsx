import { ColorPicker } from "../../../cmps/ColorPicker.jsx"
import { noteService } from "../services/notes.service.js"
const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, changeCmp, updateNoteFunc }) {
    const [noteStyle, setNoteStyle] = useState((note) ? note.style : {'backgroundColor': ''})
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
    const [checkedTodos, setCheckedTodos] = useState(note.info.todo ? note.info.todos.map((item) => item.doneAt) : null)
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
    useEffect(() => {
        note.info.todos.forEach((object, index) => {
            note.info.todos[index] = {'txt': object.txt, 'doneAt': checkedTodos[index]}
        })
        updateNoteFunc(note)
    }, [checkedTodos])

    function changeNoteColor(color) {
        note.style = {'backgroundColor': color}
        noteService.save(note)
        setNoteStyle(note.style)
    }

    function toggleColorPicker(ev) {
        ev.stopPropagation()
        setIsColorPickerVisible(!isColorPickerVisible)
    }

    function onCheckedTodo(ev, index) {
        ev.stopPropagation()
        checkedTodos[index] = !checkedTodos[index]
        setCheckedTodos([...checkedTodos])
    }

    return (
        <section className='note-preview'
        onClick={(ev) => {
            ev.stopPropagation()
            handleClick(note)
        }}
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
            {note.type === 'NoteTodos' &&
            <div className="todo-container">
            {note.info.todos.map((item, index) => {
                return (
                <div key={index} className="todo-item-container"> 
                    <input className={`todo-check ${index}`} 
                        checked={checkedTodos[index] ? checkedTodos[index] : false}
                        type="checkbox" 
                        onChange={(ev) => {
                            onCheckedTodo(ev, +index)
                        }}
                        onClick={(ev) => ev.stopPropagation()}></input>
                    <p className={`todo-item ${index} ${checkedTodos[index] ? 'strikethrough' : ''}`}>{item.txt}</p>
                </div>)
            })}
            </div>}
            <div className="invisable-buttons">
                <img onClick={toggleColorPicker} className="color-picker-button hover-buttons" src="./../../../assets/img/palette.svg"/>
                <img onClick={onDeleteNote} className="delete-icon hover-buttons" src="./../../../assets/img/delete.svg"/>
            </div>
            {isColorPickerVisible && <div className="color-picker"> <ColorPicker changeNoteColorFunc={changeNoteColor} /> </div>} 
        </section>
    )
}
