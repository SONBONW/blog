/*Click Change Color Background*/

let changeColor = document.getElementById('light-dark');

let mode = localStorage.getItem("ChangeColorPage");
if (mode == 'true') {
  document.body.classList.add('changecolor');
  changeColor.checked = true;
}

/**/

let title = document.getElementById("title");
let content = document.getElementById("content");
let img = document.getElementById("post-img");
let errortitle = document.getElementById('errortitle');
let errorimg = document.getElementById('errorimg');
let errorcontent = document.getElementById('errorcontent');
let submit = document.getElementById('submit');



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
      alert(getValueInput(title));
      alert(getValueInput(img));
      alert(getValueInput(content));
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


/*Render Post Data*/

let post = document.getElementsByClassName('posts')[0];
const posts = [{
    img: "./asset/img/img-post1.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user2.png",
      username: "Tracey Wilson",
    }
  },
  {
    img: "./asset/img/img-post2.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user1.png",
      username: "Json Francisco",
    }
  },
  {
    img: "./asset/img/img-post3.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user3.png",
      username: "Elizabeth Slavin",
    }
  },
  {
    img: "./asset/img/img-post4.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user4.png",
      username: "Ernie Smith",
    }
  },
  {
    img: "./asset/img/img-post5.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user5.png",
      username: "Eric Smith",
    }
  },
  {
    img: "./asset/img/img-post6.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user2.png",
      username: "Tracey Wilson",
    }
  },
  {
    img: "./asset/img/img-post7.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user1.png",
      username: "Jason Francisco",
    }
  },
  {
    img: "./asset/img/img-post8.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user3.png",
      username: "Elizabeth Slavin",
    }
  },
  {
    img: "./asset/img/img-post9.png",
    tag: "Technology",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    time: "August 20, 2022",
    user: {
      avatar: "./asset/img/img-user4.png",
      username: "Ernie Smith",
    }
  }
];
const listPost = {

  posts,
  render: function () {
    const html = this.posts.map((infor) => {
      return `<div class="col-lg-4 col-md-6 col-sm-8 col-12">
                    <article class="post">
                        <img class="img-fluid" src="${infor.img}" alt="">
                        <span class="tag rounded">${infor.tag}</span>
                        <h4>${infor.title}</h4>
                        <div class="infor-user">
                            <div class="user">
                                <img class="img-fluid" src="${infor.user.avatar}" alt="">
                                <span>${infor.user.username}</span>
                            </div>
                            <span class="time">${infor.time}</span>
                        </div>
                    </article>
                </div>`
    })
    post.innerHTML = html.join('');
  },

  start: function () {
    this.render();
  },

}


/*Click View Post*/

let viewClick = document.getElementsByClassName('view')[0];
viewClick.addEventListener("click", () => {
  
})


document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  eventChangeError(title, errortitle);
  eventChangeError(img, errorimg);
  eventChangeError(content, errorcontent);

  changeColor.addEventListener('click', () => {
    let mode = document.body.classList.toggle("changecolor");
    localStorage.setItem("ChangeColorPage", mode);
  });
  listPost.start();
});