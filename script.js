const modalSignIn = document.querySelector("#modal");
const modalClose = document.querySelector(".close");
const confirmSignInBtn = document.querySelector("#confirm__sign-in");
const modalName = document.querySelector("#modalName");
const modalImg = document.querySelector("#thisPupil");

let beeRoom = null;

// Open or close the sign in pop-up
const toggleModal = () => {
    modalSignIn.classList.toggle('hidden');
}
// 

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
    // Get name
    newPupil.querySelector(".name-pupil").innerHTML = pupil.name;
    // Get picture
    newPupil.querySelector(".img-pupil").src = pupil.avatar;
    // Get id 
    newPupil.querySelector("#id0").id = pupil.id;
    return newPupil;
}

const signIn = (event) => {
    // 1. Open the confirm sign-in modal
    toggleModal();
    // 2. Populate all the data
    const pupilIdx = beeRoom.findIndex(pupil => pupil.id === event.target.id);
    const thisPupil = beeRoom[pupilIdx];
    confirmSignInBtn.setAttribute('data-id', thisPupil.id);
    modalName.innerHTML = thisPupil.name;
    modalImg.src = thisPupil.avatar;
    // - input current time
    // 3. If confirmed is clicked, hide sing-in buttton and show sign out button
    // TODO 
    // const btn_sign_in = event.target;
    // btn_sign_in.classList.add("hidden");
    // const btn_sign_out = btn_sign_in.parentElement.querySelector(".sign-out");
    // btn_sign_out.classList.remove("hidden");
}

const confirmSignIn = (event) => {
    // TODO: Mark the student as signed in and update its element
    // TODO: hide signIn and show signOut
    // TODO: hide the modal
    toggleModal();
    // savePupils(...)
}

const reportAbsent = (event) => {
    // TODO: Mark the student as absent and update its element
    // TODO: hide signIn and show absent
    // TODO: hide the modal
    // savePupils(...)
}

const signOut = (event) => {
    const btn_sign_out = event.target;
    btn_sign_out.classList.add("hidden");

    const btn_sign_in = btn_sign_out.parentElement.querySelector(".sign-in");
    btn_sign_in.classList.remove("hidden");
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
    beeRoom = await loadPupils();
    // 2. Loop through all pupils and create their elements
    const elements = beeRoom.map(createPupilElement);
    // 3. Append those elements
    elements.forEach((el) => {
        const hr = document.createElement("hr");
        register.appendChild(hr);
        register.appendChild(el);
    });
    // TODO: 4. Add event listeners to all Sign-in/Sign out buttons
    const signIns = document.getElementsByClassName("sign-in");
    const signOuts = document.getElementsByClassName("sign-out");

    // Initialise all event listeners
    for (btn of signIns) {
        btn.addEventListener('click', signIn);
    }
    for (btn of signOuts) {
        btn.addEventListener('click', signOut);
    }
    
    modalClose.addEventListener('click', toggleModal);
    confirmSignInBtn.addEventListener('click', confirmSignIn);
}

main();