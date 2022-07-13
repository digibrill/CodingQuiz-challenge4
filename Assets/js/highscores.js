function printHighscores() {

    // grab scores from local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // loop through each node
    highscores.forEach(function(score) {

      // create table for display
      var tableEl = document.getElementById("highscores");
      
      // create td and tr; assign initials and score to td
      var tdTag = document.createElement("td");
      tdTag.className = "vpb-3 mb-4 border-bottom";
      tdTag.textContent = score.initials + " - " + score.score;
      var trTag = document.createElement("tr");
      trTag.className = "row";
      trTag.appendChild(tdTag);
      tableEl.appendChild(trTag);
    });
  }
  
  // borrowed from starter code
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
  printHighscores();

  