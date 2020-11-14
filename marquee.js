
class Marquee{
    constructor(element){
        this.marqueeElement = element;
        this.textList = [];
    }

    getData(url){
        fetch(url).then(response =>{
            return response.json();
        }).then(data =>{
            for(let i = 0; i < data.length; i++){
                let newSpan = document.createElement('span');
                let newSpanInside = document.createElement('span');
                this.marqueeElement.appendChild(newSpan);
                this.marqueeElement.appendChild(newSpanInside);
                newSpan.textContent = `${data[i].symbol}: $${data[i].price} `;
                if(Math.sign(data[i].changesPercentage) === 1){
                    newSpanInside.textContent = `(+${data[i].changesPercentage}%)   `;
                    newSpanInside.classList.add('company-green');
                } else if(Math.sign(data[i].changesPercentage) === -1){
                    newSpanInside.textContent =`(${data[i].changesPercentage}%)   `;
                    newSpanInside.classList.add('company-red');
                }
            }
        });
    }
}