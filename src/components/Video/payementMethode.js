import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutSteps from './VideoUploadStep/ChekoutStep';

const PayementMethode = (props) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push('/upgreadAccount');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className='for' onSubmit={submitHandler}>
        <div>
          <h1 style={{ color: 'brown' }}>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type='radio'
              id='paypal'
              value='PayPal'
              name='paymentMethod'
              style={{ color: 'brown' }}
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label style={{ color: 'brown' }} htmlFor='paypal'>
              PayPal
            </label>
          </div>
        </div>
        <div>
          <div>
            <input
              type='radio'
              id='stripe'
              value='Stripe'
              name='paymentMethod'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor='stripe'>Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <input type='submit' className='btCart' value='Continue '></input>
        </div>
      </form>
      
    </div>
  );
};

export default PayementMethode;
/*

 <div style={{ height: '400px' }} className="home-carousel">
            <Carousel>
              <Carousel.Item className="carousel-item">
                <img
                  className="d-block w-100"
                  //      src={`${img_300}${content11.poster_path}`}
                  src={`${img_300}${content2.poster_path}`}
                />
                <Carousel.Caption>
                  <p>{content2.original_title}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`${img_300}${content4.poster_path}`}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <p>{content4.original_title}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`${img_300}${content5.poster_path}`}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <p>{content5.original_title}</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`${img_300}${content3.poster_path}`}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <p>{content3.overview}</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <Row>
            {videos.map((video, index) => (
              <Col key={video.video_id} xs={5} sm={4} md={4} xl={2}>
                <Link
                  to={`/video/${video.video_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="images">
                    <img
                      alt="hello"
                      src={`${url}/images/${video.thumbnialFileName}`}
                    ></img>
                  </div>
                  <div style={{ textAlign: 'center' }} className="text-team">
                    {video.video_title.Title}
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
*/