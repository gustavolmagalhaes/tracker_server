const express = require("express");
const app = express();

var latitude_buffer = "";
var longitude_buffer = "";
var last_update = new Date();

const api_key = "AIzaSyAieiQ9GjiEyZtDnaqR8GOtsdg7UtXc1xg";

function generateLink() {
    return "https://www.google.com/maps/search/?api=1&query="+latitude_buffer+"%2C"+longitude_buffer
}


app.use(require("body-parser").urlencoded({extended:true}))

app.get("/", (req,res) => {
    res.send(`
    <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <h1 style="font-family: sans-serif; font-size: 25px;">${last_update.toUTCString()}</h1>
        <a href="${generateLink()}">Onde é que ele está?</a>
    </div>
    `)
})

app.post("/updateLocation", (req,res) => {
    let { latitude,longitude } = req.body;

    latitude_buffer = latitude;
    longitude_buffer = longitude;
    last_update = new Date();

    console.log('['+new Date().toUTCString()+'] Latitude: '+latitude_buffer+', Longitude: '+longitude_buffer);

    res.sendStatus(200);
});


app.listen(3000, () => {
    console.log('Server Running on: http://localhost:3000');
});