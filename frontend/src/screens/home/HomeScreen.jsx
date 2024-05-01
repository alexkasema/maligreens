
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import Product from '../../components/product/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import ProductCarousel from '../../components/ProductCarousel';


const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

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
          
          { !keyword ? (
            <Row>
              {/* <Col lg={4}></Col>
              <Col lg={4}></Col> */}
              <Col>
                <h3>Top products by Ratings</h3>
                <ProductCarousel/>
              </Col>
            </Row>
            
            ) : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>
          }
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
              keyword={keyword ? keyword : ''}
          />
          </>
        ) }
        
    </>
  )
}

export default HomeScreen