async function editPostHandler(event) {
    event.preventDefault();
  
    const post_name = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_name,
          post_text,
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
  
document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);