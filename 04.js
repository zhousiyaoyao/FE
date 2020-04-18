let ul = document.querySelector('#ul')
ul.addEventListener('click', (event) => {
	console.log(event.target)
	console.log(event.currentTarget)
		console.log(event.target.innerText);
})