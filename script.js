
// Load data
let variable = document.getElementById("variable");
let loadData = `
conn = sqlite3.connect('data/sakila.db')

df = pd.read_sql('''
    SELECT
        rental.rental_id, rental.rental_date, rental.return_date,
        customer.last_name AS customer_lastname,
        store.store_id,
        city.city AS rental_store_city,
        film.title AS film_title, film.rental_duration AS film_rental_duration,
        film.rental_rate AS film_rental_rate, film.replacement_cost AS film_replacement_cost,
        film.rating AS film_rating
    FROM rental
    INNER JOIN customer ON rental.customer_id == customer.customer_id
    INNER JOIN inventory ON rental.inventory_id == inventory.inventory_id
    INNER JOIN store ON inventory.store_id == store.store_id
    INNER JOIN address ON store.address_id == address.address_id
    INNER JOIN city ON address.city_id == city.city_id
    INNER JOIN film ON inventory.film_id == film.film_id
    ;
''', conn, index_col='rental_id', parse_dates=['rental_date', 'return_date'])
`;

const data = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else {
      document.editor.textbox.value+= "\n" + document.editor.variable.value + "." + stat;
  }
}

// Numerical analysis and visualisation
let column = document.getElementById("column");
let axis = document.getElementById("plot-variable");
let analysis;
let mostValueCounts = document.getElementById("mostValueCounts");

const describe = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else {
      document.editor.textbox.value+= column.value === "" ? "\n" + document.editor.variable.value + "." + stat + "()\n" : "\n" + document.editor.variable.value + "['" + document.editor.column.value + "']." + stat + "()\n";
  }
}

const meanMedian = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'column' field, in the 'Numerical analysis and visualisation' section.");
  } else {
      document.editor.textbox.value+= "\n" + variable.value + "['" + column.value + "']." + stat + "()";
  }
}

const analyseBox = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'column' field, in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value !== "") {
      document.editor.textbox.value+= "\n" + axis.value + " = " + variable.value + "['" + column.value + "'].plot(kind='" + stat + "', vert=False, figsize=(14,6))";
  } else {
      document.editor.textbox.value+= "\n" + variable.value + "['" + column.value + "'].plot(kind='" + stat + "', vert=False, figsize=(14,6))";
  }
}

const densityHist = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'column' field, in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value !== "") {
      document.editor.textbox.value+= "\n" + axis.value + " = " + variable.value + "['" + column.value + "'].plot(kind='" + stat + "', figsize=(14,6))";
  } else {
      document.editor.textbox.value+= "\n" + variable.value + "['" + column.value + "'].plot(kind='" + stat + "', figsize=(14,6))";
  }
}

const colour = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (analysis === undefined) {
      return alert("Please select an analysis type.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'column' field, in the 'Numerical analysis and visualisation' section.");
  } else if (axis.value === "") {
      return alert("Please enter an axis name in the 'axis' field, in the 'Numerical analysis and visualisation' section.");
  } else {
      document.editor.textbox.value+="\n" + document.editor.axis.value + ".axvline(" + document.editor.variable.value + "['" + document.editor.column.value + "']." + analysis + "(), color='" + document.editor.colours.value + "')";
  }
}

const round = () => {
  if (mostValueCounts.value === "") {
    return alert("Please add a number in the 'number' field, in the 'Categorical analysis and visualisation' section.");
  } else {
    
      document.editor.textbox.value+='.round(' + mostValueCounts.value + ')';
  }
}

const axisLabel = (stat) => {
  if (axis.value === "") {
      return alert("Please enter an axis name in the 'axis' field, in the 'Numerical analysis and visualisation' section.");
  } else if (label.value === '') {
    return alert("Please enter a label name in the 'label' field, in the 'Numerical analysis and visualisation' section.");
  } else {
      document.editor.textbox.value+= "\n" + document.editor.axis.value + ".set_" + stat.replace(" ", "") + "('" + document.editor.label.value + "')";
  }
}

// Categorical analysis and visualisation
const categoricalValueCounts = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'column' field, in the 'Numerical analysis and visualisation' section.");
  } else {
     let head = mostValueCounts.value;
     if (head) {
      document.editor.textbox.value+="\n" + variable.value + "['" + column.value + "']." + stat.replace(' ', '_') + "().head(" + head + ")";
     } else {
        document.editor.textbox.value+="\n" + variable.value + "['" + column.value + "']." + stat.replace(' ', '_') + "()";
     }
  }
}

