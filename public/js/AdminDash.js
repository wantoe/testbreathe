
console.log('loaded');
var checkedRows = [];
var table = $('#table');


table.on('uncheck.bs.table', function (e, row) {
    $.each(checkedRows, function(index, value) {


        console.log(checkedRows);
        if (value.username === row.username) {
            checkedRows.splice(index,1);
        }
    });
    console.log(checkedRows);
});

table.on('check.bs.table', function (e, row) {
    var r = row
    checkedRows.push({username: r.username});
    console.log(checkedRows);
});

table.on('check-all.bs.table', function (e,rows){
    for(var v in rows) {

        if(!contains(checkedRows,rows[v].username)) {
            checkedRows.push({username: rows[v].username})
        }
    }
    console.log(checkedRows);
});

table.on('uncheck-all.bs.table', function (e,rows){
    checkedRows = [];
    console.log(checkedRows);
});



function contains(array, number){
    for(i = 0; i < array.length; i++){
        if(array[i].username === number){
            return true;
        }
    }
    return false;
}