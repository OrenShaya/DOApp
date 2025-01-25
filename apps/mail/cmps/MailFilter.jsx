// apps/mail/cmps/MailFilter.jsx

const { useState, useEffect, useRef } = React
import { utilService } from '../../../services/util.service.js'
import Icon from '../../../cmps/Icon.jsx'
import { ModalFilter } from './ModalFilter.jsx'
import { MailSort } from './MailSort.jsx'

export function MailFilter({ filterBy, handleSetFilter }) {
  const [isOpen, setIsOpen] = useState(false)

  function onModalOpen() {
    setIsOpen((isOpen) => true)
  }

  function onModalClose() {
    setIsOpen((isOpen) => false)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onModalClose()
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
    handleSetFilter({ [field]: value })
  }

  function onReset() {
    handleSetFilter({
      status: '',
      isRead: '',
      isStarred: '',
      labels: '',
      txtAll: '',
      txtSubject: '',
      txtBody: '',
      txtNoBody: '',
      txtFrom: '',
      txtTo: '',
      sortBy: '',
      orderBy: '',
    })
  }

  const {
    status,
    isRead,
    isStarred,
    labels,
    txtAll,
    txtSubject,
    txtBody,
    txtNoBody,
    txtFrom,
    txtTo,
    sortBy,
    orderBy,
  } = filterBy
  return (
    <section className='mail-filter'>
      <form className='mails-filter' onSubmit={onSubmit}>
        <div className='filter-section filter-section-header'>
          <div className='filter-section-header-input'>
            <label htmlFor='txtAll'>
              {<Icon name='search' dataLabel={'search'} />}
            </label>
            <input
              id='txtAll'
              name='txtAll'
              onChange={handleChange}
              value={txtAll}
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
          <div className='filter-section filter-section-search'>
            <label htmlFor='txtFrom'>From</label>
            <input
              id='txtFrom'
              name='txtFrom'
              onChange={handleChange}
              value={txtFrom}
              type='text'
              className='input-search'
            />
          </div>
          <div className='filter-section filter-section-search'>
            <label htmlFor='txtTo'>To</label>
            <input
              id='txtTo'
              name='txtTo'
              onChange={handleChange}
              value={txtTo}
              type='text'
              className='input-search'
            />
          </div>
          <div className='filter-section filter-section-search'>
            <label htmlFor='txtSubject'>Subject</label>
            <input
              id='txtSubject'
              name='txtSubject'
              onChange={handleChange}
              value={txtSubject}
              type='text'
              className='input-search'
            />
          </div>
          <div className='filter-section filter-section-search'>
            <label htmlFor='txtBody'>Has the Words</label>
            <input
              id='txtBody'
              name='txtBody'
              onChange={handleChange}
              value={txtBody}
              type='text'
              className='input-search'
            />
          </div>
          <div className='filter-section filter-section-search'>
            <label htmlFor='txtNoBody'>Dosen't have</label>
            <input
              id='txtNoBody'
              name='txtNoBody'
              onChange={handleChange}
              value={txtNoBody}
              type='text'
              className='input-search'
            />
          </div>

          <div className='filter-section'>
            <label htmlFor='status'>Search</label>
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

          <div className='filter-section-trinary'>
            <div className='filter-section-center'>
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

            <div className='filter-section-center'>
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

            <div className='filter-section-center'>
              <label htmlFor='labels'>Starred?</label>
              <input
                id='isStarred'
                name='isStarred'
                type='checkbox'
                checked={!!isStarred}
                onChange={handleChange}
              />
            </div>
          </div>

          <MailSort handleSetFilter={handleSetFilter} filterBy={filterBy} />

          <div className='.btns-container'>
            <button type='reset' className='btn-clear-filter' onClick={onReset}>
              Clear filter
            </button>
            <button type='submit' className='btn-submit-filter'>
              Search
            </button>
          </div>
        </ModalFilter>
      </form>
    </section>
  )
}
