//Query Selector//
const showFormBtn = document.querySelector(`.showFormBtn`);
const overlay = document.querySelector(`.overlay`);
const addBookBtn = document.querySelector(`.addBookBtn`);

const booksSection = document.querySelector(`.books`);

const titleInput = document.querySelector(`#title`);
const authorInput = document.querySelector(`#author`);
const yearInput = document.querySelector(`#year`);
const pagesInput = document.querySelector(`#page`);

////////////////////////////
//////////////////Initializing//////////////////////

const books = [];

function Book(title, author, year, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
}

/////////////////////////////////////////////////////
//////////////////Function///////////////////////////

// form popup window appear
showFormBtn.addEventListener(`click`, function () {
  overlay.classList.remove(`hidden`);
});

//add books to the "books array"
let newBook;

function addBookToLibrary(e) {
  const title = titleInput.value;
  const author = authorInput.value;
  const year = +yearInput.value;
  const page = +pagesInput.value;

  newBook = new Book(title, author, year, page);
  books.push(newBook);
  console.log(books);

  renderBookCard();
  clearInput();
  overlay.classList.add(`hidden`);
}

//clear the form after submit books
function clearInput() {
  titleInput.value = ``;
  authorInput.value = ``;
  yearInput.value = ``;
  pagesInput.value = ``;
}

//Render Book Card
function renderBookCard() {
  booksSection.innerHTML = ``;
  let htmlText = ``;
  books.forEach((book) => {
    htmlText += `<div class="book-card">
    <h2>Title: <span>${book.title}</span></h2>
    <p>Author: <span>${book.author}</span></p>
    <p>Pages: <span>${book.pages}</span></p>
    <p>Year: <span>${book.year}</span></p>

    <div class="book-card-buttons">
      <img src="Sources/edit.svg" alt="" />
      <img src="Sources/delete.svg" alt="" />
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>`;
  });

  booksSection.insertAdjacentHTML(`afterbegin`, htmlText);
}

/////////////////////////////////////////////////////
//Add EventListener
addBookBtn.addEventListener(`click`, addBookToLibrary);
