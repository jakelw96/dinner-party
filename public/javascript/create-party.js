async function newFormHandler(event) {
    event.preventDefault();

    //subject to change based on how html is naming elements 
  
    const party_name = document.querySelector('input[name="party-name"]').value;
    const party_bio = document.querySelector('textarea[name="party-bio"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        party_name,
        party_bio
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-party-form').addEventListener('submit', newFormHandler);