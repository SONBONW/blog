// let posts = document.getElementsByClassName('posts')[0];

// const NUMBER_REQUESTS = 9;
// let current = 1;
// let createPost = (post) => {
//     let cardPost = document.createElement('div');
//     cardPost.classList.add("col-lg-4", "col-md-6", "col-sm-8", "col-12");
//     const postContent = `
//                     <article class="post">
//                         <img class="img-fluid" src="${post.img}" alt="">
//                         <span class="tag rounded">${post.tag}</span>
//                         <h4>${post.title}</h4>
//                         <div class="infor-user">
//                             <div class="user">
//                                 <img class="img-fluid" src="${post.user.avatar}" alt="">
//                                 <span>${post.user.username}</span>
//                             </div>
//                             <span class="time">${post.time}</span>
//                         </div>
//                     </article>
//                 `;
//     cardPost.innerHTML = postContent;
//     posts.appendChild(cardPost);
// };

// let addPost = (data) => {
//     let startRange = (current - 1) * NUMBER_REQUESTS;
//     let endRange = startRange + NUMBER_REQUESTS;
//     for (let i = startRange; i < endRange; i++) {
//         createPost(data[i]);
//     };
// };

// document.addEventListener("DOMContentLoaded", () => {
//     let xhr = new XMLHttpRequest();

//     xhr.open('GET', "http://localhost:3000/posts", true);
//     xhr.send();

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if (xhr.status != 200) {
//                 alert("Loi");
//                 console.log(xhr.status);
//             } else {
//                 let data = JSON.parse(xhr.responseText);
//                 addPost(data);
//             }
//         }
//     };

// });

let posts = document.getElementsByClassName('posts')[0];
let viewBtn = document.getElementsByClassName("view")[0];
const NUMBER_REQUESTS = 9;
let current = 1;

let createPost = (post) => {
    let cardPost = document.createElement('div');
    cardPost.classList.add("col-lg-4", "col-md-6", "col-sm-8", "col-12");
    const postContent = `
                    <article class="post">
                        <img class="img-fluid" src="${post.img}" alt="">
                        <span class="tag rounded">${post.tag}</span>
                        <h4>${post.title}</h4>
                        <div class="infor-user">
                            <div class="user">
                                <img class="img-fluid" src="${post.user.avatar}" alt="">
                                <span>${post.user.username}</span>
                            </div>
                            <span class="time">${post.time}</span>
                        </div>
                    </article>
                `;
    cardPost.innerHTML = postContent;
    posts.appendChild(cardPost);
};

let addPost = (data) => {
    let startRange = (current - 1) * NUMBER_REQUESTS;
    let endRange = startRange + NUMBER_REQUESTS;
    for (let i = startRange; i < Math.min(endRange, data.length); i++) {
        createPost(data[i]);
    }
};

let loadData = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:3000/posts", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                alert("Lỗi");
                console.log(xhr.status);
            } else {
                let data = JSON.parse(xhr.responseText);
                /*Kiểm tra số lượng hiện ra đã hiển thị hết trong data chưa. Hết thì ẩn nút View*/
                if (current * NUMBER_REQUESTS >= data.length) {
                    viewBtn.classList.add('d-none');
                }
                addPost(data);
                current++;
            }
        }
    };
};

document.addEventListener("DOMContentLoaded", () => {
    viewBtn.addEventListener("click", () => {
        loadData();
    });
    loadData();
});