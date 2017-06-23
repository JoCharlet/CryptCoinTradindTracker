/*function startTimer() {
  Timer = setTimeout(function() {
    window.location.href = "../screensaver.htm";
  }, 300000);
}
window.onclick = function() {
  clearTimeout(Timer);
  startTimer();
}
startTimer();
*/

var currentMenuOutil = 1;

function resetChoixOutil() {
  nbChoixOutil = document.getElementsByClassName('choixOutil').length;

  for (i = 0; i < nbChoixOutil; i++) {
    document.getElementsByClassName('choixOutil')[i].style.display = "none";
  }

}

function menuOutil(x) {
  resetChoixOutil();
  currentMenuOutil = x;
  document.getElementsByClassName('choixOutil')[currentMenuOutil - 1].style.display =
    "block";
}

function menuOutilPrevious() {
  if (currentMenuOutil != 1) {
    currentMenuOutil = currentMenuOutil - 1;
    resetChoixOutil();
    document.getElementsByClassName('choixOutil')[currentMenuOutil - 1].style.display =
      "block";
  }
}

function menuOutilNext() {

  if (currentMenuOutil != maxOutil) {
    currentMenuOutil = currentMenuOutil + 1;
    resetChoixOutil();
    document.getElementsByClassName('choixOutil')[currentMenuOutil - 1].style.display =
      "block";
  }
}
