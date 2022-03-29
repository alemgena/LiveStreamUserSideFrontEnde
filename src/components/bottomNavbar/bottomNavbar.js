import {
  faCoffee,
  faSearch,
  faUser,
  faShoppingCart,
  faHeart,
  facare,
} from '@fortawesome/free-solid-svg-icons';
import {SearchIcon} from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rightDrawerSlice } from '../../slices/rightDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
const BottomNav = (props) => {
  let history = useHistory();
  const searchIcon = <FontAwesomeIcon icon={faSearch} size="lg" />;
  const profileIcon = <FontAwesomeIcon icon={faUser} size='lg' />;
  const cartIcon = <FontAwesomeIcon icon={faShoppingCart} size='lg' />;
  const isUserLogged = useSelector((state) => state.login.isUserLogged);
  const actions = rightDrawerSlice.actions;
  const dispatch = useDispatch();
  const numberOfProductsInCart = useSelector(
    (state) => state.cart.cartItems.length
  );
  const showRightDrawer = (type) => {
    dispatch(actions.showDrawer());
    dispatch(actions.setType(type));
    document.body.style.overflow = 'hidden';
  };
  return (
    <div className='bottom-nav'>
       <div
        className="nav-item"
        onClick={() => {
          showRightDrawer("search");
        }}
      >
        {" "}
        <div className="icon">{searchIcon}</div>
        <div className="text">Search</div>
      </div>
      <div
        className='nav-item'
        onClick={() => {
          if (localStorage.getItem('user_id') || localStorage.getItem('token')) {
          history.push('/profile');
          } else {
            history.push('/login');
          }
        }}
      >
        {' '}
        <div className='icon'>{profileIcon}</div>
        <div className='text'>Profile</div>
      </div>
    </div>
  );
};
export default BottomNav;
