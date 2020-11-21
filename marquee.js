class Marquee{
    constructor(element){
        this.marqueeElement = element;
        const theUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/`;
        const companiesMarquee = "GOOG, AAPL, DBX, WYNN, BYND, TSLA, FL, MSFT, AMZN, FB, BRK-B, FIZZ, NVDA, IRBT, BA, DIS, GE, HD, NKE, SBUX, JNJ, PEP, MMM, V, WM, JPM, LMT, LEG, GM, LUV, GS, DAL, BK-PC, AXP, KO, WFC, BAC, UBER, SWKS, QCOM, SCHW";
        this.mainFunc(theUrl, companiesMarquee);
    }
    mainFunc(url, ext){
        marqueeData(url, ext).then(data =>{
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
        })
    }
}