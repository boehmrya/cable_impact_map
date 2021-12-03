var state_id =  {
    '01': 'AL',
    '02': 'AK',
    '04': 'AZ',
    '05': 'AR',
    '06': 'CA',
    '08': 'CO',
    '09': 'CT',
    '10': 'DE',
    '11': 'DC',
    '12': 'FL',
    '13': 'GA',
    '15': 'HI',
    '16': 'ID',
    '17': 'IL',
    '18': 'IN',
    '19': 'IA',
    '20': 'KS',
    '21': 'KY',
    '22': 'LA',
    '23': 'ME',
    '24': 'MD',
    '25': 'MA',
    '26': 'MI',
    '27': 'MN',
    '28': 'MS',
    '29': 'MO',
    '30': 'MT',
    '31': 'NE',
    '32': 'NV',
    '33': 'NH',
    '34': 'NJ',
    '35': 'NM',
    '36': 'NY',
    '37': 'NC',
    '38': 'ND',
    '39': 'OH',
    '40': 'OK',
    '41': 'OR',
    '42': 'PA',
    '44': 'RI',
    '45': 'SC',
    '46': 'SD',
    '47': 'TN',
    '48': 'TX',
    '49': 'UT',
    '50': 'VT',
    '51': 'VA',
    '53': 'WA',
    '54': 'WV',
    '55': 'WI',
    '56': 'WY'
  };


// to handle lookups to detect when small states are clicked
var small_states =  {
    'VT': 'Vermont',
    'NH': 'New Hampshire',
    'MA': 'Massachusetts',
    'RI': 'Rhode Island',
    'CT': 'Connecticut',
    'NJ': 'New Jersey',
    'DE': 'Delaware',
    'MD': 'Maryland',
    'DC': 'District of Columbia'
};


$(function($){

  var w, width, height, wScale, hScale, mapSize, mapRatio;

  w = $(window).width();

  //Width and height of map
  width = parseInt(d3.select('.state-map').style('width'));

  mapRatio = .71
  height = width * mapRatio;
  viewBox = "0 0 " + width + " " + height;


  // D3 Projection
  var projection = d3.geo.albersUsa()
  				   .translate([width/2, height/2.2])    // translate to center of screen
  				   .scale([1.4 * width]);          // scale things down so see entire US

  // Define path generator
  var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
  		  	 .projection(projection);  // tell path generator to use albersUsa projection


  //Create SVG element and append map to the SVG
  var svg = d3.select(".state-map")
  			.append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", viewBox);

  // Load GeoJSON for US States
  d3.json("../maps/us-states.json", function(json) {
    // Bind the data to the SVG and create one path per GeoJSON feature
    // This builds the map
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append('a')
        .attr("target", "_blank")
        .attr('xlink:href', function(d) { return 'state_fact_sheets/' + state_id[d.id] + '/report.pdf'; })
      .append("path")
        .attr("d", path)
        .attr("id", function(d) { return state_id[d.id]; })
        .attr("class", 'state')
        .style("cursor", "pointer")
        .style("stroke", "#fff")
        .style("stroke-width", "1.5")
        .style("fill", "#343F49")
        .on('mouseover', function(d, i) {
          d3.select(this).style('fill', '#e71b4f'); // change to blue on hover
        })
        .on('mouseout', function(d, i) {
          d3.select(this).style('fill', '#343F49'); // remove blue
        });

    });

  });
