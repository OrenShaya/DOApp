const { useNavigate } = ReactRouterDOM

export function Home() {
  const navigate = useNavigate()

  return (
    <section className='home'>
      <div className='home-header'>
        <span>DO App</span>
      </div>
      <div className='welcome-message'>
        <p>
          Welcome to DO app where we DO it differently with Dor & Oren <br />{' '}
          Check out our mail app and notes app
        </p>
      </div>
      <div className='navigation-btns'>
        <button
          type='button'
          className='home-nav-btn'
          onClick={() => navigate('/mail/')}
        >
          Mail
        </button>
        <button
          type='button'
          className='home-nav-btn'
          onClick={() => navigate('/note/')}
        >
          Note
        </button>
      </div>
    </section>
  )
}
