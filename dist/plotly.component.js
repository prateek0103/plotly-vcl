"use strict";
var core_1 = require('@angular/core');
var Plotly = require('plotly.js');
var PlotlyComponent = (function () {
    function PlotlyComponent() {
        this.initialized = false;
        this.data = {};
        this.layout = {};
        this.elementId = 'plot';
        this.class = 'plot';
    }
    PlotlyComponent.prototype.ngAfterViewInit = function () {
        Plotly.newPlot(this.elementId, this.data, this.layout);
        this.initialized = true;
    };
    PlotlyComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialized && this.elementId && this.data && this.layout) {
            Plotly.newPlot(this.elementId, this.data, this.layout);
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
        'data': [{ type: core_1.Input },],
        'layout': [{ type: core_1.Input },],
        'elementId': [{ type: core_1.Input },],
        'class': [{ type: core_1.Input },],
    };
    return PlotlyComponent;
}());
exports.PlotlyComponent = PlotlyComponent;
