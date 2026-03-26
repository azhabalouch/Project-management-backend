const { getAuth } = require('firebase-admin/auth');

async function verifyToken(req, res, next) {
  const idToken = req.cookies.idToken;

  if (!idToken) {
    return res.status(401).send('Unauthorized: Missing cookie');
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).send('Unauthorized: Invalid token');
  }
}

module.exports = verifyToken;
