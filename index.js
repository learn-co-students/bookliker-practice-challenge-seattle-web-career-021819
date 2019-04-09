// document.addEventListener("DOMContentLoaded", function() {});
const list = document.getElementById('list');
const showDiv = document.getElementById('show-panel');
const booksURL = 'http://localhost:3000/books';

fetch(booksURL)
.then(res => res.json())
.then(data => {
  data.forEach(book => renderBooks(book));
})

function renderBooks(book) {
  const li = document.createElement('li');
  li.textContent = book.title;
  li.addEventListener("click", () => bookInfo(book));
  list.appendChild(li);
}

function bookInfo(book) {

  while (showDiv.firstChild) {
    showDiv.firstChild.remove()
  }

  const title = document.createElement('h2');
  const image = document.createElement('img');
  const description = document.createElement('p');
  const butt = document.createElement('button');

  title.textContent = book.title;
  image.src = book.img_url;
  description.textContent = book.description;
  butt.textContent = 'Like';
  butt.addEventListener('click', () => likeButton(book));

  showDiv.appendChild(title);
  showDiv.appendChild(image);
  showDiv.append(description);
  showDiv.appendChild(usersList(book));
  showDiv.appendChild(butt);
}

function usersList(book) {
  const div = document.createElement('div')
  book.users.forEach(user => {
    let userName = document.createElement('h4')
    userName.textContent = user.username
    div.appendChild(userName)
  })
  return div
}

function likeButton(book) {
  let newList = book.users.push({"id": 1, "username": "pouros"})

  let config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({users: newList})
  }

  fetch(`${booksURL}/${book.id}`, config)
  .then(resp => resp.json())
  .then(data => {
    console.log(book.title);
    bookInfo(book)
  })
}










// end
