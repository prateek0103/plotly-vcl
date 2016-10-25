"use strict";
var core_1 = require('@angular/core');
var Plotly = require('plotly.js');
var PlotlyComponent = (function () {
    function PlotlyComponent() {
        this.initialized = false;
        this.elementId = 'elementId';
        this.plotClass = 'plotClass';
        this.data = [];
        this.layout = {};
        this.configuration = {};
        this.events = {};
    }
    PlotlyComponent.prototype.ngAfterViewInit = function () {
        this.plot = document.getElementById(this.elementId);
        Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
        this.attachEventListeners();
        this.initialized = true;
    };
    PlotlyComponent.prototype.attachEventListeners = function () {
        var _this = this;
        Object.keys(this.events || {}).forEach(function (event) {
            _this.plot.on(event, function (event, data) {
                _this.events[event](data, event, _this.elementId, _this.plot, Plotly);
            });
        });
    };
    PlotlyComponent.prototype.ngOnChanges = function (changes) {
        if (this.initialized && this.elementId && this.data
            && this.layout && this.configuration) {
            Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
            this.attachEventListeners();
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
        'plotClass': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'layout': [{ type: core_1.Input },],
        'configuration': [{ type: core_1.Input },],
        'events': [{ type: core_1.Input },],
    };
    return PlotlyComponent;
}());
exports.PlotlyComponent = PlotlyComponent;
