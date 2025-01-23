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
          <li key={mail.id}>
            <MailPreview
              mail={mail}
              onRemoveMail={onRemoveMail}
              onToggleStarredMail={onToggleStarredMail}
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
                name='markAsRead'
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
