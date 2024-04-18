import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  return (
    <Form className='d-flex'>
        <Form.Control
            className="mr-sm-2 ml-sm-5"
            type="text"
            placeholder="Search Products..."
            >
        </Form.Control>
        <Button
            type='button'
            variant='outline-success'
            className='p-2 mx-2'>
                Search
        </Button>
    </Form>
  )
}

export default SearchBox;