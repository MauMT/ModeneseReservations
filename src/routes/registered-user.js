const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: "you are authorized!",
            user: req.user
        }
    })
})

module.exports = router
