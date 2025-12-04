const category_model = require("../models/category.model")
exports.createCategory = async (req, res)=>{
    
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }
    try{
    const category = category_model.create(cat_data)
    return res.status(201).send(category)

    }catch(err){
        console.log("error while createing category", err)
        res.status(500).send({
            message : "Error while creating category"
        })
    }
}