var time = [];
var dur = [];

var x = $.get('http://localhost:8080/api/userdata?userId=' , function (data, status){
    console.log(data);
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            dur = dur.concat(data[i].duration);

            if (data[i].session_start !== null) {

                var t = data[i].session_start.split(/[- :]/);
                var d = new Date(Date.UTC(t[0], t[1] - 1));
                time = time.concat(d.getDay() + '/' + d.getMonth() + '/' + d.getUTCFullYear());

            } else {
                time = time.concat('Date_Lost')
            }


        }
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.canvas.height = 500;
    ctx.canvas.width =500;
    var myChart = new Chart(ctx, {
        type: 'bar',
        options: {responsive: false,                 title: { text: 'Duration of Cycles vs Date', display: true},},

        data: {
            labels: time,
            datasets: [{
                label: 'Duration',
                data: dur,
                backgroundColor: "rgba(153,255,51,0.4)"
            }]
        }
    });
});
