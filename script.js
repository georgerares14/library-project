const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const libraryShelf = document.querySelector('main');
const bttn = document.getElementById('addbook');


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function () {
        const readStatus = this.isRead ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
    // MODIFICARE: Adăugat o metodă pentru a schimba starea isRead
    this.toggleReadStatus = function () {
        this.isRead = !this.isRead;
    };
}

const myLibrary = [
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "pages": 295,
        "isRead": false
    },
    {
        "title": "The Pess",
        "author": "J.R.R. Tolkien",
        "pages": 295,
        "isRead": false
    },
    {
        "title": "The Puddy",
        "author": "J.R.R. Tolkien",
        "pages": 295,
        "isRead": false
    },
    {
        "title": "The Cokc",
        "author": "J.R.R. Tolkien",
        "pages": 295,
        "isRead": false
    },
];

const addBookToLibrary = () => {
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = parseInt(bookPages.value, 10);
    const selectedRadio = document.querySelector('input[name="read-unread"]:checked');
    const isRead = selectedRadio ? selectedRadio.value === '1' : false; // '1' înseamnă "Read"

    if (!title || !author || isNaN(pages)) {
        console.log('Toate câmpurile trebuie completate corect!');
        return;
    }

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    document.querySelector('input[name="read-unread"][value="0"]').checked = true;

    console.log(`Cartea "${title}" a fost adăugată.`);
    updatePage();
};


// Add books from myLibrary array to libraryShelf
const updatePage = () => {
    libraryShelf.innerHTML = '' // Curăță raftul

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('id', `book-${index}`);

        // Add book card to HTML
        bookCard.innerHTML = `            
            <p>${book.title}</p>
            <p>by ${book.author}</p>
            <p>Number of pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? "Read" : "Not Read"}</p>`;

        // Create delete button that corresponds to one book
        const deleteButton = document.createElement("button");
        deleteButton.classList.add('remove-btn');
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;
        deleteButton.addEventListener("click", () => {
            // Remove book from array and update page because books' indexes will change
            myLibrary.splice(index, 1);
            updatePage();
        });

        // MODIFICARE: Creează un buton pentru a schimba starea isRead
        const toggleReadButton = document.createElement('button');
        toggleReadButton.classList.add('toggle-read-btn');
        toggleReadButton.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
        toggleReadButton.addEventListener('click', () => {
            book.toggleReadStatus(); // Schimbă starea cărții
            updatePage(); // Actualizează interfața
        });

        // Adaugă butoanele în card
        bookCard.appendChild(toggleReadButton); // MODIFICARE: Adaugă butonul pentru schimbare stare
        bookCard.appendChild(deleteButton);
        libraryShelf.appendChild(bookCard);
    });
};


bttn.addEventListener("click", addBookToLibrary);
