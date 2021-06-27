async function newPostHandler(event) {
    event.preventDefault();
  
    const post_name = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;
    
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post_name,
        post_text
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

// button should be created in parties html handlebar

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);