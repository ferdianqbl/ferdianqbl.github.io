const STORAGE_KEY = 'BOOKSHELF_APPS';
let bookslist = [];

const checkStorage = () => {
    if (typeof (Storage) == undefined) {
        alert('Your Browser not support web storage');
        return false;
    }

    return true;
}

const saveData = () => {
    const parseData = JSON.stringify(bookslist);
    localStorage.setItem(STORAGE_KEY, parseData);
    document.dispatchEvent(new Event('ondatasaved'));
}

const loadDatafromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);

    if (data !== null)
        bookslist = data;

    document.dispatchEvent(new Event('ondataloaded'));
}

const updateDataToStorage = () => {
    if (checkStorage())
        saveData();
}

const composeBookObject = (Title, Author, Year, isCompleted) => {
    return {
        id: +new Date(),
        Title,
        Author,
        Year,
        isCompleted,
    }
}

const findBook = (bookId) => {
    for (book of bookslist) {
        if (book.id === bookId)
            return book;
    }

    return null;
}

const findBookIndex = (bookId) => {
    let index = 0;
    for (book of bookslist) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

const refreshDataFromBookslist = () => {
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    let bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

    for (book of bookslist) {
        const newBook = makeBook(book.Title, book.Author, book.Year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted) {
            bookCompleted.append(newBook);
        } else {
            bookUncompleted.append(newBook);
        }
    }
}