// apps/mail/cmps/MailSort.jsx

const { useState, useEffect, useRef } = React
import Icon from '../../../cmps/Icon.jsx'

export function MailSort({ filterBy, handleSetFilter }) {
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

  const { sortBy = '', orderBy = '' } = filterBy
  return (
    <section className='mail-sort'>
      <div className='mail-sort-container'>
        <div className='sort-section'>
          <label htmlFor='sortBy'>Sort by</label>
          <select
            id='sortBy'
            name='sortBy'
            value={sortBy}
            onChange={handleChange}
          >
            <option value=''>(No Sort)</option>
            <option value='subject'>Subject</option>
            <option value='dates'>Dates</option>
          </select>
        </div>

        <div className='sort-section'>
          <label htmlFor='orderBy'>Order</label>
          <select
            id='orderBy'
            name='orderBy'
            value={orderBy}
            onChange={handleChange}
          >
            <option value='asc'>ASC</option>
            <option value='desc'>DESC</option>
          </select>
        </div>
      </div>
    </section>
  )
}
