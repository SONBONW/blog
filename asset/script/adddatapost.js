 // let title = document.getElementById("title");
// let content = document.getElementById("content");
// let img = document.getElementById("post-img");
// let submit = document.getElementById('submit');

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
    content.value = '';
    img.value = '';
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


submit.addEventListener('click', () => {
    addPost();
})