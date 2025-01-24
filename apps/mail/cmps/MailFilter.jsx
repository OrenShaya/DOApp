const { useState, useEffect, useRef } = React
import { utilService } from '../../../services/util.service.js'
import Icon from '../../../cmps/Icon.jsx'
import { ModalFilter } from './ModalFilter.jsx'

export function MailFilter({ filterBy, handleSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  const [isOpen, setIsOpen] = useState(false)

  function onModalOpen() {
    setIsOpen((isOpen) => true)
  }
  function onModalClose() {
    setIsOpen((isOpen) => false)
  }

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
      <form className='mails-filter' onSubmit={onSubmit}>
        <div className='filter-section filter-section-header'>
          <div className='filter-section-header-input'>
            <label htmlFor='txt'>
              {<Icon name='search' dataLabel={'search'} />}
            </label>
            <input
              id='txt'
              name='txt'
              onChange={handleChange}
              value={txt}
              type='text'
              placeholder='Search mail'
              className='input-search'
            />
          </div>
          <div className='search-options-menu'>
            {
              <Icon
                name='tune'
                dataLabel={'Show search options'}
                onClick={() => onModalOpen()}
              />
            }
          </div>
        </div>

        <ModalFilter
          children
          isOpen={isOpen}
          onClose={() => onModalClose()}
          isCloseBtn={false}
        >
          <div className='filter-section'>
            <label htmlFor='status'>
              <Search></Search>
            </label>
            <select
              id='status'
              name='status'
              value={status}
              onChange={handleChange}
            >
              <option value=''>(All Mail)</option>
              <option value='inbox'>Inbox</option>
              <option value='sent'>Sent Mail</option>
              <option value='draft'>Drafts</option>
              <option value='trash'>Trash</option>
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
            <button onClick={reset}>Clear filter</button>
            <button type='submit'>Search</button>
          </div>
        </ModalFilter>
      </form>
    </section>
  )
}
