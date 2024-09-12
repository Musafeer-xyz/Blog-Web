const books = [
    { id: 1, title: "Book 1", author: "Author 1", price: 12.99, image: "images/book1.jpg" },
    { id: 2, title: "Book 2", author: "Author 2", price: 9.99, image: "images/book2.jpg" },
    { id: 3, title: "Book 3", author: "Author 3", price: 15.99, image: "images/book3.jpg" },
    { id: 4, title: "Book 4", author: "Author 4", price: 8.99, image: "images/book4.jpg" }
];

const cart = [];
const bookList = document.getElementById('book-list');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Function to display books
function displayBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>$${book.price.toFixed(2)}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Function to add book to cart
function addToCart(id) {
    const book = books.find(book => book.id === id);
    cart.push(book);
    updateCart();
}

// Function to update cart
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((book, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${book.title} - $${book.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);
        total += book.price;
    });
    cartTotal.textContent = total.toFixed(2);
}

// Function for search feature
document.getElementById('searchBar').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchText) || 
        book.author.toLowerCase().includes(searchText)
    );
    displayBooks(filteredBooks);
});

// Initial load
displayBooks(books);
