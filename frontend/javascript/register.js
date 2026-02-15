const form = document.querySelector('.formtosubmit');
const theName = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.removeEventListener('submit', handleSubmit);

async function handleSubmit(e){
     e.preventDefault();

    const errorElements = form.querySelectorAll('#thename, #thesurname, #themail, #thepass');
    errorElements.forEach(function(element) {
        element.style.color = "";
        element.textContent = "";
    });

    let isValid = true;

    if(!validateNames(theName)){
        const error = form.querySelector('#thename');
        error.style.color = "red";
        error.textContent = "Enter valid name"

        // e.preventDefault();
        isValid = false;
    }

    if(!validateNames(surname)){
        const error = form.querySelector('#thesurname');
        error.style.color = "red";
        error.textContent = "Enter valid surname"

        // e.preventDefault();
        isValid = false;
    }


    if(!validateEmail(email)){
        const error = form.querySelector('#themail');
        error.style.color = "red";
        error.textContent = "Enter valid email"

        // e.preventDefault();
        isValid = false;
    }


    if(!validatePassword(password)){
        const error = form.querySelector('#thepass');
        error.style.color = "red";
        error.textContent = "Password should be 8-15, atleast 1 lowercase letter, 1 uppercase and 1 special character";

        // e.preventDefault();
        isValid = false;
    }

    if(!isValid) return;

    try{
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: theName.value.trim(),
                surname: surname.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            })
        });

        const data = await response.json();
        console.log(data);
        if(!response.ok){
            throw new Error(data.message || "Registration failed");
        }


        window.location.href = "/login.html";
    }
    catch(error){
        const errorBox = form.querySelector('#thename'); // or general error container
        errorBox.style.color = "red";
        errorBox.textContent = error.message;
    }
};

form.addEventListener('submit', handleSubmit);

const validateNames = function(names){ //validate 1st and lst name
    var regname = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if(names.value.match(regname)){
        return true;
    }
    else{
        return false;
    }
}



const validateEmail = function(email){
    var regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(regemail)){
        return true;
    
    }
    else{
        return false;
    }

}

const validatePassword = function(password){
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return regex.test(password.value);
}

const clearInput = function(){
    theName.value = "";
    surname.value = "";
    email.value = "";
    password.value = "";
}

const clearErrorMessages = function(){
    form.querySelector('#thename').textContent = "";
    form.querySelector('#thesurname').textContent = "";
    form.querySelector('#themail').textContent = "";
    form.querySelector('#thepass').textContent = "";
}