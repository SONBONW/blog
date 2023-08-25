let url = new URL(window.location.href);
let id = url.searchParams.get("id");


function getData(id) {
    fetch(`http://localhost:3000/posts?id=${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('title').value = data.map((e) => e.title);
            document.getElementById('post-img').src = data.map((e) => e.img);
            document.getElementById('content').value = data.map((e) => e.content);
            // console.log(data.map((e) => e.img));
        })
        .catch(error => {
            console.log('Error fix post:', error);
        })
}

function fixPost(id, data) {
    fetch(`http://localhost:3000/posts?id=${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {})
        .catch(error => {
            console.error('Error fix post:', error);
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
    submit.addEventListener('click', () => {
        const newPost = {
            title: title.value,
            img: document.getElementById('post-img').src,
            tag: 'Technology',
            time: formatDate(currentDate),
            user: {
                username: 'This is User Name',
                avatar: 'This is Avater',
            },
            content: content.value
        };
        if (checkValue(title) && checkValue(img) && checkValue(content)) {
            fixPost(id, newPost);
            getData(id);
            alert("Submit");
        } else {
            showError(title, errortitle);
            showError(img, errorimg);
            showError(content, errorcontent);
        }

    })

})