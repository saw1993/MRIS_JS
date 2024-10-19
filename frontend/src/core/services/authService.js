export const login = async (email, password) => {

    const response = await fetch('https://localhost:3003/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
        
    });

    console.log(response)
    if (!response.ok) {
        throw new Error('Failed to login');
    }

    return response.json();
};


export const validateToken = async (token) => {
    const response = await fetch('https://localhost:3003/api/auth/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        return response.json();
        console.log('toke is this ' + response.json)
    } else {
        throw new Error('Token validation failed');
    }
};