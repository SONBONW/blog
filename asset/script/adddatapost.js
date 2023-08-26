/*Add Post New Infor From Form */

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



function getValue(e) {
    return e.value;
}

function updateTotal() {
    /* Fetch the current total count */
    fetch('http://localhost:3000/total')
        .then(response => response.json())
        .then(total => {
            const newCount = total.count + 1;

            /* Update the count value */
            fetch('http://localhost:3000/total', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        count: newCount
                    }),
                })
                .then(response => response.json())
                .then(updatedTotalData => {})
                .catch(error => {
                    console.error('Error updating total count:', error);
                });
        })
}

function addPost(data) {

    /* AJAX request using Fetch API */
    fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            updateTotal();
        })
        .catch(error => {
            console.error('Error adding post:', error);
        });

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

img.addEventListener('change', () => {
    document.getElementById('show-img').src = convertFilePath(img.value);
})
submit.addEventListener('click', () => {
    
    const newPost = {
        title: getValue(title),
        img: convertFilePath(img.value),
        tag: 'Technology',
        time: formatDate(currentDate),
        user: {
            username: 'This is User Name',
            avatar: 'This is Avater',
        },
        content: getValue(content)
    };
    if (checkValue(title) && checkValue(img) && checkValue(content)) {
        addPost(newPost);
        updateTotal();
        alert("Submit");
    } else {
        showError(title, errortitle);
        showError(img, errorimg);
        showError(content, errorcontent);
    }

})


