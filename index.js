let inputValue = undefined;

const searchButton = document.getElementById('button');
const searchInput = document.getElementById('search');
const loader = document.getElementById('loader');
const marq = document.getElementById('marq');

const companiesForMarquee = "GOOG, AAPL, DBX, WYNN, BYND, TSLA, FL, MSFT, AMZN, FB, BRK-B, FIZZ, NVDA, IRBT, BA, DIS, GE, HD, NKE, SBUX, JNJ, PEP, MMM, V, WM, JPM, LMT, LEG, GM, LUV, GS, DAL, BK-PC, AXP, KO, WFC, BAC, UBER, SWKS, QCOM, SCHW"

const marqSpan = new Marquee(marq);

marqSpan.getData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${companiesForMarquee}`);


const searcher = new SearchForm(loader, getInput);

function getInput(){
    return inputValue;
}

searchInput.addEventListener('input', inputListener);
searchButton.addEventListener('click', buttonListener);



function inputListener(event){
    inputValue = event.target.value;
    if(inputValue){
        searchButton.disabled = false;
    } else{
        searchButton.disabled = true;
    }
}

function buttonListener(event){
    searcher.tenCompanies(inputValue);
}


//I feel like something is wrong with my classes and inhertiance, did I do it right? it fells like im missing the point and if you could share some insights that woyld be cool <3. and also with catch and errors idk why but it doesnt work for me with catch.(i mean on the async function).