const form = document.getElementById('form');
let libraryGrid = document.querySelector('.library-grid');
const addBookButton = document.getElementById('add-book-button');
const removeBookButtons = document.querySelectorAll('remove-book-button');

// Empty array for holding all books
const library = [];

// Function to show form
function showBookForm() {
    form.style.display = "grid";
    form.style.gridTemplateRows = "repeat(5, 1fr)";
    addBookButton.hidden = true;
}

addBookButton.addEventListener('click', showBookForm);

function hideBookForm() {
    form.style.display = "none";
    addBookButton.hidden = false;
}


// Constuctor functoin for creating a book
function Book(title, author, pages, read) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.toggleRead = function() {
        this.read = !this.read;
    }

  }

// Function to add the book to library on form submit
function addBookToLibrary(event) {
    event.preventDefault();
    let title = document.getElementById('title').value.trim();
    let author = document.getElementById('author').value.trim();
    let pages = document.getElementById('pages').value.trim();
    let read = document.getElementById('read').checked;
    if (title && author && pages) {
        const book = new Book(title, author, pages, read);
        library.push(book);
        renderBooks();
        form.reset();
        hideBookForm();
    } else {
        alert("Please fill in title, author, and pages.");
    }
}

form.addEventListener('submit', addBookToLibrary);

// Function to append the books to the library grid
function renderBooks() {
    libraryGrid.innerHTML = '';
    // Loop through library array and create HTML block out of values
    for (let i = 0; i <= library.length - 1; i++) {
        let libraryCard = document.createElement('div');
        libraryCard.id = i;
        libraryCard.classList.add('library-card');
        libraryCard.innerHTML = 
        `
        <h3 class="title">${library[i].title}</h3>
        <p class="author"><strong>Author:</strong> ${library[i].author}</p>
        <p class="pages"><strong>Pages:</strong> ${library[i].pages}</p>
        <p class="read"><strong>Read:</strong> ${library[i].read ? "Yes" : "No"}</p>
        <button class="remove-book-button" onclick="removeBook(${i})">Remove Book</button>
        <button class="toggle-read-button" onclick="toggleRead(${i})">Toggle Read</button>
        `
        libraryGrid.appendChild(libraryCard);
    }
    
}

// Function to remove book
function removeBook(index) {
    library.splice(index, 1);
    renderBooks();
}

function toggleRead(index) {
    library[index].read = !library[index].read;
    renderBooks();
}