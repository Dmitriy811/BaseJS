const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {

  const listGroup = document.querySelector('.list-group'),
    form = document.forms['addTask'],
    inputTitle = form.elements['title'],
    inputBody = form.elements['body'];

  const giveInfo = tasks => {
    const fragment = document.createDocumentFragment()
    tasks.forEach(e => fragment.appendChild(createElement(e)))
    listGroup.appendChild(fragment);
  }

  const createElement = ({ body, title, _id }) => {
    const li = document.createElement('li'),
      span = document.createElement('span'),
      button = document.createElement('button'),
      p = document.createElement('p');
    li.setAttribute('data-id', _id)
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    button.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    p.classList.add('mt-2', 'w-100');
    span.textContent = title;
    button.textContent = "Delete"
    p.textContent = body;
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(p);
    return li
  }

  const addNewtask = e => {
    e.preventDefault();
    if (!inputTitle.value || !inputBody.value) { alert('Plz, input correct date!'); return }
    const newTask = {
      title: inputTitle.value,
      body: inputBody.value,
      _id: (Math.random() * 100 + 0).toFixed(2)
    }
    listGroup.insertAdjacentElement('afterbegin', createElement(newTask));
  }


  const deleteTask = elem => {
    if (!confirm(`Do u want delete this element?\n"${elem.firstChild.textContent}"`)) return;
    elem.remove();
    alert('Done!');
  }

  giveInfo(arrOfTasks);
  form.addEventListener('submit', addNewtask)
  listGroup.addEventListener('click', ({ target }) => { if (target.classList.contains('delete-btn')) deleteTask(target.closest('[data-id]')) })

})(tasks);


