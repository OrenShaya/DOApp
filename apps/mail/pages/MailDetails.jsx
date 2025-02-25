// apps/mail/services/mail.service.js
import { mailService } from '../services/mail.service.js'
import Icon from '../../../cmps/Icon.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'

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

  function formatDateDetails(dateInput) {
    const daysAgo = (date) => {
      const now = new Date()
      const diffInMs = now - date
      const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
      return diffDays === 0
        ? 'Today'
        : diffDays === 1
        ? 'Yesterday'
        : `${diffDays} days ago`
    }

    const date = new Date(dateInput)
    const opts = { weekday: 'short', month: 'short', day: 'numeric' }
    const timeOpts = { hour: 'numeric', minute: 'numeric', hour12: true }

    const formatDate = date.toLocaleDateString('en-US', opts) // Thu, Jan 23
    const formatTime = date.toLocaleTimeString('en-US', timeOpts) // 8:01 PM

    return `${formatDate}, ${formatTime} (${daysAgo(date)})`
  }

  function onToggleReadMailDetails(mailId) {
    mailService
      .toggleIsRead(mailId)
      .then((updatedMail) => {
        setMail(updatedMail)
        showSuccessMsg(`Mail ${mailId} toggled`)
      })
      .catch((err) => {
        console.error('cannot toggle read mail details:', err)
        showErrorMsg(`cannot toggle read Mail ${mailId}`)
      })
  }

  function onRemoveMailDetails(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        onBack()
        showSuccessMsg(`Mail ${mailId} removed`)
      })
      .catch((err) => {
        console.error('cannot remove mail details:', err)
        showErrorMsg(`cannot Remove Mail ${mailId}`)
      })
  }

  function onToggleStarredMailDetails(mailId) {
    mailService
      .toggleIsStarred(mailId)
      .then((updatedMail) => {
        setMail((prevMail) => prevMail)
        showSuccessMsg(`Mail ${mailId} toggle starred`)
      })
      .catch((err) => {
        console.error('problems toggle starred details:', err)
        showErrorMsg(`cannot toggle starred Mail ${mailId}`)
      })
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
    prevMailId,
    nextMailId,
  } = mail

  return (
    <section className='mail-details mail-page-layout'>
      <div className='mail-details-header-row'>
        <div className='mail-details-actions'>
          <div className='mail-details-actions-btns'>
            <div className='back-btn-container '>
              <Icon
                name='arrowLeft'
                dataLabel={'Back to index'}
                onClick={onBack}
                className='btn-back round-hover'
              />
            </div>
            <div className='mail-details-actions-btn-center'>
              <Icon
                name='archive'
                dataLabel='move to archive'
                onClick={() =>
                  console.log(
                    'Feature Archive was pressed, development in progress'
                  )
                }
                className='btn-archive round-hover'
              />
            </div>
            <div className='mail-details-actions-btn-center'>
              <Icon
                name='delete'
                dataLabel='delete email'
                onClick={() => onRemoveMailDetails(id)}
                className='btn-delete round-hover'
              />
            </div>
            <div className='mail-details-actions-btn-center'>
              <Icon
                name={isRead ? 'markEmailUnread' : 'markEmailread'}
                dataLabel={`mark ${isRead ? 'unread' : 'read'}`}
                onClick={() => onToggleReadMailDetails(id)}
                className='btn-mark-unread round-hover'
              />
            </div>

            <div className='mail-details-actions-btn-center vertical-side-line'>
              <Icon
                name='moreVert'
                dataLabel='more'
                onClick={() => console.log('Dot was pressed')}
                className='btn-more-vertical round-hover'
              />
            </div>
          </div>

          <div className='mail-details-actions-nav'>
            <div className='mail-details-nav-chevron'>
              <Icon
                name='chevronLeft'
                className='btn-arrow-nav round-hover'
                dataLabel={'Navigate previous mail'}
                onClick={() => {
                  navigate(`/mail/${prevMailId}`)
                }}
              />
            </div>
            <div className='mail-details-nav-chevron'>
              <Icon
                name='chevronRight'
                className='btn-arrow-nav round-hover'
                dataLabel={'Navigate next mail'}
                onClick={() => {
                  navigate(`/mail/${nextMailId}`)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mail-details-grid'>
        <div className='mail-details-row mail-details-row-subject'>
          <div className='mail-detail-subject'>
            <h3 className='mail-details-info-subject'>{subject}</h3>
            {labels &&
              labels.map((label) => (
                <span key={label} className={`label label-${label}`}>
                  {label}
                </span>
              ))}
          </div>
          <div className='mail-details-info-subject-btns'>
            <div className='mail-detail-print'>
              <Icon
                name='print'
                dataLabel={'print mail'}
                onClick={() =>
                  console.log(
                    'Feature Print was pressed, development in progress'
                  )
                }
                className='btn-print  round-hover'
              />
            </div>
            <div className='mail-detail-open-new-window'>
              <Icon
                name='openInNew'
                dataLabel={'in new window'}
                onClick={() =>
                  console.log(
                    'Feature Open in new window was pressed, development in progress'
                  )
                }
                className='btn-open-new-window  round-hover'
              />
            </div>
          </div>
        </div>

        <div className='mail-details-row mail-details-row-info'>
          <div className='user-img-container '>
            <Icon
              name='accountCircle'
              dataLabel={'Profile image'}
              className='larger'
            />
          </div>
          <div className='mail-details-body-header'>
            <div className='mail-details-body-header-from'>
              <span className='mail-details-body-info-name'>
                {from.name ? from.name : 'Sender name'}
              </span>
              <span className='mail-details-body-info-email'>
                {'<'}
                {from.email}
                {'>'}
              </span>
            </div>
            <div className='mail-details-body-header-date'>
              <span className='mail-details-body-date'>
                {formatDateDetails(sentAt ? sentAt : createdAt)}
              </span>
            </div>
          </div>

          <div className='mail-details-body-header-actions'>
            <div className='mail-details-body-header-actions-btn'>
              <Icon
                name={`${!isStarred ? 'star' : 'starYellow'}`}
                onClick={() => {
                  onToggleStarredMailDetails(id)
                }}
                dataLabel={`${!isStarred ? 'not' : ''} starred`}
              />
            </div>

            <div className='mail-details-body-header-actions-btn'>
              <Icon
                name='reply'
                className='btn-reply cursor-pointer'
                dataLabel={'Reply'}
                onClick={() =>
                  console.log(
                    'Feature Reply was pressed, development in progress'
                  )
                }
              />
            </div>
            <div className='mail-details-body-header-actions-btn'>
              <Icon
                name='moreVert'
                dataLabel='more'
                onClick={() => console.log('Dot was pressed')}
                className='btn-more-vertical round-hover'
              />
            </div>
          </div>
        </div>

        <div className='mail-details-row mail-details-row-body'>
          <div className='mail-details-body'>
            <pre>{body}</pre>
          </div>
        </div>

        <div className='mail-details-row mail-details-row-footer'>
          <div className='mail-details-footer'>
            <button
              type='button'
              className='btn btn-reply-foo'
              onClick={() =>
                console.log(
                  'Feature Reply was pressed, development in progress'
                )
              }
            >
              <Icon name='reply' className='btn-reply' dataLabel={'Reply'} />
              Reply
            </button>
            <button
              type='button'
              className='btn btn-forward-foo'
              onClick={() =>
                console.log(
                  'Feature Forward was pressed, development in progress'
                )
              }
            >
              Forward
              <Icon
                name='forward'
                className='btn-forward'
                dataLabel={'forward'}
              />
            </button>
          </div>
        </div>
      </div>
      <SideBar />
    </section>
  )
}
