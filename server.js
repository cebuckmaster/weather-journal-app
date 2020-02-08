// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const port = 8080;

const express = require('./node_modules/express');

const app = express();

/* Middleware*/
const bodyParser = require('./node_modules/body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('./node_modules/cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, listening);

app.get('/allData', getAllData);
app.post('/postData', postData);


//---------------------FUNCTIONS-----------------------------------------------------
function listening() {
    console.log('Server Running');
    console.log(`Running on localhost ${port}`);
}

function getAllData(request, response) {
    response.send(projectData);
}

function postData(request, response) {
    let newData = request.body;
    projectData = {
        zip: newData.zip,
        date: newData.date,
        locationName: newData.locationName,
        temp: newData.temp,
        feeling: newData.feeling
    };
    response.send({ Result : 'Success'});
}

