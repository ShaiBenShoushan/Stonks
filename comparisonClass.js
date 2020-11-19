// class Comparison{
//     constructor(){
//         this.symbols = [];
//     }
//     compareHandler(buttonId, symbol){
//         let compareDiv = document.getElementById('compareDiv');
//         document.getElementById(buttonId).addEventListener('click', (e) =>{
//             if(compareDiv.childNodes.length < 4){
//                 console.log(symbol);
//                 this.symbols += symbol;
//                 console.log(this.symbols,'hello');
//                 let button = document.createElement('button');
//                 compareDiv.appendChild(button);
//                 button.textContent = symbol + "X";
//                 this.compareListbutton(button, compareDiv);
//                 // fetch(this.url+`${this.symbols}`)
//                 // .then(response => {return response.json()})
//                 // .then(data => {
//                 // });
//                 fetch(this.url+`${symbol}`)
//                 .then(response => {return response.json()})
//                 .then(data => {
//                 });
//             }
//         });
//     }

//     // compare(){
//     //     document.getElementById('compareButton').addEventListener('click', (e)=>{
//     //         console.log('hello');
//     //         let symbolsToCompare = this.symbols;
//     //         symbolsToCompare = symbolsToCompare.split(',').join();
//     //         console.log(this.symbols);
            
//     //         window.location.href = `/compare.html?symbols=${symbolsToCompare}`
//     //     })
//     // }


//     compare(){
//         document.getElementById('compareButton').addEventListener('click', (e)=>{
//             let symbolsToCompare = this.symbols;
//             window.location.href = `/compare.html?symbols=${symbolsToCompare.substring(0, symbolsToCompare.length - 1)}`
//         })
//     }
//     compareListbutton(button, parent){
//         button.addEventListener('click', (e)=>{
//             parent.removeChild(button);
//         });
//     }
// }

class Comparison{
    constructor(){
        this.symbols = [];
        this.clicked = false;
    }
    compareHandler(buttonId, symbol){
        let compareDiv = document.getElementById('compareDiv');
        document.getElementById(buttonId).addEventListener('click', (e) =>{
            if(compareDiv.childNodes.length < 4){
                this.symbols.push(symbol);
                let button = document.createElement('button');
                compareDiv.appendChild(button);
                // button.textContent = symbol + "X";
                button.textContent = symbol;
                this.compareListbutton(button, compareDiv);
            }
        });
    }

    compare(){
        document.getElementById('compareButton').addEventListener('click', (e)=>{
            let symbolsToCompare = this.symbols.toString().split(",");
            window.location.href = `/compare.html?symbols=${symbolsToCompare}`
        })
    }

    compareListbutton(button, parent){
        
        button.addEventListener('click', (e)=>{
            parent.removeChild(button);
            this.symbols.pop();
        });
    }
}