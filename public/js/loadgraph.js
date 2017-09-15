
function getData(value) {
     $.get('api/userdata' + value, function (data, status) {
        var time = [];
        var dur = [];

        console.log(data);



        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {

                dur = dur.concat(data[i].duration);

                if (data[i].session_start !== null) {

                    time =  time.concat(data[i].session_start.substring(0,10));

                } else {
                    time = time.concat('Date_Lost')
                }


            }
        }
        var ctx = document.getElementById('myChart').getContext('2d');
        ctx.canvas.height = 500;
        ctx.canvas.width = 500;
        ctx.canvas.addEventListener('click',handleClick,false);
        var myChart = new Chart(ctx, {
            type: 'bar',
            options: {responsive: false,  title: {text: 'Duration of Cycles vs Date For user: ' + data[0].user_id, display: true}},

            data: {
                labels: time,
                datasets: [{
                    label: 'Duration',
                    data: dur,
                    backgroundColor: "rgba(153,255,51,0.4)"
                }]
            }
        });

        function handleClick(evt){
            var elementToDisplay;
            var activeElement = myChart.getElementAtEvent(evt);
            var averageExhlPressure = '';
            var averageExhlTime = '';
            var successful_breaths = '';
            var succesful_huff_coughs = '';
            var unsuccessful_breaths_pressure = '';
            var unsucessful_breaths_time = '';
            var sessionStart = '';

                console.log(activeElement[0]);


            if( activeElement[0] !== undefined) {
               var x = myChart.data.datasets[activeElement[0]._datasetIndex].data[activeElement[0]._index];


                for (var i = 0; i < data.length; i++) {

                    if(data[i].session_start !== null) {
                        if ((data[i].session_start === 'Date_Lost' || data[i].session_start.substring(0, 10) === activeElement[0]._model.label) && data[i].duration === x) {
                            elementToDisplay = data[i];
                        }
                    } else {
                        if(data[i].duration === x)
                            elementToDisplay = data[i];
                    }
                }
                console.log(elementToDisplay);
                 averageExhlPressure = 'Average Exhalation Pressure: ' + elementToDisplay.average_exhl_pressure ;
                 averageExhlTime =  'Average Exhalation Time: ' + elementToDisplay.average_exhl_time ;
                 successful_breaths =  'Successful Breaths : ' + elementToDisplay.successful_breaths ;
                 succesful_huff_coughs = 'Successful Huff Coughs : ' + elementToDisplay.successful_huff_coughs ;
                 unsuccessful_breaths_pressure = 'Unsuccessful Breaths due to Pressure : '    + elementToDisplay.unsuccessful_breaths_pressure;
                 unsucessful_breaths_time = 'Unsucessful Breaths due to time : ' + elementToDisplay.unsuccessful_breaths_time ;
                 sessionStart = 'Session Start: ' + elementToDisplay.session_start.substring(0,10);

                $('#average_exhl_pressure').text(averageExhlPressure);
                $('#average_exhl_time').text(averageExhlTime);
                $('#session_start').text(sessionStart);
                $('#successful_breaths').text(successful_breaths);
                $('#successful_huff_coughs').text(succesful_huff_coughs);
                $('#unsuccessful_breaths_pressure').text(unsuccessful_breaths_pressure);
                $('#unsuccessful_breaths_time').text(unsucessful_breaths_time);
                if(value === ' ') {

                    $('#myModal').toggle();
                }else {
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

