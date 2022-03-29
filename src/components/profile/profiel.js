import profileIcon from '../../icons/profile.svg'
import React, { useState } from 'react'
import Favoriet from './newFavoriet'
import InfoPaper from './infoPaper'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FavorietData from './neweFavorietList'
import VideoList from './VideoList'
import {
  faEnvelope,
  faPhone,
  faMapMarkedAlt,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { url } from '../../utils/url'
import { config } from '../../utils/header'
//import { config } from '../../utils/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useHistory } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import { loginSlice } from '../../slices/login'
import { profileSlice } from '../../slices/profile'
import './favorietList.scss'
let phone, email
const Profile = () => {
  const dispatch = useDispatch()
  const profileActions = profileSlice.actions
  const history = useHistory()
  //const usersAddress= user.usersAddress
  //console.log(usersAddress)
  const [userInfo, setUserInfo] = useState('')
  const loginActions = loginSlice.actions

  useEffect(() => {
    let token = localStorage.getItem('token')
    console.log(token)
    let userId = localStorage.getItem('user_id')
    console.log(userId)
   
  
    axios
      .get(`${url}user/getProfile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          if (response.data.msg === 'Token is not valid') {
            history.push('/login')
            localStorage.clear()
            toast.info('token is expired! ', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else {
            setUserInfo(response.data.User)
            dispatch(loginActions.setUserInformation(response.data.User))
            localStorage.setItem('userInfo', JSON.stringify(response.data.User))
            localStorage.setItem(
              'loginInfo',
              JSON.stringify(response.data.User),
            )
            dispatch(loginActions.setLoggedUser(response.data.User))
          }
        },
        (error) => {
          console.log(error)
          dispatch(loginActions.setIsLoading(false))
        },
      )
    getGetAllSubscrieb()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(userInfo)
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} size="lg" />
  const phoneIcon = <FontAwesomeIcon icon={faPhone} size="lg" />
  const addressIcon = <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />

  const showEditProfileModal = () => {
    dispatch(profileActions.setShowEditProfile(true))
    document.body.style.overflow = 'hidden'
  }
  const showChangePasswordModal = () => {
    dispatch(profileActions.setShowChangePassword(true))
    document.body.style.overflow = 'hidden'
  }
  const userId = localStorage.getItem('user_id')
  const [countSub, setCountSub] = React.useState([])
  const getGetAllSubscrieb = () => {
    axios.get(`${url}user/getAllUserSubscriebe/${userId}`).then((response) => {
      console.log(response)
      setCountSub(response.data.subscrieb)
    })
  }

  // console.log(user.usersAddress.phone)
  return (
    <div>
      {!localStorage.getItem('user_id') || !localStorage.getItem('token') ? (
        (history.push('/login'),
        toast.info('Log to  creat livestream! ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }))
      ) : (
        <div className="profile">
          <div className="image">
            <img src={profileIcon} alt="" />
          </div>
          <div className="name">
            {userInfo.FirstName} {userInfo.MiddleName} {userInfo.LastName}
          </div>
          {countSub.length > 0 ? (
            <div className="subscriebe">{countSub.length} </div>
          ) : (
            <div className="subscriebe">No Subscriebers</div>
          )}
          <div className="edit-profile">
            {' '}
            <div className="profile-btn" onClick={showEditProfileModal}>
              Edit Profile
            </div>
            <div
              className="profile-btn"
              style={{ marginRight: '40px' }}
              onClick={showChangePasswordModal}
            >
              Change Password
            </div>
          </div>
          <div className="name"> Favorite List</div>
              <div className='videoLIst'>
              <FavorietData />
          </div>
          <div className="name">Video List</div>
          <div className='videoLIst'>
                <VideoList />
          </div>
      
        </div>
      )}
    </div>
  )
}
export default Profile
