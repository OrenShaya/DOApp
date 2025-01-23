// apps/mail/cmps/MailPreview.jsx

/**
 * [] Present a mail preview
 * [] Renders the subject (with text size limit)
 * [] Gives visual indication for read/unread
 * [] Support hover state
 */

const { useNavigate } = ReactRouter

import Icon from '../../../cmps/Icon.jsx'
import { formatTimeDiff } from '../services/mail.service.js'

export function MailPreview({
  mail,
  onRemoveMail,
  onToggleStarredMail,
  onToggleReadMail,
}) {
  const navigate = useNavigate()

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
  } = mail
  return (
    <article className={`mail-preview ${isRead ? 'unread-mail' : ''}`}>
      <div className='mail-card-main-select'>
        <div className='mail-card-select-checkbox'>
          <input
            // onChange={handleMarking}
            id={`mail-checked-${id}`}
            type='checkbox'
            name={`mail-checked-${id}`}
          />
        </div>
        <div className='mail-card-select-starred'>
          <span className='mail-card-title'>
            {!isStarred ? (
              <Icon
                name='star'
                onClick={() => {
                  onToggleStarredMail(mail.id)
                }}
              />
            ) : (
              <Icon
                name='starYellow'
                onClick={() => {
                  onToggleStarredMail(mail.id)
                }}
              />
            )}
          </span>
        </div>
        <div
          className='mail-card-select-sender'
          onClick={() => {
            navigate(`/mail/${mail.id}`)
          }}
        >
          <span className='mail-card-title'>
            {from.fullname || 'Unknown Sender'}
          </span>
        </div>
      </div>

      <div
        className='mail-card-main'
        onClick={() => {
          navigate(`/mail/${mail.id}`)
        }}
      >
        <div className='mail-card-select-subject'>
          <span className='mail-card-subject'>{subject}</span>
        </div>
        <div className='mail-card-select-body'>
          <span className='mail-card-body'>{body}</span>
        </div>
      </div>

      <div className='mail-card-details'>
        <div className='mail-card-date'>
          <span className='mail-card-details-date'>
            {formatTimeDiff(createdAt)}
          </span>
        </div>
      </div>
    </article>
  )
}
