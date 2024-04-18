import { Navbar, Nav, Badge, Container} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/maligreens.png';

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <Navbar.Brand>
                    <img src={logo} alt="MaliGreens" style={{width: 40}}/>
                    Mali<span style={{color: 'green'}}>Greens</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <Nav.Link>
                            < FaShoppingCart/>
                            Cart
                        </Nav.Link>
                        <Nav.Link>
                            < FaUser/>
                            Sign In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        {/* <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
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
                        <LinkContainer to='/cart'>
                            <Nav.Link>< FaShoppingCart/>
                                Cart
                                <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                    0
                                </Badge>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link>< FaUser/>
                                Sign In
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> */}
    </header>
  )
}

export default Header;