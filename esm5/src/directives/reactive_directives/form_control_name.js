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
import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Host, Inject, Input, Optional, Output, Self, SkipSelf, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../../validators';
import { AbstractFormGroupDirective } from '../abstract_form_group_directive';
import { ControlContainer } from '../control_container';
import { NG_VALUE_ACCESSOR } from '../control_value_accessor';
import { NgControl } from '../ng_control';
import { ReactiveErrors } from '../reactive_errors';
import { _ngModelWarning, composeAsyncValidators, composeValidators, controlPath, isPropertyUpdated, selectValueAccessor } from '../shared';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from './form_control_directive';
import { FormGroupDirective } from './form_group_directive';
import { FormArrayName, FormGroupName } from './form_group_name';
/** @type {?} */
export var controlNameBinding = {
    provide: NgControl,
    useExisting: forwardRef(function () { return FormControlName; })
};
/**
 * \@description
 * Syncs a `FormControl` in an existing `FormGroup` to a form control
 * element by name.
 *
 * @see [Reactive Forms Guide](guide/reactive-forms)
 * @see `FormControl`
 * @see `AbstractControl`
 *
 * \@usageNotes
 *
 * ### Register `FormControl` within a group
 *
 * The following example shows how to register multiple form controls within a form group
 * and set their value.
 *
 * {\@example forms/ts/simpleFormGroup/simple_form_group_example.ts region='Component'}
 *
 * To see `formControlName` examples with different form control types, see:
 *
 * * Radio buttons: `RadioControlValueAccessor`
 * * Selects: `SelectControlValueAccessor`
 *
 * ### Use with ngModel
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and will be removed in Angular v7.
 *
 * Now deprecated:
 *
 * ```html
 * <form [formGroup]="form">
 *   <input formControlName="first" [(ngModel)]="value">
 * </form>
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * This has been deprecated for a few reasons. First, developers have found this pattern
 * confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
 * an input/output property named `ngModel` on the reactive form directive that simply
 * approximates (some of) its behavior. Specifically, it allows getting/setting the value
 * and intercepting value events. However, some of `ngModel`'s other features - like
 * delaying updates with`ngModelOptions` or exporting the directive - simply don't work,
 * which has understandably caused some confusion.
 *
 * In addition, this pattern mixes template-driven and reactive forms strategies, which
 * we generally don't recommend because it doesn't take advantage of the full benefits of
 * either strategy. Setting the value in the template violates the template-agnostic
 * principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
 * the class removes the convenience of defining forms in the template.
 *
 * To update your code before v7, you'll want to decide whether to stick with reactive form
 * directives (and get/set values using reactive forms patterns) or switch over to
 * template-driven directives.
 *
 * After (choice 1 - use reactive forms):
 *
 * ```html
 * <form [formGroup]="form">
 *   <input formControlName="first">
 * </form>
 * ```
 *
 * ```ts
 * this.form.get('first').setValue('some value');
 * ```
 *
 * After (choice 2 - use template-driven forms):
 *
 * ```html
 * <input [(ngModel)]="value">
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * By default, when you use this pattern, you will see a deprecation warning once in dev
 * mode. You can choose to silence this warning by providing a config for
 * `ReactiveFormsModule` at import time:
 *
 * ```ts
 * imports: [
 *   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
 * ]
 * ```
 *
 * Alternatively, you can choose to surface a separate warning for each instance of this
 * pattern with a config value of `"always"`. This may help to track down where in the code
 * the pattern is being used as the code is being updated.
 *
 * \@ngModule ReactiveFormsModule
 * \@publicApi
 */
