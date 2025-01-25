// apps/mail/services/mail.service.js
import { storageService } from '../../../services/async-storage.service.js'
import {
  // loadFromStorage,
  makeId,
  // saveToStorage,
  makeLorem,
  getRandomIntInclusive,
} from '../../../services/util.service.js'
import { demoMails } from '../assets/demoData/mail.js'

const MAIL_KEY = 'DOappMailDB'

export const mailService = {
  // Mail CRUDL
  query,
  get,
  remove,
  save,
  getEmptyMail,
  // Filter
  getDefaultFilter,
  getFilterFromSearchParams,
  getTruthyValues,
  getUser,

  toggleIsRead,
  toggleIsStarred,
  restoreMail,
  formatTimeDiff,
}
_createDemoMails()

/////////////////////////////////////// USER //////////////////////////////////////////
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

export function getUser() {
  return loggedinUser
}

/////////////////////////////////////// CRUDL//////////////////////////////////////////
function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    mails = mails.map((mail) => {
      if (mail.removedAt) mail.status = 'trash'
      else if (mail.sentAt) mail.status = 'sent'
      else if (mail.from.email === loggedinUser.email) mail.status = 'draft'
      else mail.status = 'inbox'
      return mail
    })

    if (filterBy.status) {
      const regExp = new RegExp(filterBy.status, 'i')
      mails = mails.filter((mail) => regExp.test(mail.status))
    }

    if (filterBy.txtAll) {
      const regExp = new RegExp(filterBy.txtAll, 'i')
      mails = mails.filter(
        (mail) =>
          regExp.test(mail.subject) ||
          regExp.test(mail.body) ||
          regExp.test(mail.from.fullname) ||
          regExp.test(mail.to.fullname)
      )
    }

    if (filterBy.txtSubject) {
      const regExp = new RegExp(filterBy.txtSubject, 'i')
      mails = mails.filter((mail) => regExp.test(mail.subject))
    }

    if (filterBy.txtBody) {
      const regExp = new RegExp(filterBy.txtBody, 'i')
      mails = mails.filter((mail) => regExp.test(mail.body))
    }

    if (filterBy.txtNoBody) {
      const regExp = new RegExp(filterBy.txtNoBody, 'i')
      mails = mails.filter((mail) => !regExp.test(mail.body))
    }

    if (filterBy.txtFrom) {
      const regExp = new RegExp(filterBy.txtFrom, 'i')
      mails = mails.filter((mail) => regExp.test(mail.from.fullname))
    }

    if (filterBy.txtTo) {
      const regExp = new RegExp(filterBy.txtTo, 'i')
      mails = mails.filter((mail) => regExp.test(mail.to.fullname))
    }

    if (filterBy.isRead) {
      mails = mails.filter((mail) => mail.isRead === true)
    }

    if (filterBy.isStarred) {
      mails = mails.filter((mail) => mail.isStarred === true)
    }

    if (filterBy.labels) {
      const regExp = new RegExp(filterBy.labels, 'i')
      mails = mails.filter((mail) => {
        if (mail.labels && mail.labels.length === 1)
          return regExp.test(mail.labels)
        return mail.labels.some((label) => regExp.test(label))
      })
    }

    if (filterBy.sortBy) {
      const sortByValue = filterBy.sortBy
      const sortOrder = filterBy.orderBy === 'asc' ? 1 : -1

      switch (sortByValue) {
        case 'subject':
          mails.sort((a, b) => {
            const subjectA = a.subject.toLowerCase()
            const subjectB = b.subject.toLowerCase()

            if (subjectA < subjectB) return -1 * sortOrder
            if (subjectA > subjectB) return 1 * sortOrder

            return 0
          })

          break

        case 'dates':
          mails.sort((a, b) => {
            const dateA = a.sentAt ? new Date(a.sentAt) : new Date(a.createdAt)
            const dateB = b.sentAt ? new Date(b.sentAt) : new Date(b.createdAt)
            return (dateA - dateB) * sortOrder
          })
          break

        default:
          break
      }
    }

    return mails
  })
}

function getDefaultFilter() {
  return {
    status: 'inbox',
    isRead: '',
    isStarred: '',
    labels: '',
    txtAll: '',
    txtSubject: '',
    txtBody: '',
    txtNoBody: '',
    txtFrom: '',
    txtTo: '',
    sortBy: '',
    orderBy: '',
  }
}

