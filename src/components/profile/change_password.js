import Close from '@material-ui/icons/Close'
// import { productSlice } from "../../slices/product";
import { useDispatch, useSelector } from 'react-redux'
import Dimmer from '../utils/dimmer'
import { profileSlice } from '../../slices/profile'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { url } from '../../utils/url'
import { toast } from 'react-toastify'
const ChangePassword = () => {
  const xs = useMediaQuery({ query: '(max-width: 576px' })
  const sm = useMediaQuery({ query: '(min-width: 576px)' })
  const md = useMediaQuery({ query: '(min-width: 768px)' })
  const lg = useMediaQuery({ query: '(min-width: 992px)' })
  const xl = useMediaQuery({ query: '(min-width: 1200px)' })
  let width = 'inherit'

  if (xl) width = '40%'
  else if (lg) width = '50%'
  else if (md) width = '60%'
  else if (sm) width = '70%'
  else if (xs) width = '50%'

  const style = {
    width: width,
    maxHeight: '90%',
  }

  const user = useSelector((state) => state.login.userInformation)
  const email = user.usersAddress.email
  const [currentPassword, setPassword1] = useState('')
  const [newPassword, setPassword2] = useState('')
  const [password3, setPassword3] = useState('')
  const [password1Err, setPassword1Err] = useState('')
  const [password2Err, setPassword2Err] = useState('')
  const [password3Err, setPassword3Err] = useState('')

  const profileActions = profileSlice.actions
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(profileActions.setShowChangePassword(false))
    document.body.style.overflow = 'visible'
  }
  const changePassword = (e) => {
    e.preventDefault()
    setPassword1Err('')
    setPassword2Err('')
    setPassword3Err('')

    if (currentPassword.length < 6) {
      setPassword1Err('Current password should be atleast 6 characters !')
      return
    }

    if (newPassword.length < 8) {
      setPassword2Err('New Password should be atleast 8 characters !')
      return
    }

    if (password3.length < 8) {
      setPassword3Err('New Password should be atleast 8 characters !')
      return
    }

    if (newPassword !== password3) {
      setPassword3Err('Passwords should match !')
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
      },
    }
    console.log(email, currentPassword, newPassword)

    axios
      .post(
        `${url}recoverPassword/changePassword`,
        {
          email: email,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        config,
      )
      .then(
        (response) => {
          console.log(response)
          if (response.data.resualt === 'change password') {
            closeModal()
            toast('Password changed successfully ', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else if (response.data.resualt === 'Invalid credentials') {
            setPassword1Err('Incorrect password!')
          }
        },
        (error) => {
          console.log(error)
        },
      )
  }

  return (
    <>
      <Dimmer />
      <div className="change-password-modal" style={style}>
        <div
          style={{ color: 'brown' }}
          className="close-modal"
          onClick={closeModal}
        >
          <Close />
        </div>
        {/* <ProductDetails/> */}
        <div className="change-password-content">
          <form onSubmit={changePassword}>
            <div className="form-grp">
              <label htmlFor="password1">Current Password</label>
              <input
                className="input"
                type="password"
                id="password1"
                value={currentPassword}
                onChange={(e) => {
                  setPassword1(e.target.value)
                }}
              />
              <div className="form-error">{password1Err}</div>
            </div>

            <div className="form-grp">
              <label htmlFor="password2">New password</label>
              <input
                className="input"
                type="password"
                id="password2"
                value={newPassword}
                onChange={(e) => {
                  setPassword2(e.target.value)
                }}
              />
              <div className="form-error">{password2Err}</div>
            </div>
            <div className="form-grp">
              <label htmlFor="password3">Confirm new password</label>
              <input
                className="input"
                type="password"
                id="password3"
                value={password3}
                onChange={(e) => {
                  setPassword3(e.target.value)
                }}
              />
              <div className="form-error">{password3Err}</div>
            </div>

            <div className="form-grp">
              {' '}
              <div className="loading">{false && <CircularProgress />}</div>
              <input
                type="submit"
                value="Change password"
                className="btn btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
