// apps/mail/cmps/SideBar.jsx
const { useEffect, useState, useRef } = React
const { useNavigate } = ReactRouter

export function SideBar() {
  const navigate = useNavigate()

  const inboxSpanRef = useRef(0)
  const starredSpanRef = useRef(0)
  const sentSpanRef = useRef(0)
  const draftSpanRef = useRef(0)
  const trashSpanRef = useRef(0)
  const importentSpanRef = useRef(0)
  const todoSpanRef = useRef(0)
  const marketingSpanRef = useRef(0)

  return (
    <section className='side-bar'>
      <div className='side-bar-btn-container'>
        <button
          type='button'
          className='btn btn-compose'
          onClick={navigate(`/mail/edit`)}
        >
          compose
        </button>
      </div>

      <div className='side-bar-folders-container'>
        <ul className='side-bar-folders-list'>
          <li className='folder folder-inbox'>
            Inbox<span ref={inboxSpanRef}></span>
          </li>
          <li className='folder folder-starred'>
            Starred<span ref={starredSpanRef}></span>
          </li>
          <li className='folder folder-sent'>
            Sent<span ref={sentSpanRef}></span>
          </li>
          <li className='folder folder-draft'>
            Drafts<span ref={draftSpanRef}></span>
          </li>
          <li className='folder folder-trash'>
            Trash<span ref={trashSpanRef}></span>
          </li>
        </ul>
      </div>

      <div className='side-bar-labels-container'>
        <div className='side-bar-labels-header flex align-center justify-between'>
          <h5>Labels</h5>
        </div>
        <ul className='side-bar-labels-list'>
          <li className='label label-importent'>
            Importent <span ref={importentSpanRef}></span>
          </li>
          <li className='label label-todo'>
            Todo<span ref={todoSpanRef}></span>
          </li>
          <li className='label label-marketing'>
            Marketing<span ref={marketingSpanRef}></span>
          </li>
        </ul>
      </div>
    </section>
  )
}
