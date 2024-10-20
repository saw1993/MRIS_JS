export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('jwtToken');
};

export const setTokenInLocalStorage = (token) => {
    localStorage.setItem('jwtToken', token);
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('jwtToken');
};