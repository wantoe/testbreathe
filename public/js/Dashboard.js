
$.get('api/UserRequirements', function results(data,status) {

    if(data[0].daily_time == '0.00') {
        $('#TimeInfo').text('You have no prescribed time, please contact your clinician');
    } else {
        $('#TimeInfo').text('Prescribed Daily CPT Time : ' + data[0].daily_time.concat('s'));
    }

    if(data[0].max_pressure == '0.00') {
        $('#PressureInfo').text('You have no prescribed pressure, please contact your clinician');
    } else {
        $('#PressureInfo').text('Prescribed CPT Pressure : ' + data[0].max_pressure.concat(' mbar'));
    }

    $.get('api/WeeklyQuota', function results(data2,status) {

        var duration = (data2[0]['SUM(duration)']);
        console.log(data[0]);
        var weeklyTime = data[0].daily_time;
        var danger = $('#belowThresh');
        var success = $('#aboveThresh');



        if (duration === null) {
            danger.css('display', "block");
            danger.text('You have completed No CPT sessions this week.');
        } else if (duration < ((weeklyTime * 7) / 2)) {
            danger.css('display', 'block');
            danger.text('You have done less than 50% of your CPT exercises this week.');
        } else if (duration > ((weeklyTime * 7) / 2)) {
            console.log('hey');
            success.css('display', 'block');
            success.text('You have done more than 50% of your CPT exercises this week.');
        }

    });
});


$.get('api/validateUser', function results(data,status){
        console.log(data);

       $('#title').text("View your data " + data['first_name'] + " " + data['last_name'] + " " + "(#" + data['user_id'] + ")");
});


var modal = document.getElementById('myModal');



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};