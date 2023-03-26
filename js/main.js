const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const formsignin = document.getElementById('form-signin');

signUpButton.addEventListener('click', () => {
	formsignin.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	formsignin.classList.remove("right-panel-active");
});