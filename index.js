let inputValue = undefined;

const searchButton = document.getElementById('button');
const searchInput = document.getElementById('search');
const loader = document.getElementById('loader');

searchInput.addEventListener('input', inputListener)
searchButton.addEventListener('click', buttonListener);

let listArray = [];
let listArrayCheck = true;

function inputListener(event){
    inputValue = event.target.value;
    if(inputValue){
        searchButton.disabled = false;
    } else{
        searchButton.disabled = true;
    }
}

function buttonListener(event){
    tenCompanies(inputValue);
}

async function tenCompanies(value){
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${value}&limit=10&exchange=NASDAQ`;
    loader.classList.remove('d-none');
    let response = await fetch(url);
    if(response.status == 200){
        let json = await response.json();
        showResults(json);
        loader.classList.add('d-none');
    } else {
        let error = await response.text();
        loader.classList.add('d-none');
    }
}

function showResults(array){
    let resultList = document.getElementById('result-list');
    for(let i = 0; i < array.length; i++){
        let currentLI = document.createElement('LI');
        let imgSrc = `"https://financialmodelingprep.com/images-New-jpg/${array[i].symbol}.jpg"`;
        if(listArray[i]){
            listArray[i].innerHTML = `<img src=${imgSrc}><a href="/company.html?symbol=${array[i].symbol}">${array[i].symbol} ${array[i].name}</a>`;
        } else{
            currentLI.id = `li${i+1}`
            resultList.appendChild(currentLI);
            currentLI.innerHTML = `<img src=${imgSrc}><a href="/company.html?symbol=${array[i].symbol}">${array[i].symbol} ${array[i].name}</a>`;
            listArray[i] = currentLI;
        }
    }
}


