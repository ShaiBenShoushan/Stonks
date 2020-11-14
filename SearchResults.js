
class SearchResults{
    constructor(onInputChange){
        this.inputChange = onInputChange;
        this.searched = 0;
    }

    showResults(array){
        let resultList = document.getElementById('result-list');
        for(let i = 0; i < array.length; i++){
            let currentUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/${array[i].symbol}`;
            let currentLI = document.createElement('LI');
            let currentImg = document.createElement('IMG');
            let currentA = document.createElement('A');
            let mySpan = document.createElement('SPAN');
            let imgSrc = `https://financialmodelingprep.com/images-New-jpg/${array[i].symbol}.jpg`;
            let myHTML = `(${array[i].symbol})${array[i].name}`;
            let myHref = `/company.html?symbol=${array[i].symbol}`;
            if(this.searched >= 10){
                document.querySelector('.myA').href = myHref;
                document.querySelector('.myImg').src = imgSrc;;
                document.querySelector('.mySpan').textContent = myHTML;
                this.getPercentage(currentUrl, document.querySelector('.mySpan'));
            } else{
                resultList.appendChild(currentLI);
                currentLI.appendChild(currentA);
                currentA.href = myHref;
                currentA.className = "myA";
                currentImg.src = imgSrc;
                currentImg.className = "myImg";
                mySpan.textContent = myHTML;
                mySpan.className = "mySpan";
                currentA.appendChild(currentImg);
                currentA.appendChild(mySpan);
                this.getPercentage(currentUrl,mySpan);
                this.searched++;
            }
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

}