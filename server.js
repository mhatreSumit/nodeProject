

const express = require("express")
const path = require('path')
var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

app.get("/user/:start/:end", function (req, res) {
    // URL : http://localhost:3000/user/1/10?name=sumit&id=5050
    let start = req.params.start
    let end = req.params.end

    var name = req.query.name
    var id = req.query.id

    console.log("Name :", name)
    console.log("id :", id)
    res.json({ name: name, id: id, start: start, end: end });
})

app.post("/", function (req, res) {
    // URL : http://localhost:3000/

    /* 
   JSON: {
  "name":"sumit",
  "id":"20020",
  "start":10, 
  "end":30
         } */

    let result = []
    let data = req.body;


    for (const key in data) {
        console.log(data[key]);
        result.push(data[key])
    }
    return res.status(200).send(result)

})
app.listen(3000, function (error) {
    if (error) throw error
    console.log("Server created Successfully on PORT", 3000)
})