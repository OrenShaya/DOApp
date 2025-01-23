// apps/mail/services/mail.service.js

/**
 * [] Gets mails to show from service
 * [] Renders the list
 * [] Renders filter components (both top filter with search)
 * [] Renders side filter for different folders
 */

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM
const { useLocation } = ReactRouter

import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailDetails } from './MailDetails.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { mailService } from '../services/mail.service.js'

import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
import { getTruthyValues } from '../../../services/util.service.js'

export function MailIndex() {
  const location = useLocation()
  const [mails, setMails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromSearchParams(searchParams)
  )

  useEffect(() => {
    setSearchParams(getTruthyValues(filterBy))

    loadMails()
  }, [filterBy])

  function loadMails() {
    return mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.error('cannot load mails:', err)
      })
  }

  function onRemoveMail(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
        //setMails((prevMails) => {prevMails.filter((mail) => mail.id !== mailId || mail.removedAt)})
        showSuccessMsg(`Mail ${mailId} Removed`)
      })
      .catch((err) => {
        console.error('cannot remove mail:', err)
        showErrorMsg(`cannot Remove Mail ${mailId}`)
      })
  }

  function onToggleReadMail(mailId) {
    mailService
      .toggleIsRead(mailId)
      .then((updatedMail) => {
        setMails((prevMails) =>
          prevMails.map((mail) =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
        showSuccessMsg(`Mail ${mailId} toggle read`)
      })
      .catch((err) => {
        console.error('cannot toggle read mail:', err)
        showErrorMsg(`cannot toggle read Mail ${mailId}`)
      })
  }

  function onToggleStarredMail(mailId) {
    mailService
      .toggleIsStarred(mailId)
      .then((updatedMail) => {
        setMails((prevMails) =>
          prevMails.map((mail) =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
        showSuccessMsg(`Mail ${mailId} toggle starred`)
      })
      .catch((err) => {
        console.error('problems toggle starred :', err)
        showErrorMsg(`cannot toggle starred Mail ${mailId}`)
      })
  }

  function handleSetFilter(filterByToEdit) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterByToEdit }))
  }

  function onRestoreMail(mailId) {
    mailService
      .restoreMail(mailId)
      .then((restoredMail) => {
        setMails((prevMails) =>
          prevMails.map((mail) =>
            mail.id === restoredMail.id ? restoredMail : mail
          )
        )
        showSuccessMsg(`mail ${mailId} restored `)
      })
      .catch((err) => {
        console.error('error restoring mail:', err)
        showErrorMsg(`cannot restore mail ${mailId}`)
      })
  }

  if (!mails) return <div>Loading...</div>
  const { status, txt, isRead, isStarred, labels } = filterBy
  return (
    <section className='mail-index mail-page-layout'>
      <div className='main-filter-container'>
        <MailFilter
          handleSetFilter={handleSetFilter}
          filterBy={{ status, txt, isRead, isStarred, labels }}
        />
      </div>
      <div className='mail-index-container'>
        <Fragment>
          {!!mails.length && (
            <MailList
              onRemoveMail={onRemoveMail}
              mails={mails}
              onToggleStarredMail={onToggleStarredMail}
              onToggleReadMail={onToggleReadMail}
              onRestoreMail={onRestoreMail}
            />
          )}
        </Fragment>
      </div>
      {location.pathname.includes('/mail/compose') && (
        <div className='outlet-container-compose'>
          <Outlet />
        </div>
      )}
      <SideBar onSetFilter={handleSetFilter} filterBy={filterBy} />
    </section>
  )
}
