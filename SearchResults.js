class SearchResults{
    constructor(){
        this.resultList = document.getElementById('result-list');
    }
    showResults(array,inputValue){
        this.setParams(inputValue);
        if(!inputValue){
            this.deleteResults();
        } else {
            this.deleteResults();
            this.displayResults(array,inputValue);
        }
    }
    displayResults(array, inputValue){
        let symbols = [];
        let spanPercent = [];
        this.resultList.classList.remove('d-none');
        for(let i = 0; i < array.length; i++){
            symbols[i] = array[i].symbol;
            let currentLI = document.createElement('LI');
            let mySpan = document.createElement('SPAN');
            spanPercent[i] = mySpan;
            this.resultList.appendChild(currentLI);
            this.linkCreator(currentLI, array[i].symbol,mySpan);
            this.buttonCreator(currentLI, i, array[i].symbol);
            this.colorSpan(array[i].symbol, inputValue, mySpan);
            this.colorSpan(array[i].name, inputValue, mySpan);
            this.compare();
            if(i === array.length - 1){
                this.getPercentageOnce(symbols, spanPercent);
            }
        }
    }
    getPercentageOnce(str ,spans){
        str = str.join(",");
        const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${str}`;
        compInfo(url).then((data)=>{
            for(let i = 0; i < spans.length; i++){
                let newSpan = document.createElement('span'); 
                if(Math.sign(data[i].changesPercentage) === 1){
                    newSpan.textContent = `   (+${data[i].changesPercentage}%)`;
                    newSpan.classList.add('comapny-green');
                    newSpan.style.color = 'lightgreen';
                } else if(Math.sign(data[i].changesPercentage) === -1){
                    newSpan.textContent =`   (${data[i].changesPercentage}%)`;
                    newSpan.classList.add('comapny-red');
                    newSpan.style.color = 'red';
                }
                spans[i].appendChild(newSpan);
            }
        });
    }
    onButtonCreated(callback){
        this.buttonCreate = callback;
    }
    onCompare(callback){
        this.compare = callback;
    }
    deleteResults(){
        while(this.resultList.firstChild){
            this.resultList.removeChild(this.resultList.firstChild);
        }
    }
    linkCreator(li,symbol,span){
        let currentA = document.createElement('A');
        let currentImg = document.createElement('IMG');
        li.appendChild(currentA);
        let imgSrc = `https://financialmodelingprep.com/images-New-jpg/${symbol}.jpg`;
        let myHref = `https://shaibenshoushan.github.io/Stonks/company.html?symbol=${symbol}`;
        currentA.href = myHref;
        currentA.className = "myA";
        currentImg.src = imgSrc;
        currentImg.className = "myImg";
        span.className = "mySpan";
        currentA.appendChild(currentImg);
        currentA.appendChild(span);
    }
    buttonCreator(li, i, symbol){
        let compareButton = document.createElement('button');
        compareButton.textContent = "Compare";
        compareButton.id = `button${i}`;
        li.appendChild(compareButton);
        this.buttonCreate(compareButton.id, symbol);
    }
    colorSpan(myString, input, currentSpan){
        let x = myString.toLowerCase();
        let y = input.toLowerCase();
        const substring = new RegExp(input, "gi");
        let replacedString = myString.replace(substring ,`<mark>${input}</mark>`)
        if(x.indexOf(y) === 0){
            replacedString = replacedString.replace(`<mark>${input}</mark>`, `<mark>${input.toUpperCase()}</mark>`);

        }
        currentSpan.innerHTML = replacedString;
    }
    setParams(string){
        let baseUrl = "/index.html";
        if(string === ""){
            window.history.pushState({page: "another"}, "another page",baseUrl);
        } else{
            window.history.pushState({page: "another"}, "another page",baseUrl);
            window.history.pushState({page: "another"}, "another page",baseUrl + `?query=${string}`);
        } 
    }

}
