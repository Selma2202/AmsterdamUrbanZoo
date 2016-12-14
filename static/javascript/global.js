$(document).ready(function() {
	$(".button-collapse").sideNav();
})

$(document).ready(function() {
	$('select').material_select();
});

$(document).ready(function(){
	$('.collapsible').collapsible();
});

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('#delete-modal').modal();
});

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('#artdelete-modal').modal();
});