const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
    res.send("Get data for user");
});

router.post("/", (req, res) => {
    res.send("Got a POST request from user");
});

router.put("/", (req, res) => {
    res.send("Got a PUT request from user");
});

router.delete("/", (req, res) => {
    res.send("Got a DELETE request for user data");
});

// Catch all other routes
router.all(/(.*)/, (req, res) => {
    res.status(404).send('404 - Page not found');
});

module.exports = router;
