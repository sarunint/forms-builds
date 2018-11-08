/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, InjectionToken, Optional } from '@angular/core';
import { TemplateDrivenErrors } from './template_driven_errors';
/** *
 * Token to provide to turn off the warning when using 'ngForm' deprecated selector.
  @type {?} */
export var NG_FORM_SELECTOR_WARNING = new InjectionToken('NgFormSelectorWarning');
/**
 * This directive is solely used to display warnings when the deprecated `ngForm` selector is used.
 *
 * @deprecated in Angular v6 and will be removed in Angular v9.
 * \@ngModule FormsModule
 * \@publicApi
 */
var NgFormSelectorWarning = /** @class */ (function () {
    function NgFormSelectorWarning(ngFormWarning) {
        if (((!ngFormWarning || ngFormWarning === 'once') && !NgFormSelectorWarning._ngFormWarning) ||
            ngFormWarning === 'always') {
            TemplateDrivenErrors.ngFormWarning();
            NgFormSelectorWarning._ngFormWarning = true;
        }
    }
    /**
     * Static property used to track whether the deprecation warning for this selector has been sent.
     * Used to support warning config of "once".
     *
     * \@internal
     */
    NgFormSelectorWarning._ngFormWarning = false;
    NgFormSelectorWarning.decorators = [
        { type: Directive, args: [{ selector: 'ngForm' },] },
    ];
    /** @nocollapse */
    NgFormSelectorWarning.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_FORM_SELECTOR_WARNING,] }] }
    ]; };
    return NgFormSelectorWarning;
}());
export { NgFormSelectorWarning };
if (false) {
    /**
     * Static property used to track whether the deprecation warning for this selector has been sent.
     * Used to support warning config of "once".
     *
     * \@internal
     * @type {?}
     */
    NgFormSelectorWarning._ngFormWarning;
}
//# sourceMappingURL=ng_form_selector_warning.js.map