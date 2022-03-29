import axios from 'axios';
import { url } from '../../utils/url';
import { useEffect, useState } from 'react';
import { faTrashAlt, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
const FavorieteIteam = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.login.loggedUser);
  console.log(user.id);
  const removeIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  useEffect(() => {
    getAllDatas();
  }, []);
  const getAllDatas = () => {
    axios.get(`${url}user/getFavorietList/${user.id}`).then((response) => {
      console.log(response.data);
      setData(response.data.data);
    });
  };
  console.log(data);
  return (
    <div>
      {data.length &&
      <div>

{data.map((iteam, index) => {
        return (
          <Row>
            <Col lg={6}>
              {}
              <div className='product'>
                {iteam.thumbnialFileName ? (
                  <img
                    className='img-fluid'
                    src={`${url}images/${iteam.thumbnialFileName}`}
                    alt='hello'
                  />
                ) : (
                  <Skeleton height='150px' />
                )}
                <div className='product-left'>
                  <div className='product-title'>categore</div>
                  <div
                    className='remove icon'
                    /*  onClick={() => {
                        removeCartItem(cartItem.videos.video_id);
                      }}*/
                  >
                    {removeIcon}
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className='price'>{' birr'}</div>
            </Col>
            <Col></Col>
            <Col>
              <div className='total'> birr</div>
            </Col>
          </Row>
        );
      })}
      </div>
      }
    </div>
  );
};
export default FavorieteIteam;
