import { utilService } from './../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { noteDemoData } from './notes.demo.data.js'

const NOTES_KEY = 'DOappNotesDB'

export const noteService = {
  query,
  get,
  save,
  remove,
  getDefaultFilter,
  getEmptyNote,
}

function query(filterBy) {
  
    return storageService.query(NOTES_KEY)
    .then((notes) => {
      if (filterBy) {
        noop
      }      
      if (!notes.length) {
        utilService.saveToStorage(NOTES_KEY, noteDemoData.notes)
        return noteDemoData.notes
      }      
      return notes
    })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    const newNote = _createNote()
    return storageService.post(NOTES_KEY, newNote)
  }
}

function getDefaultFilter() {
  return { }
}

function getEmptyNote() {
  return {
    id: 'n101',
    createdAt: 1111111,
    updatedAt: 1111111,
    type: 'NoteTxt',
    isPinned: false,
    style: {
        backgroundColor: '',
    },
    info: {
        txt: ''
    }
  }
}

function _createNote() {
  return {
    id: 'n101',
    createdAt: 1112222,
    updatedAt: 1113333,
    type: 'NoteTxt',
    isPinned: false,
    style: {
        backgroundColor: 'red',
    },
    info: {
        txt: 'Fullstack Me Baby!'
    }
  }
}

