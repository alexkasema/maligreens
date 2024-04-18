import { Row, Col } from 'react-bootstrap';
import Product from '../../components/product/Product';
import products from '../../products';

const HomeScreen = () => {
  return (
    <>
        <h1>Welcome to MaliGreens</h1>
        <h2>Latest Products</h2>
        <Row>
            {products.map(product => {
            return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            )
            })}
        </Row>
    </>
  )
}

export default HomeScreen