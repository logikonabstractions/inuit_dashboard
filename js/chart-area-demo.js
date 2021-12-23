// Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';
Chart.defaults.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.defaultFontColor = '#858796';

let num_stations = 6;

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function random_thickness(offset, range=2) {
  return Math.random()*(range) + offset
}


// Datetimes to display on chart
let datetimes = [];
let ice_thick = [];

// wrapper to generate each graph with data independantly
function generate_random_thickness_dates() {
  let ice_thick_array = [];
  let random_offset = Math.random()+0.5
  for (let i = 1; i < 30; i++) {
    let offset;
    let range;
    datetimes.push(luxon.DateTime.utc(2021, 12, i, 12, 30));
    if (i>20){
      offset = 3*random_offset + random_offset;
      range = 1;
    } else {
      offset = i/5 + random_offset;
      range = 2
    }
    ice_thick_array.push(random_thickness(offset, range));
  }

  return ice_thick_array
}

for (let i = 1; i < 30; i++) {
  let offset;
  let range;
  datetimes.push(luxon.DateTime.utc(2021, 12, i, 12, 30));
  if (i>20){
    offset = 4;
    range = 1;
  } else {
    offset = i/5;
    range = 2
  }
  ice_thick.push(random_thickness(offset, range));
}

// Create an array of ISO strings
let datetimes_isos = [];
datetimes.forEach(function(item, index, array) {
  datetimes_isos.push(item.toISO());
});


function get_dummy_data(){
  let data = [];
  let thickness = generate_random_thickness_dates()
  for (let i = 0; i < datetimes.length; i++) {
    data.push({x:datetimes[i], y:thickness[i]})
  }
  return {labels: datetimes_isos, datasets: [{data: data, borderColor: '#333'}]}
}



function build_configs(){
  let config = {
    type: 'line',
    data: get_dummy_data(),
    options: {
      plugins: {
        legend: {display: false}
      },
      scales: {
        x: {
          title: {
            text: "Date (or relevent time intervale)",
            display: true
          },
          type: 'time',
          ticks:{
            source:'data'
          },
          time: {
            unit: "day"
          },
        },

        y: {
          title: {
            text: "Thickness (inches)",
            display: true
          }
        }
      },
    },
  };
  return config
}



let ctx1 = $("#ex1")
let ctx2 = $("#ex2")
let ctx3 = $("#ex3")
let ctx4 = $("#ex4")
let ctx5 = $("#ex5")
let ctx6 = $("#ex6")




var theChart1 = new Chart(ctx1, build_configs());
var theChart2 = new Chart(ctx2, build_configs());
var theChart3 = new Chart(ctx3, build_configs());
var theChart4 = new Chart(ctx4, build_configs());
var theChart5 = new Chart(ctx5, build_configs());
var theChart6 = new Chart(ctx6, build_configs());
