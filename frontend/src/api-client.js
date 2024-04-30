
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const addProduct = async (productFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      credentials: "include",
      body: productFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add product");
    } 
    return response.json();
  };

export const updateProductById = async (productFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${productFormData.get("id")}`,
    {
      method: "PUT",
      credentials: "include",
      body: productFormData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Product");
  }

  return response.json();
};