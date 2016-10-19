"use strict";
var core_1 = require('@angular/core');
var Plotly = require('plotly.js');
var PlotlyComponent = (function () {
    function PlotlyComponent() {
        this.initialized = false;
        this.elementId = 'plot';
        this.data = {};
        this.layout = {};
        this.configuration = {};
        this.class = 'plot';
    }
    PlotlyComponent.prototype.ngAfterViewInit = function () {
        Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
        this.initialized = true;
    };
    PlotlyComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialized && this.elementId && this.data && this.layout
            && this.configuration) {
            Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
        }
    };
    PlotlyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'vcl-plotly',
                    templateUrl: './plotly.component.html'
                },] },
    ];
    /** @nocollapse */
    PlotlyComponent.ctorParameters = [];
    PlotlyComponent.propDecorators = {
        'elementId': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'layout': [{ type: core_1.Input },],
        'configuration': [{ type: core_1.Input },],
        'class': [{ type: core_1.Input },],
    };
    return PlotlyComponent;
}());
exports.PlotlyComponent = PlotlyComponent;
