$('.container').on("click", "#table tr", function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    var value= $(this).find('td:first').html();
    var firstName = $(this).find('td:nth-child(2)').html();
    var lastName = $(this).find('td:nth-child(3)').html();
    $('#title').text('Data for '+ firstName + ' ' + lastName)
    var id = '?userId=';
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
        if (event.target == modal) {
            modal.style.display = "none";
            $(".bootstrap-table").toggle();
            resetCanvas();

        }
    }
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
            var weeklyTime = data[0].weekly_time;
            switch(true){
                case (duration === null):
                    children[row].classList.value = 'danger';
                    break;
                case (duration < ((weeklyTime * 7)/2)):

                    children[row].classList.value = 'danger';

                    break;
                case (duration > (weeklyTime* 7)/2):
                    children[row].classList.value = 'success';

                    break;

            }



        })


    });


    return {
        classes: classes[0]
    };



}