const faker = require('faker');

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

// Function to generate random data in the signup fields
function fakerData(event) {
    event.preventDefault();

    // Creates random data to use for signing up via faker.js
    let randomEmail = faker.internet.email();
    let randomUsername = faker.internet.userName();
    let randomPassword = faker.internet.password();


    document.querySelector('#username-signup').value = randomUsername.trim();
    document.querySelector('#email-signup').value = randomEmail.trim();
    document.querySelector('#password-signup').value = randomPassword.trim();
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.getElementById('randBtn').addEventListener('click', fakerData);