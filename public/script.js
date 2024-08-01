let interval;
let isRunning = true;
let namesList1 = [];
let namesList2 = [];
let currentIndex1 = 0;
let currentIndex2 = 0;

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  const alarmSound = document.getElementById('alarmSound');

  interval = setInterval(() => {
    if (!isRunning) return;

    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      alarmSound.play(); // Play the sound when the timer hits zero
      showNextName();
    }
  }, 1000);
}

function showNextName() {
  let nameDisplay = '';
  if (namesList1.length > 0) {
    currentIndex1 = (currentIndex1 + 1) % namesList1.length;
    nameDisplay += `Salen: ${namesList1[currentIndex1]} `;
  }
  if (namesList2.length > 0) {
    currentIndex2 = (currentIndex2 + 1) % namesList2.length;
    nameDisplay += ` y  ${namesList2[currentIndex2]}`;
  }
  document.getElementById('currentName').textContent = nameDisplay;
}

window.onload = () => {
    var noSleep = new NoSleep();
    noSleep.enable(); // keep the screen on!

  let fiveMinutes = 60 * 5,
      display = document.querySelector('#timer');
  startTimer(fiveMinutes, display);

  document.getElementById('stopButton').addEventListener('click', () => {
    isRunning = !isRunning;
    if (!isRunning) {
      clearInterval(interval);
    } else {
      startTimer(fiveMinutes, display);
    }
  });

  document.getElementById('restartButton').addEventListener('click', () => {
    clearInterval(interval);
    document.getElementById('timer').textContent = "05:00";
    document.getElementById('currentName').textContent = '';
    currentIndex1 = 0;
    currentIndex2 = 0;
    isRunning = true;
    startTimer(fiveMinutes, display);
  });

  

  document.getElementById('nameForm1').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput1 = document.getElementById('nameInput1');
    const name1 = nameInput1.value.trim();
    if (name1) {
      namesList1.push(name1);
      updateNameList(namesList1, 'nameList1');
      nameInput1.value = '';
    }
  });

  document.getElementById('nameForm2').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput2 = document.getElementById('nameInput2');
    const name2 = nameInput2.value.trim();
    if (name2) {
      namesList2.push(name2);
      updateNameList(namesList2, 'nameList2');
      nameInput2.value = '';
    }
  });
};

function updateNameList(names, listId) {
  const nameList = document.getElementById(listId);
  nameList.innerHTML = '';
  names.forEach((name, index) => {
    const li = document.createElement('li');
    li.textContent = name;
    nameList.appendChild(li);
  });
}