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

    <details>
      <summary> Book Info </summary>
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? "Yes" : "No"}</p>
        <button onclick="removeBook(${index})">Remove</button>
        <button onclick="toggleRead(${index})">Toggle Read</button>

    </details>

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

const showButton = document.getElementById("showDialog");
const addBookForm = document.getElementById("addBookForm");
const confirmBtn = addBookForm.querySelector("#confirmBtn");
const cancelBtn = addBookForm.querySelector("#cancelBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  addBookForm.showModal();
});

cancelBtn.addEventListener("click", () => {
  addBookForm.close();
  addBookForm.querySelector("form").reset();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const author = formData.get("authorEntry");
  const title = formData.get("titleEntry");
  const pages = formData.get("pageEntry");
  const read = formData.get("readEntry");

  const newBook = new Book(title, author, pages, read);

  addBookToLibrary(newBook);
  displayBook();
  addBookForm.close();
  form.reset();
});

//disable checkbox function

const readCheckbox = document.getElementById("readEntry1");
const notReadCheckbox = document.getElementById("notReadEntry");

function handleCheckboxChange(checkedBox, uncheckedBox) {
  if (checkedBox.checked) {
    uncheckedBox.checked = false;
    uncheckedBox.disabled = true;
  } else {
    uncheckedBox.disabled = false;
  }
}

readCheckbox.addEventListener("change", () =>
  handleCheckboxChange(readCheckbox, notReadCheckbox)
);
notReadCheckbox.addEventListener("change", () =>
  handleCheckboxChange(notReadCheckbox, readCheckbox)
);

handleCheckboxChange(readCheckbox, notReadCheckbox);
handleCheckboxChange(notReadCheckbox, readCheckbox);

// random book and quote overlay function

