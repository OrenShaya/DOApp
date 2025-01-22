// apps/mail/services/mail.service.js
import { storageService } from '../../../services/async-storage.service.js'
import {
  loadFromStorage,
  makeId,
  saveToStorage,
  makeLorem,
  getRandomIntInclusive,
} from '../../../services/util.service.js'
import { demoMails } from '../assets/demoData'

const MAIL_KEY = 'DOappMailDB'
_createDemoMails()

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
  getUser,
}

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

    if (filterBy.isStared) {
      mails = mails.filter((mail) => mail.isStared === true)
    }

    if (filterBy.lables) {
      const regExp = new RegExp(filterBy.lables, 'i')
      mails = mails.filter((mail) => {
        if (mail.lables.length === 1) return regExp.test(mail.lables)
        return mail.lables.some((label) => regExp.test(label))
      })
    }

    return mails
  })
}

function getDefaultFilter() {
  return { status: '', txt: '', isRead: '', isStared: '', lables: '' }
}

function getFilterFromSearchParams(searchParams) {
  const status = searchParams.get('status') || ''
  const txt = searchParams.get('txt') || ''
  const isRead = searchParams.get('isRead') || ''
  const isStared = searchParams.get('isStared') || ''
  const lables = searchParams.get('lables') || ''
  return {
    status,
    txt,
    isRead,
    isStared,
    lables,
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
    const newMail = _createMail(mail.subject, mail.body)
    return storageService.post(MAIL_KEY, newMail)
  }
}

function _createDemoMails() {
  let mails = loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = demoMails
    saveToStorage(MAIL_KEY, mails)
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

function _createMail(subject, body) {
  const mail = getEmptyMail(subject, body)
  if (!mail.id) mail.id = makeId(10)
  return mail
}

function getEmptyMail(
  subject = '',
  updatedAt = null,
  body = '',
  isRead = false,
  isStared = false,
  sentAt = null,
  removedAt = null,
  from = '',
  to = ''
) {
  const mail = {
    subject,
    createdAt: new Date.now(),
    updatedAt,
    body,
    isRead,
    isStared,
    sentAt,
    removedAt,
    from,
    to,
  }
  return mail
}
