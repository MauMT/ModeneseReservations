const {Router} = require('express');
const router = Router();
const { render } = require('ejs');

router.get("/", function(req, res)
{
    res.render('home');
}
);

/* router.get("/home", function(req, res)
{
    res.send("homepage");
}
); */



module.exports = router; 