// Add interactivity to the 'Read More' button
document.getElementById('cta-button').addEventListener('click', function() {
    alert('Welcome to the vibrant blog! Dive into our latest posts now.');
    document.querySelector('.blog-posts').scrollIntoView({ behavior: 'smooth' });
});

// Function to load the Bangla blog content
function loadBanglaBlog() {
    fetch('bangla-blog.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load blog content');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('bangla-content').innerText = data;
        })
        .catch(error => {
            document.getElementById('bangla-content').innerText = 'Error loading content. Please try again later.';
            console.error('Error fetching the blog content:', error);
        });
}

// Load the Bangla blog content when the page loads
window.onload = loadBanglaBlog;
