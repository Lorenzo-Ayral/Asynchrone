import './style.css';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v2/name/france');
request.send();

request.addEventListener('load', function() {
    const country = JSON.parse(this.responseText);
    const countryCard = `
        <article class="country">
            <img class="country__img" src="${country.flag}" />
            <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫 ${(country.population / 1000000).toFixed(1)}</span>POP people</p>
            <p class="country__row"><span>🗣️ ${country.languages[0].name}</span>LANG</p>
            <p class="country__row"><span>💰 ${country.currencies[0].name}</span>CUR</p>
            </div>
        </article>
    `;
})