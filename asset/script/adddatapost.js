 // let title = document.getElementById("title");
 // let content = document.getElementById("content");
 // let img = document.getElementById("post-img");
 // let submit = document.getElementById('submit');

 /*Add Post New Infor From Form */

 function getValueInput(e) {
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
                 .then(updatedTotalData => {
                    //  console.log('Total count updated:', updatedTotalData);

                     /* Reset Input */
                    //  title.value = '';
                    //  content.value = '';
                    //  img.value = '';
                 })
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
            //  console.log('New post added:', data);
             updateTotal(data);
             /* Reset Input */
            //  title.value = '';
            //  content.value = '';
            //  img.value = '';
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
 // const formattedDate = formatDate(currentDate);


 submit.addEventListener('click', () => {
     const newPost = {
         title: getValueInput(title),
         tag: 'Technology',
         time: formatDate(currentDate),
         user: {
             username: 'This is User Name',
             avatar: 'This is Avater',
         },
     };

     addPost(newPost);
 })