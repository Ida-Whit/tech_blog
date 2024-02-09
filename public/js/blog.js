const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#exampleTitle').value.trim();
    const content = document.querySelector('#exampleInputPost').value.trim();
    
    if (title && content) {
        const response = await fetch('api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
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
    .addEventListener('click', newPost);