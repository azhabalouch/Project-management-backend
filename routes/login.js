const express = require('express');
const router = express.Router();

const getApiUrl = () => `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.ENV_API_KEY}`;

async function signInWithPassword(data) {
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

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const returnSecureToken = true;

  try {
    const response = await signInWithPassword({ email, password, returnSecureToken });
    res.status(200).json(response);
  } catch (error) {
    console.error("Sign-in Error:", error.message);
    const statusCode = error.status || 500;
    res.status(statusCode).send(error.message);
  }
});

module.exports = router;
