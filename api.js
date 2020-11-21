async function compInfo(url){
    let response = await fetch(url);
    try{
        let myArray = await response.json();
        return myArray;
    } catch(err) {
        console.error(err);
    }
}

async function tenCompanies(symbol){
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`;
    let response = await fetch(url);
    try{
        let myArray = await response.json();
        return myArray;
    } catch(err) {
        console.error(err);
    }
}

async function marqueeData(url, ext){
    try{
        let response = await fetch(url + ext);
        let data = await response.json();
        return data;
    } catch(err){
        console.error(err);
    }
}


