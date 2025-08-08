const API_BASE_URL = 'https://api.withmono.com';
// const SECRET_KEY = 'test_sk_b70y8f5d7cc04nj27fj1';
// const SECRET_KEY = 'test_sk_rslkrmp9f62zvu6waj1c';   //1
const SECRET_KEY = 'live_sk_aowc558p7xm9my7bf4oi';


/**
 * Handles name correction for combined names or missing names
 * @param {object} existingData - Current customer data from API
 * @param {object} newData - New customer data
 * @returns {object} Object with corrected firstName and lastName
 */
const handleNameCorrection = (existingData, newData) => {
    let firstName = newData.firstName;
    let lastName = newData.lastName;
    
    // Check if existing first_name is a combined name (no spaces but contains multiple capital letters)
    if (existingData.first_name && existingData.first_name.trim() !== '') {
        const combinedNamePattern = /^[A-Z][a-z]+[A-Z][a-z]+.*$/;
        
        if (combinedNamePattern.test(existingData.first_name) && 
            (!existingData.last_name || existingData.last_name === 'undefined' || existingData.last_name.trim() === '')) {
            
            // Split the combined name using capital letters as delimiters
            const nameParts = existingData.first_name.split(/(?=[A-Z])/).filter(part => part.length > 0);
            
            if (nameParts.length >= 2) {
                firstName = nameParts[0];
                lastName = nameParts.slice(1).join('');
                console.log(`Split combined name "${existingData.first_name}" into firstName: "${firstName}", lastName: "${lastName}"`);
            }
        }
    }
    
    // Check if newData first_name is a combined name
    if (newData.firstName && newData.firstName.trim() !== '') {
        const combinedNamePattern = /^[A-Z][a-z]+[A-Z][a-z]+.*$/;
        
        if (combinedNamePattern.test(newData.firstName) && 
            (!newData.lastName || newData.lastName.trim() === '')) {
            
            // Split the combined name using capital letters as delimiters
            const nameParts = newData.firstName.split(/(?=[A-Z])/).filter(part => part.length > 0);
            
            if (nameParts.length >= 2) {
                firstName = nameParts[0];
                lastName = nameParts.slice(1).join('');
                console.log(`Split combined name "${newData.firstName}" into firstName: "${firstName}", lastName: "${lastName}"`);
            }
        }
    }
    
    return { firstName, lastName };
};

/**
 * Creates a new customer or retrieves and updates the existing customer if needed.
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
    
    // Try to create customer first
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

    // If customer was created successfully
    if (response.ok) {
        console.log('API Service: New customer created.', result.data.id);
        return result.data.id;
    }

    // If customer already exists, get the existing ID and check for updates needed
    if (result.message?.toLowerCase().includes('customer already exists')) {
        const existingId = result.data?.existing_customer?.id;
        if (existingId) {
            console.log('Customer already exists. Checking if update is needed:', existingId);
            
            // Fetch existing customer details
            const customerResponse = await fetch(`${API_BASE_URL}/v2/customers/${existingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'mono-sec-key': SECRET_KEY,
                }
            });
            
            if (!customerResponse.ok) {
                throw new Error('Failed to fetch existing customer details');
            }
            
            const existingCustomerData = await customerResponse.json();
            console.log('Existing customer data:', existingCustomerData.data);
            
            // Check if update is needed
            const needsUpdate = checkIfUpdateNeeded(existingCustomerData.data, customerDetails);
            
            if (needsUpdate.required) {
                console.log('Customer needs update. Updating fields:', needsUpdate.fieldsToUpdate);
                await updateCustomer(existingId, needsUpdate.updatePayload);
            }
            
            return existingId;
        }
    }

    throw new Error(result.message || 'Failed to create customer profile.');
};

/**
 * Checks if customer needs to be updated based on missing or undefined values
 * @param {object} existingData - Current customer data from API
 * @param {object} newData - New customer data to compare
 * @returns {object} Object with required flag and update payload
 */
