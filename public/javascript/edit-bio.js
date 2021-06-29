async function editBio(event) {
    event.preventDefault();

    const bio_text = document.querySelector('textarea[name="user-bio"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(bio_text)

    const response = await fetch(`/api/bios/${id}`, {
        method: 'put',
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

document.getElementById('submit').addEventListener('click', editBio);