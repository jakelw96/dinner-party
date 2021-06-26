async function editPartyHandler(event) {
    event.preventDefault();
  
    const party_name = document.querySelector('input[name="party-name"]').value;
    const party_bio = document.querySelector('textarea[name="party-bio"]').value;

    const response = await fetch(`/api/parties/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          party_name,
          party_bio,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

}
  
document.querySelector('.edit-party-form').addEventListener('submit', editPartyHandler);