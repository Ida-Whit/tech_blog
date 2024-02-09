const editPost = async (event) => {
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    if(event.target.hasAttribute('data-update')) {
        const id = event.target.getAttribute('data-update');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog.');
        }
    }
};

document
    .querySelector('#edit')
    .addEventListener('click', editPost)