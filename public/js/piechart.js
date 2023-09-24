var data = [12, 50, 3, 23];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: ["Red", "Orange", "Yellow", "Green"],
    datasets: [{
        backgroundColor: [
        //   "#FF0000",
        //   "#00FF00",
        //   "#0000FF",
        //   "#FF39FF",
        ],
        data: [12, 50, 3, 23]
        }],
      },
  options: {
    title: {
        display: true,
        text: 'pie chart'
    },
    responsive: true,
   },
});
