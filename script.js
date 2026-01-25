
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
let mostValueCounts = document.getElementById("mostValueCounts");

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
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value !== "") {
      document.editor.textbox.value+= '\n' + axis.value + ' = ' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', vert=False, figsize=(14,6))';
  } else {
      document.editor.textbox.value+= '\n' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', vert=False, figsize=(14,6))';
  }
}

const densityHist = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value !== "") {
      document.editor.textbox.value+= '\n' + axis.value + ' = ' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', figsize=(14,6))';
  } else {
      document.editor.textbox.value+= '\n' + variable.value + '[\'' + column.value + '\'].plot(kind=\'' + stat + '\', figsize=(14,6))';
  }
}

const colour = () => {
  if (variable.value === "") {
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
  if (axis.value === "") {
      return alert("Please enter an axis name in the axis field.");
  } else if (label.value === '') {
    return alert("Please enter a label name in the label field to the right.");
  } else {
      document.editor.textbox.value+= "\n" + document.editor.axis.value + ".set_" + stat.replace(" ", "") + "('" + document.editor.label.value + "')";
  }
}

// Categorical analysis and visualisation
const categoricalValueCounts = (stat) => {
  if (variable.value === "") {
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
let correlation = document.getElementById("correlation");
let figure = document.getElementById("figure");
let scatterX = document.getElementById("scatterX");
let scatterY = document.getElementById("scatterY");

const matshow = (stat) => {
  if (correlation.value === "") {
    return alert('Please enter a name in the correlation field.');
  } else if (figure.value === "") {
      return alert('Please enter a name in the figure field.');
  } else {
      document.editor.textbox.value+='\nplt.' + stat + '(' + document.editor.correlation.value + ', cmap=\'RdBu\', fignum=' + document.editor.figure.value + '.number)'
  }
}

const scatters = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (scatterX.value === "") {
      return alert("Please enter a value in the 'scatter x' field.");
  } else if (scatterY.value === "") {
      return alert("Please enter a value in the 'scatter y' field.");
  } else {
      return document.editor.textbox.value+='\n' + document.editor.variable.value + '.plot(kind=\'' + stat + '\', x=\'' + document.editor.scatterX.value + '\', y=\'' + document.editor.scatterY.value + '\', figsize=(6,6))';
  }
}

const boxPlot = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (plots.value === "") {
      return alert("Please enter at least one category into the 'boxplot categories' field.");
  } else if (boxPlotAxis.value === "") {
      return alert("Please enter a name in the 'boxplot axis' field.");
  } else {
      return document.editor.textbox.value+= '\n' + boxPlotAxis.value + ' = ' + document.editor.variable.value + '[[' + document.editor.boxplotCats.value.split(',').map(el => `'${el.replace(' ', '')}'`).join().replaceAll(',', ', ') + ']].boxplot(by=\'' + document.editor.boxplotCats.value.split(',')[document.editor.boxplotCats.value.split(',').length - 1].replace(' ', '') + '\', figsize=(14,6))\n' + boxPlotAxis.value + '.set_ylabel(\'' + document.editor.boxplotCats.value.split(',')[0] + '\')';
  }
}

const boxPlotGrouped = () => {
  if (variable.value === '') {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (boxPlotCategory.value === '') {
      return alert("Please enter a category in the 'category' field to the right.");
  } else if (boxPlotCategoryValue.value === '') {
      return alert("Please enter a category value in the 'value' field to the right.");
  } else if (boxPlotCategoryColumnA.value === '') {
      return alert("Please enter a category in the 'column A' field to the right.");
  } else if (boxPlotCategoryColumnB.value === '') {
      return alert("Please enter a category in the 'column B' field to the right.");
  } else if (boxPlotAxis.value === '') {
      return alert("Please enter a name in the 'boxplot axis' field.");
  } else {
      return document.editor.textbox.value+= "\n" + boxPlotAxis.value + " = " + variable.value + ".loc[" + variable.value + "['" + boxPlotCategory.value + "'] == " + boxPlotCategoryValue.value + ", ['" + boxPlotCategoryColumnA.value + "', '" + boxPlotCategoryColumnB.value + "']]" + "\n" + boxPlotAxis.value + ".boxplot(by='" + boxPlotCategoryColumnB.value + "', figsize=(14,6))";
  }
}

const box = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section.");
  } else if (plots.value === "") {
      return alert("Please enter at least one category into the 'boxplot categories' field.");
  } else {
      return document.editor.textbox.value+= '\n' + document.editor.variable.value + '[[' + document.editor.boxplotCats.value.split(',').map(el => `'${el.replace(' ', '')}'`) + ']].plot(kind=\'box\', subplots=True, layout=(2,3), figsize=(14,8))';
  }
}

// Add and calculate a new column
let scatterAxis = document.getElementById("scatterAxis");

const columnWrangle = (stat) => {
  let bin = "";

  if (stat === "+") {
    bin = " bins=100,";
  }

  if (variable.value === '') {
    return alert("Please enter a variable name in the 'Load data' section");
  } else if (newColumn.value === "") {
      return alert("Please add a new column name.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'Column Wrangling' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+='\n' + variable.value + '[\'' + newColumn.value + '\'] = ' + variable.value + '[\'' + columnA.value + '\'] ' + stat + ' ' + variable.value + '[\'' + columnB.value + '\']\n' + variable.value + '[\'' + newColumn.value + '\'].head()' + '\n' + variable.value + '[\'' + newColumn.value + '\'].plot(kind=\'hist\',' + bin + ' figsize=(14,6))';
  }
}

const columnPlot = (stat) => {
  if (variable.value === "") {
      return alert("Please enter a variable name in the 'Load data' section");
  } else if (newColumn.value === "") {
      return alert("Please add a new column name.");
  } else {
      document.editor.textbox.value+='\n' + variable.value + '[\'' + newColumn.value + '\'].plot(kind=\'' + stat + '\', figsize=(14,6))';
  }
}

const columnScatter = (stat) => {
  if (variable.value === '') {
    return alert('Please enter a variable name in the \'Load data\' section');
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'Column Wrangling' section.");
  } else if (scatterAxis.value === "") {
      return alert("Please add a scatter column name.");
  } else {
      document.editor.textbox.value+='\n' + variable.value + '.plot(kind=\'' + stat + '\', x=\'' + columnA.value + '\', y=\'' + scatterAxis.value + '\', figsize=(6,6))';
  }
}

// Modify existing column
let modify = document.getElementById("modify");

const columnWrangleModify = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'Column Wrangling' section.");
  } else if (modify.value === "") {
      return alert("Please add a value in the modify field to the right.");
  } else if (!Number(modify.value) && Number(modify.value) != "0") {
      return alert("Please add a valid number in the modify field to the right.");
  } else {
      document.editor.textbox.value+='\n' + variable.value + '[\'' + columnA.value + '\'] ' + stat + '= ' + modify.value + '\n' + variable.value + '[\'' + columnA.value + '\'].head()';
  }
}

// Selection and indexing
const individualSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'Load data' section");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'Column Wrangling' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+='\n' + variable.value + '.loc[' + variable.value + '[\'' + columnA.value + '\'] == \'' + columnB.value + '\']' + '\n' + variable.value + '[\'' + columnA.value + '\'].head()';
  }
}
