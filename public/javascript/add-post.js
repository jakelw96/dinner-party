async function newPostHandler(event) {
    event.preventDefault();
  
    const post_name = document.querySelector('textarea[name="post-name"]').value;
    const post_text = document.querySelector('textarea[name="post-content"]').value;
    const party_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post_name,
        post_text,
        party_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      console.log("Post created")
      document.location.replace(`/dashboard/party/${party_id}`);
    } else {
      alert(response.statusText);
    }
}

document.getElementById('submit').addEventListener('click', newPostHandler);