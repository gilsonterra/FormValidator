(function () {
    var FormValidator = function (formName, fields) {

        var _formName = formName;
        var _fields = fields;
        var _errors = [];

        var _findElementByName = function (name) {
            return document.getElementsByName(name)[0];
        };

        var _valid = function () {
            _errors = [];
            _fields.forEach(function (field) {
                field.element = _findElementByName(field.name);
                _toogleClassError(field.element, false);
                _renderMessage(field.element.parentNode, '');

                field.rules.forEach(function (rule) {
                    if (!_validators[rule.name](field.element, rule.params)) {
                        field.error = true;
                        _errors.push({
                            element: field.element,
                            message: rule.message
                        });
                    }
                });
            });

            _renderErrors();

            return _errors.length <= 0;
        };

        var _toogleClassError = function (element, toogle) {
            if (toogle) {
                element.classList.add('has-error');
            } else {
                element.classList.remove('has-error');
            }
        };

        var _getErrors = function () {
            return _errors;
        };

        var _renderErrors = function () {
            if (_errors.length > 0) {
                _errors.forEach(function (field) {
                    var parent = field.element.parentNode;

                    _toogleClassError(field.element, true);

                    _renderMessage(parent, field.message);
                });
            }
        };

        var _renderMessage = function (element, message) {
            var messageContainer = element.querySelector('.message');
            if (messageContainer) {
                messageContainer.innerHTML = message;
            } else {
                var span = document.createElement('span');
                span.classList.add('message');
                span.innerHTML = message;
                element.appendChild(span);
            }
        };

        var _validators = {
            required: function (elem) {
                return (elem.value && elem.value.length > 0);
            },

            date: function (elem) {
                return !/Invalid|NaN/.test(new Date(elem.value).toString())
            },

            number: function (elem) {
                return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(elem.value);
            },

            equalTo: function (elem, param) {
                var equal = _findElementByName(param[0]);
                return (equal.value == elem.value);
            }
        };

        return {
            valid: _valid,
            getErrors: _getErrors
        };
    };

    window.FormValidator = FormValidator;
})();