
function ajaxAction(url,action,postData,callback){
    $.ajax({
        type: "POST",
        url: baseurl + url,
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').val()
        },
        data: {'action': action, 'data': postData},
        success: function(data) {

            callback(data);

        },
        error: function(err) {

        }
    }); 
}

hideMsgBox();

function hideMsgBox() {
    setTimeout(function() {
        $("#errorSection").slideUp(3000);
    }, 5000);
}
