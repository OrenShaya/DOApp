import { mailService } from '../services/mail.service.js'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
import Icon from '../../../cmps/Icon.jsx'

const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailCompose() {
  const [mailToCompose, setMailToCompose] = useState(mailService.getEmptyMail())
  const navigate = useNavigate()
  const { mailId } = useParams()
  const toLabelRef = useRef('')

  useEffect(() => {
    if (mailId) loadMail()
  }, [])

  function loadMail() {
    mailService
      .get(mailId)
      .then(setMailToCompose)
      .catch((err) => {
        console.error('err from loadMail:', err)
        showErrorMsg(`Cannot get mail `)
      })
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
    setMailToCompose((prevMailToCompose) => ({
      ...prevMailToCompose,
      [field]: value,
    }))
  }

  function onSendMail(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    const now = Date.now()
    const updatedMail = {
      ...mailToCompose,
      createdAt: mailToCompose.createdAt || now,
      updatedAt: now,
      sentAt: now,
    }

    mailService
      .save(updatedMail)
      .then((sendMail) => {
        showSuccessMsg(`Mail ${sendMail.subject} send successfuly`)
        navigate('/mail/')
      })
      .catch((err) => {
        console.error('error onSendMail', err)
        showErrorMsg(`Cannot send mail`)
      })
  }

  function onDraftMail(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    const now = Date.now()
    const updatedMail = {
      ...mailToCompose,
      createdAt: mailToCompose.createdAt || now,
      updatedAt: now,
      sentAt: null,
    }

    mailService
      .save(updatedMail)
      .then((draftMail) => {
        showSuccessMsg(`Draft ${draftMail.subject} saved for later successfuly`)
      })
      .catch((err) => {
        console.error('error saving draft', err)
        showErrorMsg(`Cannot saving draft `)
      })
      .finally(() => navigate('/mail'))
  }

  function onDeleteMail(ev) {
    ev.preventDefault()

    const now = Date.now()
    const updatedMail = {
      ...mailToCompose,
      createdAt: mailToCompose.createdAt || now,
      updatedAt: now,
      sentAt: null,
      removedAt: now,
    }

    mailService
      .save(updatedMail)
      .then((deletedMail) => {
        showSuccessMsg(
          `Mail ${deletedMail.subject} removed to trash successfuly`
        )
      })
      .catch((err) => {
        console.error('error onDeleteMail', err)
        showErrorMsg(`Cannot send mail to trash`)
      })
      .finally(() => navigate('/mail'))
  }

  const {
    // id,
    subject,
    createdAt,
    updatedAt,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  } = mailToCompose

  return (
    <section className='mail-compose'>
      <form onSubmit={onSendMail}>
        <div className='compose-header'>
          <div className='compose-header-title'>
            <span>{mailId ? 'Mail Edit' : 'New Message'}</span>
          </div>
          <div className='compose-header-actions-btns'>
            <Icon name='close' onClick={onDraftMail} />
          </div>
        </div>

        <div className='compose-form-section'>
          {/* the label is visibile onfocus instead of the placeholder */}
          <label htmlFor='to' ref={toLabelRef}></label>
          <input
            value={to}
            onChange={handleChange}
            type='email'
            id='to'
            name='to'
            placeholder='Recipients'
            required
          />
        </div>

        <div className='compose-form-section'>
          <label htmlFor='subject'></label>
          <input
            value={subject}
            onChange={handleChange}
            type='text'
            id='subject'
            name='subject'
            placeholder='Subject'
            required
          />
        </div>

        <div className='compose-form-section'>
          <label className='bold-txt' htmlFor='body'></label>
          <textarea
            onChange={handleChange}
            value={body}
            id='body'
            type='textarea'
            name='body'
            placeholder='Message'
          />
        </div>
        <div className='compose-form-section compose-form-bottom'>
          <button className='btn btn-send'>Send</button>
          <div className='form-section-action-btns'></div>
        </div>
      </form>
    </section>
  )
}
