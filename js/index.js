const controller = new InputController();

$('#submit-btn').click(event => {
    // console.log($('#from-field').val())
    controller.processarInput();
})