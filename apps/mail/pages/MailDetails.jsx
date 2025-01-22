// apps/mail/services/mail.service.js
import { mailService } from '../services/mail.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const { mailId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadMail()
  }, [mailId])

  function loadMail() {
    return mailService
      .get(mailId)
      .then(setMail)
      .catch((err) => {
        console.error('Problem getting mail:', err)
      })
  }

  function onBack() {
    navigate('/mail')
  }

  if (!mail) return <div>Loading...</div>
  const {
    id,
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
    labels,
  } = mail

  return (
    <section className='mail-details'>
      <div className='mail-details-grid'>
        <div className='mail-details-row'>
          <div className='mail-details-actions'>
            <div className='mail-details-actions-btns'>
              <button className='btn btn-back' onClick={onBack}>
                <Link to='/mail/'>⬅</Link>
              </button>
              <button
                className='btn btn-delete'
                onClick={() => console.log('Delete email was pressed')}
              >
                Delete mail
              </button>
              <button
                className='btn btn-unread'
                onClick={() => console.log('Mark unread was pressed')}
              >
                Mark unread
              </button>
            </div>
            <div className='mail-details-actions-nav'>
              <button
                type='button'
                className='btn btn-arrow-nav'
                onClick={() => console.log('> was pressed')}
              >
                {'>'}
                {/* <Link to={`/mail/${prevMailId}`}>Previous Mail</Link> */}
              </button>
              <button
                type='button'
                className='btn btn-arrow-nav'
                onClick={() => console.log('< was pressed')}
              >
                {'<'}
                {/* <Link to={`/mail/${nextMailId}`}>Next Mail</Link> */}
              </button>
            </div>
          </div>
        </div>

        <div className='mail-details-row'>
          <div className='mail-detail-subject'>
            <h3 className='mail-details-info-subject'>{subject}</h3>
            {labels &&
              labels.map((label) => (
                <span key={label} className={`label label-${label}`}>
                  {label}
                </span>
              ))}
          </div>
          <div className='mail-detail-print'>
            <button
              type='button'
              className='btn btn-print'
              onClick={() => console.log('print was pressed')}
            >
              Print
            </button>
          </div>
        </div>

        <div className='mail-details-row'>
          <div className='mail-details-body-header'>
            <span className='mail-details-body-info'>{from.name}</span>
            <span className='mail-details-body-info'>{from.email}</span>
          </div>
          <div className='mail-details-body-header'>
            <span className='mail-details-body-date'>{createdAt}</span>
            <span className='mail-details-body-info'>
              {isStarred ? '⭐' : '★'}
            </span>
          </div>
          <button
            type='button'
            className='btn btn-respond'
            onClick={() => console.log('Respond was pressed')}
          >
            Respond
          </button>
        </div>

        <div className='mail-details-row'>
          <div className='mail-details-body'>
            <pre>{body}</pre>
          </div>
        </div>
        <div className='mail-details-row'>
          <div className='mail-details-footer'>
            <button
              type='button'
              className='btn btn-respond-foo'
              onClick={() => console.log('Respond was pressed')}
            >
              Respond
            </button>
            <button
              type='button'
              className='btn btn-forward-foo'
              onClick={() => console.log('Forward was pressed')}
            >
              Forward
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
