﻿'use strict';

const apiEndpoints = [
    { url: '/auth/login', method: 'post'},
    { url: '/auth/signup', method: 'post'}
];

module.exports = function (app) {

    process.env.API_URL = process.env.API_BASE_URL + process.env.API_VERSION;

    // middleware
    require('../middleware/api_versioning')(app);
    require('../middleware/api_params')(app);


    // config
    app.get(process.env.API_URL + '/config/seed', function (req, res, next) { require('./config/seed')(req, res, next); });

    // auth
    app.post(process.env.API_URL + '/auth/login', function (req, res, next) { require('./auth/login')(req, res, next); });
    app.post(process.env.API_URL + '/auth/signup', function (req, res, next) { require('./auth/signup')(req, res, next); });

    // users
    app.get(process.env.API_URL + '/users/:userId', function (req, res, next) { require('./users/get-info')(req, res, next); });
    app.post(process.env.API_URL + '/users/:userId/relation/:anotherUserId', function (req, res, next) { require('./users/relation-request')(req, res, next); });
    app.post(process.env.API_URL + '/users/:userId/relation/:anotherUserId', function (req, res, next) { require('./users/relation-confirm')(req, res, next); });
    app.get(process.env.API_URL + '/users/:userId/family', function (req, res, next) { require('./users/get-family')(req, res, next); });

};
