import { ColorPicker } from "../../../cmps/ColorPicker.jsx"
import { noteService } from "../services/notes.service.js"
const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note, changeCmp, updateNoteFunc }) {
    const [noteStyle, setNoteStyle] = useState((note) ? note.style : {'backgroundColor': ''})
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
    const [checkedTodos, setCheckedTodos] = useState(note.info.todos ? note.info.todos.map((item) => item.doneAt) : null)
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
                        checked={checkedTodos && checkedTodos[index] ? checkedTodos[index] : false}
                        type="checkbox" 
                        onChange={(ev) => {
                            onCheckedTodo(ev, +index)
                        }}
                        onClick={(ev) => ev.stopPropagation()}></input>
                    <p className={`todo-item ${index} ${checkedTodos && checkedTodos[index] ? 'strikethrough' : ''}`}>{item.txt}</p>
                </div>)
            })}
            </div>}
            <div className="invisable-buttons">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleColorPicker} className="color-picker-button hover-buttons" viewBox="0 -960 960 960" fill="#FFFFFF">
                    <path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30.5-149.5t84-122Q264-804 335.5-834T488-864q78 0 146.5 27T754-763q51 47 80.5 110T864-518q0 96-67 163t-163 67h-68q-8 0-14 5t-6 13q0 15 15 25t15 53q0 37-27 66.5T480-96Zm0-384Zm-216 36q25 0 42.5-17.5T324-504q0-25-17.5-42.5T264-564q-25 0-42.5 17.5T204-504q0 25 17.5 42.5T264-444Zm120-144q25 0 42.5-17.5T444-648q0-25-17.5-42.5T384-708q-25 0-42.5 17.5T324-648q0 25 17.5 42.5T384-588Zm192 0q25 0 42.5-17.5T636-648q0-25-17.5-42.5T576-708q-25 0-42.5 17.5T516-648q0 25 17.5 42.5T576-588Zm120 144q25 0 42.5-17.5T756-504q0-25-17.5-42.5T696-564q-25 0-42.5 17.5T636-504q0 25 17.5 42.5T696-444ZM480-168q11 0 17.5-8.5T504-192q0-16-15-28t-15-50q0-38 26.5-64t64.5-26h69q66 0 112-46t46-112q0-115-88.5-194.5T488-792q-134 0-227 91t-93 221q0 130 91 221t221 91Z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" onClick={onDeleteNote} className="delete-icon hover-buttons" fill="#FFFFFF">
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/>
                </svg>
            </div>
            {isColorPickerVisible && <div className="color-picker"> <ColorPicker changeNoteColorFunc={changeNoteColor} /> </div>} 
        </section>
    )
}