var FormControlName = /** @class */ (function (_super) {
    tslib_1.__extends(FormControlName, _super);
    function FormControlName(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
        var _this = _super.call(this) || this;
        _this._ngModelWarningConfig = _ngModelWarningConfig;
        _this._added = false;
        /**
         * @deprecated as of v6
         */
        _this.update = new EventEmitter();
        /**
         * \@description
         * Instance property used to track whether an ngModel warning has been sent out for this
         * particular FormControlName instance. Used to support warning config of "always".
         *
         * \@internal
         */
        _this._ngModelWarningSent = false;
        _this._parent = parent;
        _this._rawValidators = validators || [];
        _this._rawAsyncValidators = asyncValidators || [];
        _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
        return _this;
    }
    Object.defineProperty(FormControlName.prototype, "isDisabled", {
        /**
         * @description
         * Triggers a warning that this input should not be used with reactive forms.
         */
        set: /**
         * \@description
         * Triggers a warning that this input should not be used with reactive forms.
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) { ReactiveErrors.disabledAttrWarning(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @description
     * A lifecycle method called when the directive's inputs change. For internal use only.
     *
     * @param changes A object of key/value pairs for the set of changed inputs.
     */
    /**
     * \@description
     * A lifecycle method called when the directive's inputs change. For internal use only.
     *
     * @param {?} changes A object of key/value pairs for the set of changed inputs.
     * @return {?}
     */
    FormControlName.prototype.ngOnChanges = /**
     * \@description
     * A lifecycle method called when the directive's inputs change. For internal use only.
     *
     * @param {?} changes A object of key/value pairs for the set of changed inputs.
     * @return {?}
     */
    function (changes) {
        if (!this._added)
            this._setUpControl();
        if (isPropertyUpdated(changes, this.viewModel)) {
            _ngModelWarning('formControlName', FormControlName, this, this._ngModelWarningConfig);
            this.viewModel = this.model;
            this.formDirective.updateModel(this, this.model);
        }
    };
    /**
     * @description
     * Lifecycle method called before the directive's instance is destroyed. For internal use only.
     *
     * @param changes A object of key/value pairs for the set of changed inputs.
     */
    /**
     * \@description
     * Lifecycle method called before the directive's instance is destroyed. For internal use only.
     *
     * @return {?}
     */
    FormControlName.prototype.ngOnDestroy = /**
     * \@description
     * Lifecycle method called before the directive's instance is destroyed. For internal use only.
     *
     * @return {?}
     */
    function () {
        if (this.formDirective) {
            this.formDirective.removeControl(this);
        }
    };
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value for the view model.
     */
    /**
     * \@description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param {?} newValue The new value for the view model.
     * @return {?}
     */
    FormControlName.prototype.viewToModelUpdate = /**
     * \@description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param {?} newValue The new value for the view model.
     * @return {?}
     */
    function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    Object.defineProperty(FormControlName.prototype, "path", {
        /**
         * @description
         * Returns an array that represents the path from the top-level form to this control.
         * Each index is the string name of the control on that level.
         */
        get: /**
         * \@description
         * Returns an array that represents the path from the top-level form to this control.
         * Each index is the string name of the control on that level.
         * @return {?}
         */
        function () { return controlPath(this.name, /** @type {?} */ ((this._parent))); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "formDirective", {
        /**
         * @description
         * The top-level directive for this group if present, otherwise null.
         */
        get: /**
         * \@description
         * The top-level directive for this group if present, otherwise null.
         * @return {?}
         */
        function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "validator", {
        /**
         * @description
         * Synchronous validator function composed of all the synchronous validators
         * registered with this directive.
         */
        get: /**
         * \@description
         * Synchronous validator function composed of all the synchronous validators
         * registered with this directive.
         * @return {?}
         */
        function () { return composeValidators(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlName.prototype, "asyncValidator", {
        /**
         * @description
         * Async validator function composed of all the async validators registered with this
         * directive.
         */
        get: /**
         * \@description
         * Async validator function composed of all the async validators registered with this
         * directive.
         * @return {?}
         */
        function () {
            return /** @type {?} */ ((composeAsyncValidators(this._rawAsyncValidators)));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormControlName.prototype._checkParentType = /**
     * @return {?}
     */
    function () {
        if (!(this._parent instanceof FormGroupName) &&
            this._parent instanceof AbstractFormGroupDirective) {
            ReactiveErrors.ngModelGroupException();
        }
        else if (!(this._parent instanceof FormGroupName) && !(this._parent instanceof FormGroupDirective) &&
            !(this._parent instanceof FormArrayName)) {
            ReactiveErrors.controlParentException();
        }
    };
    /**
     * @return {?}
     */
    FormControlName.prototype._setUpControl = /**
     * @return {?}
     */
    function () {
        this._checkParentType();
        (/** @type {?} */ (this)).control = this.formDirective.addControl(this);
        if (this.control.disabled && /** @type {?} */ ((this.valueAccessor)).setDisabledState) {
            /** @type {?} */ ((/** @type {?} */ ((this.valueAccessor)).setDisabledState))(true);
        }
        this._added = true;
    };
    /**
     * \@description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlName. Used to support warning config of "once".
     *
     * \@internal
     */
    FormControlName._ngModelWarningSentOnce = false;
    FormControlName.decorators = [
        { type: Directive, args: [{ selector: '[formControlName]', providers: [controlNameBinding] },] },
    ];
    /** @nocollapse */
    FormControlName.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_MODEL_WITH_FORM_CONTROL_WARNING,] }] }
    ]; };
    FormControlName.propDecorators = {
        name: [{ type: Input, args: ['formControlName',] }],
        isDisabled: [{ type: Input, args: ['disabled',] }],
        model: [{ type: Input, args: ['ngModel',] }],
        update: [{ type: Output, args: ['ngModelChange',] }]
    };
    return FormControlName;
}(NgControl));
export { FormControlName };
if (false) {
    /**
     * \@description
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlName. Used to support warning config of "once".
     *
     * \@internal
     * @type {?}
     */
    FormControlName._ngModelWarningSentOnce;
    /** @type {?} */
    FormControlName.prototype._added;
    /**
     * \@description
     * Internal reference to the view model value.
     * \@internal
     * @type {?}
     */
    FormControlName.prototype.viewModel;
    /**
     * \@description
     * Tracks the `FormControl` instance bound to the directive.
     * @type {?}
     */
    FormControlName.prototype.control;
    /**
     * \@description
     * Tracks the name of the `FormControl` bound to the directive. The name corresponds
     * to a key in the parent `FormGroup` or `FormArray`.
     * @type {?}
     */
    FormControlName.prototype.name;
    /**
     * @deprecated as of v6
     * @type {?}
     */
    FormControlName.prototype.model;
    /**
     * @deprecated as of v6
     * @type {?}
     */
    FormControlName.prototype.update;
    /**
     * \@description
     * Instance property used to track whether an ngModel warning has been sent out for this
     * particular FormControlName instance. Used to support warning config of "always".
     *
     * \@internal
     * @type {?}
     */
    FormControlName.prototype._ngModelWarningSent;
    /** @type {?} */
    FormControlName.prototype._ngModelWarningConfig;
}
//# sourceMappingURL=form_control_name.js.map