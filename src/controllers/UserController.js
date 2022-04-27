const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const HttpError = require('../models/http-error');


const signUp = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError(errors['errors'][0].msg, 422)
        );
    }

    const {userName, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({correo : email})
    } catch (error) {
        return next(
            new HttpError('Server failure!', 500)
        );
    }

    if(existingUser){
        return next(
            new HttpError('Usuario con ese correo ya existe!', 422)
        );
    }

    try {
        existingUser = await User.findOne({nombreUsuario : userName})
    } catch (error) {
        return next(
            new HttpError('Server failure!', 500)
        );
    }

    if(existingUser){
        return next(
            new HttpError('Usuario con ese nombre de usuario ya existe!', 422)
        );
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(
            new HttpError('Server failure!', 500)
        );
    }

    const createdUser = new User({
        correo: email,
        nombreUsuario: userName,
        password: hashedPassword
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(
            new HttpError('Server failure!', 500)
        );
    }

    let token;
    try {
        token = jwt.sign(
          { userId: createdUser.id, email: createdUser.correo },
          'tecFindItSecret',
          { expiresIn: '5h' }
        );
    } catch (err) {
        return next(
            new HttpError('Server failure!', 500)
        );
    }

    res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.correo, userName: createdUser.nombreUsuario ,token: token });
};

const login = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError(errors, 422)
        );
    }

    const {email, password} = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({correo: email});
    } catch (error) {
        return next(
            new HttpError('Server failure!', 500)
        );
    }

    if(!existingUser){
        return next(
            new HttpError('Correo o contraseña incorrectos', 403)
        );
    }

    let validPassword = false;

    try {
        validPassword = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
        return next(
            new HttpError('Could not log you in, please check your credentials and try again.', 500)
        );
    }

    if(!validPassword){
        return next(
            new HttpError('Correo o contraseña incorrectos', 403)
        );
    }

    let token;
    try {
        token = jwt.sign(
          { userId: existingUser.id, email: existingUser.correo },
          'tecFindItSecret',
          { expiresIn: '5h' }
        );
    } catch (err) {
        console.log(err)
        return next(
            new HttpError('Server failure!', 500)
        );
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.correo,
        token: token
    });
};

module.exports = {
    signUp: signUp,
    login: login
}