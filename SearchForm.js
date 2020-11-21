class SearchForm{
    constructor(){
        this.render();
    }
    render(){
        const searchButton = document.getElementById('button');
        const searchInput = document.getElementById('search');
        
        searchInput.addEventListener('input', (event) => {
            this.inputValue = event.target.value;
            if(this.inputValue){
                searchButton.disabled = false;
            } else{
                searchButton.disabled = true;
            }
        });
        let debounce;
        searchInput.addEventListener('keyup',()=>{
            if(debounce){
                clearTimeout(debounce);
              }
              debounce = setTimeout(() => {
                this.executeSearch();
              }, 500);
        });
        searchButton.addEventListener('click', (event) => {
            this.executeSearch();
        });
    }
    executeSearch(){
        const loader = document.getElementById('loader');
        const resultList = document.getElementById('result-list');
        resultList.classList.add('d-none');
        loader.classList.remove('d-none');
        tenCompanies(this.inputValue).then((data)=>{
            this.onSearchCallback(data, this.inputValue);
            loader.classList.add('d-none');
        });
    }
    onSearch(callback){
        this.onSearchCallback = callback;
    }
}
