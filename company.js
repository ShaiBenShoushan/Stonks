let symbol = getUrlParameter('symbol');
let secondUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
let thirdUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;

const headerPrice = document.getElementById('header-price');
const header = document.getElementById('header');
const description = document.getElementById('description');
const loader = document.getElementById('loader');

mainFunc();


function mainFunc(){
    loader.classList.remove('d-none');
    fetch(secondUrl).then(response => {
        
        return response.json();
    }).then(data => {
        displayData(data);
        loader.classList.add('d-none');
    })
    
    fetch(thirdUrl).then(response => {
        return response.json();
    }).then(data => {
        historicalLastMonth(data.historical);
    })

}

function getUrlParameter(name) {
name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
var results = regex.exec(location.search);
return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


//I know you hate innerHTML but i did that on auto pilot just make it work. will change that to make you happy my cool mentor
function displayData(object){
    let photo = document.getElementById('compImage');
    let link = document.getElementById('compLink');
    header.textContent = `${object.profile.companyName} (${object.symbol})`;
    headerPrice.innerHTML = `$${object.profile.price} <span id="up-down">${object.profile.changes} ${object.profile.changesPercentage}</span>`;
    description.textContent = `${object.profile.companyName} ${object.profile.description}`;
    photo.src = object.profile.image;
    link.href = object.profile.website;
    if(Math.sign(object.profile.changes) ===  1){
        document.getElementById('up-down').classList.add('company-green');
        headerPrice.innerHTML = `$${object.profile.price} <span id="up-down" class="company-green">+${object.profile.changes} ${object.profile.changesPercentage}</span>`;
        document.getElementById('up-down').innerHTML += " GG your stock went up m8";
        object.profile.changes += "+";
    } else if(Math.sign(object.profile.changes) ===  -1){
        document.getElementById('up-down').classList.add('company-red');
        document.getElementById('up-down').innerHTML += " Aww you're losing money";
    }

}
function historicalLastMonth(array){
    let newArray = array.splice(0,30);
    let priceArray = [];
    let daysArray = [];

    for(let i = 0; i < newArray.length; i++){
        priceArray[i] = newArray[i].close;
        daysArray[i] = newArray[i].date;
    }
    makeChart(priceArray, daysArray);
}

function arrayReturn(array){
    return array;
}

function makeChart(array1, array2){
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontFamily = 'Oswald', 'sans-serif';
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: array2,
            datasets: [{
                label: 'Last 30 Days',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: array1
            }]
        },

        // Configuration options go here
        options: {}
    });
}