import { useFormContext } from "react-hook-form";
import { Form, Image } from "react-bootstrap";

const ImagesSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext();
    const existingImageUrls = watch("imageUrls");
    const handleDelete = (
        event,
        imageUrl
      ) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setValue(
                "imageUrls",
                existingImageUrls.filter((url) => url !== imageUrl)
            );
        }
        
    };
  return (
    <>
        { existingImageUrls && (
            <div className="my-4">
                <Form.Label>Existing Images</Form.Label>
                <div className="d-flex">
                    {existingImageUrls.map((imageUrl, index) => (
                        <div key={index} className="d-flex flex-column align-items-center">
                            <Image src={imageUrl} alt={`image-${index}`} fluid className="img-fluid mx-3" style={{maxHeight: "100px"}}/>
                            <Form.Check
                                type="radio"
                                label="Delete"
                                onChange={(event) => handleDelete(event, imageUrl)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ) }
        <Form.Group controlId="imageFiles" className="my-4">
            <Form.Label>Image</Form.Label>
            <Form.Control
            type="file"
            multiple
            accept="image/*"
            {...register('imageFiles', { 
                validate: (imageFiles) => {
                    const totalLength = imageFiles.length + (existingImageUrls?.length || 0) ;

                    if (totalLength === 0) {
                        return "At least one image should be added";
                    }

                    if (totalLength > 6) {
                        return "Total number of images cannot be more than 6";
                    }

                    return true;
                        } })}
            >
            </Form.Control>
            {errors.imageFiles && (
            <span className="text-danger text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </Form.Group>`
    </>
  )
}

export default ImagesSection;