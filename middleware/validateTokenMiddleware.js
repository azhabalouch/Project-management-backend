/**
 If both cookies are missing, reject immediately. If the idToken exists, verify it and continue. If only the refreshToken exists, use it to get a new idToken, set fresh cookies, populate the user, and continue. If verification throws an expiry error, do the same refresh flow. If anything else goes wrong, reject with 401.
 */

const { getAuth } = require('firebase-admin/auth');
const { refreshFirebaseToken } = require('../utils/refreshTokenUtils');

async function setNewIdToken(req, res, refreshToken){
  const newTokens = await refreshFirebaseToken(refreshToken);

  res.cookie('idToken', newTokens.id_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 3600000 
  });

  res.cookie('refreshToken', newTokens.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 604800000 
  });

  req.user = await getAuth().verifyIdToken(newTokens.id_token);
}

async function verifyToken(req, res, next) {
  const idToken = req.cookies.idToken;
  const refreshToken = req.cookies.refreshToken;

  if (!idToken && !refreshToken) {
    return res.status(401).send('Unauthorized: Invalid credentials.');
  }

  try {
    if (idToken){
      req.user = await getAuth().verifyIdToken(idToken);
      return next();
    } else if (!idToken && refreshToken){
      await setNewIdToken(req, res, refreshToken);
      return next();
    }
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      try {
        await setNewIdToken(req, res, refreshToken);
        return next();
      } catch(error) {
        console.error('Failed to refresh token:', error);
        return res.status(401).send('Unauthorized: Session expired');
      }

    } else {
      console.error('Token verification failed:', error);
      return res.status(401).send('Unauthorized: Invalid token');
    }
  } 
}

module.exports = verifyToken;
