// Get the UI elements
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');


// Book Class
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

// UI Class
class UI {
    static addToBooklist(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td><a href='#' class="delete">X</a></td>`;

        list.appendChild(row);

    }

    static clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#year").value = '';
    }


    static deleteFromBook(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
           
        }
    }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks() {
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }

    static removeBook(year) {
        let books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.year === year) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Add Event Listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());


// Define functions

function newBook(e) {

    
    let title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        year = document.querySelector("#year").value;



    if (title === '' || author === '' || year === '') {

        alert("Please fill all the fields!");
    } else {

        let book = new Book(title, author, year);

        UI.addToBooklist(book);

        UI.clearFields();


        Store.addBook(book);
    }


    e.preventDefault();

    
}

function removeBook(e) {
    UI.deleteFromBook(e.target);
    e.preventDefault();
}