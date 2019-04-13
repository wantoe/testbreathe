

$('.container').on("click", "#table tr", function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    var value= $(this).find('td:first').html();
    var firstName = $(this).find('td:nth-child(2)').html();
    var lastName = $(this).find('td:nth-child(3)').html();
    var id = $(this).find('td:nth-child(1)').html();
    $('#title').text('Data for '+ firstName + ' ' + lastName + ' (#' + value + ")");
     id = '?userId=';
    console.log(value);
    getData(id.concat(value));
    // Get the modal
    var modal = document.getElementById('graphModal');

    jQuery('#graphModal').show()

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeGraphModal")[0];

    modal.style.display = "block";
    $(".bootstrap-table").hide();

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        $(".bootstrap-table").toggle();
        resetCanvas();

    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            $(".bootstrap-table").toggle();
            resetCanvas();

        }
    };

    $.get('/api/UserRequirements' + id + value, function(data,status){

        $('#title').text('Data for '+ firstName + ' ' + lastName + ' (#' + value + ")");

        if(data[0]!== undefined) {
            $('#stime').text(data[0].daily_time);
            $('#spressure').text(data[0].max_pressure);
        }else {
            $('#stime').text(0);
            $('#spressure').text(0);
        }
        $('input[name="userId"]').val(value);
    });

    var table = document.getElementById('table');
    var trs = table.getElementsByClassName('selected');
    var tds = trs[0].getElementsByTagName('td');

    var userId = tds[0].textContent;

    var jqxhr = $.get('/api/getGameStatus?user_id=' + userId, function out (err, res){
        textElement = document.querySelector('#game-status');

        console.log(jqxhr.responseText);

        result = JSON.parse(jqxhr.responseText);
        
        if(result.game_enabled) {
            textElement.innerText = "Enabled";
        } else {
            textElement.innerText = "Disabled";
        }
    });
});

function onCancelClick(){
            var modal = document.getElementById('graphModal');
            modal.style.display = "none";
            $(".bootstrap-table").toggle();
            resetCanvas();
}


$('#prescriptions').click(function(){
    console.log('reached',id);
    $.get('/api/UserRequirements' + id + value, function(data,status){

        console.log(data[0]);
        $('#title').text('Data for '+ firstName + ' ' + lastName + ' (#' + value + ")");

        if(data[0]!== undefined) {
            $('#stime').text(data[0].daily_time);
            $('#spressure').text(data[0].max_pressure);
        }else {
            $('#stime').text(0);
            $('#spressure').text(0);
        }
        $('input[name="userId"]').val(value);

    });
});

function getUserStats(value,row,index){
    var classes = ['active', 'success', 'info', 'warning', 'danger'];
    var ind;

    var id = value.user_id;
    var rows = $('tbody', '#table');
    var children = rows["0"].children

    $.get('/api/UserRequirements' + '?userId=' + id, function results(data,status) {
        $('#TimeInfo').text('Daily CPT Time : ' + data[0].weekly_time );
        $('#PressureInfo').text('CPT Pressure : ' + data[0].max_pressure);
        $.get('/api/WeeklyQuota'+ '?userId=' + id, function results(data2,status){

            var duration = (data2[0]['SUM(duration)']);
            var weeklyTime = data[0].daily_time;


            switch(true){
                case (duration === null ):
                    children[row].classList.value = 'danger';
                    children[row].cells[5].innerText = 0;
                    break;
                case (duration < ((weeklyTime * 7)/2)):
                    children[row].cells[5].innerText = Math.round((duration/((weeklyTime) *7 )/2) * 100 )+ "%";
                    children[row].classList.value = 'danger';

                    break;
                case (duration > (weeklyTime* 7)/2):
                    children[row].cells[5].innerText = Math.round((duration/((weeklyTime) *7 )/2) * 100 )+ "%";
                    children[row].classList.value = 'success';

                    break;

            }



        })


    });


    return {
        classes: classes[0]
    };



}