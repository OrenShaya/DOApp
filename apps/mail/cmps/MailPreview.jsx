// apps/mail/cmps/MailPreview.jsx

/**
 * [] Present a mail preview
 * [V] Renders the subject (with text size limit)
 * [V] Gives visual indication for read/unread
 * [V] Support hover state
 */

const { useNavigate } = ReactRouter

import Icon from '../../../cmps/Icon.jsx'
import { formatTimeDiff, getUser } from '../services/mail.service.js'

export function MailPreview({
  mail,
  onRemoveMail,
  onToggleStarredMail,
  onToggleReadMail,
}) {
  const navigate = useNavigate()

  function handlePreviewClick(id, sentAt, removedAt, from) {
    isMailDraft(removedAt, sentAt, from)
      ? navigate(`/mail/compose/${id}`)
      : navigate(`/mail/${id}`)
  }

  function isMailDraft(removedAt, sentAt, from) {
    const user = getUser()
    if (removedAt || sentAt) return false
    else if (from.email === user.email) return true
    else return false
  }

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
                  onToggleStarredMail(id)
                }}
              />
            ) : (
              <Icon
                name='starYellow'
                onClick={() => {
                  onToggleStarredMail(id)
                }}
              />
            )}
          </span>
        </div>
        {removedAt && <Icon name='deleteForever' />}
        <div
          className='mail-card-select-sender'
          onClick={(mail) => {
            handlePreviewClick(id, sentAt, removedAt, from)
          }}
        >
          <span className='mail-card-title'>
            {from.fullname || 'Unknown Sender'}
          </span>
        </div>
      </div>

      <div
        className='mail-card-main'
        onClick={(mail) => {
          handlePreviewClick(id, sentAt, removedAt, from)
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
