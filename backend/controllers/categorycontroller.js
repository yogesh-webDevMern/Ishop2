// const categoryModel = require("../models/categorymodel");
const categoryModel = require("../models/categorymodel");
const CategoryController={
    async moveToTrash(req,res)
    {
try{
const id=req.params.id;
categoryModel.updateOne({_id:id},{deletedAt:new Date()}).then(()=>
{
res.send({message:"category moved to trash successfully",flag:1});
}).catch(()=>
{
    res.send({message:"unable to move to trash",flag:0});
})
}catch(error)
{
    res.send({message:"Internal server error",flag:0})
}
    },
async create (req,res) 
{
    try{
const data = req.body;
const categoryCount = await categoryModel.findOne({name:data.name}).countDocuments();
if(categoryCount==1)
{
return res.send({message: "category already exists",flag:0});
}
const category = new categoryModel({name:data.name, slug:data.slug});
category.save()
.then(
()=>
{
res.send(
    {
        message:"Category Added",
        flag :1
    }
)
}
).catch(
    (error)=>
    {
        console.log(error);
        res.send(
            {
                message:"Unable to create category",
                Flag :0
            }
        )
    }
)
    } catch(error)
    {
res.send(
    {
        message:"Internal server error",
        flag:0
    }
)
    }
},
async read (req,res)
{
 try{
    let categories;
    if(req.params.id)
    {
        categories =await categoryModel.findOne({_id:req.params.id});
        res.send({categories,flag:1});
    }else
    {
         categories =await categoryModel.find({deletedAt:null}).sort({createdAt:-1});
        res.send({categories,total:categories.length,flag:1});
    }

 }catch(error)
 {
res.send({message:"Internal server error",flag:0});
 }
},
async trashGetData (req,res)
{
 try{
    const categories = await categoryModel.find({ deletedAt: { $ne: null } });
res.send({categories,flag:1});
 }catch(error)
 {
res.send({message:"Internal server error",flag:0});
 }
},
async deletefuction(req,res)
{
   try{
const deletedUser =await categoryModel.deleteOne({_id:req.params.id}).
then(()=>
{
    res.send({message:"category deleted successfully",flag:1});
    // res.redirect("/admin/category");
})
.catch(()=>
{
    res.send({message:"unbale to delete the category",flag:0});
})
   } catch(error)
   {
res.send({message:"Internal server error",flag:0})
   }
},
async changeStatus(req,res) {
    try{
        const id=req.body.id;
        const new_status=req.body.new_status;
        categoryModel.updateOne({_id:id},{status:new_status}).then(()=>
        {
            res.send({message:"status changed",flag:1});
        }).catch(()=>
        {
            res.send({message:"unable to status change",flag:0});

        })

    }catch(error)
    {
res.send("internal server error");
    }
},
async restoreFuc(req,res){
try{
    const id=req.params.id;
categoryModel.updateOne({_id:id},{deletedAt:null}).then(()=>
{
    res.send({message:"Restore Successfully",flag:1})
}).catch(()=>
{
    res.send({message:"unable to Restore",flag:0});
});
}catch(error)
{
    res.send({message:"Internal Server error",flag:0});
}
}
}

module.exports = {CategoryController};