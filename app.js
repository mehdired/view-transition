async function updateView(event) {
	event.preventDefault();

	const response = await fetch(event.target.href);
	const html = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const newContent = doc.querySelector('body').innerHTML;

	const displayNewImage = () => {
		document.querySelector('body').innerHTML = newContent;
		addEventListeners();
	};
	history.pushState({}, null, event.target.href);

	const transition = document.startViewTransition(() => displayNewImage());
}

function addEventListeners() {
	document.querySelector('.link').addEventListener('click', updateView);
}
addEventListeners();
