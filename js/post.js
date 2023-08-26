document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-container');
    const postTitle = document.getElementById('post-title');
    const postSubTitle = document.getElementById('post-subtitle');
    const postImage = document.getElementById('post-image');
    const postBody = document.getElementById('post-body');

  
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
  
    fetch('posts.json')
      .then(response => response.json())
      .then(posts => {
        const post = posts.find(p => p.id === postId);

        // Get the index of the current post in the array
        const currentIndex = posts.findIndex(p => p.id === postId);

        // Handle the "Next Post" button click
        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % posts.length; // Loop back to the first post if at the end
            const nextPostId = posts[nextIndex].id;
            window.location.href = `post.html?id=${nextPostId}`;
        });
        
        if (post) {
          postTitle.textContent = post.title;
          postSubTitle.textContent = post.subtitle;
          postBody.textContent = post.body;

           // Create and set the image element's attributes
            const imageElement = document.createElement('img');
            imageElement.src = post.image;
            imageElement.alt = post.title;
            postImage.appendChild(imageElement);
        } else {
          postTitle.textContent = 'Post Not Found';
          postSubTitle.textContent = 'Post Not Found';
          postBody.textContent = 'The requested post could not be found.';
        }
      })
      .catch(error => console.error('Error loading blog post:', error));
  });
  