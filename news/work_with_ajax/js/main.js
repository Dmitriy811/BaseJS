(function () {
	
const form = document.querySelector('.form-select');
const userInfo = document.querySelector('.user__info');

	function getUsers(user){

		const xhr = new XMLHttpRequest(),
		url = 'https://jsonplaceholder.typicode.com/users';


		xhr.open('GET', url);

		xhr.addEventListener('load', ()=>{
			user(JSON.parse(xhr.response));
		})
		xhr.send();
	}
	
	function choice(user){
		form.addEventListener('change', (e)=>{
			if(isNaN(e.target.value-1)) console.log('Default select example')
			else createFormUser(user[e.target.value-1]);
		})
	}
	function createForm(users){
		const fragment = document.createDocumentFragment();
		users.forEach(e => {
			const option = document.createElement('option');
			option.textContent = `${e.name} ${e.username}`;
			option.setAttribute('value', e.id);
			fragment.appendChild(option);
		});
		form.appendChild(fragment);
	}

	function createFormUser(user){
			// userInfo.textContent ='';
			const fragment = document.createDocumentFragment();
			const div = document.createElement('div');
			const divInfo = document.createElement('div');
			const button = document.createElement('button');
			div.classList.add('card');
			div.setAttribute('data-id', user.id)
			divInfo.classList.add('card-body');
			button.classList.add('btn', 'btn-danger', 'delete');
			button.setAttribute('type', 'button');
			button.textContent = 'clear';
			div.appendChild(divInfo);
			div.appendChild(button);
			divInfo.textContent = 
			`name:${user.name}
				email:${user.email}
				address:${user.address.city} ${user.address.street} ${user.address.suite} ${user.address.zipcode} 
				phone:${user.phone}
			`;
			fragment.appendChild(div);
			userInfo.appendChild(fragment);
	}

	getUsers(user=>{
		createForm(user)
		choice(user)
	})

	userInfo.addEventListener('click', ({target})=>{
		if(target.classList.contains('delete')){
			target.closest('[data-id]').remove();
		}
	})


})();
