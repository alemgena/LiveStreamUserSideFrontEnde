/* eslint-disable no-lone-blocks */
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss'
import LiveChannels from './components/liveChannel/liveChannels'
import Header from './components/Header/Heder'
import Cart from './components/cart/cart'
import RightDrawer from './components/rightDrawer/rightDrawer'
import Verfiey from './components/verify/verify'
import Player from './components/Video/videoPlayer'
import videoHome from './components/Video/videoHome'
import FavorietList from './components/favorieteList/favorite'
import BottomNav from './components/bottomMainBar/bootomNavBar'
import Movies from './Pages/Movies/MoviesVideo'
import Series from './Pages/Series/SeriesVideo'
import videoUpload from './components/Video/uploadVideo/uploadVideoNew'
import { useSelector } from 'react-redux'
import Trending from './Pages/Trending/TreadingVideo'
import Search from './Pages/Search/Search'
import { Container } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditProfileModal from './components/edit_profile/edit_profile_modal'
import Profile from './components/profile/profiel'
import ChangePassword from './components/profile/change_password'
import RecoverPasswordModal from './components/recover_password/recover_modal'
import PasswordRecovered from './components/Message/passwordRecover'
import RegistrationSuccess from './components/Message/registerScusses'
import Loginn from './components/SignInSignupScreen/Login'
import Register from './components/SignInSignupScreen/Register'
import videoFromMe from './components/Video/PremiumIncormatino'

import LandingPage from './components/Video/LandingPage'
import LiveChannelDetail from './components/liveChannel/liveChannelDetail'
import PremiumInformation from './components/Video/VideoUploadStep/PremiumInformation'
import payemnet from './components/Video/payementMethode'
import UpgreadAccount from './components/Video/AccountUpgread'
import Auth from './components/auth/Auth'
import Login from './components/rightDrawer/login'
import CreateLiveEvent from './components/videoLiveStream/CreateLiveEvent'

import LiveEvent from './components/videoLiveStream/LiveEventOriginal'
import JoinLiveEvent from './components/videoLiveStream/JoinLiveEvent'
import JoinCreateEvent from './components/videoLiveStream/JoinCreateEvent'
import Footer from './components/newFooter/footer'
import Category from './components/category/category'
import MoviesPlayer from './components/ContentModal/player'
import React from 'react'
import PageNotFound from './components/utils/page_not_found'
import liveChannels from './components/liveChannel/liveChannels'
import AboutPage from './components/newFooter/about'
import PrivacyPolicy from './components/newFooter/privacy_policy'
import TermsAndCOnditions from "./components/newFooter/trems_and_condition"
import Pricing from "./components/newFooter/pricing"
import Advertising from './components/newFooter/advertising'
import Faq from './components/newFooter/faq'
import Contact_Us from './components/newFooter/contact_us'
function App() {
  const showRightDrawer = useSelector((state) => state.rightDrawer.isOpen)
  const showRecoverPassword = useSelector(
    (state) => state.recoverPassword.isOpen,
  )
   
  const passwordRecovered = useSelector(
    (state) => state.recoverPassword.passwordRecovered,
  )
  const showEditProfile = useSelector((state) => state.profile.showEdietProfile)
  const registrationSuccessful = useSelector(
    (state) => state.register.registrationSuccessful,
  )
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  const showChangePassword = useSelector(
    (state) => state.profile.showChangePassword,
  )

  return (
    <div className="app">
      <ToastContainer />
      <BrowserRouter>
        {showRightDrawer && <RightDrawer />}
        {registrationSuccessful && <RegistrationSuccess />}
        {passwordRecovered && <PasswordRecovered />}
        {showRecoverPassword && <RecoverPasswordModal />}
        {showChangePassword && <ChangePassword />}
        {showEditProfile && <EditProfileModal />}
           {md && <BottomNav />}
        <Header />
        {/*isLoggedUser && user.role === 'admin' && <AdminPage />*/}

        <main>
          <Switch>
             <Route path="/" exact component={LandingPage} ></Route> 
            <Route path="/contact_us" component={Contact_Us}></Route>
            <Route path="/faq" component={Faq}></Route>
            <Route path="/advertise" component={Advertising}></Route>
            <Route path ="/pricing" component={Pricing}></Route>
            <Route path="/termsandconditions" component={TermsAndCOnditions}></Route>
            <Route path="/privacypolicy" component={PrivacyPolicy}></Route>
            <Route path="/about_us" component={AboutPage}></Route>
            <Route path="/liveChannels"  component={liveChannels}></Route>
            <Route path="/playerMovies/:video" component={MoviesPlayer}></Route>
            <Route path="/categorie/:Name" component={Category}></Route>
            <Route path="/Trending" component={Trending}></Route>
            <Route path="/favorietList" component={FavorietList}></Route>
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route path="/verify" component={Verfiey} />
            <Route path="/creatLiveEvent" component={CreateLiveEvent}></Route>
     
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Loginn}></Route>
            <Route
              path="/joinEveneniet/:username/:eventname/:producer/:privilege"
              component={JoinCreateEvent}
            ></Route>
            <Route path="/socialoauth" component={Auth}></Route>
            <Route path="/payment" component={payemnet}></Route>
            <Route path="/joinEvent" component={JoinLiveEvent}></Route>
            <Route path="/viedeoHome/:video_id" component={videoHome}></Route>
            <Route path="/video/:video_id" component={Player}></Route>
            <Route path ="/single-channel/:name" component={LiveChannelDetail}></Route>
            <Route path="/uploadVideo" component={videoUpload}></Route>
            <Route path="/videoPlayeForMe" component={videoFromMe}></Route>
            <Route path="/liveEvent" component={LiveEvent}></Route>
            <Route
              path="permiumInformation"
              component={PremiumInformation}
            ></Route>
       
            <Route path="/cart" component={Cart}></Route>
            <Route path="/upgreadAccount" component={UpgreadAccount}></Route>
            <Route path="/uploadVideo" component={videoUpload} />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </main>
  
           {md ? <div className="py-5"></div> :<Footer />
        }
      </BrowserRouter>
    </div>
  )
}
export default App
