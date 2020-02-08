'use strict';
/* Global Variables */
const mAPPID = '&APPID=40c85fd3d265835f89672ec3d7a970b1&units=imperial';
const mWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let mTodaysDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.addEventListener('DOMContentLoaded', function() {

    const generate = document.querySelector('#generate');

    generate.addEventListener('click', () => {
        run(document.querySelector('#zip').value, document.querySelector('#feelings').value);
    });

});
//----------------------------------------------------------------
function run(zip, feelings) {

    if (zip === '' || feelings === '') {
        alert('You must enter a zip code and express your feelings');
        return;
    }
    
    getData(mWeatherURL+zip+mAPPID)
    .then(function(weatherData) {
        const data = {
            zip: zip,
            date: mTodaysDate,
            locationName: weatherData.name,
            temp: weatherData.main.temp,
            feeling: feelings
         };
         postData('/postData', data)
         .then(function(){
             getData('/allData')
             .then(function(resp) {
                document.querySelector('#date').innerHTML = resp.date;
                document.querySelector('#temp').innerHTML = resp.temp;
                document.querySelector('#content').innerHTML = resp.feeling;
             },function(getError) {
                console.log(getError);
             });
         }, function(postError) {
             console.log(postError);
         });
    }, function(err) {
        alert('Error was found in getting weather data, please check your zip code');
        console.log(err);
    });

}
//--------------------------------------------------------------------------------
async function getData(url = '') {

    const response = await fetch(url);

    try {
        if (response.status === 200) {
            const resp = await response.json();
            return resp;
        } else {
            throw "Bad Response";
        }
    } catch(error) {
        console.log('Error in getData', error);
        return Promise.reject('Error in getData' + error);
    }

}
//----------------------------------------------------------------
async function postData(url = '', data = {}) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const resp = await response.json();
        return resp;
    } catch (error) {
        console.log('Error in postData', error);
    }

}