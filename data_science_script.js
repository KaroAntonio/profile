// Load CSV data and create heatmap
d3.csv("data/data_science_skills.csv").then(function(data) {
   // Extract column names (excluding 'Tech')
   var columns = Object.keys(data[0]).filter(function(d) { return d !== 'Tech'; });
   console.log(columns)

   // Extract row names ('Tech')
   var rows = data.map(function(d) { return d.Tech; });

   // Define width and height of heatmap
   const width = 800;
   const height = 600;

   // Create SVG element for heatmap
   const svg = d3.select("#data-science-skills-heatmap")
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height);

   // Define color scale for heatmap
   const colorScale = d3.scaleLinear()
                        .domain([0, d3.max(data, function(d) { return d3.max(columns, function(c) { return +d[c]; }); })])
                        .range(["#ffffff", "#4ef542"]);

   // Create rectangles for heatmap cells
   svg.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .selectAll("rect")
      .data(function(d) { return columns.map(function(c) { return {Tech: d.Tech, Project: c, Value: +d[c]}; }); })
      .enter()
      .append("rect")
      .attr("x", function(d) { return columns.indexOf(d.Project) * (width / columns.length); })
      .attr("y", function(d) { return rows.indexOf(d.Tech) * (height / rows.length); })
      .attr("width", width / columns.length)
      .attr("height", height / rows.length)
      .attr("fill", function(d) { return colorScale(d.Value); });

   // Overlay integer values on each cell
   svg.selectAll("text")
      .data(data)
      .enter()
      .append("g")
      .selectAll("text")
      .data(function(d) { return columns.map(function(c) { return {Tech: d.Tech, Project: c, Value: +d[c]}; }); })
      .enter()
      .append("text")
      .attr("class", "cell-text")
      .attr("x", function(d) { return (columns.indexOf(d.Project) * (width / columns.length)) + (width / (2 * columns.length)); })
      .attr("y", function(d) { return (rows.indexOf(d.Tech) * (height / rows.length)) + (height / (2 * rows.length)); })
      .text(function(d) { 
         return d.Value > 0 ? d.Value : ''; // Only display text if value is greater than 0
      });

   // Add column headers
   svg.append("g")
      .selectAll(".column-header")
      .data(columns)
      .enter()
      .append("text")
      .attr("class", "column-header")
      .attr("x", function(d, i) { return (i + 0.5) * (width / columns.length); })
      .attr("y", -10) // Adjust this value as needed for positioning
      .style("text-anchor", "middle")
      .text(function(d) { return d; }); // Set the text to be the column name
});