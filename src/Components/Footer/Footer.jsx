import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import '../Footer/MyFooter.css'

const Footer = () => {
  const actualTheme = useSelector(state => state.theme.theme)
  return (
    <div className={actualTheme ? '' : 'text-light'}>
      <MDBFooter bgColor={actualTheme ? 'light' : 'dark-footer'} className={` ${actualTheme ? '' : 'dark-footer'}`}>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block margin-left-right'>
            <span>Connect with me:</span>
          </div>

          <div className='margin-left-right'>
            <a href='https://www.instagram.com/angelo_b2b/' target='_blank' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='instagram' />
            </a>
            <a href='https://www.linkedin.com/in/angelo-belardo-228809b8/' target='_blank' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='linkedin' />
            </a>
            <a href='https://github.com/Angelb2b' target='_blank' className='me-4 text-reset'>
              <MDBIcon color='secondary' fab icon='github' />
            </a>
          </div>
        </section>

        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3 justify-content-center'> {/* Modifica qui */}
              <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4 text-center'> {/* Modifica qui */}
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon color='secondary' icon='gem' className='me-3' />
                  AngelB2B
                </h6>
                <p>
                  Si tratta di un piccolo sito in cui mostro qualche mio lavoretto,
                  ogni commento costruttivo è ben voluto.
                </p>
                <p>
                  STAY TUNED!
                </p>
              </MDBCol>
              <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4 text-center'> {/* Modifica qui */}
                <h6 className='text-uppercase fw-bold mb-4'>Contacts</h6>
                <p>
                  <MDBIcon color='secondary' icon='home' className='me-2' />
                  Via Alcide De Gasperi - Povegliano Veronese 37064 - VR - Italia
                </p>
                <p>
                  <MDBIcon color='secondary' icon='envelope' className='me-3' />
                  belardo.ang@gmail.com
                </p>
                <p>
                  <MDBIcon color='secondary' icon='phone' className='me-3' /> + 39 348 1092183
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2023 Copyright by Belardo Angelo
        </div>
      </MDBFooter>
    </div>
  )
}

export default Footer
