import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from 'react-toastify';
import ManageProductForm from "../../components/forms/ManageProductForm/ManageProductForm.jsx";
import * as apiClient from "../../api-client.js";


const ProductCreateScreen = () => {
    const navigate = useNavigate();
    const { mutate, isLoading } = useMutation(apiClient.addProduct, {
        onSuccess: () => {
            toast.success("Product created successfully");
            navigate("/admin/productlist");
        },
        onError: () => {
            toast.error("Error creating product");
        }
    });

    const handleSave = async (productFormData) => {
        mutate(productFormData)
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <ManageProductForm onSave={handleSave} isLoading={isLoading}/>
        </>
        
    )
}

export default ProductCreateScreen;