import './style.css';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = (country, className="") => {
    const countryCard = `
        <article class="country ${className}">
            <img class="country__img" src="${country.flag}" />
            <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫 ${(country.population / 1000000).toFixed(1)}</span>POP people</p>
            <p class="country__row"><span>🗣️ ${country.languages[0].name}</span>LANG</p>
            <p class="country__row"><span>💰 ${country.currencies[0].name}</span>CUR</p>
            </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', countryCard);
    countriesContainer.style.opacity = 1;
}

const getCountryData = (country) => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function() {
        const [country] = JSON.parse(this.responseText);
        renderCountry(country);

        const [paysVoisin] = country.borders;
        if(!paysVoisin) return;

        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${paysVoisin}`);
        request2.send();

        request2.addEventListener('load', function() {
            const country2 = JSON.parse(this.responseText);
            renderCountry(country2, 'neighbour');
        })
    })
}

// btn.addEventListener('click', () => {
    getCountryData('france');
// })

