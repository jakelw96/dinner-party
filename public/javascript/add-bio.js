async function createBio(event) {
    event.preventDefault();

    const bio_text = document.querySelector('textarea[name="user-bio"]').value;

    console.log(bio_text)

    const response = await fetch('/api/bios', {
        method: 'post',
        body: JSON.stringify({
           bio_text 
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log('Bio created');
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
};

document.getElementById('submit').addEventListener('click', createBio);

