import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { toast } from 'react-toastify';
import ManageProductForm from "../../components/forms/ManageProductForm/ManageProductForm";
import * as apiClient from "../../api-client.js";

const ProductEditScreen = () => {
    const { id:productId } = useParams();

    const { data: product } = useGetProductDetailsQuery(productId);

    const { mutate, isLoading } = useMutation(apiClient.updateProductById, {
        onSuccess: () => {
            toast.success("Product updated successfully");
        },
        onError: () => {
            toast.error("Error updating product");
        }
    });

    const handleSave = async (productFormData) => {
        mutate(productFormData)
    }

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3"> Go Back</Link>
            <ManageProductForm onSave={handleSave} isLoading={isLoading} product={product} />
        </>
        
    )
}

export default ProductEditScreen;