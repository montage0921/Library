//Query Selector//

//buttons//
const showFormBtn = document.querySelector(`.showFormBtn`);
const overlay = document.querySelector(`.overlay`);
const overlayForEdit = document.querySelector(`.overlay-edit`);

const addBookBtn = document.querySelector(`.addBookBtn`);

const emptyLibraryInfo = document.querySelector(`.adding-info`);
const booksSection = document.querySelector(`.books`);

const titleInput = document.querySelector(`#title`);
const authorInput = document.querySelector(`#author`);
const yearInput = document.querySelector(`#year`);
const pagesInput = document.querySelector(`#page`);

const validText = document.querySelectorAll(`.validation`);

////////////////////////////
//////////////////Initializing//////////////////////

const books = [];

function Book(title, author, year, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
  this.addDate = Date.now();
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
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const year = +yearInput.value;
  const page = +pagesInput.value;

  newBook = new Book(title, author, year, page);

  for (prop in newBook) {
    if (newBook[prop] === `` || newBook[prop] === 0) {
      validText.forEach((node) => {
        if (node.className.includes(prop)) {
          node.classList.remove(`hidden`);
        }
      });
      return;
    } else {
      validText.forEach((node) => {
        if (node.className.includes(prop)) {
          node.classList.add(`hidden`);
        }
      });
    }
  }

  addBook();

  renderBookCard();

  clearInput();

  overlay.classList.add(`hidden`);
  emptyLibraryInfo.classList.add(`hidden`);
}

//check If the book is already in the library
function addBook() {
  if (books.length === 0) {
    books.push(newBook);
  } else if (
    books.length !== 0 &&
    books.every((book) => book.title !== newBook.title)
  ) {
    books.push(newBook);
  }
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
    htmlText += `<div class="book-card ${book.addDate}">
    <h2>Title: <span>${book.title}</span></h2>
    <p>Author: <span>${book.author}</span></p>
    <p>Pages: <span>${book.pages}</span></p>
    <p>Year: <span>${book.year}</span></p>
    <p>Status: <span class="isRead">Not Read Yet</span></p>

    <div class="book-card-buttons">
   
      <img class="${book.addDate} delBtn"  src="Sources/delete.svg" alt="" />
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>`;
  });

  booksSection.insertAdjacentHTML(`afterbegin`, htmlText);
}

function selectBook(selectedCard) {
  const bookID = selectedCard.className.split(` `)[0];

  return books.filter((book) => book.addDate == bookID)[0];
}

/////////////////////////////////////////////////////
//Add EventListener

addBookBtn.addEventListener(`click`, addBookToLibrary);

booksSection.addEventListener(`click`, function (e) {
  if (e.target.className.includes(`delBtn`)) {
    const selectCard = e.target;

    const bookCard = selectBook(selectCard);
    const bookIndex = books.indexOf(bookCard);
    books.splice(bookIndex, 1);

    renderBookCard();
    if (books.length === 0) emptyLibraryInfo.classList.remove(`hidden`);
  }
});
