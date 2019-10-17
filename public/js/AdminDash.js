
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
};

function accept(){
    var usernames = [];

table = document.getElementById("clinician-table");
tr = table.getElementsByClassName("selected");

usernames = new Array();

for(i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    usernames.push(td[1].textContent);
}

$.post('/api/ValidateClinicians',{users: usernames}, function(err,res){
    console.log(err);
})
.done(function() {
    location.reload();
});

console.log(tr);
};

function decline(){
    var usernames = [];

    table = document.getElementById("clinician-table");
    tr = table.getElementsByClassName("selected");

    usernames = new Array();

    for(i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        usernames.push(td[1].textContent);
    }

    $.post('/api/DeclineClinicians',{users: usernames})
    .done(function() {
        location.reload();
    });
    
    console.log(tr);
};

//this function needs to post a request to "login" as a different user.
function view(){
    var user_id;

    table = document.getElementById("accounts-table");
    test = table.getElementsByClassName("selected");
    td = test[0].getElementsByTagName("td");

    user_id = td[1].textContent;

    console.log(user_id);

    var jqxhr = $.post('/api/loginAs',{user_id: user_id})
    .done(function() {
        console.log(jqxhr.responseText);
        $('html').html(jqxhr.responseText);
        $('html').hide().show(0);
    });
};

//this function posts a delete request for a given id to the server.
function remove() {
    var table, test, td;
    
    table = document.getElementById("accounts-table");
    test = table.getElementsByClassName("selected");

    for(i = 0; i < test.length; i++) {
        td = test[i].getElementsByTagName("td");
        user_id = parseInt(td[1].textContent);
        
        removeAccount(user_id);
    }

    location.reload(true);
}

function removeAccount(user_id) {
    var jqxhr = $.post('/api/deleteAccount', {user_id: user_id}).done(function() {
        if(res.status === 500) {
            removeAccount(user_id);
        }
    });
}