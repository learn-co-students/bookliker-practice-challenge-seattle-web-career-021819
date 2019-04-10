document.addEventListener("DOMContentLoaded", function() {});
const BOOKS_URL = "http://localhost:3000/books"

const listPanel = document.getElementById("list-panel")
const list = document.getElementById("list")
let showPanel = document.getElementById("show-panel")

fetch(BOOKS_URL)
.then(response => response.json())
.then(data => getDataIntoList(data))

function getDataIntoList(data) {
  for (let book of data) {
    // console.log(book.title)
    // get each book's title and add it to list
    let li = document.createElement("li")
    li.textContent = book.title
    li.addEventListener("click", () => displayBook(book.id))
    list.appendChild(li)
  }
  listPanel.appendChild(list)
  return listPanel
}

function displayBook(id) {
  clearPanel()

  fetch(BOOKS_URL + `/${id}`)
  .then(response => response.json())
  .then(book => bookInfo(book))
}

function bookInfo(book) {
  // display book title
  let h2 = document.createElement("h2")
  h2.textContent = book.title
  showPanel.appendChild(h2)

  // display book image
  let image = document.createElement("img")
  image.src = book.img_url
  showPanel.appendChild(image)

  // display book description
  let desc = document.createElement("p")
  desc.textContent = book.description
  showPanel.appendChild(desc)

  // display users who have liked book
  let ul = document.createElement("ul")
  ul.id = "likes-users"
  for (let user of book.users) {
    let li = document.createElement("li")
    li.textContent = user.username
    ul.appendChild(li)
  }
  showPanel.appendChild(ul)

  // display 'like' button
  displayLikeButton(book)

  return showPanel
}

function clearPanel(){
  while (showPanel.firstChild) {
    showPanel.firstChild.remove()
  }
}

function displayLikeButton(book) {
  let button = document.createElement("button")
  button.id = "likeBtn"
  let users = document.getElementById("likes-users").children
  for (let user of users) {
    if (user.textContent === "pouros") {
      button.textContent = "Unlike"
    } else {
      button.textContent = "Like"
    }
  }
  button.addEventListener('click', () => {
    if (button.textContent === "Like") {
      addLike(book.id)
    } else {
      removeLike(book.id)
    }
  })

  showPanel.appendChild(button)
}

function addLike(bookId) {
  let users = document.getElementById('likes-users')
  let li = document.createElement("li")
  li.textContent = "pouros"
  users.appendChild(li)

  fetch(BOOKS_URL + `/${bookId}`)
  .then(response => response.json())
  .then(data => {
    let likers = data.users
    let pouros = {id: 1, username: "pouros"}
    likers.push(pouros)
    patchLiker(likers, bookId)
  })

  let button = document.getElementById("likeBtn")
  button.textContent = "Unlike"
  return users
}

function patchLiker(likers, book) {
  fetch(BOOKS_URL + `/${book}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({users: likers})
  })
  .then(response => response.json())
}

function removeLike(bookId) {
  let likers = document.getElementById('likes-users')
  likers.lastElementChild.remove()

  fetch(BOOKS_URL + `/${bookId}`)
  .then(response => response.json())
  .then(data => {
    let likers = data.users
    likers.pop()
    patchLiker(likers, bookId)
  })

  let button = document.getElementById("likeBtn")
  button.textContent = "Like"
  return likers
}
