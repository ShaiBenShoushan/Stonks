class Comparison{
    constructor(){
        this.symbols = [];
        this.clicked = false;
        this.compareDiv = document.getElementById('compareDiv');
        this.compareButton = document.getElementById('compareButton');

    }
    compareHandler(buttonId, symbol){
        document.getElementById(buttonId).addEventListener('click', (e) =>{
            console.log(this.compareDiv.childNodes.length);
            if(this.compareDiv.childNodes.length > 1){
                compareButton.disabled = false;
            } 
            if(this.compareDiv.childNodes.length < 4){
                this.symbols.push(symbol);
                let button = document.createElement('button');
                this.compareDiv.appendChild(button);
                button.textContent = symbol + " X";
                this.compareListbutton(button, compareDiv);
                this.disabled = false;
            }

        });
    }
    compare(){
        this.compareButton.addEventListener('click', (e)=>{
            let symbolsToCompare = this.symbols.toString().split(",");
            window.location.href = `https://shaibenshoushan.github.io/Stonks/compare.html?symbols=${symbolsToCompare}`
        })
    }
    compareListbutton(button, parent){
        button.addEventListener('click', (e)=>{
            console.log(this.compareDiv.childNodes.length);
            if(this.compareDiv.childNodes.length < 4){
                compareButton.disabled = true;
            }
            parent.removeChild(button);
            this.symbols.pop();
        });
    }
}