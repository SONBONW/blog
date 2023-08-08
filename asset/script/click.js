 function click(nameclass, position, initial, replace) {
     const element = document.getElementsByClassName(nameclass)[position];
     const check = element.classList.contains(replace);
     if (check) {
         element.classList.remove(replace);
         element.classList.add(initial);
     } else {
         element.classList.add(replace);
         element.classList.remove(initial);
     }
 }


 /*Click Change Color Background*/

var btnChangeColor = document.getElementById('light-dark');

let mode = localStorage.getItem("ChangeColorPage");
if (mode == 'true') {
    document.body.classList.add('changecolor');
    btnChangeColor.checked = true;
}

btnChangeColor.addEventListener('click', () => {
    let mode = document.body.classList.toggle("changecolor");
    localStorage.setItem("ChangeColorPage", mode);
})


