var myChart;
function getData(value) {
     $.get('api/userdata' + value, function (data, status) {
        var time = [];
        var dur = [];

        const noSecsInDays = 86400000;

        console.log(data);

         if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                val = parseInt(data[i].duration) / 60.0;
                val = val.toFixed(2);
                dur = dur.concat(val);

                if (data[i].session_start !== null) {

                    time = time.concat(data[i].session_start.substring(0,10).concat(' ').concat(data[i].session_start.substring(11, 16)));

                    //buffer the days that aren't there now by adding them in to the buffer.
                    prevTime = Date.parse(data[Math.max(0, i - 1)].session_start.substring(0,10));
                    timeDiff = Date.parse(data[i].session_start.substring(0,10)) - prevTime;
                    timeDiff = timeDiff / noSecsInDays;
                    
                    console.log('Time Diff is: ' + timeDiff);
                    console.log('Index is: ' + i);

                    for(var j = 1; j < timeDiff; j++) {
                        newTime = prevTime;
                        newTime = new Date(newTime + j * noSecsInDays);

                        let year = data[i].session_start.substring(0,4);
                        let month = newTime.getMonth() + 1;
                        let day = newTime.getDate();
                        output = `${year}-${month}-${day}`;

                        time.splice(i + j - 1, 0, output);
                        dur.splice(i + j - 1, 0, 0);

                        console.log(time);
                        console.log(dur);
                    }

                } else {
                    time = time.concat('Date Lost');
                }
            }
        }

        var title = document.getElementById('title').text;
        var ctx = document.getElementById('myChart').getContext('2d');
        ctx.canvas.height = 500;
        ctx.canvas.width = 500;
        ctx.canvas.addEventListener('click',handleClick,false);
         myChart = new Chart(ctx, {
            type: 'bar',
            options: {responsive: false,  title: {text: 'Duration of Cycles vs Date', display: true}},

            data: {
                labels: time,
                datasets: [{
                    label: 'Duration (in minutes)',
                    data: dur,
                    backgroundColor: "rgba(0,0,255,4)"
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
                        if ((data[i].session_start === 'Date_Lost' || data[i].session_start.substring(0,10).concat(' ').concat(data[i].session_start.substring(11, 16)) === activeElement[0]._model.label) && 
                        (parseInt(data[i].duration) / 60.0).toFixed(2) === x) {
                            elementToDisplay = data[i];
                        }
                    } else {
                        if(data[i].duration === x)
                            elementToDisplay = data[i];
                    }
                }
                console.log(elementToDisplay);
                 averageExhlPressure = 'Average Exhalation Pressure: ' + elementToDisplay.average_exhl_pressure + ' mbar';
                 averageExhlTime =  'Average Exhalation Time: ' + elementToDisplay.average_exhl_time + 's';
                 successful_breaths =  'Successful Breaths : ' + elementToDisplay.successful_breaths + '';
                 succesful_huff_coughs = 'Successful Huff Coughs : ' + elementToDisplay.successful_huff_coughs ;
                 unsuccessful_breaths_pressure = 'Unsuccessful Breaths due to Pressure : '    + elementToDisplay.unsuccessful_breaths_pressure;
                 unsucessful_breaths_time = 'Unsucessful Breaths due to time : ' + elementToDisplay.unsuccessful_breaths_time ;
                 sessionStart = 'Session Start: ' + elementToDisplay.session_start.substring(0,10).concat(' ').concat(elementToDisplay.session_start.substring(11, 16));

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

