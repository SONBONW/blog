/*Click Change Color Background*/

let changeColor = document.getElementById('light-dark');

let mode = localStorage.getItem("ChangeColorPage");
if (mode == 'true') {
  document.body.classList.add('changecolor');
  changeColor.checked = true;
}

changeColor.addEventListener('click', () => {
    let mode = document.body.classList.toggle("changecolor");
    localStorage.setItem("ChangeColorPage", mode);
});