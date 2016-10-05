"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var plotly_component_1 = require('./plotly.component');
var VCLPlotlyModule = (function () {
    function VCLPlotlyModule() {
    }
    VCLPlotlyModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [plotly_component_1.PlotlyComponent],
                    declarations: [plotly_component_1.PlotlyComponent],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    VCLPlotlyModule.ctorParameters = [];
    return VCLPlotlyModule;
}());
exports.VCLPlotlyModule = VCLPlotlyModule;
