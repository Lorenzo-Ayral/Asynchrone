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

const getJson = async (url, errorMsg = 'Erreur lors de l\'appel de l\'API') => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch(error) {
        throw new Error(error);
    }

    //.then hell
    // return fetch(url).then(response => {
    //     if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    //     return response.json();
    // })
}

const checkNeighbour = (data) => {
    if(!data.borders) throw new Error('Pas de pays voisin direct');
}

const getCountryData = async (country) => {
    try {
        const [data] = await getJson(`https://restcountries.com/v2/name/${country}`)
        renderCountry(data);
        checkNeighbour(data)
        const [paysVoisin] = data.borders;

        const data2 = await getJson(`https://restcountries.com/v2/alpha/${paysVoisin}`, "Pays voisin non trouvé")
        checkNeighbour(data2)
        renderCountry(data2, 'neighbour');
        const [paysVoisin2] = data2.borders;

        const data3 = await getJson(`https://restcountries.com/v2/alpha/${paysVoisin2}`, "Pays voisin non trouvé")
        checkNeighbour(data3)
        renderCountry(data3, 'neighbour')
    } catch(error) {
        renderError(error.message)
    }
    //.then hell
    // getJson(`https://restcountries.com/v2/name/${country}`, "Pays non trouvé")
    //     .then(([ country ]) => {
    //         renderCountry(country);
    //
    //         if(!country.borders) throw new Error('Pas de pays voisin direct');
    //         const [paysVoisin] = country.borders;
    //         return getJson(`https://restcountries.com/v2/alpha/${paysVoisin}`, "Pays voisin non trouvé")
    //     })
    //     .then(country => {
    //         renderCountry(country, 'neighbour')
    //
    //         if(!country.borders) throw new Error('Pas de deuxième pays voisin');
    //         const [paysVoisin] = country.borders;
    //         return getJson(`https://restcountries.com/v2/alpha/${paysVoisin}`, "Pays voisin non trouvé")
    //     })
    //     .then(country => {
    //         renderCountry(country, 'neighbour')
    //     })
    //     .catch(error => renderError(error.message))

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

// const getCountriesData = async (c1, c2, c3) => {
//     const data = await Promise.all([
//         getJson(`https://restcountries.com/v2/name/${c1}`),
//         getJson(`https://restcountries.com/v2/name/${c2}`),
//         getJson(`https://restcountries.com/v2/name/${c3}`)
//     ])
//     return data;
// }

btn.addEventListener('click', async () => {
    countriesContainer.innerHTML = '';
    try {
        const data = await getJson(`https://restcountries.com/v2/all`);
        const random = Math.trunc(Math.random() * data.length);
        await getCountryData(data[random].name);
    } catch(error) {
        renderError(error.message)
    }
})

