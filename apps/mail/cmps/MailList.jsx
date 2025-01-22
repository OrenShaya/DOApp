// apps/mail/cmps/MailList.jsx

/**
 * [] Renders a list of <MailPreview> pass down a mail prop
 */

const { Link, Navigion } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemoveMail }) {
  return (
    <section className='mails-list'>
      <ul className='mail-list'>
        {mails.map((mail) => (
          <li key={mail.id}>
            <MailPreview mail={mail} />
          </li>
        ))}
      </ul>
    </section>
  )
}
