import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/headerFooter/Header';
import Footer from './components/headerFooter/Footer';

function App() {

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
      
    </>
  )
}

export default App
