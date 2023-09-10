const joi = require('joi');

const createV = (data) => {
    const { fullName, password, phoneNumber } = data;
    const phoneNumberRegex = /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;
    const schema = joi.object().keys({
        fullName: joi.string().required(),
        phoneNumber: joi.string().regex(phoneNumberRegex).required(),
        password: joi.string().min(6).max(10).required()
    });

    const { error } = schema.validate({ fullName, password, phoneNumber });
    if (error) {
        return error;
    }
    else {
        return false;
    };
}


const loginV = (data) => {
    const { password, phoneNumber } = data;
    const phoneNumberRegex = /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;
    const schema = joi.object().keys({
        phoneNumber: joi.string().regex(phoneNumberRegex).required(),
        password: joi.string().min(6).max(10).required()
    });

    const { error } = schema.validate({ password, phoneNumber });
    if (error) {
        return error;
    }
    else {
        return false;
    };
}


const updateV = (data) => {
    const { id, fullName, password, phoneNumber } = data;
    const phoneNumberRegex = /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;
    const schema = joi.object().keys({
        id: joi.string().required(),
        fullName: joi.string().required(),
        phoneNumber: joi.string().regex(phoneNumberRegex).required(),
        password: joi.string().min(6).max(10).required()
    });

    const { error } = schema.validate({ id, fullName, password, phoneNumber });
    if (error) {
        return error;
    }
    else {
        return false;
    };
}




const getByIdAndDeleteV = (data) => {
    const { id } = data;
    const schema = joi.object().keys({
        id: joi.string().required()
    });

    const { error } = schema.validate({ id });
    if (error) {
        return error;
    }
    else {
        return false;
    };
}


module.exports = {
    createV,
    updateV,
    getByIdAndDeleteV,
    loginV
};