const {request, response} = require('express');
const express = require("express")
const app = express()
const port = 5555
const { connect, client } = require("./src/db");
const globaDB = client.db('shop').collection('products')


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Hello.html');
    console.log(`uycie .protocol): ${req.protocol}`);
    console.log(`otawrto strone z adresu: ${req.ip}`);
});
app.get('/all',async(req,res)=>{
    var NC = "<ul>";
    const result = await DB();
    result.forEach((result, i) => {
        NC += `<li> ${result.id.title}</li>`
    })
    NC+="</ul>"

    const comit = `<button onclick="location.href='http://localhost:3000/'" '>RETURN TO MAIN</button>`
    res.send( NC+comit)
})
app.get('/byid',async(req,res)=>{
    const find =  req.query.lol;
    var krzak =""
    const id =  await BUID(find);
    id.forEach((id, i) => {
        krzak += `${id.title}`
    })
    res.send(krzak)

})
app.get('/addNewIteam',async (req,res)=>{
    const title = req.query.title
    const description = req.query.description
    const price = req.query.price
    const dsc = req.query.ds
    const rating = req.query.rating
    const stock = req.query.stock
    const brand = req.query.brand
    const category = req.query.category
    const thunbnail = req.query.thunbnail
    const images = req.query.images

    var xd = "<ul>";
    const reslut = await ADD(title,description,price,dsc,rating,stock,brand,category,thunbnail,images);
    reslut.forEach((reslut, i) => {
        xd += `<li> ${reslut._id}</li>`
    })
    xd+="</ul>"
    res.send(xd)
})

app.get(`/janapisalem.css`,(req,res)=>{
    res.sendFile(__dirname+'/janapisalem.css');
})
app.get(`/fajne.png`,(req,res)=>{
    res.sendFile(__dirname+'/fajne.png');
})
app.get('/newPage',async(req,res)=>{
    res.sendFile(__dirname+'/nachwile.html')
})
app.get('/deletebyid',async(req,res)=>{
    const id = req.query.delete
    const reslut = await Delete(id);
    console.log(reslut)
    res.send(`object delete id: ${id}`)

})
async function DB(){
        const result = await globaDB.find().toArray()
    return result
}
async function BUID(czk=""){
        const result = await globaDB.find({ brand: { $regex: czk , $options:'i'}}).toArray()
    return result
}
async function ADD(title="",description=0,price=0,dsc=0,rating=0,stock=0,brand="",category="",thunbnail="",images="") {

    var myobj =[{
        title:title,
        description:description,
        price:price,
        discountPercentage:dsc,
        rating:rating,
        stock:stock,
        brand:brand,
        category:category,
        thunbnail:thunbnail,
        images:images
    }]
    let result = await globaDB.insertMany(myobj);
    console.log(result)
    const result2 = await globaDB.find({ title: { $regex: title , $options:'i'}}).toArray()
    return result2
}
async function Delete(id=0){
    var myquery = { id:id};
    const result = await globaDB.deleteOne(myquery)
    if (result==true){
        console.log("brawo")
    }
    else console.log("debil")
    return result

}



connect().then(() => {
    console.info("connected to db");
        app.listen(port, () => {
            console.log(`http://0.0.0.0:`, port)

        })
    }

).catch(e => console.error(e))
