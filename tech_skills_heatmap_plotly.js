
// Fetch the CSV data
fetch('data/data_science_skills.csv')
.then(response => response.text())
.then(csvData => {
    // Parse the CSV data
    var parsedCSV = Plotly.d3.csv.parse(csvData).reverse();

    console.log(parsedCSV)

    // Extract x, y, and z values from parsed CSV data
    // Projects
    var xValues = Object.keys(parsedCSV[0]).filter(key => key !== 'Tech'); 
    // Technologies
    var yValues = parsedCSV.map(row => row.Tech); // Assuming 'Tech' column contains x values
    var zValues = parsedCSV.map(row => {
        return xValues.map(y => parseFloat(row[y]) || 0); // Parse each cell value as float or set to 0 if NaN
    });

    var colorscaleValue = [
        [0, '#ffffff'],
        [1, '#14fc03']
    ];

    var data = [{
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: colorscaleValue,
        showscale: false
    }];

    var layout = {
        // Disable Interactivity
        editable: false, // Turn off editing 
        dragmode: false, // Disable dragging the plot
        clickmode: false, // Disable click events
        selectdirection: 'none', // Disable selecting regions
        displayModeBar: false, // Hide the mode bar (including buttons for zoom, pan, etc.)
        staticPlot: true, // Render the plot as a static image

        // Set width and height at a 7:10 ratio
        height: 9 * 85,
        width: 7 * 85,
        
        annotations: [],
        xaxis: {
            ticks:'',
            tickangle: -90, // Rotate the tick labels vertically
            side: 'top', 
        },
        yaxis: {
            ticks: '',
            ticksuffix: ' ',
            autosize: true,
        },
        margin: {
            l: 200 // Adjust the left margin value as needed
        }
    };

    // Calculate the width and height of each cell based on the number of rows and columns
    var cellWidth = 30; // Adjust 700 to fit your layout
    var cellHeight = 60; // Adjust 700 to fit your layout

    for ( var i = 0; i < yValues.length; i++ ) {
        for ( var j = 0; j < xValues.length; j++ ) {
            var currentValue = zValues[i][j];
            var textColor = currentValue != 0.0 ? 'black' : 'white'
            var result = {
                x: xValues[j],
                y: yValues[i],
                text: zValues[i][j],
                font: {
                    family: 'Arial',
                    size: 12,
                    color: textColor
                },
                showarrow: false,
                // Set the width and height of each cell
                width: cellWidth,
                height: cellHeight
            };
            layout.annotations.push(result);
        }
    }

    var config = {
        displayModeBar: false // Hide Plotly buttons
    };

    Plotly.newPlot('data-science-skills-heatmap', data, layout, config);
})
.catch(error => console.error('Error loading CSV:', error));