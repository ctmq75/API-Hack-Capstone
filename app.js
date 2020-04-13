'use strict';

const key = 'b3d5dfb0c0msh2209aa163d7f8e2p1f21c5jsnfa21be53f5ab';
var comboArray = [];


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      let city = $('#city-search').val();
      let state = $('#state-search').val();
      let zip = $('#zip-search').val();
      console.log(city, state, zip);
      getRoomRate(city, state, zip);
    });
};




async function getRoomRate(city, state, zip){

    const url = 'https://mashvisor-api.p.rapidapi.com/rental-rates?city=' + city + '&zip_code=' + zip + '&state=' + state + '&source=airbnb';

    const options = {
        "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "mashvisor-api.p.rapidapi.com",
		    "x-rapidapi-key": "b3d5dfb0c0msh2209aa163d7f8e2p1f21c5jsnfa21be53f5ab"
	    }
    }
    const response = await fetch(url, options)
    .then(function(response) {
        return response.json()
    })
    console.log(response);
    if(response.content.detailed === null){
        $('#display-results').text('No Results Found, Please try a different search.')
    } else {
    comboArray.push(response.content.detailed[1].median_night_rate);
    console.log(comboArray)
    getTaxRate();} 
}



async function getTaxRate(){
    const zipCode = $('#zip-search').val();
    const url = "https://u-s-a-sales-taxes-per-zip-code.p.rapidapi.com/"+zipCode;
    const options = {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "u-s-a-sales-taxes-per-zip-code.p.rapidapi.com",
            "x-rapidapi-key": "b3d5dfb0c0msh2209aa163d7f8e2p1f21c5jsnfa21be53f5ab"
	    }
    }
    const response = await fetch(url, options)
    .then(function(response) {
        return response.json();
    }).catch((function (err) {
		console.log('Could not find a post');
	}));

    comboArray.push(response.estimated_combined_rate);
    formatRates();

}





function formatRates(){
    let rating = comboArray[0] * comboArray[1];
    rateCity(rating);
}



function rateCity(rating) {
    if (rating <= 10.5) {
        $('#display-results').text('Rating: A')
    } else if (rating > 10.5 && rating <= 12.4){
        $('#display-results').text('Rating: B')
    } else if (rating > 12.4 && rating <= 13.9 ){
        $('#display-results').text('Rating: C')
    } else if (rating > 13.9 && rating <= 15.4){
        $('#display-results').text('Rating: D')
    } else if (rating > 15.4){
        $('#display-results').text('Rating: F')
    } else {
        $('#display-results').text('An error has occured, please try again.')
    }
    comboArray = [];
};




$(watchForm);


















/*


function getResults(){
    fetch("https://mashvisor-api.p.rapidapi.com/rental-rates?city=chicago&zip_code=60614&state=il&source=airbnb", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "mashvisor-api.p.rapidapi.com",
		    "x-rapidapi-key": "b3d5dfb0c0msh2209aa163d7f8e2p1f21c5jsnfa21be53f5ab"
	    }
    })
    .then(response => {
	    console.log(response);
    })
    .catch(err => {
	    console.log(err);
    });
    }





    const searchURL = 'https://mashvisor-api.p.rapidapi.com/rental-rates?city=' + city + '&zip_code=' + zip + '&state=' + state + '&source=airbnb';
    
    console.log(searchURL);
    return searchURL;






    function formatRates(){
    const rating = comboArray[1] * comboArray[0];
    console.log(rating);
    rateCity(rating);
}

    */