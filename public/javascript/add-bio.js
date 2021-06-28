async function addBioHandler(event) {
    event.preventDefault();

    const bio_text = // dom element

    if (bio_text) {
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
    }
};

// Button to add bio
