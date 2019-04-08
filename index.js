document.addEventListener("DOMContentLoaded", function() {});
const bookURL = 'http://localhost:3000/books'

fetch(bookURL)
.then(resp => resp.json())
.then(data => {
  console.log(data)
  renderBooks(data)
})

const renderBooks = (books) => {
  let ul = document.getElementById('list')
  books.forEach(function(book){
    let li = document.createElement('li')
    li.textContent = book.title
    li.addEventListener('click', () => {
      console.log("clicked button!")
      bookDetails(book)
    })
    ul.appendChild(li)
  })
  let div = document.getElementById('list-panel')
  div.appendChild(ul)
}

const bookDetails = (book) => {
  let parent = document.getElementById('show-panel')
  while(parent.firstChild){ //clear out previous book details
    parent.firstChild.remove() //only show one book details at a time
  }

  let header = document.createElement('h4')
  header.textContent = book.title
  parent.appendChild(header)

  let img = document.createElement('img')
  img.src = book.img_url
  parent.appendChild(img)

  let div = document.createElement('div')
  div.textContent = book.description
  parent.appendChild(div)

  let ul = document.createElement('ul')
  let likes = book.users
  likes.forEach(function(user){
    let li = document.createElement('li')
    li.textContent = user.username
    ul.appendChild(li)
  })
  parent.appendChild(ul)


  let button = document.createElement('button')
  button.textContent = "Like Me"
  button.addEventListener("click", () => {
    addLike(book)
  })
  parent.appendChild(button)
}

const addLike = (book) => {

  book.users.push({"id": 1, "username":"pouros"})
  let updated = book.users
  console.log(updated)
  let config = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'},
    body: JSON.stringify({users: updated})
  }
  let url = bookURL + '/' + book.id

  fetch(url, config)
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
  })


}
