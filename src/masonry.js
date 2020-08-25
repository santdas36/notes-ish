const masonry = (grid, gridCell, gridGutter, dGridCol, tGridCol, mGridCol) => {
  var g = document.querySelector(grid),
      gc = document.querySelectorAll(gridCell),
      gcLength = gc.length,
      gHeight = 0,
      i; // Loop counter
  console.log(g,gc,gcLength);
  for(i=0; i<gcLength; ++i) {
    gHeight+=gc[i].offsetHeight+parseInt(gridGutter);
  }
  
  if(window.screen.width >= 1024) {
    g.style.height = gHeight/dGridCol + gHeight/(gcLength+1) + "px";
  } else if(window.screen.width < 1024 && window.screen.width >= 768) {
    g.style.height = gHeight/tGridCol + gHeight/(gcLength+1) + "px";
  } else {
    g.style.height = gHeight/mGridCol + gHeight/(gcLength+1) + "px";
  }

return true;
}

export default masonry;