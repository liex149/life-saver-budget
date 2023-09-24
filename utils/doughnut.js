

const doughnut = (labels, data) => {
console.log('in function')
  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
          backgroundColor: [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FF39FF",
            "#2a2700",
            "#2a7c00",
            "#d37c00",
            "#4a85ee"
  
          ],
          data: data
          }],
        },
    options: {
      title: {
          display: true,
          text: 'Doughnut chart'
      },
      responsive: true,
     },
  });
  }
  
  // doughnut([ 'Paycheck', 'Car', 'Foods', 'Parents' ],[ '58.42', '700.21', '200.42', '10.21' ]);
  
  module.exports = doughnut;