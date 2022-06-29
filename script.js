const modal = document.querySelector("#modal");
const modalClose = document.querySelector(".close");
const confirmSignInBtn = document.querySelector("#confirm__sign-in");
const reportAbsentBtn = document.querySelector("#report_absent");

let beeRoom = null;

// Open or close the sign in pop-up
const toggleModal = () => {
    modal.classList.toggle('hidden');
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

const getPupilById = (id) => {
    const pupilIdx = beeRoom.findIndex(pupil => pupil.id === id);
    return beeRoom[pupilIdx];
}

const createPupilElement = (pupil) => {
    // Create a div from the template with class 'template-pupil'
    const template = document.querySelector('.template-pupil');
    const newPupil = template.content.cloneNode(true);
    newPupil.firstElementChild.id = pupil.id;
    // Get name
    newPupil.querySelector(".name-pupil").innerHTML = pupil.name;
    // Get picture
    newPupil.querySelector(".img-pupil").src = pupil.avatar;
    // Get id 
    newPupil.querySelector(".sign-in").setAttribute('data-id', pupil.id);
    newPupil.querySelector(".sign-out").setAttribute('data-id', pupil.id);
    if ("signedIn" in pupil) {
        newPupil.querySelector(".sign-in").classList.add("hidden");
        newPupil.querySelector(".sign-out").classList.remove("hidden");
        newPupil.querySelector(".signed-in").classList.remove("hidden");
        newPupil.querySelector(".signed-out").classList.add("hidden");
        newPupil.querySelector("time").innerHTML = pupil.signedIn;
    }
    return newPupil;
}

const signIn = (event) => {
    const modalName = modal.querySelector("#modalName");
    const modalImg = modal.querySelector("#thisPupil");
    const modalTime = modal.querySelector('#check-in-time');
    const now = new Date();
    // 1. Populate all the data
    const pupil = getPupilById(event.target.getAttribute("data-id"));

    confirmSignInBtn.setAttribute('data-id', pupil.id);
    modalName.innerHTML = pupil.name;
    modalImg.src = pupil.avatar;
    modalTime.value = now.getHours() + ":" + now.getMinutes();
    // 2. Open the confirm sign-in modal
    toggleModal();
    // 3. If confirmed is clicked, hide sing-in buttton and show sign out button
    // TODO 
    // const btn_sign_in = event.target;
    // btn_sign_in.classList.add("hidden");
    // const btn_sign_out = btn_sign_in.parentElement.querySelector(".sign-out");
    // btn_sign_out.classList.remove("hidden");
}

const confirmSignIn = (event) => {
    const pupil = getPupilById(event.target.getAttribute('data-id'));
    const modalTime = modal.querySelector('#check-in-time');
    const pupilElement = document.getElementById(pupil.id);
    // TODO: Mark the student as signed in and update its element
    pupil['signedIn'] = modalTime.value;
    // Hide signIn and show signOut
    pupilElement.querySelector(".sign-in").classList.add("hidden");
    pupilElement.querySelector(".sign-out").classList.remove("hidden");
    pupilElement.querySelector(".signed-in").classList.remove("hidden");
    pupilElement.querySelector(".signed-out").classList.add("hidden");
    pupilElement.querySelector("time").innerHTML = modalTime.value;
    // Hide the modal
    toggleModal();
    savePupils(beeRoom);
}

const reportAbsent = (event) => {
    // TODO: Mark the student as absent and update its element
    // TODO: hide signIn and show absent
    // TODO: hide the modal
    // savePupils(...)
}

const signOut = (event) => {
    const pupil = getPupilById(event.target.getAttribute('data-id'));
    const pupilElement = event.target.parentElement.parentElement;

    pupilElement.querySelector(".sign-in").classList.remove("hidden");
    pupilElement.querySelector(".sign-out").classList.add("hidden");
    pupilElement.querySelector(".signed-in").classList.add("hidden");
    pupilElement.querySelector(".signed-out").classList.remove("hidden");
    pupilElement.querySelector("time").innerHTML = "";
    delete pupil["signedIn"];
    savePupils(beeRoom);
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
    reportAbsentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal();
    });
}

main();