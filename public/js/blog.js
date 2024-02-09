const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#exampleTitle').value.trim();
    const description = document.querySelector('#exampleInputPost').value.trim();

    if (title && description) {
        const response = await fetch('api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert ('Failed to create post.');
        }
    }
};

document
    .querySelector('#submit')
    .addEventListener('submit', newPost);