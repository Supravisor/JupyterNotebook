
// Load data
let variable = document.getElementById("variable");
let loadData = document.getElementById("load-data");

const data = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section");
  } else {
      document.editor.textbox.value+= '\n' + document.editor.variable.value + '.' + stat;
  }
}

// Numerical analysis and visualisation
let column = document.getElementById("column");
let axis = document.getElementById("plot-variable");
let analysis;

const describe = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section");
  } else {
      document.editor.textbox.value+= column.value === '' ? '\n' + document.editor.variable.value + '.' + stat +'()\n' : '\n' + document.editor.variable.value + '[\'' + document.editor.column.value + '\'].' + stat + '()\n'
  }
}

const meanMedian = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'Numerical analysis and visualisation' section.");
  } else {
      document.editor.textbox.value+= '\n' + variable.value + '[\'' + column.value + '\'].' + stat + '()';
  }
}

const analyseBox = (stat) => {
  if (variable.value === '') {
    return alert('Please enter a variable name in the \'Load data\' section.');
  } else if (column.value === "") {
      return alert("Please add a column name in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value !== "") {
      document.editor.textbox.value+= '\n' + axis.value + ' = ' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', vert=False, figsize=(14,6))';
  } else {
      document.editor.textbox.value+= '\n' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', vert=False, figsize=(14,6))';
  }
}

const densityHist = (stat) => {
  if (variable.value === '') {
    return alert('Please enter a variable name in the \'Load data\' section.');
  } else if (column.value === "") {
      return alert("Please add a column name.");
  } else if (axis.value !== "") {
      document.editor.textbox.value+= '\n' + axis.value + ' = ' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', figsize=(14,6))';
  } else {
      document.editor.textbox.value+= '\n' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', figsize=(14,6))';
  }
}
