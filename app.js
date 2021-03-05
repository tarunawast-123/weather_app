const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req,res){

    const query = req.body.cityName;
    const apiKey = "725a7c96a8e970b8b0eb06c0ddbb5ad8";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>The weather is currently " + weatherDescription+ "</p>");
            res.write("<h1>The temperature in "+ query +" is "+temp+ " degrees Celcius</h1>");
            res.write("<img src=" + imageUrl +">");
            res.send();
        });
    });
});




app.listen(3000, function(){
    console.log("Server at 3000");
})
