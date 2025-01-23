// apps/mail/cmps/MailList.jsx

/**
 * [] Renders a list of <MailPreview> pass down a mail prop
 */

const { Link, Navigion } = ReactRouterDOM
import Icon from '../cmps/Icon.jsx'

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemoveMail }) {
  return (
    <section className='mails-list'>
      <ul className='mail-list'>
        {mails.map((mail) => (
          <li key={mail.id}>
            <MailPreview mail={mail} />
            <div className='on-hover-actions'>
              <Icon name='delete' className='round-hover' />
              <Icon name='markAsRead' className='round-hover' />
              <Icon name='edit' className='round-hover' />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
