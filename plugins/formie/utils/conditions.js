// from https://github.com/verbb/formie/blob/craft-3/src/web/assets/frontend/src/js/fields/conditions.js
export default class FormieConditions {
    constructor ({ $form }) {
        this.$form = $form;

        this.conditionsElements = [];
        this.conditionsStore = new WeakMap();

        this.initConditions('field');
        this.initConditions('page');
    }

    initConditions (type) {
        this.$form.querySelectorAll(`[data-${type}-conditions]`).forEach(($el) => {
            const conditionSettings = this.parseJsonConditions($el, type);

            // Store the conditions against the target field object for later access/testing
            const conditions = [];

            conditionSettings.conditions.forEach((condition) => {
                // Get the field(s) we're targeting to watch for changes. Note we need to handle multiple fields (checkboxes)
                const fieldName = condition.field.replace('{', '').replace('}', '').replace(/\.([^.]+)/, '[$1]');
                let $targets = this.$form.querySelectorAll('[name="' + fieldName + '"]');

                // Check if we're dealing with multiple fields, like checkboxes. This overrides the above
                const multiFields = this.$form.querySelectorAll('[name="' + fieldName + '[]"]');

                if (multiFields.length) {
                    $targets = multiFields;
                }

                // Special handling for Repeater/Groups that have `new1` in their name but for page reload forms
                // this will be replaced by the blockId, and will fail to match the conditions settings.
                if ((!$targets || !$targets.length) && fieldName.includes('[new1]')) {
                    // Get tricky with Regex. Find the element that matches everything except `[new1]` for `[1234]`.
                    // Escape special characters `[]` in the string, and swap `[new1]` with `[\d+]`.
                    const regexString = fieldName.replace(/[.*+?^{}()|[\]\\]/g, '\\&').replace(/new1/g, '\\d+');

                    // Find all targets via Regex.
                    $targets = this.querySelectorAllRegex(new RegExp(regexString), 'name');
                }

                if (!$targets || !$targets.length) {
                    return;
                }

                // Store the conditions with the target field for later access/testing
                condition.$targets = $targets;
                conditions.push(condition);

                $targets.forEach(($target) => {
                    // Get the right event for the field
                    const eventType = this.getEventType($target);

                    // Watch for changes on the target field. When one occurs, fire off a custom event on the source field
                    // We need to do this because target fields can be targetted by multiple conditions, and source
                    // fields can have multiple conditions - we need to check them all for all/any logic.
                    this.addEventListener($target, eventKey(eventType), () => $el.dispatchEvent(new Event('FormieEvaluateConditions', { bubbles: true })));
                });
            });

            // Save our condition settings and targets against the origin fields. We'll use this to evaluate conditions
            this.conditionsStore.set($el, {
                showRule: conditionSettings.showRule,
                conditionRule: conditionSettings.conditionRule,
                conditions,
            });

            // Add a custom event listener to fire when the field event listener fires
            this.addEventListener($el, eventKey('FormieEvaluateConditions'), (e) => {
                this.evaluateConditions(e, type);
            });

            // Also - trigger the event right now to evaluate immediately. Namely if we need to hide
            // field that are set to show if conditions are met.
            $el.dispatchEvent(new Event('FormieEvaluateConditions', { bubbles: true }));
        });
    }

    addEventListener (element, event, func) {
        element.addEventListener(event.split('.')[0], func);
    }

    evaluateConditions (e, type) {
        const $el = e.target;

        // Get the prepped conditions for this field
        const conditionSettings = this.conditionsStore.get($el);
        if (!conditionSettings) { return; }
        const { showRule } = conditionSettings;

        const finalResult = evaluateConditions(conditionSettings);
        // console.log($el, type, finalResult)

        // Show or hide? Also toggle the disabled state to sort out any hidden required fields
        if ((finalResult && showRule !== 'show') || (!finalResult && showRule === 'show')) {
            $el.dispatchEvent(new Event('formie-hide'), { bubbles: true });

            $el.setAttribute('data-conditionally-hidden', true);

            $el.querySelectorAll('input, textarea, select').forEach(($input) => {
                $input.setAttribute('disabled', true);
            });
        } else {
            $el.dispatchEvent(new Event('formie-show'), { bubbles: true });

            $el.removeAttribute('data-conditionally-hidden');

            $el.querySelectorAll('input, textarea, select').forEach(($input) => {
                $input.removeAttribute('disabled');
            });
        }
    }

