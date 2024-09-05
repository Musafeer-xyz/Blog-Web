// Mockup data for multiple blog posts
const posts = [
    { id: 1, title: "Bangla Blog Post 1", content: "This is a brief introduction to Bangla Blog Post 1...", category: "technology", file: "bangla-blog1.txt" },
    { id: 2, title: "Bangla Blog Post 2", content: "This is a brief introduction to Bangla Blog Post 2...", category: "lifestyle", file: "bangla-blog2.txt" },
    { id: 3, title: "Bangla Blog Post 3", content: "This is a brief introduction to Bangla Blog Post 3...", category: "education", file: "bangla-blog3.txt" },
];

// Load posts to the page
function loadPosts(filter = 'all', searchQuery = '') {
    const postContainer = document.getElementById('blog-posts');
    postContainer.innerHTML = ''; // Clear previous content

    posts.filter(post => 
        (filter === 'all' || post.category === filter) && 
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ).forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postElement.addEventListener('click', () => loadFullPost(post.file));
        postContainer.appendChild(postElement);
    });
}

// Function to load the full Bangla blog post from a text file
function loadFullPost(file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load blog content');
            }
            return response.text();
        })
        .then(data => {
            const fullPostContainer = document.getElementById('blog-posts');
            fullPostContainer.innerHTML = `
                <div class="post">
                    <h3>Full Post</h3>
                    <p>${data}</p>
                    <button onclick="loadPosts()">Back to posts</button>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching the blog content:', error);
        });
}

// Dark mode toggle
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', toggleDarkMode);

// Load dark mode preference from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    loadPosts();
});

// Function to toggle dark mode and save preference
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
}

// Search functionality
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', (event) => {
    loadPosts(document.getElementById('category-filter').value, event.target.value);
});

// Category filter functionality
const categoryFilter = document.getElementById('category-filter');
categoryFilter.addEventListener('change', (event) => {
    loadPosts(event.target.value, searchBar.value);
});
