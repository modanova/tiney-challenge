// let modal = document.getElementsByClassName("modal")[0];
// let btn = document.getElementById("submit");
// let span = document.getElementsByClassName("close");

// btn.onclick = function() {
//     modal.classList.toggle("hidden");
//   }

// span.onclick = function() {
//     modal.classList.toggle("hidden");
//   }

// window.onclick = function(event) {
//     if (event.target == signIn) {
//         modal.classList.toggle("hidden");
//     }
//   }

// console.log('it works!');
const register = document.getElementById("register");
const totalCounter = document.getElementById("total");

const createPupilElement = (pupil) => {
    // Create a div from the template with class 'template-pupil'
    const template = document.querySelector('.template-pupil');
    const newPupil = template.content.cloneNode(true);
    // get picture
    newPupil.querySelector(".img-pupil").src = pupil.avatar;
    // get name
    newPupil.querySelector(".name-pupil").innerHTML = pupil.name;
    return newPupil;
}

const signIn = (event) => {
    // TODO: Open the confirm sign-in modal and populate all the data
}

const confirmSignIn = (event) => {
    // TODO: Mark the student as signed in and update its element
    // TODO: hide signIn and show signOut
    // TODO: hide the modal
    // savePupils(...)
}

const reportAbsent = (event) => {
    // TODO: Mark the student as absent and update its element
    // TODO: hide signIn and show absent
    // TODO: hide the modal
    // savePupils(...)
}

const signOut = (event) => {
    // TODO: Mark the student as signed out and update its element
    // TODO: hide signOut and show signIn or whatever needs to be shown
    // savePupils(...)
}

const savePupils = (pupils) => {
    window.localStorage.setItem("pupils", JSON.stringify(pupils));
}

const loadPupils = async () => {
    let pupils = null;
    try {
        pupils = JSON.parse(window.localStorage.getItem("pupils"));
        if (!pupils) throw Error("No pupils in local storage");
    } catch {
        console.log("Cannot load pupils, fetch from data/pupils.json");
        pupils = await fetch("data/pupils.json").then((x)=>x.json());
    }
    return pupils;
}

const main = async () => {
    register.replaceChildren();
    // 1. Load all pupils
    const pupils = await loadPupils();
    // 2. Loop through all pupils and create their elements
    const elements = pupils.map(createPupilElement);
    // TODO: 3. Append those elements
    elements.forEach((el) => {
        const hr = document.createElement("hr");
        register.appendChild(hr);
        register.appendChild(el);
    }); 
    // TODO: 4. Add event listeners to all Sign-in/Sign out buttons
    // const signIns = document.getElementsByClassName("sign-in");
    // const signOuts = document.getElementsByClassName("sign-out");
    // ... forEach(x => x.addEventListener('click', signIn/singOut))
}

main();