const bookCardContainer = document.querySelector('main');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const addButton = document.querySelector('button.add');

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        htmlLibrary.addBook(this);

    }

    changeReadStatus() {
        this.isRead = !this.isRead;
    }

    createBookCard() {
        return `<div class='bookcard'>
        <h3>Titlu: ${this.title}</h3>
        <p>Autor: ${this.author}</p>
        <p>Numar de pagini: ${this.pages}</p>
        <p>Status: ${this.isRead ? "Read" : "Not Read"}</p>
        `;
    }

}

class Library {
    constructor () {
        this.library = []
    }

    addBook(book) {
        this.library.push(book);
    }

    updateHTMLLibrary(){
        bookCardContainer.innerHTML = ''
        for (let book of this.library) {
            bookCardContainer.innerHTML += book.createBookCard();
        } 
        
        
    }
}

const clearForm = () => {
    bookTitle.value = ''
    bookAuthor.value = ''
    bookPages.value = ''
}

const htmlLibrary = new Library;

addButton.addEventListener("click",() => {
    const bookStatus = document.querySelector('input[name="isread"]:checked');
    new Book(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), parseInt(bookStatus.value));
    htmlLibrary.updateHTMLLibrary();
    clearForm();

} )