let currencyFrom;
let currencyTo;
let amountFrom;
let amountTo;
let exchangeRate;
let errorStatus = false;
let currencyTypeFrom;
let currencyTypeTo;
let inputFrom = document.getElementById("valueBefore");
let inputTo = document.getElementById("valueAfter");
let resultHeading = document.getElementById("resultHeading");
let resultText = document.getElementById("resultText");
let errorMessage = document.getElementById("errorMessage");
let button = document.getElementById("button");
button.addEventListener("click", mainFunction);

function mainFunction() {
    amountFrom = Number(inputFrom.value);
    amountTo = inputTo.value;
    exchangeRate = document.getElementById("exchangeRate").value;
    currencyTypeFrom = document.getElementById("currencyBefore").value;
    currencyTypeTo = document.getElementById("currencyAfter").value;

    errorChecking();
    if (!errorStatus) {
        calculation();
        console.log(amountTo);
        resultHeading.innerText = `Convert From ${currencyTypeFrom} To ${currencyTypeTo}`;
        resultText.innerText = `${amountFrom} ${currencyTypeFrom} : ${Number(
            amountTo
        ).toFixed(2)} ${currencyTypeTo}`;
    }
}
function errorChecking() {
    if (amountFrom === 0) {
        errorStatus = true;
        errorMessage.innerHTML = "Please type in amount to convert.";
    } else if (Number(exchangeRate.value) === 0) {
        errorStatus = true;
        errorMessage.innerHTML = "Please type in exchange rate.";
    } else {
        errorStatus = false;
        errorMessage.innerHTML = "";
    }
}
function calculation() {
    switch (currencyTypeFrom) {
        case "THB":
            switch (currencyTypeTo) {
                // THB => MMK
                case "MMK":
                    // 1000 Bhat = ... Kyats Exchange Rate
                    if (exchangeRate > 90000) {
                        amountTo = multiplication(
                            amountFrom / 1000,
                            exchangeRate
                        );
                        console.log(amountTo);
                        return amountTo;
                    }
                    // 1 Bhat = ...Kyats Exchange Rate
                    else if (exchangeRate > 10 && exchangeRate < 900) {
                        amountTo = multiplication(amountFrom, exchangeRate);
                        console.log(amountTo);
                        return amountTo;
                    }
                    break;

                // THB => CNY
                case "CNY":
                    if (exchangeRate > 400) {
                        amountTo = division(amountFrom, exchangeRate / 100);
                        return amountTo;
                    } else if (exchangeRate > 5 && exchangeRate < 100) {
                        amountTo = division(amountFrom, exchangeRate);
                        return amountTo;
                    }
                    break;
            }
            break;
        case "MMK":
            switch (currencyTypeFrom) {
                case "THB":
                    if (exchangeRate > 90000) {
                        amountTo = multiplication(
                            1000 / exchangeRate,
                            amountFrom
                        );
                    } else if (exchangeRate > 0 && exchangeRate < 1) {
                        amountTo = multiplication(amountFrom, exchangeRate);
                    } else {
                        amountTo = multiplication(amountFrom, 1 / exchangeRate);
                    }
                    break;
                case "CNY":
                    if (exchangeRate > 0 && exchangeRate < 200) {
                        amountTo = multiplication(amountFrom, exchangeRate);
                        return amountTo;
                    } else if (exchangeRate > 400) {
                        amountTo = multiplication(amountBefore, ER / 100);
                        return amountTo;
                    }
                    break;
            }
            break;
        case "CNY":
            switch (currencyTypeFrom) {
                case "MMK":
                    amountTo = multiplication(amountFrom, exchangeRate);
                    break;
                case "THB":
                    if (exchangeRate > 400) {
                        amountTo = multiplication(amountFrom, 1 / exchangeRate);
                        return amountTo;
                    } else if (exchangeRate > 0 && exchangeRate < 1) {
                        amountTo = multiplication(amountFrom, exchangeRate);
                        return amountTo;
                    }
                    break;
            }
            break;
    }
}
function multiplication(num, ER) {
    return num * ER;
}
function division(num, ER) {
    return num / ER;
}
