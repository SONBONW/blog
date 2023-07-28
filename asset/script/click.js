 function click(nameclass, initial, replace) {
     const element = document.getElementsByClassName(nameclass)[0];
     const isNavbarOpen = element.classList.contains(replace);
     if (isNavbarOpen) {
         element.classList.remove(replace);
         element.classList.add(initial);
     } else {
         element.classList.add(replace);
         element.classList.remove(initial);
     }
 }


 function clickIconNav() {
    //  const element = document.getElementsByClassName("item-menu")[0];
    //  const isNavbarOpen = element.classList.contains("displayFlex");
    //  if (isNavbarOpen) {
    //      element.classList.remove("displayFlex");
    //      element.classList.add("displayNone");
    //  } else {
    //      element.classList.add("displayFlex");
    //      element.classList.remove("displayNone");
     //  }
     click("item-menu", "displayNone", "displayFlex");
 }

 function showSearch() {
    //  const search = document.getElementsByClassName("search")[0]
    //  const checkSearch = search.classList.contains("playFlex");
    //  if (checkSearch) {
    //      element.classList.remove("playFlex");
    //      element.classList.add("playNone");
    //  } else {
    //      element.classList.add("playFlex");
    //      element.classList.remove("playNone");
     //  }
     click("search", "playNone", "playFlex");
 }