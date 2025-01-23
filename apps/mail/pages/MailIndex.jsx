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
import { SideBar } from '../cmps/SideBar.jsx'
import { mailService } from '../services/mail.service.js'

import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
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
    return mailService
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
  const { status, txt, isRead, isStarred, lables } = filterBy
  return (
    <section className='mail-index mail-page-layout'>
      <div className='mail-index-container'>
        {selectedMailId ? (
          <MailDetails
            onBack={() => handleSetSelectMailId(null)}
            mailId={selectedMailId}
          />
        ) : (
          <Fragment>
            {/* <MailFilter
            handleSetFilter={handleSetFilter}
            filterBy={{ status, txt, isRead, isStarred, lables }}
            
          />*/}

            {!!mails.length && (
              <MailList onRemoveMail={onRemoveMail} mails={mails} />
            )}
          </Fragment>
        )}
      </div>
      <SideBar mails={mails} />
    </section>
  )
}