const checkIfUpdateNeeded = (existingData, newData) => {
    const updatePayload = {};
    const fieldsToUpdate = [];
    
    // Handle combined names or missing names
    const { firstName: correctedFirstName, lastName: correctedLastName } = handleNameCorrection(existingData, newData);
    
    // Check first_name
    if (!existingData.first_name || existingData.first_name === 'undefined' || existingData.first_name.trim() === '' || 
        (correctedFirstName && correctedFirstName !== existingData.first_name)) {
        if (correctedFirstName && correctedFirstName.trim() !== '') {
            updatePayload.first_name = correctedFirstName;
            fieldsToUpdate.push('first_name');
        }
    }
    
    // Check last_name
    if (!existingData.last_name || existingData.last_name === 'undefined' || existingData.last_name.trim() === '' || 
        (correctedLastName && correctedLastName !== existingData.last_name)) {
        if (correctedLastName && correctedLastName.trim() !== '') {
            updatePayload.last_name = correctedLastName;
            fieldsToUpdate.push('last_name');
        }
    }
    
    // Check address
    if (!existingData.address || existingData.address === null) {
        if (newData.address && newData.address.trim() !== '') {
            updatePayload.address = newData.address;
            fieldsToUpdate.push('address');
        }
    }
    
    // Check phone (if it exists in the API response structure)
    if (!existingData.phone || existingData.phone === null || existingData.phone === 'undefined') {
        if (newData.phone && newData.phone.trim() !== '') {
            updatePayload.phone = newData.phone;
            fieldsToUpdate.push('phone');
        }
    }
    
    // Check BVN/identity
    if (!existingData.bvn || existingData.bvn === null) {
        if (newData.bvn && newData.bvn.trim() !== '') {
            updatePayload.identity = {
                type: "bvn",
                number: newData.bvn
            };
            fieldsToUpdate.push('identity');
        }
    }
    
    return {
        required: fieldsToUpdate.length > 0,
        fieldsToUpdate,
        updatePayload
    };
};

/**
 * Updates a customer using the Mono API
 * @param {string} customerId - The customer ID to update
 * @param {object} updatePayload - The data to update
 * @throws {Error} If update fails
 */
const updateCustomer = async (customerId, updatePayload) => {
    console.log('Updating customer:', customerId, 'with payload:', updatePayload);
    
    const updateResponse = await fetch(`${API_BASE_URL}/v2/customers/${customerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'mono-sec-key': SECRET_KEY,
        },
        body: JSON.stringify(updatePayload),
    });
    
    const updateResult = await updateResponse.json();
    
    if (!updateResponse.ok) {
        console.error('Failed to update customer:', updateResult);
        throw new Error(updateResult.message || 'Failed to update customer');
    }
    
    console.log('Customer updated successfully:', updateResult);
};

/**
 * Initiates a direct debit mandate.
 * @param {object} mandatePayload - The fully constructed payload for the mandate.
 * @returns {object} The mandate data from Mono, including the mono_url.
 * @throws {Error} If the mandate creation fails.
 */
export const initiateMandate = async (mandatePayload) => {
    console.log('API Service: Initiating mandate with payload:', mandatePayload);
    const id = mandatePayload.customer.id;
    console.log(id);
    
    // Fetch customer details from API
    const customerResponse = await fetch(`${API_BASE_URL}/v2/customers/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'mono-sec-key': SECRET_KEY,
        }
    });
    
    const customerResult = await customerResponse.json();
    console.log('Raw customer data:', customerResult);
    
    console.log('Updated mandate payload:', mandatePayload);
    
    // Now proceed with the actual mandate creation
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
    console.log('Mandate response:', result);

    if (response.ok) {
        console.log('API Service: Mandate initiated successfully.');
        return result.data;
    }

    // Mono's validation errors are often in a data array.
    const errorMessage = result.data?.[0]?.message || result.message || 'Mandate creation failed.';
    throw new Error(errorMessage);
};