import { noteService } from "../services/notes.service.js"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

export function NoteEdit({ incomingNote }) {

    const navigate = useNavigate()
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [noteType, setNoteType] = useState('text')
    const [todoList, setTodoList] = useState([''])
    
    const [focusedElement, setFocusedElement] = useState(null);

    function handleFocus() {
        setFocusedElement(document.activeElement)
    }
    
    const newInputRef = useRef(null)

    useEffect(() => {
        if (incomingNote) setNewNote(incomingNote)
        if (newInputRef.current) newInputRef.current.focus()
      }, [todoList])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
    
        switch (target.type) {
          case 'number':
          case 'range':
            value = +value
            break
    
          case 'checkbox':
            value = target.checked
            break;  
    
          default:
            break
        }
        if (['title', 'text', 'url'].includes(field)) {
            const newInfo = { ...newNote.info, [field]: value}           
            setNewNote({ ...newNote, ['info']: newInfo, })
        }
        else if (field === 'todo') {
            const index = target.getAttribute('data-index')
            setTodoList(todoList.map((item, i) => {
                if (i === +index) return value
                return item
            }))
        }
        else setNewNote(() => {
            return {...newNote, [field]: value, } 
        })   
    }

    function onSaveNote(ev) {
        ev.preventDefault() 
        if (noteType === 'todo' && focusedElement !== document.querySelector('.note-title')) {
            return onAddTodoItem(ev)}

        noteService
          .save(newNote)
          .then(() => {
            showSuccessMsg('Note saved successfuly')
          })
          .catch((err) => {
            console.error('error onSaveNote', err)
            showErrorMsg('Cannot save note')
          })
          .finally(() => navigate('/note'))
    }

    function onChangeNoteType(ev) {
        ev.stopPropagation()
        const incomingType = ev.target.value
        let newType
        setNoteType(incomingType)
        switch (incomingType) {
            case 'text':
                newType = 'NoteTxt'
                break
            case 'img':
                newType = 'NoteImg'
                break
            case 'todo':
                newType = 'NoteTodos'
                break
        }      
        setNewNote({ ...newNote, ['type']: newType} )
    }

    function onAddTodoItem(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        const focusedIndex = +focusedElement.getAttribute('data-index')
        if (focusedIndex !== todoList.length - 1 ) {
            setFocusedElement(document.querySelector(`.todoItem${focusedIndex + 1}`))
            return
        }

        const newTodoList = todoList.map((item, index) => {
            const element = document.querySelector(`.todoItem${index}`)
            console.log(element)
            return element.value
        })
        newTodoList.push('')
        setTodoList(newTodoList)
     
    }

    return (
        <section className="edit-note">
            <h2>Edit Note</h2>
            <form className="note-form" onSubmit={onSaveNote} onFocus={handleFocus}>
                <input 
                    onChange={handleChange} 
                    name="title" 
                    className="note-title" 
                    type="text" 
                    placeholder="Title"
                    value={(newNote) ? newNote.info.title : ''}
                />
                {noteType === 'text' && 
                <textarea onChange={handleChange} 
                    name="txt" 
                    className="edit-note-txt" 
                    placeholder="Note"
                    value={(newNote) ? newNote.info.txt : ''}>
                </textarea>}
                {noteType === 'img' &&
                <input 
                    className="image-src"
                    name="url"
                    type="text" 
                    placeholder="Enter an image URL..."
                    onChange={handleChange}
                    value={(newNote) ? newNote.info.url : ''}>
                </input>}
                {noteType === 'todo' && 
                <div className="todo-item-container">
                    {todoList.map((item, index) => {
                        return <div key={index} className="todo-item">
                            {index + 1}.  <input 
                                ref={index === todoList.length - 1 ? newInputRef : null}
                                onChange={handleChange} 
                                type="text"
                                value={todoList[index] ? todoList[index] : ''}
                                data-index={index} 
                                className={`todoItem${index} to-do-item`} 
                                name="todo" 
                                placeholder="Enter a new item to do..."/>
                        </div>
                    })}
                </div>
                }
                <button className='save-button'>Save</button>
            </form>
            <div className="note-type-buttons">
                <button onClick={onChangeNoteType}>
                    <img onClick={(ev) => {
                        ev.target.value = 'text'
                        onChangeNoteType(ev, 'text')
                    }} 
                    title="Text note"
                    src="../../../assets/img/text icon.svg"></img>
                </button>
                <button onClick={onChangeNoteType}>
                    <img onClick={(ev) => {
                        ev.target.value = 'todo'
                        onChangeNoteType(ev, 'todo')
                    }} 
                    title="To-do note"
                    src="../../../assets/img/todo icon.svg"></img>
                </button>
                <button onClick={onChangeNoteType}>
                    <img onClick={(ev) => {
                        ev.target.value = 'img'
                        onChangeNoteType(ev, 'img')
                    }} 
                    title="Image note"
                    src="../../../assets/img/image.svg"></img>
                </button>
                <button onClick={(ev) => onChangeNoteType(ev, 'video')}>Video</button>
            </div>
        </section>
    )
}