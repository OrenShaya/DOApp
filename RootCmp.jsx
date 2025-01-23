const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { NoteDetail } from './apps/note/cmps/NotesDetail.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/about' element={<About />} />

          <Route path='/mail' element={<MailIndex />}>
            <Route path='/mail/:mailId' element={<MailDetails />} />
            {/* <Route path='/mail/compose' element={<MailCompose />} />
              <Route path='/mail/compose/:mailId' element={<MailCompose />} /> */}
          </Route>

          <Route path='/note' element={<NoteIndex />} />
          <Route path='/note/:noteId' element={<NoteDetail />} />
          
        </Routes>
      </section>
    </Router>
  )
}
