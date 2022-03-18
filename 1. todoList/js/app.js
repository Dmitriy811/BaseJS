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

  const themes = {
    default: {
      '--body-bg': '#51a5ff',
      '--base-text-color': '#fff',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
      '--indigo': '#4b0082'
    },
    dark: {
      '--body-bg': '#1f1f1f',
      '--base-text-color': '#fff',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--indigo': '#fff'
    },
    light: {
      '--body-bg': '#aaaaaa',
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--indigo': '#000'
    },
  };

  const listGroup = document.querySelector('.list-group'),
    form = document.forms['addTask'],
    inputTitle = form.elements['title'],
    inputBody = form.elements['body'],
    themeSelect = document.getElementById('themeSelect');

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
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2', 'card-body');
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

  const onThemeSelecthandler = e => {
    const selectTheme = themeSelect.value;
    const theme = themes[selectTheme];

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    })
  }

  const setTheme = color => { }

  const deleteTask = elem => {
    if (!confirm(`Do u want delete this element?\n"${elem.firstChild.textContent}"`)) return;
    elem.remove();
    alert('Done!');
  }


  themeSelect.addEventListener('change', onThemeSelecthandler)
  giveInfo(arrOfTasks);
  form.addEventListener('submit', addNewtask);
  listGroup.addEventListener('click', ({ target }) => { if (target.classList.contains('delete-btn')) deleteTask(target.closest('[data-id]')) })

})(tasks);


