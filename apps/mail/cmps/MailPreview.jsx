// apps/mail/cmps/MailPreview.jsx

/**
 * [] Present a mail preview
 * [] Renders the subject (with text size limit)
 * [] Gives visual indication for read/unread
 * [] Support hover state
 */

export function MailPreview({ mail }) {
  const {
    id,
    subject,
    createdAt,
    updatedAt,
    body,
    isRead,
    isStared,
    sentAt,
    removedAt,
    from,
    to,
  } = mail
  return (
    <article className='mail-preview'>
      <div className='mail-card-select-checkbox'>
        <input
          // onChange={handleChange}
          // checked={isOnSale}
          id={`mail-checked-${id}`}
          type='checkbox'
          name={`mail-checked-${id}`}
        />
      </div>
      <div className='mail-card-select-starred'>
        <span className='mail-card-title'>{isStared ? '⭐' : '★'}</span>
      </div>
      <div className='mail-card-select-sender'>
        <span className='mail-card-title'>{from}</span>
      </div>

      <div className='mail-card-main'>
        <div className='mail-card-select-subject'>
          <span className='mail-card-subject'>{subject}</span>
        </div>
        <div className='mail-card-select-body'>
          <span className='mail-card-body'>{body}</span>
        </div>
      </div>

      <div className='mail-card-details'>
        <div className='mail-card-date'>
          <span className='mail-card-details-date'>{createdAt.toDate()}</span>
        </div>
      </div>
    </article>
  )
}
