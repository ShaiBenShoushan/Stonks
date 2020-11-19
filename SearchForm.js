
   async function tenCompanies(symbol){
    const theList = document.getElementById('result-list');
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`;
    // let loader.classList.remove('d-none');
    theList.classList.add('d-none');
    let response = await fetch(url);
    if(response.status == 200){
        let myArray = await response.json();
        return myArray;
        // console.log(this.myArray);
        // super.showResults(this.myArray, this.inputValue);
        // let loader.classList.add('d-none');
        // theList.classList.remove('d-none');
    } else {
        let error = await response.text();
        // loader.classList.add('d-none');
        // theList.classList.remove('d-none');
    }
}

async function getPercentage(symbol){
    // let percentage;
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${symbol}`;
    let response = await fetch(url);
    let data = await response.json();
    return data[0].changesPercentage;
    // fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${symbol}`).then(response =>{
    //     // console.log(response.json());
    //     return response.json();
    // }).then(data =>{
    //     percentage = data[0].changesPercentage;
    //     // if(Math.sign(percentage) === 1){
    //     //     currentItem.innerHTML +=`<span class="company-green"> (+${percentage}%)</span>`;
    //     // } else if(Math.sign(percentage) === -1){
    //     //     currentItem.innerHTML +=`<span class="company-red"> (${percentage}%)</span>`;
    //     // }
    //     return percentage;
    // });
}


class SearchForm{
    constructor(){
        // super();
        this.render();

    }

    render(){
        this.loader = document.getElementById('loader');
        const searchButton = document.getElementById('button');
        const searchInput = document.getElementById('search');
        
        searchInput.addEventListener('input', (event) => {
            this.inputValue = event.target.value;
            console.log(this.inputValue)
            if(this.inputValue){
                searchButton.disabled = false;
            } else{
                searchButton.disabled = true;
            }
        });
        searchButton.addEventListener('click', (event) => {
            console.log('hi')
            this.executeSearch();
            // super.deleteResults();
        });
        // this.listeners();

    }

    executeSearch(){
        tenCompanies(this.inputValue).then((data)=>{
            console.log(data);
            this.onSearchCallback(data, this.inputValue);
        });
    }


    onSearch(callback){
        this.onSearchCallback = callback;
    }
    
    // async tenCompanies(){
    //     const theList = document.getElementById('result-list');
    //     this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.inputValue}&limit=10&exchange=NASDAQ`;
    //     this.loader.classList.remove('d-none');
    //     theList.classList.add('d-none');
    //     let response = await fetch(this.url);
    //     if(response.status == 200){
    //         this.myArray = await response.json();
    //         // console.log(this.myArray);
    //         // super.showResults(this.myArray, this.inputValue);
    //         this.loader.classList.add('d-none');
    //         theList.classList.remove('d-none');
    //     } else {
    //         let error = await response.text();
    //         loader.classList.add('d-none');
    //         theList.classList.remove('d-none');
    //     }
    // }
    // listeners(){
    //     this.searchInput.addEventListener('input', this.inputListener);
    //     this.searchButton.addEventListener('click', this.buttonListener);
    // }
    // inputListener(event){
    //     this.inputValue = event.target.value;
    //     if(this.inputValue){
    //         searchButton.disabled = false;
    //     } else{
    //         searchButton.disabled = true;
    //     }
    // }
    // buttonListener(event){
    //     this.tenCompanies(this.inputValue);
    //     super.deleteResults();
    // }
    // getInput(){
    //     return this.inputValue;
    // }

    
}
