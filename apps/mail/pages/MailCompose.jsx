import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailCompose() {
  const [mailToCompose, setMailToCompose] = useState(mailService.getEmptyMail())
  const navigate = useNavigate()
  const { mailId } = useParams()

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

    mailService
      .save(mailToCompose)
      .then((sendMail) => {
        showSuccessMsg(`Mail ${sendMail.subject} sendd successfuly`)
      })
      .catch((err) => {
        console.error('error onSendMail', err)
        showErrorMsg(`Cannot send mail `)
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
    <section className='mail-edit'>
      <h1>{mailId ? 'Mail Edit' : 'Mail Compose'}</h1>

      <form onSubmit={onSendMail}>
        <div className='form-section'>
          {/* the label is visibile onfocus instead of the placeholder */}
          <label htmlFor='to'>To</label>
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

        <div className='form-section'>
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

        <div className='form-section'>
          <label className='bold-txt' htmlFor='body'></label>
          <textarea
            onChange={handleChange}
            value={body}
            id='body'
            type='textarea'
            name='body'
          />
        </div>

        <div className='form-section'>
          <div className='form-section-action-btns'></div>

          <button>Send</button>
        </div>
      </form>
    </section>
  )
}
