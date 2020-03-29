//Let's get started!
//Using the D3 library to read in `samples.json`
function readData(id) {
    // getting data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        var bellyBio = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(bellyBio);
  
        //Top 10: values, otu ids 
        var sample_values = bellyBio.sample_values.slice(0, 10).reverse();
        var tops = (bellyBio.otu_ids.slice(0, 10)).reverse();
        var otu_id = tops.map(d => "OTU " + d)
  
        // get the top 10 labels for the plot
        var labels = bellyBio.otu_labels.slice(0, 10);
  
        //  Create the Traces
        var trace1 = {
            x: sample_values,
            y: otu_id,
            text: labels,
            marker: {
              color: 'pink'},
            type:"bar",
            orientation: "h",
        };
  
        // Create the data array for the plot
        var data1 = [trace1];
  
        // Define the plot layout
        var layout1 = {
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data1, layout1);
      
        //Bubble Chart
        var trace2 = {
            x: bellyBio.otu_ids,
            y: bellyBio.sample_values,
            mode: "markers",
            marker: {
                size: bellyBio.sample_values,
                color: bellyBio.otu_ids
            },
            text: bellyBio.otu_labels
  
        };
  
        //Defining the bubble plot layout
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 1000
        };
  
        // Create the data array for the plot
        var data2 = [trace2];
  
        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bubble", data2, layout2); 
  
        //Gauge Chart
        var data3 = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Belly Button Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 1], color: "red" },
                    { range: [1, 2], color: "yellow" },
                    { range: [2, 3], color: "orange" },
                    { range: [3, 4], color: "green" },
                    { range: [4, 5], color: "cyan" },
                    { range: [5, 6], color: "blue" },
                    { range: [6, 7], color: "indigo" },
                    { range: [7, 8], color: "purple" },
                    { range: [8, 9], color: "pink" },
                  ]}
                   
          }
        ];

        //Defining the gauge chart layout
        var layout3 = { 
            width: 500, 
            height: 400, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", data3, layout3);
      });
  }  
// create the function to get the necessary data
function getInfo(id) {
    // read the json file to get data
    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    readData(id);
    getInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        readData(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();