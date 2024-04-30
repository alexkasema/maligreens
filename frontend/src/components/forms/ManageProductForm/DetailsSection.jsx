import { useFormContext } from "react-hook-form";
import { Form } from "react-bootstrap";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext();
  return (
    <>
        <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter name"
                {...register('name', { required: 'Name is required' })}
            >
            </Form.Control>
            {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
            )}
        </Form.Group>
        <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
                type="number"
                min={1}
                placeholder="Enter price"
                {...register('price', { required: 'Price is required' })}
            >
            </Form.Control>
            {errors.price && (
                <span className="text-danger">{errors.price.message}</span>
            )}
        </Form.Group>
        <Form.Group controlId="phoneNumber" className="my-2">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                {...register('phoneNumber', { required: 'Phone Number is required' })}
            >
            </Form.Control>
            {errors.phoneNumber && (
                <span className="text-danger">{errors.phoneNumber.message}</span>
            )}`
        </Form.Group>
        <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter category"
                {...register('category', { required: 'Category is required' })}
            >
            </Form.Control>
            {errors.category && (
                <span className="text-danger">{errors.category.message}</span>
            )}
        </Form.Group>
        <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
                type="number"
                min={0}
                placeholder="Enter count in stock"
                {...register('countInStock', { required: 'Count In Stock is required' })}
            >
            </Form.Control>
            {errors.countInStock && (
                <span className="text-danger">{errors.countInStock.message}</span>
            )}
        </Form.Group>
        <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                {...register('description', { required: 'Description is required' })}
            >
            </Form.Control>
            {errors.description && (
                <span className="text-danger">{errors.description.message}</span>
            )}
        </Form.Group>
    </>
  )
}

export default DetailsSection;