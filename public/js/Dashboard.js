
$.get('api/UserRequirements', function results(data,status) {
    var pressure = $('#PressureInfo');
    var time = $('#TimeInfo');

    if(data[0].daily_time == '0.00') {
        time.text('You have no prescribed time, please contact your clinician');
    } else {
        time.text('Prescribed Daily CPT Time : ' + data[0].daily_time.concat('s'));
    }

    if(data[0].max_pressure == '0.00') {
        pressure.text('You have no prescribed pressure, please contact your clinician');
    } else {
        pressure.text('Prescribed CPT Pressure : ' + data[0].max_pressure.concat(' mbar'));
    }

    //scaleText(pressure);
    //scaleText(time);

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
            danger.text('You have done less than 50% of your CPT exercises');
        } else if (duration > ((weeklyTime * 7) / 2)) {
            console.log('hey');
            success.css('display', 'block');
            success.text('You have done more than 50% of your CPT exercises');
        }
    
        //scaleText(danger);
       // scaleText(success);
    });
});

//this needs fixing...
function scaleText(element) {
    var height = element.innerHeight();
    var width = element.innerWidth();
    var fontSize = 14;

    console.log("scaling text...");
    console.log("element height is: " + height);
    console.log("element width is: " + width);

    var textHeight, textWidth;

    console.log(element);

    do {
       //element.css("font-size", fontSize);
        
        textHeight = element[0].offsetHeight;
        textWidth = element[0].offsetWidth;

        console.log("text height is: " + textHeight);
        console.log("text width is: " + textWidth);

        fontSize = fontSize - 1;
    } while ((textHeight > height || textWidth > width) && fontSize > 4);
}

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