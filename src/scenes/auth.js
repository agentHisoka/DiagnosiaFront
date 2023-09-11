import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
  const token = getCookie("token"); // Get the JWT token from the cookie

  if (token) {
    // Decode the token to check its expiration
    const decodedToken = jwt_decode(token);

    //console.log(decodedToken);

    // Check if the token is not expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp > currentTime && decodedToken;
  }

  return false; // No token or token expired
};

// Function to get the value of a cookie by its name
const getCookie = (name) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
