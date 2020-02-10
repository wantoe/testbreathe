
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

function removeRequest() {
    var box = document.createElement("div");
    box.className = "container";
    box.style = "margin: 5%;";
    box.id = "deletion-confirmation";

    var header = document.createElement("h1");
    header.textContent = "Deletion Confirmation";
    header.style = "text-align: center;font-size: 1.5vw;";

    var text = document.createElement("h2");
    text.textContent = "Do you wish to delete these accounts?";
    text.style = "text-align: center;font-size: 1vw;";

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "container";
    buttonContainer.style = "text-align: center; margin: 2%;";

    var yesButton = document.createElement("button");
    yesButton.textContent = "YES";
    yesButton.setAttribute("onclick", "remove()");
    yesButton.setAttribute("class", "btn btn-success");
    yesButton.style = "margin: auto; float:none; width: 20%; position: relative; right: 10%";

    var noButton = document.createElement("button");
    noButton.textContent = "NO";
    noButton.setAttribute("onclick", "clearRequest()");
    noButton.setAttribute("class", "btn btn-danger");
    noButton.style = "margin: auto; float:none; width: 20%; position: relative; right: 6%";

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    box.appendChild(header);
    box.appendChild(text);
    box.appendChild(buttonContainer);

    document.getElementById("MainPage").appendChild(box);

}

function clearRequest() {
    document.getElementById("MainPage").removeChild(document.getElementById("deletion-confirmation"));
}

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
        if(res.status === 503) {
            removeAccount(user_id);
        }
    });
}