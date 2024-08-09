const myLibrary = [];

function Book(title, author, pages, read) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;

   this.getBookInfo = function() {
       return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
     };
   }
function addBookToLibrary(book) {
   myLibrary.push(book);
}


const book1 = new Book('Count of Monte Cristo', 'Alexander Dumas', 1000, true);
const book2 = new Book('Three Musketeers', 'Alexander Dumas', 1000, true);
const book3 = new Book('Geratia', 'Alexander Dumas', 1000, true);
const book4 = new Book('Gestapo', 'Alexander Dumas', 1000, true);
const book5 = new Book('Lord of the Rings', 'Alexander Dumas', 1000, true);

addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);


function displayBook() {
   myLibrary.forEach((book) => 
   console.log(book));
}

displayBook();

// button that pops up a form
function newBookForm() {
   document.getElementById('form1').style.display = 'block';
}