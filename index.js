const list = document.getElementById('list')
const show = document.getElementById('show-panel')
const url = 'http://localhost:3000'

function fetchBooks() {
  fetch(url + '/books')
    .then(res => res.json())
    .then(json => json.map(book => renderBookListItem(book)))
}

function fetchBook(id) {
  fetch(url + '/books/' + id)
  .then(res => res.json())
  .then(json => renderBookShow(json))
}

function updateUserLike(id, book) {
  const user = {"id":1, "username":"pouros"}

  if (book.users.indexOf(user))
    return

  const users = book.users
  users.push(user)

  fetch(url + '/books/' + id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      users:  users
    })
  })
  .then(res => res.json())
  .then(json => updateUsers(id, user))
}

function updateUsers(id, user) {
  const users = document.querySelector(`#${'book'+id} ul`)
  const newUser = document.createElement('li')
  newUser.textContent = user.username

  users.appendChild(newUser)
}

function renderBookListItem(book) {
  const { title, id } = book
  const bookLi = document.createElement('li')
  bookLi.textContent = title
  bookLi.addEventListener('click', () => {
    fetchBook(id)
  })
  list.appendChild(bookLi)
}

function renderBookShow(book) {
  const { id, title, description, img_url, users } = book

  const container = document.createElement('div')
  container.id = 'book'+id

  const heading = document.createElement('h1')
  heading.textContent = title

  const img = document.createElement('img')
  img.src = img_url

  const desc = document.createElement('p')
  desc.textContent = description

  const usersList = document.createElement('ul')
  users.forEach(liker => {
    const li = document.createElement('li')
    li.textContent = liker.username
    usersList.appendChild(li)
  })

  const likeBtn = document.createElement('button')
  likeBtn.textContent = "LIKE"
  likeBtn.addEventListener('click', () => {
    updateUserLike(id, book)
  })

  container.appendChild(heading)
  container.appendChild(img)
  container.appendChild(desc)
  container.appendChild(likeBtn)
  container.appendChild(usersList)
  
  show.firstChild && show.firstChild.remove()
  show.appendChild(container)
}

fetchBooks()