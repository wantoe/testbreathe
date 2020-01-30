var myChart;
function getData(value) {
     $.get('api/userdata' + value, function (data, status) {
        var time = [];
        var dur = [];

        const noSecsInDays = 86400000;

         if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                val = parseInt(data[i].duration) / 60.0;
                val = val.toFixed(2);
                dur = dur.concat(parseFloat(val));

                if(data[i].session_start === null) {
                    continue;
                }

                time[i] = data[i].session_start.substring(0, 10);
            }
        }

        var title = document.getElementById('title').text;
        var ctx = document.getElementById('myChart').getContext('2d');

        ctx.canvas.height = 1000;
        ctx.canvas.width = 1000;
        ctx.canvas.style.height = "80%";
        ctx.canvas.style.width = "80%";

        ctx.canvas.addEventListener('click',handleClick,false);
        myChart = new Chart(ctx, {
            type: 'bar',
            options: {
                responsive: false,  
                title: {text: 'Duration of Cycles vs Date', display: true},
                xAxes: {
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    gridLines: {
                        offsetGridLines: true
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            scaleFontSize: 1200,
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            scaleFontSize: 1200,
                        }
                    }]
                }
            },
            data: {
                labels: time,
                datasets: [{
                    label: 'Duration (in minutes)',
                    data: dur,
                    backgroundColor: "rgba(0,0,255,4)",
                }]
            }
        });
        
        function handleClick(evt){
            function getIndex(x) {
                for (var i = 0; i < data.length; i++) {
                    if(data[i].session_start !== null) {
                        if ((parseInt(data[i].duration) / 60.0).toFixed(2) == x) {
                            elementIndex = data[i];
                            return elementIndex;
                        }
                    } else {
                        if((parseInt(data[i].duration) / 60.0).toFixed(2) == x) {
                            data[i].session_start = ""
                            elementIndex = data[i];
                            return elementIndex;
                        }
                    }
                }
            }
            var elementIndex;
            var activeElement = myChart.getElementAtEvent(evt);
            var averageExhlPressure = '';
            var averageExhlTime = '';
            var successful_breaths = '';
            var succesful_huff_coughs = '';
            var unsuccessful_breaths_pressure = '';
            var unsucessful_breaths_time = '';
            var sessionStart = '';

            if( activeElement[0] !== undefined) {
            var x = myChart.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];
            elementIndex = getIndex(x);

            console.log(elementIndex);

            averageExhlPressure = 'Average Exhalation Pressure: ' + elementIndex.average_exhl_pressure + ' mbar';
            averageExhlTime =  'Average Exhalation Time: ' + elementIndex.average_exhl_time + 'min';
            successful_breaths =  'Successful Breaths : ' + elementIndex.successful_breaths + '';
            succesful_huff_coughs = 'Successful Huff Coughs : ' + elementIndex.successful_huff_coughs ;
            unsuccessful_breaths_pressure = 'Unsuccessful Breaths due to Pressure : '    + elementIndex.unsuccessful_breaths_pressure;
            unsucessful_breaths_time = 'Unsucessful Breaths due to time : ' + elementIndex.unsuccessful_breaths_time ;
            sessionStart = 'Session Start: ' + elementIndex.session_start.substring(0,10).concat(' ').concat(elementIndex.session_start.substring(11, 16));
        
            $('#average_exhl_pressure').text(averageExhlPressure);
            $('#average_exhl_time').text(averageExhlTime);
            $('#session_start').text(sessionStart);
            $('#successful_breaths').text(successful_breaths);
            $('#successful_huff_coughs').text(succesful_huff_coughs);
            $('#unsuccessful_breaths_pressure').text(unsuccessful_breaths_pressure);
            $('#unsuccessful_breaths_time').text(unsucessful_breaths_time);
            if(value === ' ') {
                $('#myModal').toggle();
            }   else {
                    jQuery('#myModal2').modal({show:true});
                }
            }
        }
    });

}

 function resetCanvas(){
    $('#myChart').remove(); // this is my <canvas> element
    $('#graph-container').append('<canvas id="myChart"><canvas>');
     $('#myChart').css({
         'top' :'0',
         'bottom': '30% ',
         'left' : '0 ' ,
         'right': '0 ' ,
         'margin':'auto '
     });

     $('#average_exhl_pressure').text(' ');
     $('#average_exhl_time').text(' ');
     $('#session_start').text(' ');
     $('#successful_breaths').text(' ');
     $('#successful_huff_coughs').text(' ');
     $('#unsuccessful_breaths_pressure').text(' ');
     $('#unsuccessful_breaths_time').text(' ');
    canvas = document.querySelector('#myChart');
    canvas.width =500 ; // resize to parent width
    canvas.height =500 ; // resize to parent height

}

