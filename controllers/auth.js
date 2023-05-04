const { matchedData } = require('express-validator');
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { encrypt, compare} = require("../utils/handlerPassword");
const { handleHttpError } = require("../utils/handleError");

/**
 * Controller registro de usuario
 * @param req
 * @param res
 */
const registerCtrl = async (req, res) => {
    try{
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}        
        const dataUser = await usersModel.create(body);     
        
        dataUser.set('password', undefined, {strict: false});
        
        const data ={
        token: await tokenSign(dataUser),
        user: dataUser
        };
        
        res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR_REGISTER_USER "+e);
    }
};

/**
 * Controller Login de usuario
 * @param req
 * @param res
 */
const loginCtrl = async (req, res) => {
    try{
        req = matchedData(req);
        const user = await usersModel.findOne( { where: { email: req.email } });//.findOne({ email: req.email }).select('password name role email');
        if(!user){
            handleHttpError(res, "USER_NOT_EXIST", 404);
            return
        }        

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return
        }

        user.set('password', undefined, {strict: false});
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR_LOGIN_USER"+e);
    }
};

module.exports = { registerCtrl, loginCtrl}