const categoricalBar = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'column' field, in the 'Numerical analysis and visualisation' section.");
  } else {
     let head = mostValueCounts.value;
     if (head) {
      document.editor.textbox.value+="\n" + variable.value + "['" + column.value + "'].value_counts().head(" + head + ").plot(kind='" + stat + "', figsize=(14,6))";
     } else {
      document.editor.textbox.value+="\n" + variable.value + "['" + column.value + "'].value_counts().plot(kind='" + stat + "', figsize=(14,6))";
     }
  }
}

const categoricalPie = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (column.value === "") {
      return alert("Please add a column name in the 'column' field, in the 'Numerical analysis and visualisation' section.");
  } else {
     let head = mostValueCounts.value;
     if (head) {
      document.editor.textbox.value+="\n" + variable.value + "['" + column.value + "'].value_counts().head(" + head + ").plot(kind='" + stat + "', figsize=(6,6))";
     } else {
        document.editor.textbox.value+="\n" + variable.value + "['" + column.value + "'].value_counts().plot(kind='" + stat + "', figsize=(6,6))";
     }
  }
}

// Correlation between columns
let correlation = document.getElementById("correlation");
let figure = document.getElementById("figure");
let scatterX = document.getElementById("scatterX");
let scatterY = document.getElementById("scatterY");
let plots = document.getElementById("plots");
let boxPlotAxis = document.getElementById("boxPlotAxis");
let boxPlotCatergory = document.getElementById("boxPlotsCategory");
let boxPlotCatergoryValue = document.getElementById("boxPlotCategoryValue");
let boxPlotCategoryColumnA = document.getElementById("boxPlotCategoryColumnA");
let boxPlotCategoryColumnB = document.getElementById("boxPlotCategoryColumnB");
let label = document.getElementById("label");
let newColumn = document.getElementById("newColumn");
let columnA = document.getElementById("columnA");
let columnB = document.getElementById("columnB");
let groupA = document.getElementById("groupA");
let groupB = document.getElementById("groupB");

const matshow = (stat) => {
  if (correlation.value === "") {
    return alert("Please enter a name in the 'correlation field', in the 'Correlation between columns' section.");
  } else if (figure.value === "") {
      return alert("Please enter a name in the 'figure' field, in the 'Correlation between columns' section.");
  } else {
      document.editor.textbox.value+="\nplt." + stat + "(" + document.editor.correlation.value + ", cmap='RdBu', fignum=" + document.editor.figure.value + ".number)";
  }
}

const scatters = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (scatterX.value === "") {
      return alert("Please enter a value in the 'scatter x' field, in the 'Correlation between columns' section.");
  } else if (scatterY.value === "") {
      return alert("Please enter a value in the 'scatter y' field, in the 'Correlation between columns' section.");
  } else {
      return document.editor.textbox.value+="\n" + document.editor.variable.value + ".plot(kind='" + stat + "', x='" + document.editor.scatterX.value + "', y='" + document.editor.scatterY.value + "', figsize=(6,6))";
  }
}

const boxPlot = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (plots.value === "") {
      return alert("Please enter at least one category into the 'boxplot categories' field, in the 'Correlation between columns' section.");
  } else if (boxPlotAxis.value === "") {
      return alert("Please enter a name in the 'boxplot axis' field, in the 'Correlation between columns' section.");
  } else {
      return document.editor.textbox.value+="\n" + boxPlotAxis.value + " = " + document.editor.variable.value + "[[" + document.editor.boxplotCats.value.split(',').map(el => `'${el.replace(' ', '')}'`).join().replaceAll(',', ', ') + "]].boxplot(by='" + document.editor.boxplotCats.value.split(',')[document.editor.boxplotCats.value.split(',').length - 1].replace(' ', '') + "', figsize=(14,6))\n" + boxPlotAxis.value + ".set_ylabel('" + document.editor.boxplotCats.value.split(',')[0] + "')";
  }
}

