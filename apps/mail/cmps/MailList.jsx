// apps/mail/cmps/MailList.jsx

import Icon from '../../../cmps/Icon.jsx'

import { MailPreview } from './MailPreview.jsx'

export function MailList({
  mails,
  onRemoveMail,
  onToggleStarredMail,
  onToggleReadMail,
  onRestoreMail,
}) {
  return (
    <section className='mails-list'>
      <ul className='mail-list'>
        {mails.map((mail) => (
          <li
            key={mail.id}
            className={`mail-list-item ${mail.isRead ? 'unread-mail' : ''}`}
          >
            <div className='mail-preview-container'>
              <div className='user-img-container '>
                <Icon name='accountCircle' dataLabel={'Profile image'} />
              </div>
              <MailPreview
                mail={mail}
                onRemoveMail={onRemoveMail}
                onToggleStarredMail={onToggleStarredMail}
                onToggleReadMail={onToggleReadMail}
              />
            </div>
            <div className='on-hover-actions'>
              <Icon
                name='delete'
                className='round-hover'
                dataLabel={'delete'}
                onClick={(event) => {
                  event.stopPropagation()
                  onRemoveMail(mail.id)
                }}
              />
              <Icon
                name='markAsUnread'
                dataLabel={'mark unread'}
                className='round-hover'
                onClick={(event) => {
                  event.stopPropagation()
                  onToggleReadMail(mail.id)
                }}
              />
              {mail.removedAt && (
                <Icon
                  name='forwardToInbox'
                  dataLabel={'restore'}
                  className='round-hover'
                  onClick={() => onRestoreMail(mail.id)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
