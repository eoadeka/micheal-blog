document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;
  const blogContainer = document.getElementById('blog-container');

  // Check if the current page is index.html
  if (currentPage.endsWith('index.html')) {
    const postIdToShow = '4'; // Replace with the ID of the post you want to display

    fetch('posts.json')
      .then(response => response.json())
      .then(posts => {
        const postToShow = posts.find(post => post.id === postIdToShow);
        if (postToShow) {
          const postElement = createSpecificPostElement(postToShow);
          blogContainer.appendChild(postElement);
        } else {
          console.error('Post not found');
        }
      })
      .catch(error => console.error('Error loading blog posts:', error));
  } else {
    fetch('posts.json')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          const postElement = createPostElement(post);
          blogContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error loading blog posts:', error));
  }
});

function createSpecificPostElement(post) {
  const specificPostContainer = document.createElement('div');
  specificPostContainer.classList.add('specific-post-container'); // Apply the specific post container style

  const titleElement = document.createElement('h1');
  titleElement.textContent = post.title;


  const bodyElement = document.createElement('p');
  const maxLength = 150; // Maximum length for truncated text
  bodyElement.textContent = truncateText(post.body, maxLength);
  bodyElement.classList.add('truncated'); // Add a class to style truncated content


  const readMoreButton = document.createElement('button');
  readMoreButton.innerHTML = 'click to <br> - read more -';
  readMoreButton.dataset.postId = post.id; // Store the post ID as a data attribute

  // Toggle the content visibility when the "Read More" button is clicked
  readMoreButton.addEventListener('click', () => {
    // bodyElement.classList.remove('truncated');
    // readMoreButton.style.display = 'none';
    const postId = readMoreButton.dataset.postId;
    window.location.href = `post.html?id=${postId}`;
  });

  // Create and set the image element's attributes
  const imageElement = document.createElement('img');
  imageElement.src = post.image;
  imageElement.alt = post.title;
  bodyElement.appendChild(readMoreButton);

  specificPostContainer.appendChild(titleElement);
  specificPostContainer.appendChild(bodyElement);
  specificPostContainer.appendChild(imageElement);

  return specificPostContainer;
}

function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  
  const titleElement = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.textContent = post.title;
  titleLink.href = `post.html?id=${post.id}`; // Create links to individual post pages
  titleElement.appendChild(titleLink);
  
  const subtitleElement = document.createElement('p');
  subtitleElement.textContent = post.subtitle;
  
  postElement.appendChild(titleElement);
  postElement.appendChild(subtitleElement);
  
  return postElement;
}

// Function to truncate text and add an ellipsis
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
