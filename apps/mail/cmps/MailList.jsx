// apps/mail/cmps/MailList.jsx

/**
 * [] Renders a list of <MailPreview> pass down a mail prop
 */

import Icon from '../../../cmps/Icon.jsx'

import { MailPreview } from './MailPreview.jsx'

export function MailList({
  mails,
  onRemoveMail,
  onToggleStarredMail,
  onToggleReadMail,
}) {
  return (
    <section className='mails-list'>
      <ul className='mail-list'>
        {mails.map((mail) => (
          <li
            key={mail.id}
            className={`mail-list-item ${mail.isRead ? 'unread-mail' : ''}`}
          >
            <MailPreview
              mail={mail}
              onRemoveMail={onRemoveMail}
              onToggleStarredMail={onToggleStarredMail}
              onToggleReadMail={onToggleReadMail}
            />
            <div className='on-hover-actions'>
              <Icon
                name='delete'
                className='round-hover'
                onClick={() => {
                  onRemoveMail(mail.id)
                }}
              />
              <Icon
                name='markAsUnread'
                className='round-hover'
                onClick={() => {
                  onToggleReadMail(mail.id)
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
