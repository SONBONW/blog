 function click(nameclass, position, initial, replace) {
     const element = document.getElementsByClassName(nameclass)[position];
     const check = element.classList.contains(replace);
     if (check) {
         element.classList.remove(replace);
         element.classList.add(initial);
     } else {
         element.classList.add(replace);
         element.classList.remove(initial);
     }
 }


 /*Click Change Color Background*/

let changeColor = document.getElementById('light-dark');

let mode = localStorage.getItem("ChangeColorPage");
if (mode == 'true') {
    document.body.classList.add('changecolor');
    changeColor.checked = true;
}

changeColor.addEventListener('click', () => {
    let mode = document.body.classList.toggle("changecolor");
    localStorage.setItem("ChangeColorPage", mode);
})


/*Get Value In Input*/

let Title = document.getElementById("title");
let Content = document.getElementById("content");
let Img = document.getElementById("post-img")
let submit = document.getElementById("submit");


function Check(val) {
    if (val.value === "") {
        return false;
    }
    return true;
}

function showError(val, error) {
    if (!Check(val)) {
        error.innerHTML = "Input has not content";
    } else {
        error.innerHTML = "";
    }
}

function eventChange(e, error) {
    e.addEventListener("change", () => {
        error.innerHTML = "";
    })
}

eventChange(Title, errortitle);
eventChange(Img, errorimg);
eventChange(Content, errorcontent);

submit.addEventListener("click", () => {
    if (Check(Title) && Check(Img) && Check(Content)) {
        alert("Submit");
    } else {
        showError(Title, errortitle);
        showError(Img, errorimg);
        showError(Content, errorcontent);
    }
});

/*Limit number of characters in input title*/

function inputCharacters() {
  let numCharacters = Title.value.length;

  if (numCharacters >= 70) {
    Title.value = Title.value.slice(0, 70);
    Title.blur(); // Loại bỏ focus khỏi textarea để dừng lại nhận ký tự từ bàn phím
  }
}

/*Limit number of characters in textarea content*/
function countCharacters() {
  let charCount = document.getElementById("charCount");

  let numCharacters = Content.value.length;

  charCount.textContent = numCharacters + " /10000";

  if (numCharacters >= 10000) {
    Content.value = Content.value.slice(0, 10000);
    Content.blur(); // Loại bỏ focus khỏi textarea để dừng lại nhận ký tự từ bàn phím
  }
}
