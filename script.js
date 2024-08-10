const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.getBookInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "already read" : "not read yet"
    }`;
  };
}
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book"); //this adds css class to the div we created above
    bookElement.setAttribute("data-index", index);

    bookElement.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read ? "Yes" : "No"}</p>
    <button onclick="removeBook(${index})">Remove</button>
    <button onclick="toggleRead(${index})">Toggle Read</button>
  `;

    bookList.appendChild(bookElement);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1); //removes 1 element at index
  displayBook();
}

function toggleRead(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBook();
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// button that pops up a form
function newBookForm() {
  document.getElementById("form1").style.display = "block";
}

// submit button

function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById("form1");
  const formData = new FormData(form);

  const author = formData.get("authorEntry");
  const title = formData.get("titleEntry");
  const pages = formData.get("pageEntry");
  const read = formData.get("readEntry");

  const newBook = new Book(title, author, pages, read);

  addBookToLibrary(newBook);
  displayBook();
}

console.table(myLibrary);
