import ApplicationComponent from '@/Components/ApplicationForm';
import Logout from '@/Components/Auth/LogoutForm'
// import { useParams } from 'next/navigation'

export default function Home(data) {
  // const params = useParams()
  // console.log(data)
  return (
    <>
      <div data-animation="default" className="navbar1_component w-nav" data-easing2="ease" fs-scrolldisable-element="smart-nav" data-easing="ease" data-collapse="medium" data-w-id="bc4dd01f-e09f-5b80-9394-0438067007e6" role="banner" data-duration="400">
          <div className="navbar1_container">
            <a href={`${process.env.contest_website_url}`} className="navbar1_logo-link w-nav-brand">
              <img src="images/4cbc70d295848f729f74d97122288466.jpeg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 1279px) 100px, 160px" srcSet="images/4cbc70d295848f729f74d97122288466-p-500.jpeg 500w, images/4cbc70d295848f729f74d97122288466-p-800.jpeg 800w, images/4cbc70d295848f729f74d97122288466-p-1080.jpeg 1080w, images/4cbc70d295848f729f74d97122288466-p-1600.jpeg 1600w, images/4cbc70d295848f729f74d97122288466-p-2000.jpeg 2000w, images/4cbc70d295848f729f74d97122288466-p-2600.jpeg 2600w, images/4cbc70d295848f729f74d97122288466-p-3200.jpeg 3200w, images/4cbc70d295848f729f74d97122288466.jpeg 4096w" alt="" className="navbar1_logo"/>
            </a>
            <div className="navbar-extra">
              <div className="language-and-social">
                <div className="language-switch">
                  <a href="/" className="navbar1_link change-padding w-nav-link">PL</a>
                  <div>
                    <p>/</p>
                  </div>
                  <a href="/en" className="navbar1_link change-padding w-nav-link">EN</a>
                  <div>
                    <p>/</p>
                  </div>
                  <a href="/de" className="navbar1_link change-padding w-nav-link">DE</a>
                </div>
                <div className="social-media">
                  <a href="#" className="footer3_social-link w-inline-block">
                    <div className="icon-embed-xsmall w-embed">
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z" fill="CurrentColor"></path>
                      </svg>
                    </div>
                  </a>
                  <a href="#" className="footer3_social-link w-inline-block">
                    <div className="icon-embed-xsmall w-embed">
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z" fill="CurrentColor"></path>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
              <nav role="navigation" className="navbar1_menu is-page-height-tablet w-nav-menu">
                <a href={`${process.env.contest_website_url}#do-uczestnikow`} className="navbar1_link w-nav-link">Dla uczestników</a>
                <a href={`${process.env.contest_website_url}#o-nas`} className="navbar1_link w-nav-link">O nas</a>
                <a href={`${process.env.contest_website_url}#aktualnosci`} className="navbar1_link w-nav-link">Aktualności</a>
                <a href={`${process.env.contest_website_url}`} className="navbar1_link w-nav-link">Regulamin</a>
                <a href="/" className="navbar1_link w-nav-link">Formularz zgłoszeniowy</a>
                <a href={`${process.env.contest_website_url}#jury`} className="navbar1_link w-nav-link">Jury</a>
                <a href={`${process.env.contest_website_url}#harmonogram`} className="navbar1_link w-nav-link">Harmonogram</a>
                <a href={`${process.env.contest_website_url}#sponsorzy-i-partnerzy`} className="navbar1_link w-nav-link">Partnerzy i sponsorzy</a>
                <Logout/>
              </nav>
            </div>
            <div className="navbar1_menu-button w-nav-button">
              <div className="menu-icon1">
                <div className="menu-icon1_line-top"></div>
                <div className="menu-icon1_line-middle">
                  <div className="menu-icon_line-middle-inner"></div>
                </div>
                <div className="menu-icon1_line-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      <div className="container max-w-4xl mx-auto font-mono text-white py-44">
          <div className="mb-2 font-sans text-4xl font-semibold text-center">
            <h2>Formularz zgłoszeniowy</h2>
          </div>
          <div className="mb-12 font-mono text-center">
            <p>Przed wypełnieniem formularza zapoznaj się z regulaminem konkursu</p>
          </div>
          <ApplicationComponent/>
      </div>
      <footer className="footer3_component">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-vertical padding-xxlarge">
              <div className="padding-bottom padding-xxlarge">
                <div className="w-layout-grid footer3_top-wrapper">
                  <div className="footer3_left-wrapper">
                    <div className="margin-bottom margin-medium">
                      <a href="#" className="footer3_logo-link w-nav-brand"><img src="/site/templates/images/company-logo.svg" loading="lazy" alt="" /></a>
                    </div>
                    <div className="margin-bottom margin-medium">
                      <div className="footer3_details-wrapper">
                        <div className="margin-bottom margin-small">
                          <div className="text-size-small">Fundacja Rozwoju Kultury<br />im. Konstantego Ryszarda Domagały "Lira"<br /><br />Adres<br />ul. Jana Pawła II 23, 05-300 Mińsk Mazowiecki</div>
                        </div>
                        <div className="margin-bottom margin-tiny">
                          <div className="text-size-small text-weight-semibold">Kontakt</div>
                        </div>
                        <div className="text-size-small">
                          <a href="#">+48 660 410 236<br />konkursgwim@gmail.com</a>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid footer3_social-list">
                      <a href="#" className="footer3_social-link w-inline-block">
                        <div className="icon-embed-xsmall w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z" fill="CurrentColor" />
                          </svg></div>
                      </a>
                      <a href="#" className="footer3_social-link w-inline-block">
                        <div className="icon-embed-xsmall w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z" fill="CurrentColor" />
                          </svg></div>
                      </a>
                      <a href="#" className="footer3_social-link w-inline-block">
                        <div className="icon-embed-xsmall w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.5686 4.77345C21.5163 5.02692 22.2555 5.76903 22.5118 6.71673C23.1821 9.42042 23.1385 14.5321 22.5259 17.278C22.2724 18.2257 21.5303 18.965 20.5826 19.2213C17.9071 19.8831 5.92356 19.8015 3.40294 19.2213C2.45524 18.9678 1.71595 18.2257 1.45966 17.278C0.827391 14.7011 0.871044 9.25144 1.44558 6.73081C1.69905 5.78311 2.44116 5.04382 3.38886 4.78753C6.96561 4.0412 19.2956 4.282 20.5686 4.77345ZM9.86682 8.70227L15.6122 11.9974L9.86682 15.2925V8.70227Z" fill="CurrentColor" />
                          </svg></div>
                      </a>
                    </div>
                  </div>
                  <div className="w-layout-grid footer3_menu-wrapper"><div className="footer3_link-list"></div></div>
                </div>
              </div>
              <div className="line-divider" />
              <div className="padding-top padding-medium">
                <div className="footer3_bottom-wrapper"><div className="footer3_credit-text">© 2023 All rights reserved.</div><div className="footer4_credit-text" style={{display: 'flex', alignItems: 'center', color: 'white', fontSize: '14px'}}>Projekt i realizacja <a style={{marginLeft: '10px', color: 'white', fontSize: '14px', textDecoration: 'none'}} href="https://eleveen.pl" target="_blank"><img width={30} height={30} style={{marginRight: '10px', filter: 'invert(1)'}} src="./images/cropped-eleveen-01-32x32.png" alt="eleveen.pl" />eleveen.pl</a></div><div className="w-layout-grid footer3_legal-list"><a href="/regulamin/" className="footer3_legal-link">Regulamin</a></div></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
