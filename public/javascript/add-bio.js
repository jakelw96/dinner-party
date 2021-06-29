async function addBioHandler(event) {
    event.preventDefault();
    const bio_text = document.querySelector('textarea[name="user-bio"]').value;
    
    const response = await fetch('/api/bios', {
        method: 'post',
        body: JSON.stringify({
            bio_text
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
};

document.getElementById('save-bio').addEventListener('click', addBioHandler);