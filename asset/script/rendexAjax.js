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
let xhr = new XMLHttpRequest();
const LIMIT_REQUESTS = 3;
let current = 1;
let total;

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
    let startRange = (current - 1) * LIMIT_REQUESTS;
    let endRange = startRange + LIMIT_REQUESTS;
    for (let i = startRange; i < Math.min(endRange, data.length); i++) {
        createPost(data[i]);
    }
};



function getData(url) {
    xhr.open('GET', url, true);
    xhr.send();
}

/*Lấy độ dài của dữ liệu chính*/
function pageSize() {
    const url = "http://localhost:3000/posts";
    getData(url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            total = data.length;
            /*Sau khi lấy được độ dài của dữ liệu chính thì render dữ liệu theo mong muốn*/
            loadData();
        }

    };
}

let displayedPosts = []; // Mảng lưu trữ các bài post đã hiển thị

function loadData() {
    const startRange = (current - 1) * LIMIT_REQUESTS;
    const endRange = startRange + LIMIT_REQUESTS;
    const url = `http://localhost:3000/posts?_start=${startRange}&_end=${endRange}`;
    // const url = `http://localhost:3000/posts?_page=0&_limit=${LIMIT_REQUESTS * current}`;
    getData(url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                alert("Lỗi");
                console.log(xhr.status);
            } else {
                let data = JSON.parse(xhr.responseText);
                UpdateViewBtn();
                console.log(data);
                 // Nối thêm dữ liệu mới vào mảng displayedPosts
                displayedPosts = [...data]; 

                // Render lại toàn bộ danh sách
                renderPosts(displayedPosts);
                current++;
            }
        }
    };

};

function renderPosts(data) {
    /*Render ra các bài viết trong displayedPosts*/
    for (let i = 0; i < data.length; i++) {
        createPost(data[i]);
    }
}

/*Kiểm tra số lượng hiện ra đã hiển thị hết trong data chưa. Hết thì ẩn nút View*/
function UpdateViewBtn() {
    if (current * LIMIT_REQUESTS >= total) {
        viewBtn.classList.add('d-none');
    } else {
        viewBtn.classList.remove('d-none');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // console.log(total);
    viewBtn.addEventListener("click", () => {
        loadData();

    });
    /*Render dữ liệu ra màn hình*/
    pageSize();
});