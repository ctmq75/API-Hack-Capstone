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
        $('#display-results').html('<p class="no-results">No Results Found, Please try a different search.</p>')
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
        $('#display-results').html(`<div class="rating-a"><h3>Rating: A</h3><p>Book that trip! This destination is extremely cost efficient!</p><a href="mailto:?subject=My Vacation Affordibility Results&amp;body=City: ${$('#city-search').val()}   State: ${$('#state-search').val()}   Zip: ${$('#zip-search').val()}
        Rating: A   *Book that trip! This destination is extremely cost efficient!"title="Share by Email"><img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png"></a>    </div>`)
    } else if (rating > 10.5 && rating <= 12.4){
        $('#display-results').html(`<div class="rating-b"><h3>Rating: B</h3><p> Easy on the wallet! This is a very affordable destination!</p><a href="mailto:?subject=My Vacation Affordibility Results&amp;body=City: ${$('#city-search').val()}   State: ${$('#state-search').val()}   Zip: ${$('#zip-search').val()}
        Rating: B   *Easy on the wallet! This is a very affordable destination!"title="Share by Email"><img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png"></a>    </div>`)
    } else if (rating > 12.4 && rating <= 13.9 ){
        $('#display-results').html(`<div class="rating-c"><h3>Rating: C</h3><p>Average. This destination is moderately affordable.</p><a href="mailto:?subject=My Vacation Affordibility Results&amp;body=City: ${$('#city-search').val()}   State: ${$('#state-search').val()}   Zip: ${$('#zip-search').val()}
        Rating: C   *Average. This destination is moderately affordable."title="Share by Email"><img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png"></a>    </div>`)
    } else if (rating > 13.9 && rating <= 15.4){
        $('#display-results').html(`<div class="rating-d"><h3>Rating: D</h3><p>Book it if you got it! This destination may be pricey!</p><a href="mailto:?subject=My Vacation Affordibility Results&amp;body=City: ${$('#city-search').val()}   State: ${$('#state-search').val()}   Zip: ${$('#zip-search').val()}
        Rating: D   *Book it if you got it! This destination may be pricey!"title="Share by Email"><img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png"></a>    </div>`)
    } else if (rating > 15.4){
        $('#display-results').html(`<div class="rating-f"><h3>Rating: F</h3><p>Prepare to spend an arm and a leg in this destination!!!</p><a href="mailto:?subject=My Vacation Affordibility Results&amp;body=City: ${$('#city-search').val()}   State: ${$('#state-search').val()}   Zip: ${$('#zip-search').val()}
        Rating: F   *Prepare to spend an arm and a leg in this destination!!!"title="Share by Email"><img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png"></a>    </div>`)
    } else {
        $('#display-results').html("<p class='no-results'>An error has occured, please try again.</p>")
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


