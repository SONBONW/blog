

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







let img = document.getElementById("post-img");



function checkValue(val) {
    if (val.value === "") {
        return false;
    }
    return true;
}

function showError(val, error) {
    if (!checkValue(val)) {
        error.innerHTML = "Input has not content";
    } else {
        error.innerHTML = "";
    }
}

function eventChangeError(e, error) {
    e.addEventListener("change", () => {
        error.innerHTML = "";
    })
}

eventChangeError(title, errortitle);
eventChangeError(img, errorimg);
eventChangeError(content, errorcontent);

submit.addEventListener("click", () => {
    if (checkValue(title) && checkValue(img) && checkValue(content)) {
        alert(getValueInput(title));
        alert(getValueInput(img));
        alert(getValueInput(content));
        alert("Submit");
    } else {
        showError(title, errortitle);
        showError(Img, errorimg);
        showError(content, errorcontent);
    }
});


/*Get Value In Input*/
function getValueInput(e) {
    return e.value;
}

/*Limit number of characters in input title*/

function inputCharacters() {
  let numCharacters = title.value.length;

  if (numCharacters >= 70) {
    title.value = title.value.slice(0, 70);
    title.blur(); // Loại bỏ focus khỏi textarea để dừng lại nhận ký tự từ bàn phím
  }
}

/*Limit number of characters in textarea content*/
function countCharacters() {
  let charCount = document.getElementById("charCount");

  let numCharacters = content.value.length;

  charCount.textContent = numCharacters + " /10000";

  if (numCharacters >= 10000) {
    content.value = content.value.slice(0, 10000);
    content.blur(); // Loại bỏ focus khỏi textarea để dừng lại nhận ký tự từ bàn phím
  }
}
