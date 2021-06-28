const interestArr = [];

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

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
            document.location.replace('/dashboard');
            console.log('Success! Logged in!')
        } else {
            alert(response.statusText);
        }
    }
}

// Clickable interests to add
let allButtons = document.querySelectorAll('button[class^=interest]');

for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener('click', function() {
    let interestID = parseInt(this.innerHTML.toString().trim().charAt(0));
    interestArr.push(interestID)
  });
};

async function signupFormHandler(event) {
    event.preventDefault();

    function removeDuplicates(arr) {
        return arr.filter((value, index) => arr.indexOf(value) === index);
    };

    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const interestIds = removeDuplicates(interestArr);

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
                interestIds
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("User created successfully!")
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('loginBtn').addEventListener('click', loginFormHandler);
document.getElementById('signupBtn').addEventListener('click', signupFormHandler);       