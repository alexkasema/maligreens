
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Product from '../../components/product/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';


const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});

  return (
    <>
        { isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
          <h1>Welcome to MaliGreens</h1>
          <h2>Latest Products</h2>
          <Row>
              {data.products.map(product => {
              return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                  </Col>
              )
              })}
          </Row>
          <Paginate
              pages={data.pages}
              page={data.page}
              isAdmin={false}
          />
          </>
        ) }
        
    </>
  )
}

export default HomeScreen