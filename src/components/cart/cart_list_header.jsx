import { Col, Row } from "react-bootstrap";

const CartListHeader = () => {

   return <div className="cart-list-header">
        <Row>
            <Col lg={6}>
              Video Categorey
            </Col>
            <Col lg={2}>
              Price
            </Col>
            <Col lg={2}>
              Quantity
            </Col>
            <Col lg={2} style={{textAlign:'right'}}>
              Total
            </Col>
        </Row>
       
    </div>

}
export default CartListHeader;