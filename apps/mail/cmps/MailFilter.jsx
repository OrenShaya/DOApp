const { useState, useEffect, useRef } = React
import { utilService } from '../../../services/util.service.js'
import Icon from '../../../cmps/Icon.jsx'

export function MailFilter({ filterBy, handleSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const initialFilterBy = useRef({ ...filterBy })

  const onSetFilterDebounce = useRef(
    utilService.debounce(handleSetFilter, 500)
  ).current

  useEffect(() => {
    onSetFilterDebounce(filterByToEdit)
  }, [filterByToEdit])

  function onSubmit(ev) {
    ev.preventDefault()
    handleSetFilter(filterByToEdit)
  }

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
        break

      default:
        break
    }
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  function reset() {
    setFilterByToEdit(initialFilterBy.current)
  }

  const { status, txt, isRead, isStarred, labels } = filterByToEdit
  return (
    <section className='mail-filter'>
      {/* <h2 className='filter-header'>Filter Our Mails</h2> */}
      <form className='mails-filter' onSubmit={onSubmit}>
        <div className='filter-section'>
          <label htmlFor='txt'>
            {<Icon name='search' dataLabel={'search'} />}
          </label>
          <input
            id='txt'
            name='txt'
            onChange={handleChange}
            value={txt}
            type='text'
            placeholder='Search'
            className='input-search'
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='status'>Status:</label>
          <select
            id='status'
            name='status'
            value={status}
            onChange={handleChange}
          >
            <option value=''>(All)</option>
            <option value='draft'>Draft</option>
            <option value='sent'>Sent</option>
            <option value='inbox'>Inbox</option>
            <option value='trash'>Trash</option>
            <option value='archive'>Archive</option>
          </select>
        </div>

        <div className='filter-section'>
          <label htmlFor='isRead'>Read?</label>
          <input
            id='isRead'
            name='isRead'
            onChange={handleChange}
            value={`${isRead}` || ''}
            type='checkbox'
            checked={!!isRead}
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='labels'>Starred?</label>
          <input
            id='isStarred'
            name='isStarred'
            type='checkbox'
            checked={!!isStarred}
            onChange={handleChange}
          />
        </div>

        <div className='filter-section'>
          <label htmlFor='categories'>Labels:</label>
          <input
            id='labels'
            name='labels'
            type='text'
            placeholder='Search label'
            value={labels}
            onChange={handleChange}
          />
        </div>

        <div className='.btns-container'>
          <button type='submit'>Submit</button>
          <button onClick={reset}>Reset</button>
        </div>
      </form>
    </section>
  )
}
