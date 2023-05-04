const fs = require("fs");
const { matchedData }= require("express-validator");
const {storageModel} = require("../models");
const { handleHttpError } = require("../utils/handleError");

const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * obtener todos 
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const data = await storageModel.find({})
        res.send({data})
    }catch(e){
        handleHttpError(res, "ERROR_GETITEMS_ITEMS");
    }
 }
/**
 * obtener uno 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => { 
    try{
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data})
    }catch(e){
        handleHttpError(res, "ERROR_DETAIL_ITEMS" + e);
    }
}
/**
 * crea uno 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try{
        const { body, file } = req
        console.log(file)
        const PUBLIC_URL = process.env.PUBLIC_URL
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    }catch(e){
        handleHttpError(res, "ERROR_CREATE_ITEMS" + e);
    }    
 };

/**
 * Actualiza uno 
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => { }

/**
 * Elimina uno 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => { 
    try{
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.deleted({_id:id});
        const { fileName } = dataFile;
        const { filePath } = `${MEDIA_PATH}/${fileName}`

        fs.unlinkSync(filepath);
        const data = {
            filePath,
            deleted:1
        }

        res.send({data})
    }catch(e){
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}