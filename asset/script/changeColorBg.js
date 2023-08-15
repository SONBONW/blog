/*Click Change Color Background*/

let changeColor = document.getElementById('light-dark');

let mode = localStorage.getItem("ChangeColorPage");
if (mode == 'true') {
  document.body.classList.add('changecolor');
  changeColor.checked = true;
}
