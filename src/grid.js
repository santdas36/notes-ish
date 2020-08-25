function resizeGridItem(item){
  grid = document.getElementsByClassName("app__notes")[0];
  rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
  allItems = document.getElementsByClassName("note");
  for(x=0;x<allItems.length;x++){
    resizeGridItem(allItems[x]);
  }
}

window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);