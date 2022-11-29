const changeColor = (ele) => {
  if (ele.value === '') {
    ele.className = '';
  } else if ((ele.className == null) || (ele.className == '')) {
    ele.className = 'right-letter-wrong-place';
  } else if (ele.className === 'right-letter-wrong-place') {
    ele.className = 'right-letter-right-place';
  } else if (ele.className === 'right-letter-right-place') {
    ele.className = '';
  }
};

const checkKeypress = (ele, event) => {
  if ((event.key === "Delete") || (event.key === "Backspace")) { //backspace
    ele.className = '';
    ele.focus()
  }
}

const moveSelection = (ele, event) => {
  let letter = String.fromCharCode(event.which);
  if ((event.key === "Delete") || (event.key === "Backspace")) { //backspace
    ele.className = '';
    ele.focus()
  } else if (letter.match(/[a-z]/i)) {
    const inps = Array.from(document.getElementsByTagName("input"))
    let eleIx = inps.indexOf(ele);
    let nextEle = inps[eleIx + 1];
    nextEle.focus();
  }
}

const inps = Array.from(document.getElementsByTagName("input"))

inps.forEach(element => {
  element.addEventListener("dblclick", () => {
    changeColor(element);
  });
});

inps.forEach(element => {
  element.addEventListener("keydown", (event) => {
    checkKeypress(element, event);
  });
});

inps.forEach(element => {
  element.addEventListener("keyup", (event) => {
    moveSelection(element, event);
  });
});


const processAttempts = (e) => {

  let rows = document.getElementsByTagName("tr");
  let pattern = '', contains = '', exclude = '';

  for (let col = 0; col < 5; col++) {
    let colCorrect = '';
    let colWrongPlace = '';
    for (let i = 0; i < rows.length; i++) {
      let cell = rows[i].children[col].children[0];
      if (cell.className === "right-letter-right-place") {
        colCorrect = cell.value;
      } else if (cell.className === "right-letter-wrong-place") {
        colWrongPlace = colWrongPlace + cell.value;
        contains = contains + cell.value;
      } else {
        exclude = exclude + cell.value;
      }
    }

    if (colCorrect === '') {
      if (colWrongPlace === '') {
        pattern = pattern + '?';
      } else {
        pattern = pattern + '(' + colWrongPlace + ')';
      }
    } else {
      pattern = pattern + colCorrect;
    }
  }

  document.getElementById("pattern-inp").value = pattern;
  document.getElementById("contains-inp").value = contains;
  document.getElementById("exclude-inp").value = exclude;

  e.preventDefault();

  $.ajax({
    type: 'POST',
    url: '/',
    data: {
      pattern: $("#pattern-inp").val(),
      contains: $("#contains-inp").val(),
      exclude: $("#exclude-inp").val()
    },
    success: (words) => {
      wordDiv = document.getElementById("word-outputs")
      wordDiv.innerHTML = '';
      Array.from(words).forEach((word) => {
        p = document.createElement("p");
        t = document.createTextNode(word);
        p.appendChild(t);
        wordDiv.appendChild(p);
      }
      );
    }
  })
};


document.getElementById("word-attempts-form").addEventListener("submit", (event) => {
  processAttempts(event);
});

document.getElementById("word-attempts-form").addEventListener("reset", (event) => {
  event.preventDefault();
  const inps = Array.from(document.getElementsByTagName("input"));
  inps.forEach((inp) => {
    inp.className = '';
  });
});