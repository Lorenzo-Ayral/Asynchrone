import './style.css';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = (msg) => {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}

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

const getJson = (url, errorMsg = 'Erreur lors de l\'appel de l\'API') => {
    return fetch(url).then(response => {
        if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();
    })
}

const getCountryData = (country) => {
    getJson(`https://restcountries.com/v2/name/${country}`, "Pays non trouvé")
        .then(([ country ]) => {
            renderCountry(country);

            if(!country.borders) throw new Error('Pas de pays voisin direct');
            const [paysVoisin] = country.borders;
            return getJson(`https://restcountries.com/v2/alpha/${paysVoisin}`, "Pays voisin non trouvé")
        })
        .then(country => {
            renderCountry(country, 'neighbour')

            if(!country.borders) throw new Error('Pas de deuxième pays voisin');
            const [paysVoisin] = country.borders;
            return getJson(`https://restcountries.com/v2/alpha/${paysVoisin}`, "Pays voisin non trouvé")
        })
        .then(country => {
            renderCountry(country, 'neighbour')
        })
        .catch(error => renderError(error.message))

    // Callback hell
    // const request = new XMLHttpRequest();
    // request.open('GET', `https://restcountries.com/v2/name/${country}`);
    // request.send();
    //
    // request.addEventListener('load', function() {
    //     const [country] = JSON.parse(this.responseText);
    //     renderCountry(country);
    //
    //     const [paysVoisin] = country.borders;
    //     if(!paysVoisin) return;
    //
    //     const request2 = new XMLHttpRequest();
    //     request2.open('GET', `https://restcountries.com/v2/alpha/${paysVoisin}`);
    //     request2.send();
    //
    //     request2.addEventListener('load', function() {
    //         const country2 = JSON.parse(this.responseText);
    //         renderCountry(country2, 'neighbour');
    //
    //         const [paysVoisin2] = country2.borders;
    //         if(!paysVoisin2) return;
    //
    //         const request3 = new XMLHttpRequest();
    //         request3.open('GET', `https://restcountries.com/v2/alpha/${paysVoisin2}`);
    //         request3.send();
    //
    //         request3.addEventListener('load', function() {
    //             const country3 = JSON.parse(this.responseText);
    //             renderCountry(country3, 'neighbour');
    //         })
    //     })
    // })
}

// btn.addEventListener('click', () => {
    getCountryData('Canada');
// })

