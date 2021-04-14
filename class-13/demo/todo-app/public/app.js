console.log('js is alive!!')

$('#updateForm').hide();
$('#updateBtn').on('click',function(){
    $('#updateForm').toggle();
})