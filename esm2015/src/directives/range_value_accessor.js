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
import { Directive, ElementRef, Renderer2, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from './control_value_accessor';
/** @type {?} */
export const RANGE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeValueAccessor),
    multi: true
};
/**
 * The accessor for writing a range value and listening to changes that is used by the
 * `NgModel`, `FormControlDirective`, and `FormControlName` directives.
 *
 * \@usageNotes
 * ### Example
 *
 * ```
 * <input type="range" [(ngModel)]="age" >
 * ```
 *
 * \@ngModule FormsModule
 * \@ngModule ReactiveFormsModule
 */
export class RangeValueAccessor {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', parseFloat(value));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = (value) => { fn(value == '' ? null : parseFloat(value)); };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
}
RangeValueAccessor.decorators = [
    { type: Directive, args: [{
                selector: 'input[type=range][formControlName],input[type=range][formControl],input[type=range][ngModel]',
                host: {
                    '(change)': 'onChange($event.target.value)',
                    '(input)': 'onChange($event.target.value)',
                    '(blur)': 'onTouched()'
                },
                providers: [RANGE_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
RangeValueAccessor.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    RangeValueAccessor.prototype.onChange;
    /** @type {?} */
    RangeValueAccessor.prototype.onTouched;
    /** @type {?} */
    RangeValueAccessor.prototype._renderer;
    /** @type {?} */
    RangeValueAccessor.prototype._elementRef;
}
//# sourceMappingURL=range_value_accessor.js.map