// Array of famous books and quotes
const books = [
  "1984 by George Orwell",
  "To Kill a Mockingbird by Harper Lee",
  "The Great Gatsby by F. Scott Fitzgerald",
  "Moby Dick by Herman Melville",
  "Pride and Prejudice by Jane Austen",
  "War and Peace by Leo Tolstoy",
  "The Catcher in the Rye by J.D. Salinger",
  "Crime and Punishment by Fyodor Dostoevsky",
  "The Lord of the Rings by J.R.R. Tolkien",
  "Jane Eyre by Charlotte Brontë",
  "Brave New World by Aldous Huxley",
  "Wuthering Heights by Emily Brontë",
  "The Odyssey by Homer",
  "The Brothers Karamazov by Fyodor Dostoevsky",
  "Madame Bovary by Gustave Flaubert",
  "The Iliad by Homer",
  "Great Expectations by Charles Dickens",
  "The Divine Comedy by Dante Alighieri",
  "Don Quixote by Miguel de Cervantes",
  "The Scarlet Letter by Nathaniel Hawthorne",
  "Frankenstein by Mary Shelley",
  "The Hobbit by J.R.R. Tolkien",
  "Anna Karenina by Leo Tolstoy",
  "One Hundred Years of Solitude by Gabriel Garcia Marquez",
  "The Sound and the Fury by William Faulkner",
  "The Picture of Dorian Gray by Oscar Wilde",
  "Dracula by Bram Stoker",
  "Les Misérables by Victor Hugo",
  "Fahrenheit 451 by Ray Bradbury",
  "The Old Man and the Sea by Ernest Hemingway",
  "The Grapes of Wrath by John Steinbeck",
  "Alice's Adventures in Wonderland by Lewis Carroll",
  "Catch-22 by Joseph Heller",
  "The Adventures of Huckleberry Finn by Mark Twain",
  "Gone with the Wind by Margaret Mitchell",
  "The Stranger by Albert Camus",
  "The Count of Monte Cristo by Alexandre Dumas",
  "The Metamorphosis by Franz Kafka",
  "The Trial by Franz Kafka",
  "Lolita by Vladimir Nabokov",
  "The Sun Also Rises by Ernest Hemingway",
  "Slaughterhouse-Five by Kurt Vonnegut",
  "The Bell Jar by Sylvia Plath",
  "Heart of Darkness by Joseph Conrad",
  "The Alchemist by Paulo Coelho",
  "On the Road by Jack Kerouac",
  "Rebecca by Daphne du Maurier",
  "The Name of the Rose by Umberto Eco",
  "The Shining by Stephen King",
  "The Road by Cormac McCarthy",
  "The Handmaid's Tale by Margaret Atwood",
  "Beloved by Toni Morrison",
  "To the Lighthouse by Virginia Woolf",
  "In Search of Lost Time by Marcel Proust",
  "A Tale of Two Cities by Charles Dickens",
  "Emma by Jane Austen",
  "The Canterbury Tales by Geoffrey Chaucer",
  "The Secret Garden by Frances Hodgson Burnett",
  "Gulliver's Travels by Jonathan Swift",
  "The Wind in the Willows by Kenneth Grahame",
  "Treasure Island by Robert Louis Stevenson",
  "The Little Prince by Antoine de Saint-Exupéry",
  "Lord of the Flies by William Golding",
  "Middlemarch by George Eliot",
  "The Call of the Wild by Jack London",
  "David Copperfield by Charles Dickens",
  "Sense and Sensibility by Jane Austen",
  "The Kite Runner by Khaled Hosseini",
  "A Farewell to Arms by Ernest Hemingway",
  "A Clockwork Orange by Anthony Burgess",
  "The Catcher in the Rye by J.D. Salinger",
  "The Hitchhiker's Guide to the Galaxy by Douglas Adams",
  "The Girl with the Dragon Tattoo by Stieg Larsson",
  "The Fault in Our Stars by John Green",
  "Life of Pi by Yann Martel",
  "The Book Thief by Markus Zusak",
  "Memoirs of a Geisha by Arthur Golden",
  "The Poisonwood Bible by Barbara Kingsolver",
  "The Lovely Bones by Alice Sebold",
  "The Da Vinci Code by Dan Brown",
  "Angels and Demons by Dan Brown",
  "The Hunger Games by Suzanne Collins",
  "Catching Fire by Suzanne Collins",
  "Mockingjay by Suzanne Collins",
  "The Chronicles of Narnia by C.S. Lewis",
  "The Giver by Lois Lowry",
  "A Wrinkle in Time by Madeleine L'Engle",
  "The Outsiders by S.E. Hinton",
  "The Great Alone by Kristin Hannah",
  "Where the Crawdads Sing by Delia Owens",
  "The Night Circus by Erin Morgenstern",
  "Big Little Lies by Liane Moriarty",
  "The Goldfinch by Donna Tartt",
  "The Help by Kathryn Stockett",
  "Gone Girl by Gillian Flynn",
  "Sharp Objects by Gillian Flynn",
  "The Silent Patient by Alex Michaelides",
  "The Girl on the Train by Paula Hawkins",
  "The Light We Lost by Jill Santopolo",
  "Educated by Tara Westover",
  "Becoming by Michelle Obama",
  "The Glass Castle by Jeannette Walls",
  "Born a Crime by Trevor Noah",
  "The Immortal Life of Henrietta Lacks by Rebecca Skloot",
  "Sapiens by Yuval Noah Harari",
  "Homo Deus by Yuval Noah Harari",
  "The Subtle Art of Not Giving a F*ck by Mark Manson",
  "Atomic Habits by James Clear",
  "The Power of Habit by Charles Duhigg",
  "Thinking, Fast and Slow by Daniel Kahneman",
  "Quiet by Susan Cain",
  "Grit by Angela Duckworth",
  "Outliers by Malcolm Gladwell",
  "The Tipping Point by Malcolm Gladwell",
  "Blink by Malcolm Gladwell",
  "David and Goliath by Malcolm Gladwell",
  "The 7 Habits of Highly Effective People by Stephen R. Covey",
  "How to Win Friends and Influence People by Dale Carnegie",
  "The Lean Startup by Eric Ries",
  "Good to Great by Jim Collins",
  "The Innovator's Dilemma by Clayton Christensen",
  "The Four-Hour Workweek by Tim Ferriss",
  "The Lean Startup by Eric Ries",
  "Zero to One by Peter Thiel",
  "The Art of War by Sun Tzu",
  "The Prince by Niccolò Machiavelli",
  "Meditations by Marcus Aurelius",
  "The Republic by Plato",
  "The Wealth of Nations by Adam Smith",
  "Capital by Karl Marx",
  "The Communist Manifesto by Karl Marx and Friedrich Engels",
  "The Origin of Species by Charles Darwin",
  "A Brief History of Time by Stephen Hawking",
  "The Selfish Gene by Richard Dawkins",
  "The God Delusion by Richard Dawkins",
  "The Double Helix by James D. Watson",
  "The Man Who Knew Infinity by Robert Kanigel",
  "The Theory of Everything by Stephen Hawking",
  "Cosmos by Carl Sagan",
  "The Demon-Haunted World by Carl Sagan",
  "Pale Blue Dot by Carl Sagan",
  "Sapiens by Yuval Noah Harari",
  "Guns, Germs, and Steel by Jared Diamond",
  "Collapse by Jared Diamond",
  "The Structure of Scientific Revolutions by Thomas S. Kuhn",
  "The Art of Happiness by Dalai Lama",
  "Man's Search for Meaning by Viktor E. Frankl",
  "The Road Less Traveled by M. Scott Peck",
  "The Power of Now by Eckhart Tolle",
  "A New Earth by Eckhart Tolle",
  "The Book of Joy by Dalai Lama and Desmond Tutu",
  "The Untethered Soul by Michael A. Singer",
  "The Four Agreements by Don Miguel Ruiz",
  "The Mastery of Love by Don Miguel Ruiz",
  "The Seven Spiritual Laws of Success by Deepak Chopra",
  "The Power of Intention by Wayne W. Dyer",
  "The Seat of the Soul by Gary Zukav",
  "The Alchemist by Paulo Coelho",
  "The Monk Who Sold His Ferrari by Robin Sharma",
  "The Secret by Rhonda Byrne",
  "You Are a Badass by Jen Sincero",
  "The Happiness Project by Gretchen Rubin",
  "Daring Greatly by Brené Brown",
  "Rising Strong by Brené Brown",
  "Braving the Wilderness by Brené Brown",
  "The Gifts of Imperfection by Brené Brown",
  "The Wisdom of Insecurity by Alan Watts",
  "The Way of Zen by Alan Watts",
  "The Tao of Pooh by Benjamin Hoff",
  "The Book of Tea by Kakuzo Okakura",
  "The I Ching by Richard Wilhelm",
  "The Dhammapada by Eknath Easwaran",
  "The Bhagavad Gita by Eknath Easwaran",
  "The Tao Te Ching by Lao Tzu",
  "The Art of Happiness by Dalai Lama",
  "The Art of Loving by Erich Fromm",
  "The Prophet by Kahlil Gibran",
  "The Book of Joy by Dalai Lama and Desmond Tutu",
  "The Four Agreements by Don Miguel Ruiz",
  "The Road to Character by David Brooks",
];
const quotes = [
  "“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” ",
  "Until I feared I would lose it, I never loved to read. One does not love breathing.",
  "I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.",
  "The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”",
  "Books are a uniquely portable magic.",
  "I kept always two books in my pocket, one to read, one to write in",
  "We are of opinion that instead of letting books grow moldy behind an iron grating, far from the vulgar gaze, it is better to let them wear out by being read.",
  "Books serve to show a man that those original thoughts of his aren’t very new after all.”",
  "The man who does not read good books is no better than the man who can’t.",
  "I guess there are never enough books.”",
  "If you don’t like to read, you haven’t found the right book.",
];

function generateLine(itemsPerLine) {
  let line = [];
  for (let i = 0; i < itemsPerLine; i++) {
    if (Math.random() < 0.1) {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      line.push(`<span class = "quote">"${quote}"</span>`);
    } else {
      line.push(
        `<span class = "book"> ${
          books[Math.floor(Math.random() * books.length)]
        }</span>`
      );
    }
    if (i < itemsPerLine - 1) {
      line.push(`<span class = "separator">•</span>`);
    }
  }
  return `<div class = "line">${line.join("")}</div>`;
}

function generateContent() {
  let content = [];
  const lines = 8;
  const itemsPerLine = 5;

  for (let i = 0; i < lines; i++) {
    content.push(generateLine(itemsPerLine));
  }

  return content.join("");
}

function updateContent() {
  document.getElementById("content").innerHTML = generateContent();
}

updateContent();

setInterval(updateContent, 10000);
