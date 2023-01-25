const todoColumn = document.querySelector("#posts");
let tasks;
let postIdPrefix = "post-";

function createPostElement(id, content) {
	const newPostElement = document.createElement("div");
	const newPostDesc = document.createElement("p");
	const newPostTime = document.createElement("p");

	newPostElement.id = postIdPrefix + id;
	newPostElement.classList.add("border", "rounded", "p-3");
	newPostDesc.innerHTML = content;
	newPostTime.innerHTML = new Date().toDateString();
	newPostTime.classList.add("fw-light", "m-0");
	
	newPostElement.appendChild(newPostDesc);
	newPostElement.appendChild(newPostTime);

	return newPostElement;
}


fetch("http://localhost:3000/posts")
	.then((response) => response.json())
	.then((posts) => {
		for (post of posts) {
			const newPostElement = createPostElement(post.id, post.content);
			todoColumn.appendChild(newPostElement);
		}
	});

document.querySelector("#create-post-form").addEventListener("submit", (event) => {
	event.preventDefault();

	const form = event.target;
	if (!form.querySelector("textarea").value) {
		return;
	}
	
	fetch("http://localhost:3000/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": form.querySelector("textarea").value
			})
		}).then((response) => response.json())
		.then((newPost) => {

			const newPostElement = createPostElement(
				newPost.sessionId,
				form.querySelector("textarea").value
			);
		
			todoColumn.appendChild(newPostElement);
		});
});


document.querySelector("#register-form").addEventListener("submit", (event) => {
	event.preventDefault();

	const form = event.target;
	if (!form.querySelector("input").value) {
		return;
	}
	
	fetch("http://localhost:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"name": form.querySelector("input").value
			})
		})
		.then(() => {
			console.log("Registered: " + form.querySelector("input").value);
		});
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
	event.preventDefault();

	const form = event.target;
	if (!form.querySelector("input").value) {
		return;
	}
	
	fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"name": form.querySelector("input").value
			})
		})
		.then(() => {
			console.log("Logged in: " + form.querySelector("input").value);
		});
});


