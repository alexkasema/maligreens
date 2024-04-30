import { useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { 
    useCreateProductMutation,
 } from "../../../slices/productsApiSlice";
import { toast } from 'react-toastify';
import FormContainer from "../../../components/FormContainer";
import DetailsSection from "./DetailsSection";
import ImagesSection from "./ImagesSection";
import Loader from "../../Loader";

const ManageProductForm = ({onSave, isLoading, product}) => {
    const formMethods = useForm();
    const { handleSubmit, reset} = formMethods;

    useEffect(() => {
        if(product) {
            reset(product);
        }
    }, [product, reset]);

    const onSubmit = handleSubmit((formDataJson) => {
        //! create new formData object and call our API
        const formData = new FormData();

        if (product) {
            formData.append("id", product._id);
        }

        formData.append("name", formDataJson.name);
        formData.append("price", formDataJson.price.toString());
        formData.append("phoneNumber", formDataJson.phoneNumber);
        formData.append("category", formDataJson.category);
        formData.append("countInStock", formDataJson.countInStock.toString());
        formData.append("description", formDataJson.description);

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
              formData.append(`imageUrls[${index}]`, url);
            });
          }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

        onSave(formData);

    });
  return (
    <FormProvider {...formMethods}>
        <FormContainer>
            <h1>Manage Product</h1>
            <Form onSubmit={onSubmit}>
                <DetailsSection />
                <ImagesSection />
                <Button 
                    type='submit' 
                    variant='primary'
                    disabled={isLoading}
                    className="disabled:text-muted"
                >{isLoading ? "saving..." : "Save"}
                </Button>
                {isLoading && <Loader />}
            </Form>
        </FormContainer>
    </FormProvider>
  )
}

export default ManageProductForm;