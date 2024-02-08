const addComment = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    let blog_id = event.target.dataset.blog_id
    blog_id = perseInt(blog_id)
    if (comment) {
        try {
            const response = await fetch ('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ comment, blog_id }),
                header: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to add comment.');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }
};

document
  .querySelector('#commentBtn')
  .addEventListener('click', addComment);