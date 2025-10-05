let lists = document.getElementsByClassName("list");
let rightBox = document.querySelector('.cons ul');
let leftBox = document.querySelector('.pros ul');
let selected = null;


document.querySelectorAll('.list img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});


for(let list of lists){
    list.addEventListener("dragstart", (e) => {
        selected = e.target;
    });
}

// Add dragover to both boxes (allows dropping)
rightBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

leftBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

// Drop handlers
rightBox.addEventListener("drop", (e) => {
    if(selected) {
        rightBox.appendChild(selected);
        selected = null;
    }
});

leftBox.addEventListener("drop", (e) => {
    if(selected) {
        leftBox.appendChild(selected);
        selected = null;
    }
});
//The element that is triggers the dragstart event when you drag the element with your mouse




