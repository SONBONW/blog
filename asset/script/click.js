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

var btnChangeColor = document.getElementById('light-dark');

let mode = localStorage.getItem("ChangeColorPage");
if (mode == 'true') {
    document.body.classList.add('changecolor');
    btnChangeColor.checked = true;
}

btnChangeColor.addEventListener('click', () => {
    let mode = document.body.classList.toggle("changecolor");
    localStorage.setItem("ChangeColorPage", mode);
})


/*Get Value In Input*/

var Title = document.getElementById("title");
var Content = document.getElementById("content");
var Img = document.getElementById("post-img")
var submit = document.getElementById("submit");


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


/*Limit number of characters in textarea*/
function countCharacters() {
  var charCount = document.getElementById("charCount");

  var numCharacters = Content.value.length;

  charCount.textContent = numCharacters + " /10000";

  if (numCharacters >= 10000) {
    Content.value = Content.value.slice(0, 10000);
    Content.blur(); // Loại bỏ focus khỏi textarea để dừng lại nhận ký tự từ bàn phím
  }
}
