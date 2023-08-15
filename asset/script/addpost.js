/**/

let title = document.getElementById("title");
let content = document.getElementById("content");
let img = document.getElementById("post-img");
let errortitle = document.getElementById('errortitle');
let errorimg = document.getElementById('errorimg');
let errorcontent = document.getElementById('errorcontent');
let submit = document.getElementById('submit');


/**/
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
    if (e) {
        e.addEventListener("change", () => {
            error.innerHTML = "";
        })
    }

}

if (submit) {
    submit.addEventListener("click", () => {
        if (checkValue(title) && checkValue(img) && checkValue(content)) {
            //   alert(getValueInput(title));
            //   alert(getValueInput(img));
            //   alert(getValueInput(content));
            
            alert("Submit");

        } else {
            showError(title, errortitle);
            showError(img, errorimg);
            showError(content, errorcontent);
        }
    });
}


/*Get Value In Input*/
function getValueInput(e) {
    return e.value;
}



/**/


eventChangeError(title, errortitle);
eventChangeError(img, errorimg);
eventChangeError(content, errorcontent);



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


/*Add Post New Infor From Form */

const testPost = [{
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
        avatar: "./asset/img/img-user2.png",
        username: "Tracey Wilson",
    }
}];

function addPost() {
    const newPost = {
        title: getValueInput(title),
        tag: 'Technology',
        time: formatDate(currentDate),
        user: {
            username: 'This is User Name',
            avatar: 'This is Avater',
        },
    };
    testPost.push(newPost);
    console.log('New post added:', newPost);

    /*Reset Input*/
    title.value = '';
    // tagInput.value = '';
    // timeInput.value = '';
    // usernameInput.value = '';
}

/*Get Time Now*/
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

const currentDate = new Date(); // Lấy thời gian hiện tại
// const formattedDate = formatDate(currentDate);