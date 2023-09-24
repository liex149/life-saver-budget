var data = [12, 50, 3, 23];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: ["Red", "Orange", "Yellow", "Green"],
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
        data: [12, 50, 3, 23]
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
