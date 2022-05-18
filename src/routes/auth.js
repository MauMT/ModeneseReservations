const router = require('express').Router();

const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {

        //validation
        const {error} = schemaLogin.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message })

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: true,  mensaje: 'Usuario no encontrado'});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({error: true, mensaje: 'contraseña incorrecta'})

        //create token
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET)

        res.header('auth-token', token).json({
            error: null,
            data: {token}
        })
})



router.post('/register', async (req, res) => {

    //user validation
    const {error} = schemaRegister.validate(req.body)
    if(error) {
        return res.status(400).json({error: error.details[0].message})
    }
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).json({error: true, mensaje: 'email ya esta registrado'})

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    try {
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })

    } catch(error) {
        res.status(400).json(error)
    }

})

module.exports = router;