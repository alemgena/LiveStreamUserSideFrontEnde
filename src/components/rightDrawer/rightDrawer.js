import { useDispatch, useSelector } from 'react-redux';
import Dimmer from './dimmer';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './heder';
import DrawerContent from './drawer_context';
import { useMediaQuery } from 'react-responsive';
const RightDrawer = () => {
  const { test } = useSelector((state) => state.rightDrawer);
  const closeIcon = <FontAwesomeIcon icon={faTimes} />;
  const type = useSelector((state) => state.rightDrawer.type);
  const mobileView = useMediaQuery({ query: '(max-width: 576px)' });
  let rightDrawerClasses = 'right-drawer ';
  if (mobileView) rightDrawerClasses += ' right-drawer-mobile ';
  if (type === 'reviews') rightDrawerClasses += ' right-drawer-reviews ';
  return (
    <>
      <Dimmer />
      <div className={rightDrawerClasses}>
        <Header />
        <DrawerContent />
      </div>
    </>
  );
};
export default RightDrawer;