export function getFilterFromSearchParams(searchParams) {
  const status = searchParams.get('status') || ''
  const isRead = searchParams.get('isRead') || ''
  const isStarred = searchParams.get('isStarred') || ''
  const labels = searchParams.get('labels') || ''

  const txtAll = searchParams.get('txtAll') || ''
  const txtSubject = searchParams.get('txtSubject') || ''
  const txtBody = searchParams.get('txtBody') || ''
  const txtNoBody = searchParams.get('txtNoBody') || ''
  const txtFrom = searchParams.get('txtFrom') || ''
  const txtTo = searchParams.get('txtFrom') || ''

  const sortBy = searchParams.get('sortBy') || ''
  const orderBy = searchParams.get('orderBy') || ''
  return {
    status,
    isRead,
    isStarred,
    labels,
    txtAll,
    txtSubject,
    txtBody,
    txtNoBody,
    txtFrom,
    txtTo,
    sortBy,
    orderBy,
  }
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    if (!mail) {
      console.error('mail not found:', mailId)
      throw new Error('mail not found')
    }
    return _setNextPrevMailId(mail)
  })
}

function _setNextPrevMailId(mail) {
  return query().then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevMail = mails[mailIdx - 1]
      ? mails[mailIdx - 1]
      : mails[mails.length - 1]
    mail.nextMailId = nextMail.id
    mail.prevMailId = prevMail.id
    return mail
  })
}

function remove(mailId) {
  // return Promise.reject('DEBUG: Promise rejected')
  return get(mailId).then((mail) => {
    if (!mail) {
      throw new Error('mail not found')
    }

    if (mail.removedAt) {
      return storageService.remove(MAIL_KEY, mailId).catch((err) => {
        console.error('mail not removed:', err)
        throw new Error('mail not removed', err)
      })
    }

    mail.removedAt = Date.now()
    return save(mail)
  })
}

function save(mail) {
  const now = Date.now()

  if (mail.id) {
    const updatedMail = { ...mail, updatedAt: now }
    return storageService.put(MAIL_KEY, updatedMail)
  } else {
    const {
      subject,
      body,
      to,
      isRead,
      isStarred,
      sentAt,
      removedAt,
      updatedAt = now,
    } = mail
    const newMail = _createMail(
      subject,
      body,
      to,
      isRead,
      isStarred,
      sentAt,
      removedAt,
      updatedAt
    )
    return storageService.post(MAIL_KEY, newMail)
  }
}

////////////////////crudl utils////////////////////

export function toggleIsRead(mailId) {
  return get(mailId).then((mail) => {
    if (!mail) {
      console.error('toggleIsRead mail not found:', mailId)
      throw new Error('mail not found')
    }
    mail.isRead = !mail.isRead
    return save(mail)
  })
}

export function toggleIsStarred(mailId) {
  return get(mailId).then((mail) => {
    if (!mail) {
      console.error(' toggleIsStarred mail not found:', mailId)
      throw new Error('mail not found')
    }
    mail.isStarred = !mail.isStarred
    return save(mail)
  })
}

export function restoreMail(mailId) {
  return get(mailId).then((mail) => {
    if (!mail) {
      throw new Error('Mail not found')
    }

    // reset removedAt to null
    mail.removedAt = null

    if (mail.sentAt) {
      mail.status = 'sent'
    } else if (mail.from.email === getUser().email) {
      mail.status = 'draft'
    } else {
      mail.status = 'inbox'
    }

    return save(mail)
  })
}

/////////////////// private function///////////////////

function _createDemoMails() {
  let mails = _loadFromStorage(MAIL_KEY)

  if (!mails || !mails.length) {
    mails = demoMails
    _saveToStorage(MAIL_KEY, mails)
  }
}

function _createMail(
  subject,
  body,
  to,
  isRead,
  isStarred,
  sentAt,
  removedAt,
  updatedAt
) {
  const mail = getEmptyMail(
    subject,
    body,
    to,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    updatedAt
  )
  if (!mail.id) mail.id = _makeId(10)
  return mail
}

export function getEmptyMail(
  subject = '',
  body = '',
  to = '',
  isRead = false,
  isStarred = false,
  sentAt = null,
  removedAt = null,
  updatedAt = null,
  fromCreate = null
) {
  const mail = {
    subject,
    body,
    to,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    updatedAt,
    from: fromCreate || getUser(),
    labels: [],
    createdAt: Date.now(),
  }
  return mail
}
export function _saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

export function _loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

export function getTruthyValues(obj) {
  const newObj = {}
  for (const key in obj) {
    const value = obj[key]
    if (value) {
      newObj[key] = value
    }
  }
  return newObj
}

function _makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function formatTimeDiff(date) {
  const now = new Date()
  const diffInMs = now - new Date(date)
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const dateThan = new Date(date).toLocaleDateString()

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else if (diffInDays < 7) {
    return `(${dateThan}) ${diffInDays} days ago`
  } else {
    return dateThan
  }
}
