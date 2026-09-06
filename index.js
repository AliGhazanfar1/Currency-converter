const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let btn = document.querySelector("form button");
let msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangeRate();
})

const currencyNames = new Intl.DisplayNames(["en"], {  // converts currency code to country name
    type: "currency"
});

const dropdowns = document.querySelectorAll(".dropdown select");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = `${currCode} - ${currencyNames.of(currCode)}` ;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = true;
        }else if(select.name ==="to" && currCode==="INR"){
            newOption.selected = "selected";  //selected here is a boolean value
        }
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        })
    }
}

const updateFlag= (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async ()=>{    
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue<1 || amtValue==""){
        amtValue = 1;
        amount.value = "1";
    }
    let fromCurr = document.querySelector(".from select").value.toLowerCase();
    let toCurr = document.querySelector(".to select").value.toLowerCase();
    let url = `${BASE_URL}/${fromCurr}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr][toCurr];
    let finalAmt = amount.value * rate;
    msg.innerText = `${amount.value} ${fromCurr.toUpperCase()} = ${finalAmt} ${toCurr.toUpperCase()}`
}


