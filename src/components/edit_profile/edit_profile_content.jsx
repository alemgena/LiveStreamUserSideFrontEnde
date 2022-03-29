import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileSlice } from "../../slices/profile";
import { url } from "../../utils/url";
import profileIcon from "../../icons/profile.svg";
import { toast } from "react-toastify";

const EditProfileContent = () => {
  const dispatch = useDispatch();
  const isLoading = false;
  const userId=localStorage.getItem("user_id")
  const token=localStorage.getItem("token")
  const currentUser = useSelector((state) => state.login.userInformation);
 console.log(currentUser)
  const profileActions = profileSlice.actions;// FirstName: '',
  const { FirstName,MiddleName, LastName, phone } = useSelector(
    (state) => state.profile.inputValues
  );
  const[firstName,setFirstName]=useState('')
  const[middleName,setMiddleName]=useState('')
  const[lastName,setLastName]=useState('')
  const[phoneNumber,setPhone]=useState('')
const CurrentData=()=>{
  axios.get(`${url}user/getProfile/${userId}`,{
  headers: {
     "Authorization" : `Bearer ${token}`
   }
 }).then(response=>{
   console.log(response)
setFirstName(response.data.User.FirstName)
setMiddleName(response.data.User.MiddleName)
setLastName(response.data.User.LastName)
setPhone(response.data.User.usersAddress.phone)
 })
}
console.log(firstName)
  useEffect(() => {
    CurrentData();
  }, []);
  const validate = (e) => {
    
    e.preventDefault();
    saveChanges();
  };
  const saveChanges = () => {
    console.log("clla");
    dispatch(profileActions.setProfileUpdated(false));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
      },
    };
    
    // {
    //   firstName,
    //   lastName,
    //   phone,
    //   address,
    // }
    console.log(currentUser.userId)
    axios
      .put(`${url}user/editUser/${currentUser.userId}`,{
        FirstName:firstName,MiddleName:middleName,LastName:lastName,phone:phoneNumber
      },config )
      .then(
        (response) => {
          console.log(response);
          if (response.data.success) {
            dispatch(profileActions.setProfileUpdated(true));
            dispatch(profileActions.setShowEditProfile(false));
            document.body.style.overflow = "visible";

            toast("Your profile updated successfully", {
              position: "top-right",
              autoClose: 3500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const setDefaultValues = () => {
    console.log(currentUser.FirstName)
    console.log(currentUser.usersAddress.phone)
    console.log(currentUser.usersAddress.phone)
    dispatch(profileActions.setFirstName(currentUser.FirstName));
    dispatch(profileActions.setMiddleName(currentUser.MiddleName));
    dispatch(profileActions.setLastName(currentUser.LastName));
    dispatch(profileActions.setPhone(currentUser.usersAddress.phone));
  
  };
  return (
    <div className="edit-profile-content">
      <form onSubmit={validate}>
      
        <div className="form-grp">
          <label htmlFor="firstName">First Name</label>
          <input
            className="input"
            type="text"
            id="FirstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div className="form-error"></div>
        </div>
      
        <div className="form-grp">
          <label htmlFor="firstName">Middle Name</label>
          <input
            className="input"
            type="text"
            id="MiddleName"
            required
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          <div className="form-error"></div>
        </div>

        <div className="form-grp">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="input"
            type="text"
            id="LastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="form-error"></div>
        </div>

        <div className="form-grp">
          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            type="text"
            id="phone"
            required
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="form-error"></div>
        </div>

        <div className="form-grp">
          {" "}
          <div className="loading">{isLoading && <CircularProgress />}</div>
          <input type="submit" value="Save changes" className="btn btn-block" />
        </div>
      </form>
    </div>
  );
};

export default EditProfileContent;
