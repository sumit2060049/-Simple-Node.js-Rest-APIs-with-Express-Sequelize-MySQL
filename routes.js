const express=require('express');
const employeeTable=require("./models").employee;


const router=express.Router()

//Add Employee API(post)

router.post("/add-employee",(req,res)=>{

    // console.log(req.body);
    employeeTable.findOne({
        where:{
            email:req.body.email
        }
    }).then((data) => {

        if(data){
            res.json({
                status:false,
                message:"Email already exist"
            });
        }
        else{
            employeeTable.create(req.body).then((success) => {

                res.json({
                    success:true,
                    message:"Employee created successfully"
                })
        
            }).catch((error) => {
                res.json({
                    status:false,
                    message:"failed to execute insert query"
                })
            })
        
        }

    }).catch((error) => {
        res.json({
            status:false,
            message:"failed to execute query"
        })
    })

   
})

//Get all Employee API(get)
router.get("/list-employee",(req,res)=>{

    employeeTable.findAll().then((data) => {

        if(data){

            res.json({
                status:true,
                message:"Employee found",
                users:data
            })

        }else{
            res.json({
                status:false,
                message:"No Employee found"
            })
        }


    }).catch((error) => {
        res.json({
            status:false,
            message:"Failed to execute query"
        })
    })

});

//Get single employee information
router.get("/single-employee/:id",(req,res)=>{
    employeeTable.findOne({
        where:{
            id:req.params.id
        }
    }).then((data) => {

        if(data){

            res.json({
                status:true,
                message:"Employee data found",
                user:data
            })
           
        }else{
            res.json({
                status:false,
                message:"No employee fonud",
            })
        }

    }).catch((error)=>{
        res.json({
            status:false,
            message:"Failed to execute query"
        })
    })
})

//Update Employee API(put)
router.put("/update-employee/:id",(req,res) => {
    employeeTable.findOne({
        where:{
            id:req.params.id
        }
    }).then((data) => {

        if(data){

            employeeTable.update({
                name:req.body.name,
                mobile:req.body.mobile
            },{
                where:{
                    id:req.params.id
                } 
            }).then((data)=>{
                res.json({
                    status:true,
                    message:"Employee Updated successfully"
                })
            }).catch((error)=>{
                res.json({
                    status:false,
                    message:"Failed to execute query"
                })
            })

        }else{
            res.json({
                status:false,
                message:"No employee found"
            })
        }

    }).catch((error) => {
        res.json({
            status:false,
            message:"Failed to execute query"
        })
    })
});

router.delete("/delete-employee/:id",(req,res)=>{
    employeeTable.findOne({
        where:{
            id:req.params.id
        }
    }).then((data) =>{

        if(data){
            employeeTable.destroy({
                where:{
                    id:req.params.id
                }
            }).then((data) =>{
                res.json({
                    status:true,
                    message:"Employee deleted successfully"
                })
            }).catch((error) => {
                res.json({
                    status:false,
                    message:"Failed to execute query"
                })
            })
        }else{
            res.json({
                status:false,
                message:"No employee found"
            })
        }
    }).catch((error)=>{
        res.json({
            status:false,
            message:"Failed to execute query"
        })
    })
})

router.get('/',(req,res) =>{
    // console.log("welcome to the main landing page some dummy value");

    // json response

    res.json({
        status:true,
        message:"Welcome to nodejs API"
    })

})

module.exports = router;
