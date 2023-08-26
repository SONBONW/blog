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
            document.getElementById('post-img').src = data.img;
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
                ...data,
                title: newdata.title,
                img: newdata.img,
                time: newdata.time,
                content: newdata.content
            }

            /* Update the count value */
            fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'PUT',
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
    getData(id);
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const fixData = {
            title: title.value,
            img: document.getElementById('post-img').value,
            time: formatDate(currentDate),
            content: content.value
        };
        fixPost(id, fixData);
    })

})