/**
 * Created by Sid on 14/07/2017.
 */
/**
 * Created by Sid on 14/07/2017.
 */
function activateClass(element, classToRemove) {

    $(element).stop().removeClass(classToRemove);
}

function deactivateClass(element, classToAdd) {
    $(element).stop().addClass(classToAdd);
}

function appendElement(parent, child) {
    child.id = 'pen';
    parent.appendChild(child);
}

function removeElement(parent, child) {
    parent.removeChild(child);
}

function resetForm(formID) {
    document.getElementById(formID).reset();
}

function checkForm() {

    password = document.getElementById('password');
    confirm_password = document.getElementById('confirm_password');

    if (password.value === confirm_password.value) {
        activateClass('.container', 'active');
        appendElement(parent, pen)
        return true;
    } else {
        $('#messageModal').modal('show');
        return false;
    }
}



