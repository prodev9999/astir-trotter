﻿'use strict';
const models = require('../../models');
const Messages = require('../../config/messages');
const CredentialsHeper = require('../../helpers/credentialsHelper');

module.exports = function (req, res, next) {
    const userId = req.body.userId;

    models.User.scope({ method: ['byId', userId] }).findOne().then(user => {
        if (user) {
            // duplicated userId
            res.send({
                success: false,
                message: Messages.Warning.DuplicatedUserId
            });
        } else {
            // check gender
            models.Gender.scope({ method: ['byValue', req.body.gender] }).findOne().then(gender => {
                if (req.body.gender && !gender) {
                    res.send({
                        success: false,
                        message: Messages.Warning.InvalidInput + Messages.General.Gender
                    });
                } else {
                    // check class origin
                    models.ClassOrigin.scope({ method: ['byValue', req.body.classOrigin] }).findOne().then(classOrigin => {
                        if (req.body.classOrigin && !classOrigin) {
                            res.send({
                                success: false,
                                message: Messages.Warning.InvalidInput + Messages.General.ClassOrigin
                            });
                        } else {
                            // check social origin
                            models.SocialOrigin.scope({ method: ['byValue', req.body.socialOrigin] }).findOne().then(socialOrigin => {
                                if (req.body.socialOrigin && !socialOrigin) {
                                    res.send({
                                        success: false,
                                        message: Messages.Warning.InvalidInput + Messages.General.SocialOrigin
                                    });
                                } else {
                                    // check national origin
                                    models.NationalOrigin.scope({ method: ['byValue', req.body.nationalOrigin] }).findOne().then(nationalOrigin => {
                                        if (req.body.nationalOrigin && !nationalOrigin) {
                                            res.send({
                                                success: false,
                                                message: Messages.Warning.InvalidInput + Messages.General.NationalOrigin
                                            });
                                        } else {
                                            // check nationality
                                            models.Nationality.scope({ method: ['byValue', req.body.nationality] }).findOne().then(nationality => {
                                                if (req.body.nationality && !nationality) {
                                                    res.send({
                                                        success: false,
                                                        message: Messages.Warning.InvalidInput + Messages.General.Nationality
                                                    });
                                                } else {
                                                    // check party
                                                    models.Party.scope({ method: ['byValue', req.body.party] }).findOne().then(party => {
                                                        if (req.body.party && !party) {
                                                            res.send({
                                                                success: false,
                                                                message: Messages.Warning.InvalidInput + Messages.General.Party
                                                            });
                                                        } else {
                                                            models.User.create({
                                                                id: req.body.userId,
                                                                firstName: req.body.firstName,
                                                                lastName: req.body.lastName,
                                                                nickName: req.body.nickName,
                                                                birthday: req.body.birthday,
                                                                birthPlace: req.body.birthPlace,
                                                                address: req.body.address,
                                                                picture: req.body.picture,
                                                                phoneNumber: req.body.phoneNumber,
                                                                email: req.body.email,
                                                                moreContactInfo: req.body.moreContactInfo
                                                            }).then(user => {
                                                                if (user) {
                                                                    if (gender) {
                                                                        gender.addUser(user);
                                                                        user.gender = gender.value;
                                                                    }
                                                                    if (classOrigin) {
                                                                        classOrigin.addUser(user);
                                                                        user.classOrigin = classOrigin.value;
                                                                    }
                                                                    if (socialOrigin) {
                                                                        socialOrigin.addUser(user);
                                                                        user.socialOrigin = socialOrigin.value;
                                                                    }
                                                                    if (nationalOrigin) {
                                                                        nationalOrigin.addUser(user);
                                                                        user.nationalOrigin = nationalOrigin.value;
                                                                    }
                                                                    if (nationality) {
                                                                        nationality.addUser(user);
                                                                        user.nationality = nationality.value;
                                                                    }

                                                                    // save credentials
                                                                    const pwdHash = CredentialsHeper.genPwdHash(req.body.password);
                                                                    models.UserSetting.create({ pwdHash: pwdHash }).then(userSetting => {
                                                                        if (userSetting) {
                                                                            user.setUserSetting(userSetting);

                                                                            // generate family
                                                                            const familyId = CredentialsHeper.genUUID();
                                                                            models.Family.create({ id: familyId }).then(family => {
                                                                                if (family) {
                                                                                    family.addUser(user);
                                                                                    user.familyId = family.id;

                                                                                    // respond
                                                                                    res.send({ success: true });
                                                                                } else {
                                                                                    // cannot save family
                                                                                    var err = new Error(Messages.Error.SaveData);
                                                                                    err.status = 500;
                                                                                    next(err);
                                                                                }
                                                                            });
                                                                        } else {
                                                                            // cannot save user setting
                                                                            var err = new Error(Messages.Error.SaveData);
                                                                            err.status = 500;
                                                                            next(err);
                                                                        }
                                                                    });
                                                                } else {
                                                                    // cannot save user
                                                                    var err = new Error(Messages.Error.SaveData);
                                                                    err.status = 500;
                                                                    next(err);
                                                                }
                                                            }).catch(err => {
                                                                console.log(err.message);
                                                                // invalid input
                                                                res.send({
                                                                    success: false,
                                                                    message: Messages.Warning.InvalidInput
                                                                });

                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};