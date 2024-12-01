// utils/api.ts

const BASE_URL = 'http://localhost:3020/product'; // Update with your backend URL

// Utility function to handle API requests
export const fetchFromApi = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// CREATE: Add a new product
export const createProduct = async (product: {
  productName: string;
  brand: string;
  price: number|string;
  stock: number|string;
}) => {
  console.log(product)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  };

  return fetchFromApi('addproducts', options);
};

// READ: Fetch all products
export const fetchProducts = async () => {
  return fetchFromApi('products');
};

// READ: Fetch a single product by ID
export const fetchProductById = async (id: string) => {
  return fetchFromApi(`getproduct/${id}`);
};

// UPDATE: Update a product by ID
export const updateProduct = async (id: string, updates: {
  name?: string;
  brand?: string;
  price?: number;
  stock?: number;
}) => {
  //console.log(updates)
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  };

  return fetchFromApi(`products/${id}`, options);
};

// DELETE: Delete a product by ID
export const deleteProduct = async (id: string) => {
  const options = {
    method: 'DELETE',
  };

  return fetchFromApi(`deleteproducts/${id}`, options);
};
