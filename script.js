window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  });
  

// Retrieve the form element
const signupForm = document.querySelector('form');

// Add event listener for form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Retrieve form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    // Perform validation and other necessary actions
    // ...

    // Submit the form
    signupForm.submit();
});



//AIzaSyDr3b5TUIo90rvYadVS348eyxPGNJr8ISA



const tbody = document.getElementById('book-tbody');
let page = 1; // Start with the first page
const maxResults = 10; // Number of results to fetch per page

// Function to fetch book data from the Google Books API
function fetchBooks(searchQuery) {
    const apiKey = 'AIzaSyDr3b5TUIo90rvYadVS348eyxPGNJr8ISA'; // Replace with your actual API key
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${page}&maxResults=${maxResults}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                data.items.forEach((item, index) => {
                    const book = item.volumeInfo;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${(page - 1) * maxResults + index + 1}</td>
                        <td>${book.title}</td>
                        <td>${book.authors ? book.authors.join(', ') : 'Unknown'}</td>
                        <td>${book.publishedDate}</td>
                    `;
                    tbody.appendChild(row);
                });
            }
            page++; // Increment the page number for the next request
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to handle scroll event and trigger lazy loading
function handleScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

    // Check if scrolled to the bottom of the page
    if (distanceFromBottom < 100) {
        const searchInput = document.getElementById('search-input');
        const searchQuery = searchInput.value.trim();
        fetchBooks(searchQuery); // Fetch more books based on search query
    }
}



// Function to handle search button click
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value.trim();

    if (searchQuery !== '') {
        // Clear existing table rows and reset pagination
        tbody.innerHTML = '';
        page = 1;

        // Fetch books based on search query
        fetchBooks(searchQuery);
    } else {
        console.log('Please enter a search query.');
    }
}


// Add event listener for scroll event
window.addEventListener('scroll', handleScroll);

// Add event listener for search button click
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);

// Initial load of books
fetchBooks('');

/////////////////////////////////////////////////////////////////////////////////////////////