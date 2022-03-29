import { Col, Row } from 'react-bootstrap';

const FavoriteHeader = () => {
  return (
    <div className='cart-list-header'>
      <Row>
        <Col lg={6}>Video Categorey</Col>
        <Col lg={2}>PriDescrieption</Col>
        <Col lg={2}>SubscrptionType</Col>
        <Col lg={2} style={{ textAlign: 'right' }}>
          Total
        </Col>
      </Row>
    </div>
  );
};
export default FavoriteHeader;
