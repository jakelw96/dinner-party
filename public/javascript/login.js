async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log(username)
    console.log(password)

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // document.location.replace('/dashboard/');
            console.log('Success! Logged in!')
        } else {
            alert(response.statusText);
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
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

function signupPage(event) {

    window.location.replace('/signup')
};

document.getElementById('loginBtn').addEventListener('click', loginFormHandler);

// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

document.getElementById('sign-up-btn').addEventListener('click', signupPage);
        