const router = require('express').Router();


router.get('/', async (req, res) => {
    return res.json({ message: 'Welcome to stripe api!!!' })
});


module.exports = router;