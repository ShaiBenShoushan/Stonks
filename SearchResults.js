
class SearchResults{
    static compareCounter = 0;
    constructor(){
        // super();
        this.clicked = false;
        // this.inputChange = onInputChange;
        this.searched = 0;
        this.symbols = "";
        this.resultList = document.getElementById('result-list');
        this.url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/`;

        //you can do const x = blahblah here instead of this.
        
    }
    showResults(array,inputValue){
        if(this.clicked){
            this.deleteResults();
        }
        const ul = document.getElementById('result-list');
        ul.classList.remove('d-none');
        for(let i = 0; i < array.length; i++){
            let currentLI = document.createElement('LI');
            let mySpan = document.createElement('SPAN');
            ul.appendChild(currentLI);
            this.linkCreator(currentLI, array[i].symbol,mySpan);
            this.buttonCreator(currentLI, i, array[i].symbol);
            this.colorSpan(array[i].symbol, inputValue, mySpan);
            this.colorSpan(array[i].name, inputValue, mySpan);
            getPercentage(array[i].symbol).then((data) => {
                this.createPercent(data, mySpan);
            })

            this.compare();
        }
        this.clicked = !this.clicked;
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
        // super.compareHandler(compareButton.id, symbol);
        this.buttonCreate(compareButton.id, symbol);
    }


    colorSpan(myString, input, currentSpan){
        let mySpan = document.createElement('SPAN');
        let mySpan2 = document.createElement('SPAN');
        currentSpan.appendChild(mySpan);
        currentSpan.appendChild(mySpan2);
        if(myString.toLowerCase().includes(input.toLowerCase()) && myString.toLowerCase().indexOf(input.toLowerCase()) === 0){
            let secondString  = myString.split('').slice((input.length)).join('');
            mySpan.textContent = input.toUpperCase();
            mySpan2.textContent = secondString + " ";
            mySpan.classList.add('highlighted-span');
        } else {
            mySpan.classList.remove('highlighted-span');
            mySpan.textContent = myString;
        }
    }

    createPercent(string, currentItem){
        console.log(string);
        if(Math.sign(string) === 1){
            currentItem.innerHTML +=`<span class="company-green"> (+${string}%)</span>`;
        } else if(Math.sign(string) === -1){
            currentItem.innerHTML +=`<span class="company-red"> (${string}%)</span>`;
        }
    }

}

   //I will also divide this large function into smaller parts that would more understandable
    // showResults(array){
    //     for(let i = 0; i < array.length; i++){
    //         let currentLI = document.createElement('LI');
    //         let mySpan = document.createElement('SPAN');
    //         this.resultList.appendChild(currentLI);
    //         this.linkCreator(currentLI, array[i].symbol,mySpan);
    //         this.buttonCreator(currentLI, i, array[i].symbol);
    //         this.colorSpan(array[i].symbol, this.inputChange(), mySpan);
    //         this.colorSpan(array[i].name, this.inputChange(), mySpan);
    //         this.getPercentage(array[i].symbol, mySpan);
    //         super.compare();
    //     }
    // }

    // linkCreator(li,symbol,span){
    //     let currentA = document.createElement('A');
    //     let currentImg = document.createElement('IMG');
    //     li.appendChild(currentA);
    //     let imgSrc = `https://financialmodelingprep.com/images-New-jpg/${symbol}.jpg`;
    //     let myHref = `/company.html?symbol=${symbol}`;
    //     currentA.href = myHref;
    //     currentA.className = "myA";
    //     currentImg.src = imgSrc;
    //     currentImg.className = "myImg";
    //     span.className = "mySpan";
    //     currentA.appendChild(currentImg);
    //     currentA.appendChild(span);
    // }

    // buttonCreator(li, i, symbol){
    //     let compareButton = document.createElement('button');
    //     compareButton.textContent = "Compare";
    //     compareButton.id = `button${i}`;
    //     li.appendChild(compareButton);
    //     super.compareHandler(compareButton.id, symbol);
    // }




    // getPercentage(symbol,currentItem){
    //     let percentage;
    //     fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${symbol}`).then(response =>{
    //         // console.log(response.json());
    //         return response.json();
    //     }).then(data =>{
    //         percentage = data[0].changesPercentage;
    //         if(Math.sign(percentage) === 1){
    //             currentItem.innerHTML +=`<span class="company-green"> (+${percentage}%)</span>`;
    //         } else if(Math.sign(percentage) === -1){
    //             currentItem.innerHTML +=`<span class="company-red"> (${percentage}%)</span>`;
    //         }
    //     });
    // }
    // colorSpan(myString, input, currentSpan){
    //     let mySpan = document.createElement('SPAN');
    //     let mySpan2 = document.createElement('SPAN');
    //     currentSpan.appendChild(mySpan);
    //     currentSpan.appendChild(mySpan2);
    //     if(myString.toLowerCase().includes(input.toLowerCase()) && myString.toLowerCase().indexOf(input.toLowerCase()) === 0){
    //         let secondString  = myString.split('').slice((input.length)).join('');
    //         mySpan.textContent = input.toUpperCase();
    //         mySpan2.textContent = secondString + " ";
    //         mySpan.classList.add('highlighted-span');
    //     } else {
    //         mySpan.classList.remove('highlighted-span');
    //         mySpan.textContent = myString;
    //     }
    // }
