
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
      return alert("Please add a column name in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value !== "") {
      document.editor.textbox.value+= '\n' + axis.value + ' = ' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', figsize=(14,6))';
  } else {
      document.editor.textbox.value+= '\n' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', figsize=(14,6))';
  }
}

const colour = () => {
  if (variable.value === '') {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (analysis === undefined) {
      return alert("Please select an analysis type.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value === "") {
      return alert("Please add an axis name in the 'Numerical analysis and visualisation' section.");
  } else {
      document.editor.textbox.value+='\n' + document.editor.axis.value + '.axvline(' + document.editor.variable.value + '[\'' + document.editor.column.value + '\'].' + analysis + '(), color=\'' + document.editor.colours.value + '\')'
  }
}

const round = () => {
  if (mostValueCounts.value === "") {
    return alert("Please add a number in the 'Categorical analysis and visualisation' section.");
  } else {
    
      document.editor.textbox.value+='.round(' + mostValueCounts.value + ')';
  }
}

const axisLabel = (stat) => {
  if (axis.value === '') {
      return alert('Please enter an axis name in the axis field.');
  } else if (label.value === '') {
    return alert('Please enter a label name in the label field to the right.');
  } else {
      document.editor.textbox.value+= "\n" + document.editor.axis.value + ".set_" + stat.replace(" ", "") + "('" + document.editor.label.value + "')";
  }
}

// Categorical analysis and visualisation
const categoricalValueCounts = (stat) => {
  if (variable.value === '') {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name.");
  } else {
     let head = mostValueCounts.value;
     if (head) {
      document.editor.textbox.value+='\n' + variable.value + '[\'' + column.value + '\'].' + stat.replace(' ', '_') + '().head(' + head + ')';
     } else {
        document.editor.textbox.value+='\n' + variable.value + '[\'' + column.value + '\'].' + stat.replace(' ', '_') + '()'
     }
  }
}

const categoricalBar = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name.");
  } else {
     let head = mostValueCounts.value;
     if (head) {
      document.editor.textbox.value+='\n' + variable.value + '[\'' + column.value + '\'].value_counts().head(' + head + ').plot(kind=\'' + stat + '\', figsize=(14,6))';
     } else {
      document.editor.textbox.value+='\n' + variable.value + '[\'' + column.value + '\'].value_counts().plot(kind=\'' + stat + '\', figsize=(14,6))';
     }
  }
}

const categoricalPie = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name.");
  } else {
     let head = mostValueCounts.value;
     if (head) {
      document.editor.textbox.value+='\n' + variable.value + '[\'' + column.value + '\'].value_counts().head(' + head + ').plot(kind=\'' + stat + '\', figsize=(6,6))';
     } else {
        document.editor.textbox.value+='\n' + variable.value + '[\'' + column.value + '\'].value_counts().plot(kind=\'' + stat + '\', figsize=(6,6))';
     }
  }
}

// Correlation between columns
const matshow = (stat) => {
  if (correlation.value === "") {
    return alert('Please enter a name in the correlation field.');
  } else if (figure.value === "") {
      return alert('Please enter a name in the figure field.');
  } else {
      document.editor.textbox.value+='\nplt.' + stat + '(' + document.editor.correlation.value + ', cmap=\'RdBu\', fignum=' + document.editor.figure.value + '.number)'
  }
}
