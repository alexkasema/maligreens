import { LinkContainer } from 'react-router-bootstrap';
import { Col, Row, Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { 
    useGetProductsQuery, 
} from '../../slices/productsApiSlice';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

const ProductListScreen = () => {

    const { data:products, isLoading, error, refetch } = useGetProductsQuery();

    const deleteHandler = async (id) => {
        if (window.confirm(`Are you sure you want to delete this product?`)) {
            try {
                console.log('Delete Product, id: ' + id);
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3'>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>

            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message}</Message> : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>Contact</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { products.map((product) => (
                                <tr key={product._id}>
                                    <td> {product._id} </td>
                                    <td> {product.name} </td>
                                    <td> ${product.price} </td>
                                    <td> {product.category} </td>
                                    <td> {product.phoneNumber} </td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={ () => deleteHandler(product._id) }
                                            >
                                                <FaTrash style={{color: 'white'}}/>
                                            </Button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default ProductListScreen;