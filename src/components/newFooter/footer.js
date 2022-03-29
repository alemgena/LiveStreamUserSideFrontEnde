/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'

import { Col, Row } from 'react-bootstrap'
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com'
import FacebookIcon from '@mui/icons-material/Facebook'
const Footer = () => {
  const facebookIcon = <FontAwesomeIcon icon={faFacebook} />
  const twitterIcon = <FontAwesomeIcon icon={faTwitter} size={'lg'} />
  const linkedinIcon = <FontAwesomeIcon icon={faLinkedin} size={'lg'} />
  const instagtamIcon = <FontAwesomeIcon icon={faInstagram} size={'lg'} />
  function sendEmail(e) {
    e.preventDefault()
    //service_w80ab9q
    emailjs
      .sendForm(
        'service_w80ab9q',
        'templet_6ex44ra',
        e.target,
        'user_ZPjDA3m7JnaT440Pbyq9k',
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        },
      )
    e.target.reset()
  }
  return (
    <div className="footer">
      <Row>
        <Col>
          <div className="col-inner">
            <div className="content">
                <div>Our Address</div>
              <div className="footer-item">Contact@rcndc.com</div>
              <div className="footer-item">+251 925 002 580</div>
              <div className="footer-item">Addis Ababa, Ethiopia</div>
            </div>
          </div>
          <div className="col-inner">
            <div>Connect with us</div>
            <div className="content">
              <div className="social-icons" style={{ display: 'flex' }}>
                <a href="#" target="_blank" style={{ color: 'black' }}>
                  <div className="icon-item">
                    <div className="icon">{facebookIcon}</div>
                  </div>
                </a>
                <a href="#" target="_blank" style={{ color: 'black' }}>
                  <div className="icon-item">
                    <div className="icon">{twitterIcon}</div>
                  </div>
                </a>

                <a href="#" target="_blank" style={{ color: 'black' }}>
                  <div className="icon-item">
                    <div className="icon">{instagtamIcon}</div>
                  </div>
                </a>

                <a href="#" target="_blank" style={{ color: 'black' }}>
                  <div className="icon-item">
                    <div className="icon">{linkedinIcon}</div>
                  </div>
                </a>

                <a href="#" target="_blank" style={{ color: 'black' }}>
                  {' '}
                  <div className="icon-item"></div>
                </a>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="col-inner">
            <div className="content">
              <Link
                to="/about_us"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="footer-link">About Ethio Live</div>
              </Link>
              <Link
                to="/privacypolicy"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="footer-link">Privacy Policy</div>
              </Link>

              <Link
                to="/termsandconditions"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="footer-link">Terms and Conditions</div>
              </Link>
              <Link
                to="/pricing"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="footer-link">Pricing</div>
              </Link>

              <Link
                to="/advertise"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="footer-link">Advertise</div>
              </Link>

              <Link
                to="/faq"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <div className="footer-link">FAQ</div>
              </Link>

              {/* <div className="footer-link">Privacy Policy</div>
              <div className="footer-link">Delivery and Return Pollicy</div>
              <div className="footer-link">Terms and Conditions</div>
              <div className="footer-link">Pricing</div>
              <div className="footer-link">FAQ</div> */}
            </div>
          </div>
        </Col>

        <Col>
          <div className="col-inner">
            <div className="">Contact us</div>
            <form onSubmit={sendEmail} method="post">
              <div>
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="abox"
                  aria-describedby="emailHelp"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject:</label>
                <input type="text" className="abox" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="abox" cols="23" rows="2" />
              </div>

              <div>
                <button type="submit" className="subbtn" value="send message">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            className="all-right"
            style={{ display: 'flex', textAlign: 'center', color: 'white' }}
          >
            &copy;2021 Ethio Live . All rights reserved.
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
