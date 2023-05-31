function displayMessage(value) {
    console.log(value);
}

let promise = false;
let message = '';

const promiseChecker = new Promise((resolve, reject) => {
    if (promise == true) {
        message = 'Promise value is true !';
        resolve(message);
    } else {
        message = "Promise value is false !";
        reject(message);
    }
})

promiseChecker.then(
    function (message) { displayMessage(message) },
    function (error) { displayMessage(error) }
)
