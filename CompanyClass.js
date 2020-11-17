class Company {
    constructor(symbol,changedId = ""){
        this.mySymbol = symbol;
        this.changedId = changedId;
    }
mainFunc(){
    let loader = document.getElementById(`loader${this.changedId}`);
    let secondUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.mySymbol}`;
    let thirdUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.mySymbol}?serietype=line`;
    loader.classList.remove('d-none');
    fetch(secondUrl).then(response => {
        
        return response.json();
    }).then(data => {
        this.displayData(data);
        loader.classList.add('d-none');
    })
    
    fetch(thirdUrl).then(response => {
        return response.json();
    }).then(data => {
        this.historicalLastMonth(data.historical);
    })
}
displayData(object){
    let headerPrice = document.getElementById(`header-price${this.changedId}`);
    let header = document.getElementById(`header${this.changedId}`);
    let photo = document.getElementById(`compImage${this.changedId}`);
    let link = document.getElementById(`compLink${this.changedId}`);
    let description = document.getElementById(`description${this.changedId}`);
    header.textContent = `${object.profile.companyName} (${object.symbol})`;
    headerPrice.innerHTML = `$${object.profile.price} <span id="up-down${this.changedId}">${object.profile.changes} ${object.profile.changesPercentage}</span>`;
    description.textContent = `${object.profile.companyName} ${object.profile.description}`;
    photo.src = object.profile.image;
    link.href = object.profile.website;
    if(Math.sign(object.profile.changes) ===  1){
        document.getElementById(`up-down${this.changedId}`).classList.add('company-green');
        headerPrice.innerHTML = `$${object.profile.price} <span id="up-down${this.changedId}" class="company-green">+${object.profile.changes} ${object.profile.changesPercentage}</span>`;
        document.getElementById(`up-down${this.changedId}`).innerHTML += " GG your stock went up m8";
        object.profile.changes += "+";
    } else if(Math.sign(object.profile.changes) ===  -1){
        document.getElementById(`up-down${this.changedId}`).classList.add('company-red');
        document.getElementById(`up-down${this.changedId}`).innerHTML += " Aww you're losing money";
    }
}
historicalLastMonth(array){
    let newArray = array.splice(0,30);
    let priceArray = [];
    let daysArray = [];

    for(let i = 0; i < newArray.length; i++){
        priceArray[i] = newArray[i].close;
        daysArray[i] = newArray[i].date;
    }
    this.makeChart(priceArray, daysArray);
}
makeChart(array1, array2){
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontFamily = 'Oswald', 'sans-serif';
    var ctx = document.getElementById(`myChart${this.changedId}`).getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: array2,
            datasets: [{
                label: 'Last 30 Days',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: array1
            }]
        },
        options: {}
    });
}


}