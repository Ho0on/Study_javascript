'use strinct';

// Promise is a JavaScript object for asynchronous operation.
// state: pending -> fulfilled or rejected
// Producer vs consumer

// 1. Producer
// when newy Promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
    //doing some heavy work(network, read files)
    console.log('doing something...');
    setTimeout(() => {
        resolve('hoon');
        reject(new Error('no network'))
    }, 2000);
});


// 2. Consumers: then, catch, finally
promise
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('finally');
    })


// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
})

fetchNumber
    .then(num => num * 2)
    .then(function (num) {
        return num * 3;
    })
    .then(function (num) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(num - 1), 1000
            });
        });
    })
    .then(num => console.log(num));


// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('error! ' + hen + ' => 🥚')), 1000);
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(egg + ' => 🍳'), 1000);
    });

getHen()
    .then(hen => getEgg(hen)) // = .then(getEgg)
    .catch(error => {
        return '🍈';
    })
    .then(egg => cook(egg)) // = .then(cook)
    .then(meal => console.log(meal)) // = .then(console.log)
    .catch(console.log);