// apps/mail/cmps/MailList.jsx

/**
 * [] Renders a list of <MailPreview> pass down a mail prop
 */

const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemoveMail }) {
  return (
    <section className='mails-list'>
      <ul className='mail-list'>
        {mails.map((mail) => (
          <li key={mail.id}>
            <MailPreview mail={mail} />
            <div className='btns-container'>
              <button onClick={() => onRemoveMail(mail.id)}>Remove Mail</button>
              <button>
                <Link to={`/mail/${mail.id}`}>Open</Link>
              </button>
              {/* <button>
                <Link to={`/mail/edit/${mail.id}`}>Edit</Link>
              </button> */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