    getEventType ($field) {
        const tagName = $field.tagName.toLowerCase();
        const inputType = $field.getAttribute('type') ? $field.getAttribute('type').toLowerCase() : '';

        if (tagName === 'select' || inputType === 'date') {
            return 'change';
        }

        if (inputType === 'number') {
            return 'input';
        }

        if (inputType === 'checkbox' || inputType === 'radio') {
            return 'click';
        }

        return 'keyup';
    }

    parseJsonConditions ($el, type) {
        const json = $el.getAttribute(`data-${type}-conditions`);

        if (json) {
            try {
                return JSON.parse(json);
            } catch (e) {
                console.error('Unable to parse JSON conditions: ' + e);
            }
        }

        return false;
    }

    querySelectorAllRegex (regex, attributeToSearch) {
        const output = [];

        for (const element of this.$form.querySelectorAll(`[${attributeToSearch}]`)) {
            if (regex.test(element.getAttribute(attributeToSearch))) {
                output.push(element);
            }
        }

        return output;
    }
}

function evaluateConditions (conditionSettings) {
    const { conditionRule, conditions } = conditionSettings;
    const results = [];

    conditions.forEach((condition) => {
        const { condition: logic, value, $targets } = condition;

        // We're always dealing with a collection of targets, even if the target is a text field
        // The reason being is this normalises behaviour for some fields (checkbox/radio) that
        // have multiple fields in a group.
        $targets.forEach(($target) => {
            let result = false;
            const testOptions = {};
            const tagName = $target.tagName.toLowerCase();
            const inputType = $target.getAttribute('type') ? $target.getAttribute('type').toLowerCase() : '';

            // We don't care about hidden inputs. Mostly messes up checkboxes!
            if (inputType === 'hidden') {
                return;
            }

            // Handle some special options like dates - tell our condition tester about them
            if (inputType === 'date') {
                testOptions.isDate = true;
            }

            // Handle agree fields, which are a single checkbox, checked/unchecked
            if ($target.getAttribute('data-fui-input-type') === 'agree') {
                // Convert the value to boolean to compare
                result = testCondition(logic, value !== '0', $target.checked);

                results.push(result);

                // Handle (multi) checkboxes and radio, which are a bit of a pain
            } else if (inputType === 'checkbox' || inputType === 'radio') {
                // Exclude any checkboxes that don't have conditions setup. We don't need to test against them
                if ($target.value === value) {
                    // If the checkbox isn't checked, it's automatically false, but important to record
                    // when we have multiple conditions setup for a single checkbox group
                    result = ($target.checked) ? testCondition(logic, value, $target.value) : false;

                    results.push(result);
                }
                // Handle multi-selects
            } else if (tagName === 'select' && $target.hasAttribute('multiple')) {
                Array.from($target.options).forEach(($option) => {
                    // Exclude any options that don't have conditions setup. We don't need to test against them
                    if ($option.value === value) {
                        // If the option isn't selected, it's automatically false, but important to record
                        // when we have multiple conditions setup for a single select
                        result = ($option.selected) ? testCondition(logic, value, $option.value) : false;

                        results.push(result);
                    }
                });
            } else {
                result = testCondition(logic, value, $target.value, testOptions);

                results.push(result);
            }
        });
    });

    let finalResult = false;

    // Check to see how to compare the result (any or all).
    if (results.length) {
        if (conditionRule === 'all') {
            // Are _all_ the conditions the same?
            finalResult = results.every(val => val === true);
        } else {
            finalResult = results.includes(true);
        }
    }

    return finalResult;
}

function testCondition (logic, value, fieldValue, testOptions = {}) {
    let result = false;

    // Are we dealing with dates? That's a whole other mess...
    if (testOptions.isDate) {
        value = new Date(value).valueOf();
        fieldValue = new Date(fieldValue).valueOf();
    }

    if (logic === '=') {
        result = value === fieldValue;
    } else if (logic === '!=') {
        result = value !== fieldValue;
    } else if (logic === '>') {
        result = parseFloat(fieldValue, 10) > parseFloat(value, 10);
    } else if (logic === '<') {
        result = parseFloat(fieldValue, 10) < parseFloat(value, 10);
    } else if (logic === 'contains') {
        result = fieldValue.includes(value);
    } else if (logic === 'startsWith') {
        result = fieldValue.startsWith(value);
    } else if (logic === 'endsWith') {
        result = fieldValue.endsWith(value);
    }

    return result;
}

function eventKey (eventName) {
    return eventName + '.' + Math.random();
}
