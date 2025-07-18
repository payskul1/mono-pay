const API_BASE_URL = 'https://api.withmono.com';
// IMPORTANT: In a real application, this secret key MUST be handled on your backend.
// Exposing it in the frontend is a major security risk. This is for demonstration only.
// const SECRET_KEY = 'test_sk_b70y8f5d7cc04nj27fj1';
const SECRET_KEY = 'live_sk_aowc558p7xm9my7bf4oi';


/**
 * Creates a new customer or retrieves the ID if the customer already exists.
 * @param {object} customerDetails - Contains firstName, lastName, email, bvn, etc.
 * @returns {string} The customer ID.
 * @throws {Error} If the customer cannot be created or found.
 */
export const createOrGetCustomer = async (customerDetails) => {
    console.log('API Service: Attempting to create or get customer...');
    const payload = {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        email: customerDetails.email,
        address: customerDetails.address || "N/A",
        phone: customerDetails.phone,
        identity: {
            type: "bvn",
            number: customerDetails.bvn, // BVN is required by the API
        },
    };

    const response = await fetch(`${API_BASE_URL}/v2/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'mono-sec-key': SECRET_KEY,
        },
        body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
        console.log('API Service: New customer created.', result.data.id);
        return result.data.id;
    }

    // This is the CRUCIAL part for handling the existing customer error gracefully.
    if (result.status === 'failed' && result.message.toLowerCase().includes('customer already exists')) {
        const existingId = result.data?.existing_customer?.id;
        if (existingId) {
            console.log('API Service: Customer already exists. Using existing ID:', existingId);
            return existingId;
        }
    }

    // For any other error, throw it so the component can catch it.
    throw new Error(result.message || 'Failed to create customer profile.');
};


/**
 * Initiates a direct debit mandate.
 * @param {object} mandatePayload - The fully constructed payload for the mandate.
 * @returns {object} The mandate data from Mono, including the mono_url.
 * @throws {Error} If the mandate creation fails.
 */
export const initiateMandate = async (mandatePayload) => {
    console.log('API Service: Initiating mandate with payload:', mandatePayload);
    const response = await fetch(`${API_BASE_URL}/v2/payments/initiate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'mono-sec-key': SECRET_KEY,
        },
        body: JSON.stringify(mandatePayload),
    });

    const result = await response.json();

    if (response.ok) {
        console.log('API Service: Mandate initiated successfully.');
        return result.data;
    }

    // Mono's validation errors are often in a data array.
    const errorMessage = result.data?.[0]?.message || result.message || 'Mandate creation failed.';
    throw new Error(errorMessage);
};