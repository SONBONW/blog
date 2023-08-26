

 function updateTotal() {
     fetch('http://localhost:3000/total')
         .then(response => response.json())
         .then(total => {
             const newTotal = total - 1;

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

 function deletePost() {
     fetch('http://localhost:3000/posts', {
             method: 'DELETE',
             
         })
         .then(response => response.json())
         .then(req => {
             updateTotal();
         })
         .catch(error => {
         console.error('Error adding post:', error);
     })
 }

let btnDelete = document.getElementsByClassName('btn-delete')[0];

btnDelete.addEventListener('click', () => {
    deletePost();
    // updateTotal();
    alert("Delete");
})