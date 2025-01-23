// apps/mail/services/mail.service.js
import { mailService } from '../services/mail.service.js'
import Icon from '../../../cmps/Icon.jsx'
import { SideBar } from '../cmps/SideBar.jsx'

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
            <Icon
              name='archive'
              dataLabel='move to archive'
              onClick={() => console.log('Move to archive was pressed')}
              className='btn-archive round-hover'
            />
            <Icon
              name='delete'
              dataLabel='delete email'
              onClick={() => console.log('Delete email was pressed')}
              className='btn-delete round-hover'
            />
            <Icon
              name='markEmailUnread'
              dataLabel='mark unread'
              onClick={() => console.log('Mark unread was pressed')}
              className='btn-mark-unread round-hover'
            />

            {' | '}
            <Icon
              name='moreVert'
              dataLabel='more options'
              onClick={() => console.log('Dot was pressed')}
              className='btn-more-vertical round-hover'
            />
          </div>

          <div className='mail-details-actions-nav'>
            <Icon
              name='chevronLeft'
              className='btn-arrow-nav round-hover'
              dataLabel={'Navigate previous mail'}
              onClick={() => {
                navigate(`/mail/${mail.prevMailId}`)
              }}
            />

            <Icon
              name='chevronRight'
              className='btn-arrow-nav round-hover'
              dataLabel={'Navigate next mail'}
              onClick={() => {
                navigate(`/mail/${mail.nextMailId}`)
              }}
            />
          </div>
        </div>
      </div>
      <div className='mail-details-grid'>
        <div className='side-action-items aside'>
          <div className='back-btn-container '>
            <Icon
              name='arrowLeft'
              dataLabel={'Back to index'}
              onClick={onBack}
              className='btn-back round-hover'
            />
          </div>
          <div className='user-img-container '>
            <Icon
              name='accountCircle'
              dataLabel={'Profile image'}
              className='larger'
            />
          </div>
        </div>

        <div className='mail-details-row'>
          <div className='mail-detail-subject'>
            <h3 className='mail-details-info-subject'>{subject}</h3>
            {labels &&
              labels.map((label) => (
                <span key={label} className={`label label-${label}`}>
                  {label}
                </span>
              ))}
          </div>
          <div className='mail-detail-print'>
            <Icon
              name='print'
              dataLabel={'print mail'}
              onClick={() => console.log('print was pressed')}
              className='btn-print cursor-pointer'
            />
          </div>
        </div>

        <div className='mail-details-row'>
          <div className='mail-details-body-header'>
            <span className='mail-details-body-info'>{from.name}</span>
            <span className='mail-details-body-info'>{from.email}</span>
          </div>
          <div className='mail-details-body-header'>
            <span className='mail-details-body-date'>
              {mailService.formatTimeDiff(sentAt ? sentAt : createdAt)}
            </span>
            <span className='mail-details-body-info'>
              {!isStarred ? (
                <Icon name='star' dataLabel={'not starred'} />
              ) : (
                <Icon name='starYellow' dataLabel={'starred'} />
              )}
            </span>
          </div>

          <Icon
            name='reply'
            className='btn-reply cursor-pointer'
            dataLabel={'Reply'}
            onClick={() => console.log('Respond was pressed')}
          />
        </div>

        <div className='mail-details-row'>
          <div className='mail-details-body'>
            <pre>{body}</pre>
          </div>
        </div>

        <div className='mail-details-row'>
          <div className='mail-details-footer'>
            <button
              type='button'
              className='btn btn-reply-foo'
              onClick={() => console.log('Respond was pressed')}
            >
              <Icon name='reply' className='btn-reply' dataLabel={'Reply'} />
              Reply
            </button>
            <button
              type='button'
              className='btn btn-forward-foo'
              onClick={() => console.log('Forward was pressed')}
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
