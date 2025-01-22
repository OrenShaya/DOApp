// apps/mail/services/mail.service.js

/**
 * [] Gets mails to show from service
 * [] Renders the list
 * [] Renders filter components (both top filter with search)
 * [] Renders side filter for different folders
 */

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams } = ReactRouterDOM

// import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from './MailDetails.jsx'
import { mailService } from '../mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../event-bus.service.js'
import { getTruthyValues } from '../../../services/util.service.js'

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )
  const [selectedMailId, setSelectedMailId] = useState(null)

  useEffect(() => {
    setSearchParams(getTruthyValues(filterBy))
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.error('Problem getting mails:', err)
      })
  }

  function onRemoveMail(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
        showSuccessMsg(`Mail ${mailId} Removed`)
      })
      .catch((err) => {
        console.error('Problems removing mail:', err)
        showErrorMsg(`Cannot Remove Mail ${mailId}`)
      })
  }

  // function handleSetFilter(filterByToEdit) {
  //   setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterByToEdit }))
  // }

  function handleSetSelectMailId(mailId) {
    setSelectedMailId(mailId)
  }

  if (!mails) return <div>Loading...</div>
  const { status, txt, isRead, isStared, lables } = filterBy
  return (
    <section className='mail-index'>
      <h1 className='text-center'>DO Mail</h1>
      {selectedMailId ? (
        <MailDetails
          onBack={() => handleSetSelectMailId(null)}
          mailId={selectedMailId}
        />
      ) : (
        <Fragment>
          {/* <MailFilter
            handleSetFilter={handleSetFilter}
            filterBy={{ status, txt, isRead, isStared, lables }}
            mailsStats={mailsStats}
          />

          <button>
            <Link to='/mail/edit'>Add Mail</Link>
          </button> */}

          {!!mails.length && (
            <MailList onRemoveMail={onRemoveMail} mails={mails} />
          )}
        </Fragment>
      )}
    </section>
  )
}
