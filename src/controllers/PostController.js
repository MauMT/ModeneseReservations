const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Post = require('../models/posts');
const User = require('../models/users');

const getAllPosts = async(req, res, next) => {
    let postsFound;
    try {
        postsFound = await Post.find();
    } catch (error) {
        return next(
            new HttpError('Fetching posts failed!', 500)
        );
    }

    if(!postsFound){
        return next(
            new HttpError('Could not find posts for the provided email.', 404)
          );
    }

    res.status(200).json({
        posts: postsFound
    });


}

const createPost = async(req, res, next) => {
    const {tag, objectName, lugar, fecha, correo} = req.body;

    const createdPost = new Post({
        tag,
        correo,
        objectName,
        lugar,
        fecha,
        image: req.file.path,
        comments: []
    })

    //en teoria checar que el correo si es valido y tener un pointer
    try {
        await createdPost.save();
    } catch (error) {
        return next(
            new HttpError('Creating post failed!', 500)
        );
    }

    res.status(201).json({post: createdPost});
}

const getPostsByUserId = async (req, res, next) => {
    const userEmail = req.body.email;
    
    //deberia de haber validaciones de que existe correo, etc...
    let postsFound;
    try {
        postsFound = await Post.find({correo: req.body.email})
    } catch (error) {
        return next(
            new HttpError('Fetching posts failed!', 500)
        );
    }

    if(!postsFound){
        return next(
            new HttpError('Could not find posts for the provided email.', 404)
          );
    }

    res.status(200).json({
        posts: postsFound
    });

    

}

module.exports = {
    createPost: createPost,
    getPostsByUserId: getPostsByUserId,
    getAllPosts: getAllPosts
}