/**
 * Created by Sid on 14/07/2017.
 */
/**
 * Created by Sid on 14/07/2017.
 */
function activateClass(element,classToRemove){

    $(element).stop().removeClass(classToRemove);
}

function deactivateClass(element,classToAdd){
    $(element).stop().addClass(classToAdd);
}

function appendElement(parent,child){
    parent.appendChild(child);
}

function removeElement(parent,child){
    parent.removeChild(child);
}

function resetForm(formID){
    document.getElementById(formID).reset();
}

    function validatePassword(password,confirm_password){
        if(password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }

}

