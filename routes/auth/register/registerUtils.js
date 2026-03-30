const getApiUrl = () => `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.ENV_API_KEY}`;

module.exports = async function signUp(data) {
  const response = await fetch(getApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (response.ok) {
    return responseData;
  }

  const errorMessage = responseData.error?.message || response.statusText || "Authentication failed";
  const error = new Error(errorMessage);
  error.status = response.status;
  throw error;
}