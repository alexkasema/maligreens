import { Container } from 'react-bootstrap';
import Header from './components/headerFooter/Header';
import Footer from './components/headerFooter/Footer';
function App() {

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to MaliGreens</h1>
        </Container>
      </main>
      <Footer/>
      
    </>
  )
}

export default App
