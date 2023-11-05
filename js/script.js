const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "EUR" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "MKD" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

const loadFlag = (element) => {
  for (code in country_code) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
    }
  }
};

window.addEventListener("load", () => {
  getExchangerate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangerate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let temporaryCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temporaryCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangerate();
});

const getExchangerate = () => {
  const amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  const exchangeRateText = document.querySelector(".exchange-rate");
  const apiKEY = "YOUR API KEY";
  if (amountValue == "" || amountValue == "0") {
    amount.value = "1";
    amountValue = 1;
  }

  exchangeRateText.innerHTML = "Converting...";
  let URL = `https://v6.exchangerate-api.com/v6/${apiKEY}/latest/${fromCurrency.value}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      let exchangeRate = data.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
      exchangeRateText.innerHTML = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateText.innerHTML = "Something went wrong...";
    });
};