const boxPlotGrouped = () => {
  if (variable.value === '') {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (boxPlotCategory.value === '') {
      return alert("Please enter a category in the 'category' field, in the 'Correlation between columns' section.");
  } else if (boxPlotCategoryValue.value === '') {
      return alert("Please enter a category value in the 'value' field, in the 'Correlation between columns' section.");
  } else if (boxPlotCategoryColumnA.value === '') {
      return alert("Please enter a category in the 'column A' field, in the 'Correlation between columns' section.");
  } else if (boxPlotCategoryColumnB.value === '') {
      return alert("Please enter a category in the 'column B' field, in the 'Correlation between columns' section.");
  } else if (boxPlotAxis.value === '') {
      return alert("Please enter a name in the 'boxplot axis' field, in the 'Correlation between columns' section.");
  } else {
      return document.editor.textbox.value+= "\n" + boxPlotAxis.value + " = " + variable.value + ".loc[" + variable.value + "['" + boxPlotCategory.value + "'] == " + boxPlotCategoryValue.value + ", ['" + boxPlotCategoryColumnA.value + "', '" + boxPlotCategoryColumnB.value + "']]" + "\n" + boxPlotAxis.value + ".boxplot(by='" + boxPlotCategoryColumnB.value + "', figsize=(14,6))";
  }
}

const box = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (plots.value === "") {
      return alert("Please enter at least one category into the 'boxplot categories' field, in the 'Correlation between columns' section.");
  } else {
      return document.editor.textbox.value+="\n" + document.editor.variable.value + "[[" + document.editor.boxplotCats.value.split(',').map(el => `'${el.replace(' ', '')}'`) + "]].plot(kind='box', subplots=True, layout=(2,3), figsize=(14,8))";
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
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (newColumn.value === "") {
      return alert("Please add a column name in the 'new column' field in the 'Column Wrangling' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'secondary column' field, in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + "['" + newColumn.value + "'] = " + variable.value + "['" + columnA.value + "'] " + stat + " " + variable.value + "['" + columnB.value + "']\n" + variable.value + "['" + newColumn.value + "'].head()" + "\n" + variable.value + "['" + newColumn.value + "'].plot(kind='hist'," + bin + " figsize=(14,6))";
  }
}

const columnPlot = (stat) => {
  if (variable.value === "") {
      return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (newColumn.value === "") {
      return alert("Please add a column name in the 'new column' field in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + "['" + newColumn.value + "'].plot(kind='" + stat + "', figsize=(14,6))";
  }
}

const columnScatter = (stat) => {
  if (variable.value === '') {
    return alert("Please enter a variable name in the 'Load data' section");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (scatterAxis.value === "") {
      return alert("Please add a scatter column name in the 'scatter' field, in the 'Add and calculate a new column' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".plot(kind='" + stat + "', x='" + columnA.value + "', y='" + scatterAxis.value + "', figsize=(6,6))";
  }
}

// Modify existing column
let modify = document.getElementById("modify");

const columnWrangleModify = (stat) => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (modify.value === "") {
      return alert("Please add a value in the 'modify' field, in the 'Modify existing column' section.");
  } else if (!Number(modify.value) && Number(modify.value) != "0") {
      return alert("Please add a valid number in the 'modify' field, in the 'Modify existing column'.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + "['" + columnA.value + "'] " + stat + "= " + modify.value + "\n" + variable.value + "['" + columnA.value + "'].head()";
  }
}

// Selection and indexing
let selectionGrouping = document.getElementById("selectionGrouping");

const individualSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'secondary column' field, in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[" + variable.value + "['" + columnA.value + "'] == '" + columnB.value + "']" + "\n" + variable.value + "['" + columnA.value + "'].head()";
  }
}

const groupSelectionMean = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else if (groupB.value === "") {
      return alert("Please add a category in 'group B' field, in the 'Different category' subsection.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[" + variable.value + "['" + columnA.value + "'] == '" + groupA.value + "', '" + groupB.value + "'].mean()";
  }
}

const meanSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'secondary column' field, in the 'Column Wrangling' section.");
  } else if (groupB.value === "") {
      return alert("Please add a category in 'group B' field, in the 'Different category' subsection.");
  } else if (newColumn.value === "") {
      return alert("Please add a column name in the 'new column' field in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[(" + variable.value + "['" + columnA.value + "'] == '" + groupA.value + "') & (" + variable.value + "['" + columnB.value + "'] == '" + groupB.value + "'), '" + newColumn.value + "'].mean()";
  }
}

const meanMaxSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (mostValueCounts.value === "") {
      return alert("Please add a number in the 'number' field, in the 'Categorical analysis and visualisation' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'secondary column' field, in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[" + variable.value + "['"   + columnA.value + "'] > " + mostValueCounts.value + ", '"   + columnB.value + "'].mean()";
  }
}

const meanMinSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (mostValueCounts.value === "") {
      return alert("Please add a number in the 'number' field, in the 'Categorical analysis and visualisation' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'secondary column' field, in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[" + variable.value + "['"   + columnA.value + "'] < " + mostValueCounts.value + ", '"   + columnB.value + "'].mean()";
  }
}

const percentageSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else if (newColumn.value === "") {
      return alert("Please add a column name in the 'new column' field in the 'Column Wrangling' section.");
  } else if (selectionPercentage.value === "") {
      return alert("Please add a percentage in the 'percentage' field, in the 'Mean' subsection.");
  } else {
      let percentage = selectionPercentage.value;
      let percentageNegative = false;
      if (parseFloat(percentage) < 0 ) {
         percentageNegative = true;
         let negative = Math.abs(percentage);
         percentage = percentage.replace("-", "");
      }

      if (!percentage.includes(".")) {
        percentage = parseFloat(percentage);
        if (parseFloat(percentage) > 0 && parseFloat(percentage) < 10 ) {
          percentage = "0.0" + percentage;
        } else if (parseFloat(percentage) < 100 ) {
            percentage = "0." + percentage;
        } else {
            percentage = parseFloat(percentage) / 100;
        }
      }

      if (percentageNegative) {
        percentage = "-" + percentage;
      }

      document.editor.textbox.value+="\n" + variable.value + ".loc[" + variable.value + "['" + columnA.value + "'] == '" + groupA.value + "', '" + newColumn.value + "'] *= " + percentage;
  }
}

const maxSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[" + variable.value + "['"   + columnA.value + "'] == " + variable.value + "['"   + columnA.value + "'].max()]";
  }
}

