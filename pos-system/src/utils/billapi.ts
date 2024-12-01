const BASE_URL = 'http://localhost:3020/bill'; // Your base URL

export const fetchFromApi = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}


const createBill = async (bill: {
    billDate : Date,
    billTotal : Number,
    items:[{
        productID:String,
        unitPrice:Number,
        quantity:Number,
        total:Number
    }],
 }) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bill),
    };

    return fetchFromApi('createbills', options);
}

const fetchBillById = async (id: string) => {
    return fetchFromApi(`bill/${id}`);
}

const deleteBill = async (id: string) => {
    const options = {
        method: 'DELETE',
    };

    return fetchFromApi(`deletebills/${id}`, options);
};


export{
    createBill,
    fetchBillById,
    deleteBill
}
