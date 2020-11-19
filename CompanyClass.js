async function compInfo(symbol,url){
    // let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
    let response = await fetch(url);
    if(response.status == 200){
        let myArray = await response.json();
        console.log('hello')
        return myArray;
    } else {
        let error = await response.text();
    }
}

class Company {
    constructor(symbol,changedId = ""){
        this.mySymbol = symbol;
        this.changedId = changedId;
        this.mainFunc();
    }

        
    mainFunc(){
        let loader = document.getElementById(`loader${this.changedId}`);
        let secondUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.mySymbol}`;
        let thirdUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.mySymbol}?serietype=line`;
        let fourthUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/income-statement/${this.mySymbol}?limit=120`;
        
        let fifthUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/balance-sheet-statement/${this.mySymbol}?limit=120`;
        
        loader.classList.remove('d-none');
        // fetch(secondUrl).then(response => {
        //     return response.json();
        // }).then(data => {
        //     this.displayData(data);
        //     loader.classList.add('d-none');
        // });
        compInfo(this.mySymbol,secondUrl).then(data => {
            this.displayData(data);
            loader.classList.add('d-none');
        });

        compInfo(this.mySymbol, thirdUrl).then(data => {
            this.historicalLastMonth(data.historical);
        });

        compInfo(this.mySymbol, fourthUrl).then(data => {
            console.log(data, 'nibba');
            this.makeTable(data);
        });
        compInfo(this.mySymbol, fifthUrl).then(data => {
            console.log(data, 'nibbadibba');
            this.makeTable(data,1);
        });
        // fetch(thirdUrl).then(response => {
        //     return response.json();
        // }).then(data => {
        //     this.historicalLastMonth(data.historical);
        // })
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

    makeTable(data,id = ""){
        var tableData = [
            {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
            {id:2, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
        ]

        // let x = Object.entries(data[0]);
        let x = Object.keys(data[0]);
        // console.log(x);
        let newArr = [];
        for(let i = 0; i < x.length; i++){
            
            newArr[i] = this.coords(x[i]);
            // console.log(newArr[i]);
        }
        // console.log(newArr);
        // for()
        // var tableData = data;
        
        var table = new Tabulator(`#example-table${id}`, {
            data:data,
            autoColumns:true, //set initial table data
            // columns:[
            //     {title:"Name", field:"name"},
            //     {title:"Age", field:"age"},
            //     {title:"Gender", field:"gender"},
            //     {title:"Height", field:"height"},
            //     {title:"Favourite Color", field:"col"},
            //     {title:"Date Of Birth", field:"dob"},
            //     {title:"Cheese Preference", field:"cheese"},
            // ],
            // columns:newArr,
        });
    }

    coords(arr) {
        let x = arr;
        let y = arr;
        return {
            "title" : x,
            "field" : y
        };
    };


}