const sort = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (mostValueCounts.value === "") {
      return alert("Please add a number in the 'number' field, in the 'Categorical analysis and visualisation' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".sort_values(['" + columnA.value + "'], ascending=False).head(" + mostValueCounts.value + ")";
  }
}

const valueCountSelection = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else if (newColumn.value === "") {
      return alert("Please add a column name in the 'new column' field in the 'Column Wrangling' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[" + variable.value + "['" + columnA.value + "'] == '" + groupA.value + "', '" + newColumn.value + "'].value_counts()";
  }
}

const numberSelectionSingle = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[(" + variable.value + "['" + columnA.value + "'] == '" + groupA.value + "')].shape[0]";
  }
}

const numberSelectionDoubleSame = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else if (groupB.value === "") {
      return alert("Please add a category in 'group B' field, in the 'Different category' subsection.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[(" + variable.value + "[" + columnA.value + "'] == '" + groupA.value + "') " + selectionGrouping.value +  " (" + variable.value + "['" + columnA.value + "'] == '" + groupB.value + "')].shape[0]";
  }
}

const numberSelectionDoubleDiff = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'secondary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else if (groupB.value === "") {
      return alert("Please add a category in 'group B' field, in the 'Different category' subsection.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[(" + variable.value + "['" + columnA.value + "'] == '" + groupA.value + "') " + selectionGrouping.value + " (" + variable.value + "['" + columnB.value + "'] == '" + groupB.value + "')].shape[0]";
  }
}

const numberSelectionDoubleDiffIsIn = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (columnA.value === "") {
      return alert("Please add a primary column name in the 'primary column' field, in the 'Column Wrangling' section.");
  } else if (columnB.value === "") {
      return alert("Please add a secondary column name in the 'secondary column' field, in the 'Column Wrangling' section.");
  } else if (groupA.value === "") {
      return alert("Please add a category in 'group A' field, in the 'Different category' subsection.");
  } else if (groupB.value === "") {
      return alert("Please add a category in 'group B' field, in the 'Different category' subsection.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + ".loc[(" + variable.value + "['" + columnA.value + "'] == '" + groupA.value + "') " + selectionGrouping.value + " (" + variable.value + "['" + columnB.value + "'].isin([" + groupB.value.split(',').map(el => `'${el.replace(' ', '')}'`).join().replaceAll(',', ', ') + "]" + "))].shape[0]";
  }
}

// Dates
let dateColumn = document.getElementById("dateColumn");

const date = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (dateColumn.value === "") {
      return alert("Please enter a date in the 'date column' field, in the 'Date' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + "['" + dateColumn.value + "'] = " + variable.value + "[['Year', 'Month', 'Day']].apply(lambda x: '{}-{}-{}'.format(x[0], x[1], x[2]), axis=1)";
  }
}

const dateDiff = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (dateNewColumn.value === '') {
    return alert("Please enter a new column name in the 'new column' field, in the 'Date' section.");
  } else if (dateColumn.value.split(",").length !== 2) {
      return alert("Please enter two dates in the 'date column' field, in the 'Date' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + "['" + dateNewColumn.value + "'] = " + variable.value + "[[" + dateColumn.value.split(',').map(el => `'${el.replace(' ', '')}'`) + "]].apply(lambda x: (x[1] - x[0]).days, axis=1)";
  }
}

const parseDate = () => {
  if (variable.value === "") {
    return alert("Please enter a variable name in the 'variable' field, in the 'Load data' section.");
  } else if (dateColumn.value === "") {
      return alert("Please enter a date in the 'date column' field, in the 'Date' section.");
  } else {
      document.editor.textbox.value+="\n" + variable.value + "['" + dateColumn.value + "'] =  pd.to_datetime(" + variable.value + "['" + dateColumn.value + "'])";
  }
}
