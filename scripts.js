// Example data for blog posts
const posts = [
    { id: 1, title: "Understanding JavaScript Closures", content: "Closures are a fundamental concept in JavaScript that allow functions to access variables from an enclosing scope...", file: "post1.txt" },
    { id: 2, title: "CSS Grid vs Flexbox: When to Use Which?", content: "CSS Grid and Flexbox are powerful layout systems in CSS that provide developers with flexible ways to design web pages...", file: "post2.txt" },
    { id: 3, title: "Getting Started with React", content: "React is a popular JavaScript library for building user interfaces, particularly for single-page applications...", file: "post3.txt" },
];

// Function to load posts into the blog list
function loadPosts() {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '';

    posts.forEach(post => {
        const postPreview = document.createElement('div');
        postPreview.className = 'post-preview';
        postPreview.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postPreview.addEventListener('click', () => loadFullPost(post.file, post.title));
        blogList.appendChild(postPreview);
    });
}

// Function to load the full blog post content
function loadFullPost(file, title) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const blogList = document.getElementById('blog-list');
            blogList.innerHTML = `
                <div class="full-post">
                    <h2>${title}</h2>
                    <p>${data}</p>
                    <button onclick="loadPosts()">Back to Posts</button>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error loading full post:', error);
        });
}

// Load posts when the page loads
window.onload = loadPosts;
