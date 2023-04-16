# Udacity-React-MyReads Project

[![repo-size](https://img.shields.io/github/repo-size/AsBaZa/Udacity-React-MyReads?style=for-the-badge&logo=appveyor)](https://img.shields.io/github/repo-size/AsBaZa/Udacity-React-MyReads?style=for-the-badge&logo=appveyor)

This is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library to persist information as you interact with the application.

## Getting Started

To get started running the app:

 - Clone the repository:
 ```bash
git clone https://github.com/AsBaZa/Udacity-React-MyReads.git
 ```
 - Navigate to the `starter/` folder.
 - Install all project dependencies with `npm install`
 - Start the development server with `npm start`

## Backend Server

In order to persist information as you interact with the application a backend server is provided. The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms. That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).
