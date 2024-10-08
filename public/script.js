let draggedItemIndex = null;
let interval;
let isRunning = true;
let namesList1 = [];
let namesList2 = [];
let currentIndex1 = 0;
let currentIndex2 = 0;

// Función para manejar el inicio del arrastre
function handleDragStart(e) {
    draggedItemIndex = e.target.getAttribute('data-index'); // Guardamos el índice del elemento arrastrado
    e.target.classList.add('dragging');
}

// Permitir soltar el elemento sobre otro
function handleDragOver(e) {
    e.preventDefault(); // Permitir que el elemento sea soltado
}

// Función que se ejecuta cuando se suelta el elemento
function handleDrop(e) {
    const targetIndex = e.target.getAttribute('data-index'); // Índice del elemento sobre el que se suelta

    // Determinar la lista que estamos modificando
    let namesList;
    if (e.target.parentNode.id === 'nameList1') {
        namesList = namesList1;
    } else if (e.target.parentNode.id === 'nameList2') {
        namesList = namesList2;
    }

    // Intercambiar los elementos en el arreglo
    const temp = namesList[draggedItemIndex];
    namesList[draggedItemIndex] = namesList[targetIndex];
    namesList[targetIndex] = temp;

    // Actualizar la lista visual
    updateNameList(namesList, e.target.parentNode.id);

    draggedItemIndex = null;
}

// Actualizar la función updateNameList para hacer los elementos arrastrables
function updateNameList(names, listId) {
    const nameList = document.getElementById(listId);
    nameList.innerHTML = '';

    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = name;
        li.setAttribute('draggable', true); // Hacer el elemento arrastrable
        li.setAttribute('data-index', index); // Guardar el índice del elemento

        // Escuchar los eventos de arrastre y soltar
        li.addEventListener('dragstart', handleDragStart);
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('drop', handleDrop);

        nameList.appendChild(li);
    });
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
      e.preventDefault(); // Prevenir recarga de la página
      const nameInput1 = document.getElementById('nameInput1');
      const name1 = nameInput1.value.trim();
      if (name1) {
        namesList1.push(name1); // Agregar a la lista
        updateNameList(namesList1, 'nameList1'); // Actualizar visualmente
        nameInput1.value = ''; // Limpiar el campo de entrada
      }
    });

    document.getElementById('nameForm2').addEventListener('submit', (e) => {
      e.preventDefault(); // Prevenir recarga de la página
      const nameInput2 = document.getElementById('nameInput2');
      const name2 = nameInput2.value.trim();
      if (name2) {
        namesList2.push(name2); // Agregar a la lista
        updateNameList(namesList2, 'nameList2'); // Actualizar visualmente
        nameInput2.value = ''; // Limpiar el campo de entrada
      }
    });

    // Inicialización de las listas
    updateNameList(namesList1, 'nameList1');
    updateNameList(namesList2, 'nameList2');
};

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