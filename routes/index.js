const express = require('express');
const jwt = require("jsonwebtoken")
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    text:"works!!"
  })
});

router.post("/api/login",(req,res)=>{

  const user ={id:3}

  const token = jwt.sign({user},"my_keyyyy")
  res.json({
    token
  })
})

router.get("/api/protected", ensuretoken , (req,res)=>{

  jwt.verify(req.token,"my_keyyyy" , (error,data)=>{
    if (error){
      res.sendStatus(403)
    }else{
      res.json({
        text: "protected!!",
        data
      })
    }
  })

})

function ensuretoken(req,res,next){
  const bearerheader = req.headers["authorization"]
  console.log(bearerheader)
  if(typeof bearerheader !== "undefined") {
    const bearer = bearerheader.split(" ")
    const bearertoken = bearer[1]
    req.token = bearertoken
    next()
  } else{
    res.sendStatus(403)
  }
}

module.exports = router;
