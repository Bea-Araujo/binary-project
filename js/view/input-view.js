class InputView {

    campoInvalido(fieldId) {
        $(`#${fieldId}`).css('border-color', 'red');
    }

    removerVermelho(fieldId) {
        $(`#${fieldId}`).css('border-color', 'black');
    }

    escreverOutput(fieldId, result) {
        $(`#${fieldId}`).val(result);
    }
}