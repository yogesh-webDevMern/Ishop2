const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        contact:{
            type:String,
            required:true
        },
        status:{
            type:Boolean,
            default:true
        },
        type:{
            type:Number,
            enum:[1,2],
            //1: Super Admin, 2: Sub Admin, 3: Staff
            required:true
        }
    },
    {
        timestamps:true
    }
)