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
  formatTimeDiff,
}
_createDemoMails()

/////////////////////////////////////// USER //////////////////////////////////////////
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

function getUser() {
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

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      mails = mails.filter(
        (mail) => regExp.test(mail.subject) || regExp.test(mail.body)
      )
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

    return mails
  })
}

function getDefaultFilter() {
  return { status: 'inbox', txt: '', isRead: '', isStarred: '', labels: '' }
}

export function getFilterFromSearchParams(searchParams) {
  const status = searchParams.get('status') || ''
  const txt = searchParams.get('txt') || ''
  const isRead = searchParams.get('isRead') || ''
  const isStarred = searchParams.get('isStarred') || ''
  const labels = searchParams.get('labels') || ''
  return {
    status,
    txt,
    isRead,
    isStarred,
    labels,
  }
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    if (!mail) {
      console.error('Mail not found:', mailId)
      throw new Error('Mail not found')
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
  return storageService.remove(MAIL_KEY, mailId).catch((err) => {
    console.error('Mail not removed:', err)
    throw new Error('Mail not removed', err)
  })
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    const {
      subject,
      body,
      to,
      isRead,
      isStarred,
      sentAt,
      removedAt,
      updatedAt,
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
      console.error('Mail not found:', mailId)
      throw new Error('Mail not found')
    }
    mail.isRead = !mail.isRead
    return save(mail)
  })
}

export function toggleIsStarred(mailId) {
  return get(mailId).then((mail) => {
    if (!mail) {
      console.error('Mail not found:', mailId)
      throw new Error('Mail not found')
    }
    mail.isStarred = !mail.isStarred
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

// function _createMails() {
//   const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
//   const mails = []
//   for (let i = 0; i < 20; i++) {
//     const mail = {
//       id: makeId(),
//       title: makeLorem(2),
//       subtitle: makeLorem(4),
//       authors: [makeLorem(1)],
//       publishedDate: getRandomIntInclusive(1950, 2024),
//       description: makeLorem(20),
//       pageCount: getRandomIntInclusive(20, 600),
//       categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
//       thumbnail: `http://coding-academy.org/mails-photos/${i + 1}.jpg`,
//       language: 'en',
//       listPrice: {
//         amount: getRandomIntInclusive(80, 500),
//         currencyCode: 'EUR',
//         isOnSale: Math.random() > 0.7,
//       },
//     }
//     mails.push(mail)
//   }
// }

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
    createdAt: Date.now(),
    updatedAt,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from: fromCreate || getUser(),
    labels: [],
    to,
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
