function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    //JSON.parse(window.localStorage.getItem("highscores")) || [];
    //console.log(window.localStorage.getItem("highscores"));
    // sort highscores by score property in descending order
    
    //highscores.sort(function(a, b) {
    //  return b.score - a.score;
    //});
    //console.log(initials);
    //console.log(score);

    highscores.forEach(function(score) {
      // create li tag for each high score
      console.log(score.initials + " - " + score.score);
      var tableEl = document.getElementById("highscores");
      // display on page
      var tdTag = document.createElement("td");
      tdTag.className = "vpb-3 mb-4 border-bottom";
      tdTag.textContent = score.initials + " - " + score.score;
      var trTag = document.createElement("tr");
      trTag.className = "row";
      trTag.appendChild(tdTag);
      tableEl.appendChild(trTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
  printHighscores();

  