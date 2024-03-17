let currency1;
let currency2;
let amountBefore;
let amountAfter;
let errorStatus = true;
let input1 = document.getElementById("valueBefore"); // input element
let input2 = document.getElementById("valueAfter"); //input element
let currencyH1 = document.getElementById("currencyH1");
let currencyH2 = document.getElementById("currencyH2");
let resultHeading = document.getElementById("resultHeading");
let resultText = document.getElementById("resultText");
let mainFunction = function () {
    currency1 = document.getElementById("currencyBefore").value; //Currency Text 1
    currency2 = document.getElementById("currencyAfter").value; //Currency Text 2

    amountBefore = Number(document.getElementById("valueBefore").value); // input element
    amountAfter = Number(document.getElementById("valueAfter").value); //input element

    ER = Number(document.getElementById("exchangeRate").value);
    if (amountBefore === 0) {
        errorStatus = false;
        errorMessage.innerHTML = "Please type in amount to convert.";
    } else if (ER === 0) {
        errorStatus = false;
        errorMessage.innerHTML = "Please type in exchange rate.";
    } else if (ER !== 0 && amountBefore !== 0) {
        errorStatus = true;
        errorMessage.innerHTML = "";
    }

    if (errorStatus) {
        calculation();
        input2.value = amountAfter;
        resultHeading.innerText = `Convert From ${currency1} To ${currency2}`;
        resultText.innerText = `${amountBefore} ${currency1} : ${amountAfter} ${currency2}`;
    }
};

let calculation = function () {
    if (currency1 == "THB") {
        if (currency2 == "MMK") {
            amountAfter = ER * amountBefore;
        } else if (currency2 == "CNY") {
            amountAfter = amountBefore / ER;
        }
    } else if (currency1 == "CNY") {
        if (currency2 == "MMK") {
            amountAfter = ER * amountBefore;
        } else if (currency2 == "THB") {
            amountAfter = Math.round(amountBefore * ER);
        }
    } else if (currency1 == "MMK") {
        if (currency2 == "THB") {
            if (ER > 0 && ER < 1) {
                amountAfter = ER * amountBefore;
            } else if (ER > 1 && ER < 200) {
                amountAfter = (1 / ER) * amountBefore;
            } else {
                amountAfter = (1000 / ER) * amountBefore;
            }
        } else if (currency2 == "CNY") {
            if (ER > 0 && ER < 100) {
                amountAfter = amountBefore / ER;
            } else if (ER > 100 && ER < 1000) {
                amountAfter = (ER / 100) * amountBefore;
            }
        }
    }

    amountAfter = Number(amountAfter).toFixed(2);
};
