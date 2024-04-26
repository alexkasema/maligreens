import { Navbar, Nav, NavDropdown, Container, Badge} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import logo from '../../assets/maligreens.png';
import SearchBox from '../SearchBox';
import { toast } from 'react-toastify';

const Header = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [ logoutApiCall ] = useLogoutMutation();

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout()); // clearing localStorage
            dispatch(resetCart());
            toast.success('Logout successful');
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <header>       
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt="MaliGreens" style={{width: 40}}/>
                        MaliGreens
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <SearchBox />
                        <LinkContainer to='/cart'>
                            <Nav.Link>< FaShoppingCart/>
                                Cart
                                {cartItems.length > 0 && (
                                    <Badge bg='success' pill style={{marginLeft: '5px'}}>
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </LinkContainer>
                        { userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                            <Nav.Link>< FaUser/> Sign In</Nav.Link>
                        </LinkContainer>
                        ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header;