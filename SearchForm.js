
class SearchForm extends SearchResults{
    
    constructor(loaderElement, onInputChange, url, array){
        super(onInputChange);
        this.myArray = array;
        this.loader = loaderElement;
        this.input = onInputChange;
        this.myUrl = url;
    }
    
    async tenCompanies(){
        const theList = document.getElementById('result-list');
        this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.input()}&limit=10&exchange=NASDAQ`;
        this.loader.classList.remove('d-none');
        theList.classList.add('d-none');
        let response = await fetch(this.url);
        if(response.status == 200){
            this.myArray = await response.json();
            super.showResults(this.myArray, this.input());
            this.loader.classList.add('d-none');
            theList.classList.remove('d-none');
        } else {
            let error = await response.text();
            loader.classList.add('d-none');
            theList.classList.remove('d-none');
        }
    }
    
}
