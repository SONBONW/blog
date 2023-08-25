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

let createPost = (post) => {
    let cardPost = document.createElement('div');
    cardPost.classList.add("col-lg-4", "col-md-6", "col-sm-8", "col-12");
    const postContent = `
                    <article class="post">
                        <button type="button" class="btn-close btn-delete" aria-label="Close"></button>
                        <img class="img-fluid" src="${post.img}" alt="">
                        <span class="tag rounded">${post.tag}</span>
                        <button class="edit rounded" values="${post.id}"> <a href="./fix-post.html?id=${post.id}">Edit</a> </button>
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

   let btnDelete = cardPost.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => {
        deletePost(cardPost);
    })
};

let addPost = (data) => {
    let startRange = (current - 1) * LIMIT_REQUESTS;
    let endRange = startRange + LIMIT_REQUESTS;
    for (let i = startRange; i < Math.min(endRange, data.length); i++) {
        createPost(data[i]);
    }
};



function getData(url) {
    const urls = `http://localhost:3000${url}`;
    xhr.open('GET', urls, true);
    xhr.send();
}

/*Lấy độ dài của dữ liệu chính*/
// function pageSize() {
//     const url = "";
//     getData(url);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             let data = JSON.parse(xhr.responseText);
//             total = data.length;
//             /*Sau khi lấy được độ dài của dữ liệu chính thì render dữ liệu theo mong muốn*/
//             loadListPosts();
//         }

//     };
// }

// function getTotal() {
//     const url = '/total';
//     getData(url);
//      xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if (xhr.status != 200) {
//                 alert("Lỗi");
//                 console.log(xhr.status);
//             } else {
//                 let count = JSON.parse(xhr.responseText);
//                 console.log(count.count);
//                 return count.count;
//             }
//         }
//     };
// }
function getTotal(callback) {
    const url = '/total';
    getData(url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                alert("Lỗi");
                console.log(xhr.status);
                console.log(xhr.onerror);
            } else {
                let count = JSON.parse(xhr.responseText);
                if (count == []) {
                    console.log('Object Null!');
                } else {
                    // console.log(count.count);
                    callback(count.count); // Gọi callback với giá trị total
                }

            }
        }
    };
}
let displayedPosts = [];

function loadListPosts() {
    const startRange = (current - 1) * LIMIT_REQUESTS;
    const endRange = startRange + LIMIT_REQUESTS;
    const url = `/posts?_start=${startRange}&_end=${endRange}`;
    // const url = `http://localhost:3000/posts?_page=0&_limit=${LIMIT_REQUESTS * current}`;
    getData(url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                alert("Lỗi");
                console.log(xhr.status);
                console.log(xhr.onerror);
            } else {
                let data = JSON.parse(xhr.responseText);
                if (data == []) {
                    console.log('Object Null!');
                } else {
                    displayedPosts = displayedPosts.concat(data);
                    getTotal(function (total) {
                        updateViewBtn(total);
                    });
                    // console.log(data);
                    addPost(displayedPosts);
                    // console.log(displayedPosts); //Render lai tat ca
                    current++;
                }

            }
        }
    };

};


/*Kiểm tra số lượng hiện ra đã hiển thị hết trong data chưa. Hết thì ẩn nút View*/
function updateViewBtn(total) {
    if ((current - 1) * LIMIT_REQUESTS >= total) {
        viewBtn.classList.add('d-none');
    }
}



/*Delete Post*/


function reduceTotal(data) {
    fetch('http://localhost:3000/total')
        .then(response => response.json())
        .then(total => {
            const newTotal = total.count - 1;
            fetch('http://localhost:3000/total', {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        count: newTotal
                    }),
                })
                .then(response => response.json())
                .then(data => {

                })
                .catch(error => {
                    console.error('Error updating total count:', error);
                })
        })
}

function deletePost(cardPost) {
    const postId = cardPost.querySelector('.edit').getAttribute('values');
   fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(postData => {
            // Nếu tài nguyên tồn tại, thực hiện yêu cầu DELETE
            fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(req => {
                reduceTotal(req);
                loadListPosts(); // Load lại danh sách bài viết
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
        })
        .catch(error => {
            console.error('Error checking post existence:', error);
        });
}


document.addEventListener("DOMContentLoaded", () => {
    viewBtn.addEventListener("click", () => {
        loadListPosts();
    });
    /*Render dữ liệu ra màn hình*/
    loadListPosts();
    const urlParams = new URLSearchParams(window.location.search);
    const postIdurl = urlParams.get('id');

});