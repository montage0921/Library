////////////////Query Selector/////////////////

//BUTTONS//
const showFormBtn = document.querySelector(`.showFormBtn`);
const addBookBtn = document.querySelector(`.addBookBtn`);
const sortBtn = document.querySelector(`#sort-bar`);

//TEXT//
//"Your book shelf is empty"
const emptyLibraryInfo = document.querySelector(`.adding-info`);
//*The book is already in library
const bookExistInfo = document.querySelector(`.exist`);
//validation text
const validText = document.querySelectorAll(`.validation`);

//CONTAINER//
const bookCardContainer = document.querySelector(`.books`);
const formContainer = document.querySelector(`.overlay`);

//INPUT//
const titleInput = document.querySelector(`#title`);
const authorInput = document.querySelector(`#author`);
const yearInput = document.querySelector(`#year`);
const pagesInput = document.querySelector(`#page`);

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

let newBook;
let sortedBooks;
let isTitleRepeat = false;

//////////////////Function///////////////////////////

function addBookToLibrary(e) {
  e.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const year = +yearInput.value;
  const page = +pagesInput.value;

  newBook = new Book(title, author, year, page);

  //Validation: check if input fields are filled
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

  isTitleRepeat = addBook();

  if (isTitleRepeat === true) return;

  sortedBooks = sortBook(sortedBooks);

  renderBookCard(sortedBooks);

  clearInput();

  formContainer.classList.add(`hidden`);
  emptyLibraryInfo.classList.add(`hidden`);
  bookExistInfo.classList.add(`hidden`);
}

//check If the book is already in the library. If not, add the book to the library.
function addBook() {
  if (books.length === 0) {
    books.push(newBook);
  } else if (
    books.length !== 0 &&
    books.every((book) => book.title !== newBook.title)
  ) {
    isTitleRepeat = true;
    bookExistInfo.classList.add(`hidden`);
    books.push(newBook);
  } else if (
    books.length !== 0 &&
    books.some((book) => book.title == newBook.title)
  ) {
    bookExistInfo.classList.remove(`hidden`);
    isTitleRepeat = true;

    return isTitleRepeat;
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
function renderBookCard(books) {
  bookCardContainer.innerHTML = ``;
  let htmlText = ``;
  books.forEach((book) => {
    htmlText += `<div class="book-card ${
      book.isRead === false ? `grey-banner` : `blue-banner`
    } ${book.addDate}">
    <h2><em>"${book.title}"</em></h2>
    <p>Author: <span>${book.author}</span></p>
    <p>Pages: <span>${book.pages}</span></p>
    <p>Year: <span>${book.year}</span></p>

    <p>Status: 
    <span class="${book.isRead === false ? `noRead` : `finishRead`}">${
      book.isRead === false ? `Not Finished Yet` : `Finished`
    }</span>
    
    </p></p>

    <div class="book-card-buttons">
   
      <img class="${book.addDate} delBtn"  src="Sources/delete.svg" alt="" />

        ${
          book.isRead === false
            ? ` <button class="${book.addDate} grey slider"  />Not Read</button>`
            : ` <button class="${book.addDate} blue slider"  />
        Read</button>
        `
        }

    </div>
  </div>`;
  });

  bookCardContainer.insertAdjacentHTML(`afterbegin`, htmlText);
}

function selectBook(selectedCard) {
  const bookID = selectedCard.className.split(` `)[0];

  return books.filter((book) => book.addDate == bookID)[0];
}

function sortBook(sortedBooks) {
  if (sortBtn.value == `default`) {
    console.log(`ok`);
    return books.sort((a, b) => {
      if (a.addDate < b.addDate) return -1;
    });
  }
  if (sortBtn.value == `character-up`) {
    return books.sort((a, b) => {
      if (a.title < b.title) return -1;
    });
  }
  if (sortBtn.value == `character-down`) {
    return books.sort((a, b) => {
      if (a.title > b.title) return -1;
    });
  }
  if (sortBtn.value == `page-up`) {
    return books.sort((a, b) => {
      if (a.pages < b.pages) return -1;
    });
  }
  if (sortBtn.value == `page-down`) {
    return books.sort((a, b) => {
      if (a.pages > b.pages) return -1;
    });
  }
  if (sortBtn.value == `year-up`) {
    return books.sort((a, b) => {
      if (a.year < b.year) return -1;
    });
  }
  if (sortBtn.value == `year-down`) {
    return books.sort((a, b) => {
      if (a.year > b.year) return -1;
    });
  }
}

/////////////////////////////////////////////////////
//Add EventListener

// form popup window appear
showFormBtn.addEventListener(`click`, function () {
  formContainer.classList.remove(`hidden`);
});

addBookBtn.addEventListener(`click`, addBookToLibrary);

bookCardContainer.addEventListener(`click`, function (e) {
  if (e.target.className.includes(`delBtn`)) {
    const selectCard = e.target;

    const bookCard = selectBook(selectCard);
    const bookIndex = books.indexOf(bookCard);
    books.splice(bookIndex, 1);

    renderBookCard(books);
    if (books.length === 0) emptyLibraryInfo.classList.remove(`hidden`);
  }
  if (e.target.className.includes(`slider`)) {
    const selectCard = e.target;
    const bookCard = selectBook(selectCard);

    if (bookCard.isRead === false) bookCard.isRead = true;
    else bookCard.isRead = false;

    renderBookCard(books);
  }
});

sortBtn.addEventListener(`input`, function () {
  sortedBooks = sortBook();
  renderBookCard(sortedBooks);
});
