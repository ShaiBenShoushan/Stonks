
class SearchResults{
    static compareCounter = 0;
    constructor(onInputChange){
        this.inputChange = onInputChange;
        this.searched = 0;
        this.symbols = ""; 
    }
    //I will also divide this large function into smaller parts that would more understandable
    showResults(array){
        let resultList = document.getElementById('result-list');
        for(let i = 0; i < array.length; i++){
            let currentUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${array[i].symbol}`;
            let currentLI = document.createElement('LI');
            let currentImg = document.createElement('IMG');
            let currentA = document.createElement('A');
            let mySpan = document.createElement('SPAN');
            let imgSrc = `https://financialmodelingprep.com/images-New-jpg/${array[i].symbol}.jpg`;
            let myHref = `/company.html?symbol=${array[i].symbol}`;
            let compareButton = document.createElement('button');
            compareButton.textContent = "Compare";
            compareButton.id = `button${i}`;
            resultList.appendChild(currentLI);
            currentLI.appendChild(currentA);
            currentLI.appendChild(compareButton);
            currentA.href = myHref;
            currentA.className = "myA";
            currentImg.src = imgSrc;
            currentImg.className = "myImg";
            mySpan.className = "mySpan";
            currentA.appendChild(currentImg);
            currentA.appendChild(mySpan);
            this.colorSpan(array[i].symbol, this.inputChange(), mySpan);
            this.colorSpan(array[i].name, this.inputChange(), mySpan);
            this.getPercentage(currentUrl,mySpan);
            this.compareHandler(compareButton.id, array[i].symbol);
            this.compare();
        }
    }
    deleteResults(){
        let resultList = document.getElementById('result-list');
        while(resultList.firstChild){
            resultList.removeChild(resultList.firstChild);
        }
    }
    getPercentage(url,currentItem){
        let percentage;
        fetch(url).then(response =>{
            return response.json();
        }).then(data =>{
            percentage = data[0].changesPercentage;
            if(Math.sign(percentage) === 1){
                currentItem.innerHTML +=`<span class="company-green"> (+${percentage}%)</span>`;
            } else if(Math.sign(percentage) === -1){
                currentItem.innerHTML +=`<span class="company-red"> (${percentage}%)</span>`;
            }
        });
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
    compareHandler(buttonId, symbol){
        //sorry i used x i did it to understand something and will change it by the final deadline;
        let compareDiv = document.getElementById('compareDiv');
        document.getElementById(buttonId).addEventListener('click', (e) =>{
            console.log(compareDiv.childNodes.length);
            if(compareDiv.childNodes.length < 4){
                this.symbols += symbol + ",";
                let x = this.symbols;
                console.log(this.symbols,x.substring(0, x.length - 1));
                let button = document.createElement('button');
                compareDiv.appendChild(button);
                button.textContent = symbol + "X";
                fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${symbol}`)
                .then(response => {return response.json()})
                .then(data => {
                    console.log(data,buttonId);
                });
            }
        });
    }
    compare(){
        document.getElementById('compareButton').addEventListener('click', (e)=>{
            let x = this.symbols;
            console.log(x);
            window.location.href = `/compare.html?symbols=${x.substring(0, x.length - 1)}`
        })
    }
}