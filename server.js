const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
});
const url="https://api.openweathermap.org/data/2.5/weather?appid=d8159ce107b3394d40d09264f5ceed89&units=metric";
app.post("/",function(req,res){
    var cityName=req.body.cityName;
    https.get(url+"&q="+cityName,function(response){
        if(response.statusCode===200){
            response.on("data",function(d){
                var weatherData=JSON.parse(d);
                var temp=weatherData.main.temp;
                var icon=weatherData.weather[0].icon;
                var imgURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
                res.write("<h1> Current temp. in "+ cityName + " is "+temp + "</h1>");
                res.write("<img src=" + imgURL + ">");
                res.send();
            });
        }else{
            res.send("Incorrect City name  ￣へ￣");
        }
        
    });
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Yo bitches..!!");
})