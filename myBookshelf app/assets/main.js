const formBook = document.getElementById("formBook");
const addButton = document.getElementById("add-btn");
const closeFormBook = document.getElementById("close");
const searchButton = document.getElementById("search");
const UNCOMPLETED_BOOK_ID = "unread";
const COMPLETED_BOOK_ID = "read";
const BOOK_ITEMID = "itemId";

const addBook = function () {
    const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);
    const inputTitle = document.getElementById("title").value;
    const inputAuthor = document.getElementById("author").value;
    const inputYear = document.getElementById("year").value;

    const book = makeBook(inputTitle, inputAuthor, inputYear, false);
    const bookObject = composeBookObject(
        inputTitle,
        inputAuthor,
        inputYear,
        false
    );

    book[BOOK_ITEMID] = bookObject.id;
    bookslist.push(bookObject);

    uncompletedBook.append(book);
    updateDataToStorage();
};

const makeBook = function (title, author, year, isCompleted) {
    const image = document.createElement("img");
    if (isCompleted) {
        image.setAttribute("src", "assets/images/read.jpg");
    } else {
        image.setAttribute("src", "assets/images/unread.jpg");
    }

    const imageBook = document.createElement("div");
    imageBook.classList.add("image-book");
    imageBook.append(image);

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const authorName = document.createElement("p");
    authorName.innerText = author;

    const bookYear = document.createElement("small");
    bookYear.innerText = `${year}`;

    const detail = document.createElement("div");
    detail.classList.add("detail-book");
    detail.append(bookTitle, authorName, bookYear);

    const container = document.createElement("div");
    container.classList.add("container");
    container.append(imageBook, detail);

    if (isCompleted) {
        container.append(createUnreadButton(), createDeleteButton());
    } else {
        container.append(createReadButton(), createDeleteButton());
    }
    return container;
};
const createButton = function (buttonTypeClass, eventListener) {
    const button = document.createElement("img");
    button.classList.add(buttonTypeClass);

    if (buttonTypeClass === "read-button")
        button.setAttribute("src", "assets/images/read-btn-sm.png");
    if (buttonTypeClass === "delete")
        button.setAttribute("src", "assets/images/delete-btn-sm.png");
    if (buttonTypeClass === "unread-button")
        button.setAttribute("src", "assets/images/unread-btn-sm.png");

    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
};
const createReadButton = function () {
    return createButton("read-button", function (event) {
        addBookToCompleted(event.target.parentElement);
    });
};
const addBookToCompleted = function (bookElement) {
    const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);
    const bookTitle = bookElement.querySelector(".detail-book > h3").innerText;
    const bookAuthor = bookElement.querySelector(".detail-book > p").innerText;
    const bookYear = bookElement.querySelector(".detail-book > small").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    bookCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
};

const removeBookFromCompleted = function (bookElement) {
    const isDelete = prompt("Apakah anda yakin ingin menghapus buku ini?\nKetik 1 jika Ya dan 0 jika Tidak");
    if (isDelete === "1") {
        const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
        bookslist.splice(bookPosition, 1);
        bookElement.remove();
        updateDataToStorage();
        alert("Buku berhasil dihapus");
    } else
        alert("Buku tidak berhasil dihapus");
};

const createDeleteButton = function () {
    return createButton("delete", function (event) {
        removeBookFromCompleted(event.target.parentElement);
    });
};

const undoBookFromCompleted = function (bookElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);

    const bookTitle = bookElement.querySelector(".detail-book > h3").innerText;
    const bookAuthor = bookElement.querySelector(".detail-book > p").innerText;
    const bookYear = bookElement.querySelector(".detail-book > small").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
};

const createUnreadButton = function () {
    return createButton("unread-button", function (event) {
        undoBookFromCompleted(event.target.parentElement);
    });
};

const booksListLength = function () {
    const jumlahBuku = document.getElementById("jumlahBuku");
    jumlahBuku.innerText = bookslist.length;
};

addButton.addEventListener("click", function () {
    formBook.classList.toggle("formBook-open");
});

closeFormBook.addEventListener("click", function () {
    formBook.style.transition = "1s";
    formBook.classList.toggle("formBook-open");
});

document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        formBook.classList.remove("formBook-open");
        addBook();
    });

    if (checkStorage()) {
        loadDatafromStorage();
    }
});

document.addEventListener("ondatasaved", function () {
    console.log("Data berhasil disimpan.");
    booksListLength();
});

document.addEventListener("ondataloaded", function () {
    refreshDataFromBookslist();
    booksListLength();
});

searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);
    const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);
    const bookTitle = document.getElementById("filter-title").value;
    const filterBooks = findBookTitle(bookTitle);
    uncompletedBook.innerHTML = "";
    const unread = document.createElement("h4");
    unread.innerText = "Unread";
    uncompletedBook.append(unread);

    bookCompleted.innerHTML = "";
    const read = document.createElement("h4");
    read.innerText = "Read";
    bookCompleted.append(read);
    if (filterBooks.length > 0) {

        filterBooks.forEach(book => {
            const newFilterBook = makeBook(book.Title, book.Author, book.Year, book.isCompleted);
            newFilterBook[BOOK_ITEMID] = book.id;
            if (book.isCompleted)
                bookCompleted.append(newFilterBook);
            else
                uncompletedBook.append(newFilterBook);
        })
    } else {
        alert("Buku tidak ditemukan");
        refreshDataFromBookslist();
        booksListLength();
    }
    document.getElementById("filter-title").value = '';
});