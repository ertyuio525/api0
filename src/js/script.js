function redirectToRoute(route) {
    window.location.href = route;
}


const text = document.querySelector(".second-text");
const states = ["User", "World", "Coder"];
let currentState = 0;

const textLoad = () => {
    text.textContent = states[currentState];
    currentState = (currentState + 1) % states.length;
};
textLoad();
setInterval(textLoad, 4000);


