const {request, response} = require('express');
const express = require("express")
const app = express()
const port = 5555

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Hello.html');
    console.log(`uycie .protocol): ${req.protocol}`);
    console.log(`otawrto strone z adresu: ${req.ip}`);
});


app.listen(port, ()=>{
    console.log(`serwer działa`, port)

});