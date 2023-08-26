

function convertFilePath(filePath) {
  // Kiểm tra xem đường dẫn đã được chuyển đổi trước đó hay chưa
  if (filePath.startsWith("./asset/img/")) {
    // Nếu đã chuyển đổi rồi, trả về nguyên đường dẫn
    return filePath;
  } else {
    // Thực hiện chuyển đổi
    let fileName = filePath.split("\\").pop();
    let newFilePath = "./asset/img/" + fileName;
    return newFilePath;
  }
}



let url = new URL(window.location.href);
let id = url.searchParams.get("id");

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


function getData(id) {
    fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('show-img').src = data.img;
            document.getElementById('content').value = data.content;

        })
        .catch(error => {
            console.log('Error fix post:', error);
        })
}

function fixPost(id, newdata) {
    fetch(`http://localhost:3000/posts/${id}`)
        .then(response => response.json())
        .then(data => {
            const updateData = {
                // ...data,
                title: newdata.title,
                img: newdata.img,
                time: newdata.time,
                content: newdata.content
            }

            /* Update the count value */
            fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                })
                .then(response => response.json())
                .then(updateData => {})
                .catch(error => {
                    console.error('Error fix data:', error);
                });
        })
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



document.addEventListener('DOMContentLoaded', () => {
    let img = document.getElementById('post-img');
    img.addEventListener('change', () => {
        document.getElementById('show-img').src = convertFilePath(img.value);
    })
    getData(id);
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const fixData = {
            title: title.value,
            img: document.getElementById('show-img').src,
            time: formatDate(currentDate),
            content: content.value
        };
        // alert(fixData.img);
        // console.log(fixData.img)
        fixPost(id, fixData);
    })

})