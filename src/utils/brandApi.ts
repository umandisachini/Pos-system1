// utils/api.ts
require('dotenv').config();
const BASE_URL = "http://localhost:3020/brand"; // Your base URL

// Utility function to handle API requests
export const fetchFromApi = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// CREATE: Add a new brand
export const createBrand = async (endpoint: string, brand: {
  brandName: string,
  brandAgentEmail: string,
  brandContact: number
}) => {
 // console.log('Starting request to:', `${BASE_URL}/${endpoint}`);
  //console.log('Brand data:', brand);
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(brand),
  });

  console.log('Response status:', response.status);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to add brand data');
  }

  return response.json();
};

// READ: Fetch all brands
export const fetchBrands = async () => {
  return fetchFromApi('brands');
};

// READ: Fetch a single brand by ID
export const fetchBrandById = async (id: string) => {
  return fetchFromApi(`getbrand/${id}`);
};

// UPDATE: Update a brand by ID
export const updateBrand = async (id: string, updates: {
  brandName?: string;
  brandAgentEmail?: string;
  brandContact?: string;
}) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  };

  return fetchFromApi(`updatebrands/${id}`, options);
};

// DELETE: Delete a brand by ID
export const deleteBrand = async (id: string) => {
  const options = {
    method: 'DELETE',
  };

  return fetchFromApi(`deletebrands/${id}`, options);
};
