const testUserController = (req, res) => {
    try{
        res.status(200).send({
            success: true,
            message: "Test user controller is working" 
        })
    }
    catch(err){
        console.log("Error in test user controller", err);
    }
}

module.exports = { testUserController };