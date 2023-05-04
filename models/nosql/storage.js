const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete");

const StorageScheme = new mongoose.Schema(
    {
        url:{
            type:String
        },
        filename:{
            type:String,
            unique:true            
        }
    },{
        timestamps:true, //TODO createAt, updateAt
        versionKey: false
    }
);

StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"});

module.exports = mongoose.model("storage",StorageScheme)