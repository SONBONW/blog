/*Add Post New Infor From Form */

function getValue(e) {
    return e.value;
}

function updateTotal(data) {
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
            updateTotal(data);
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

submit.addEventListener('click', () => {
    const newPost = {
        title: getValue(title),
        img: getValue(img),
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
        alert("Submit");
    } else {
        showError(title, errortitle);
        showError(img, errorimg);
        showError(content, errorcontent);
    }

})


