const lotery = new Promise(function (resolve, reject) {
    if (Math.random() > 0.5) {
        resolve('You win !');
    } else {
        reject(new Error('You lose !'));
    }
})

lotery.then(res => console.log(res)).catch(err => console.error(err));