export function About() {
  return (
    <section className='about'>
      <div className='about-section-header'>
        <h1>About Page</h1>
        <h2>Our Team</h2>
      </div>
      <div className='about-container'>
        <article className='team-profile'>
          <div className='profile-image-container'>
            <img
              src='./assets/img/profile/dor-profile-pic.jpeg'
              alt='dor-profile-pic'
            />
          </div>
          <div className='profile-about-me'>
            <h3>Dor Josef</h3>
            <p>
              Hi, I'm Dor, a Full-Stack developer with a passion for creating
              sleek, responsive web apps using React and MVC architecture. I
              follow a mobile-first approach to CSS and have a sharp eye for
              quality, ensuring every project is clean, efficient, and
              user-friendly. Also I have a B.Sc for Food and Biotechnology
              engineering and experiance with more programming languages
            </p>
          </div>
        </article>
        <article className='team-profile'>
          <div className='profile-image-container'>
            <img
              src='./assets/img/profile/oren-profile-pic.jpeg'
              alt='oren-profile-pic'
            />
          </div>
          <div className='profile-about-me'>
            <h3>Oren Shaya</h3>
            <p>
              Hi, I'm Oren, a Full-Stack developer with motivation for making
              great ideas come to life espcially on web. I'm fully equipped with
              knowledge of JavaScript, React, HTML, CSS using the MVC
              architecture. I also hold a Bachlore degree on Software
              Engineering and have knowledge on other programming languages.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
