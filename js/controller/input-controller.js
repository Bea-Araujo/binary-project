class InputController {

    processarInput() {
        const model = new InputModel();
        const view = new InputView();
        try {
            model.resgatarCampos('input-area');
            view.removerVermelho('input-area');

            model.resgatarCampos('from-field');
            model.resgatarCampos('to-field');

            model.processarInput();

            view.escreverOutput('output-area', model.result)
            console.log(model)

        } catch (e) {
            view.campoInvalido('input-area')
            view.escreverOutput('output-area', model.result)
            console.error(e)
        }

    }
}