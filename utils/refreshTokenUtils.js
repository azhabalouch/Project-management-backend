const getApiUrl = () => `https://securetoken.googleapis.com/v1/token?key=${process.env.ENV_API_KEY}`;

async function refreshFirebaseToken(refreshToken){
  const response = await fetch(getApiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })

  if(!response.ok){
    throw new Error('Refresh failed');
  }

  return response.json();
}