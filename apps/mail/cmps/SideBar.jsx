// apps/mail/cmps/SideBar.jsx
const { useEffect, useState, useRef } = React
const { useNavigate } = ReactRouter

export function SideBar({ mails }) {
  const navigate = useNavigate()

  const inboxSpanRef = useRef(null)
  const starredSpanRef = useRef(null)
  const sentSpanRef = useRef(null)
  const draftSpanRef = useRef(null)
  const trashSpanRef = useRef(null)

  const importantSpanRef = useRef(null)
  const todoSpanRef = useRef(null)
  const marketingSpanRef = useRef(null)

  useEffect(() => {
    loadReffs(mails)
  }, [mails])

  function loadReffs(mails) {
    let inboxCount = 0
    let starredCount = 0
    let sentCount = 0
    let draftCount = 0
    let trashCount = 0

    let importantCount = 0
    let todoCount = 0
    let marketingCount = 0

    // Iterate through mails to calculate counts
    mails.forEach((mail) => {
      if (mail.removedAt) {
        trashCount += 1
      } else if (mail.sentAt) {
        sentCount += 1
      } else {
        inboxCount += 1
      }

      if (mail.isStarred) {
        starredCount += 1
      }

      if (mail.labels && mail.labels.includes('important')) {
        importantCount += 1
      }
      if (mail.labels && mail.labels.includes('todo')) {
        todoCount += 1
      }
      if (mail.labels && mail.labels.includes('marketing')) {
        marketingCount += 1
      }
    })

    if (inboxSpanRef.current) inboxSpanRef.current.textContent = inboxCount
    if (starredSpanRef.current)
      starredSpanRef.current.textContent = starredCount
    if (sentSpanRef.current) sentSpanRef.current.textContent = sentCount
    if (draftSpanRef.current) draftSpanRef.current.textContent = draftCount
    if (trashSpanRef.current) trashSpanRef.current.textContent = trashCount

    if (importantSpanRef.current)
      importantSpanRef.current.textContent = importantCount
    if (todoSpanRef.current) todoSpanRef.current.textContent = todoCount
    if (marketingSpanRef.current)
      marketingSpanRef.current.textContent = marketingCount
  }

  return (
    <section className='side-bar sidebar'>
      <div className='side-bar-btn-container'>
        <button
          type='button'
          className='btn btn-compose'
          onClick={() => navigate(`/mail/edit`)}
        >
          Compose
        </button>
      </div>

      <div className='side-bar-folders-container'>
        <ul className='side-bar-folders-list'>
          <li className='folder folder-inbox'>
            <span>Inbox</span> <span ref={inboxSpanRef}></span>
          </li>
          <li className='folder folder-starred'>
            <span>Starred</span> <span ref={starredSpanRef}></span>
          </li>
          <li className='folder folder-sent'>
            <span>Sent</span> <span ref={sentSpanRef}></span>
          </li>
          <li className='folder folder-draft'>
            <span>Drafts</span> <span ref={draftSpanRef}></span>
          </li>
          <li className='folder folder-trash'>
            <span>Trash</span> <span ref={trashSpanRef}></span>
          </li>
        </ul>

        <div className='side-bar-labels-container'>
          <div className='side-bar-labels-header'>
            <span>Labels</span>
          </div>
          <ul className='side-bar-labels-list'>
            <li className='label label-importent'>
              <span>Important</span> <span ref={importantSpanRef}></span>
            </li>
            <li className='label label-todo'>
              <span>Todo</span> <span ref={todoSpanRef}></span>
            </li>
            <li className='label label-marketing'>
              <span>Marketing</span> <span ref={marketingSpanRef}></span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
