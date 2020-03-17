function onCancelClick(){
            var modal = document.getElementById('graphModal');
            modal.style.display = "none";
            $(".bootstrap-table").toggle();
            resetCanvas();
}

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

function updateUserGameStatus() {
    var table = document.getElementById('table');
    var trs = table.getElementsByClassName('selected');
    var tds = trs[0].getElementsByTagName('td');
    
    var userId = tds[0].textContent;
    
    $.post('/api/updateGameStatus', {user_id: userId});
    
    var popup = document.getElementById('graphModal');
    var window = popup.getElementsByClassName('modal-content')[0];
    var close = window.getElementsByClassName('closeGraphModal')[0];
            
    close.click();
};