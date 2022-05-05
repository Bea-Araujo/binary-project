class InputModel {
    constructor() {
        this.input = '';
        this.from = '';
        this.to = '';
        this.result = '';
    }

    getInput() {
        return this.input;
    }

    getFrom() {
        return this.from;
    }

    getTo() {
        return this.to;
    }

    setInput(newInput) {
        this.input = newInput;
    }

    setFrom(newValue) {
        this.from = newValue;
    }

    setTo(newValue) {
        this.to = newValue;
    }

    resgatarCampos(fieldId) {
        switch (fieldId) {
            case 'from-field':
                this.setFrom($(`#${fieldId}`).val());
                break
            case 'to-field':
                this.setTo($(`#${fieldId}`).val());
                break
            case 'input-area':
                try {
                    this.setInput($(`#${fieldId}`).val());
                    if ($(`#${fieldId}`).val().length === 0) throw new Error('[ERROR] Input vazio')
                } catch (e) {
                    throw e
                }

        }
    }

    processarInput() {
        let inputText = ''

        switch (this.from) {
            case 'decimal':
                inputText = this.input.split('');
                switch (this.to) {
                    case 'binario':
                        this.result = this._decToAny(inputText, 2)
                        break
                    case 'octal':
                        this.result = this._decToAny(inputText, 8)
                        break
                }
                break

            case 'binario':
                inputText = this.input;
                try {
                    this._hasInvalidCharacters(inputText)
                    switch (this.to) {
                        case 'decimal':
                            this._binToDec(inputText)
                            break
                        case 'octal':
                            this.result = 'DESAFIO!'
                        // desafio
                    }
                } catch (e) {
                    throw e
                }
                break
            case 'octal':
                this.result = 'DESAFIO!'
        }

    }

    _decToAny(inputText, num) {
        const aciiCodedChars = inputText.map((character) => character.charCodeAt().toString(num)).join(' ');
        return aciiCodedChars;
    }

    _binToDec(inputText) {
        const codesSepareted = inputText.split(' ');
        const partialResult = codesSepareted.map((code) => code.split('').reverse().map((character) => parseInt(character)).reduce((prev, current, index) => {
            let potencia = current === 0 ? 0 : (2 ** index);
            return prev + potencia;
        }, 0))

        console.log(partialResult)
        const result = this._aciiToChar(partialResult)
        this.result = result.join('');
        console.log(result)
    }

    _hasInvalidCharacters(inputText) {
        const inputTextSemEspacos = inputText.split('').filter(element => element != ' ').join('')
        this._hasInvalidNumbers(inputTextSemEspacos);
        this._hasLettersOrSpecialChars(inputTextSemEspacos);
        this._hasSymbols(inputTextSemEspacos);
    }

    _hasLettersOrSpecialChars(inputText) {
        if (!parseInt(inputText)) throw new Error(`[ERROR] Caracteres inválidos passados para código ${this.from}`)
    }

    _hasInvalidNumbers(inputText) {
        console.log(inputText)
        inputText.split('').map(element => {
            if (element != '1' && element != '0') throw new Error(`[ERROR] Caracteres inválidos passados para código ${this.from}`)
        })
    }

    _hasSymbols(inputText) {
        inputText.split('').map(element => {
            if (element == '.' || element == ',') throw new Error(`[ERROR] Caracteres inválidos passados para código ${this.from}`)
        })
    }
    _aciiToChar(partialResult) {
        return partialResult.map((character) => String.fromCharCode(character));
    }

}