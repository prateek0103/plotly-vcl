"use strict";
var core_1 = require('@angular/core');
var Plotly = require('plotly.js');
var PlotlyComponent = (function () {
    function PlotlyComponent() {
        this.TAG = 'PlotlyComponent';
        this.initialized = false;
        this.elementId = 'elementId';
        this.plotClass = 'plotlyPlot';
        this.data = [];
        // TSLint otherwise complaining about an unused variable.
        this.plotClass;
    }
    PlotlyComponent.prototype.ngOnInit = function () {
        this.TAG = this.TAG + "." + this.elementId;
    };
    PlotlyComponent.prototype.ngAfterViewInit = function () {
        Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
        this.plot = document.getElementById(this.elementId);
        this.attachEventListeners(this.elementId, this.plot, this.events);
        this.initialized = true;
    };
    PlotlyComponent.prototype.attachEventListeners = function (elementId, plot, events) {
        Object.keys(events || {}).forEach(function (eventName) {
            plot.on(eventName, function (event, data) {
                events[eventName](data, event, elementId, plot, Plotly);
            });
        });
    };
    PlotlyComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        // console.log(this.TAG, 'ngOnChanges() changes:', changes);
        if (!this.initialized || !this.plot) {
            // console.log(this.TAG, `ngOnChanges() ignored changes (initialized - ${this.initialized}, plot - ${this.plot})`);
            return;
        }
        var redraw = false;
        Object.keys(changes).forEach(function (k) {
            var change = changes[k];
            var changed = change.previousValue !== change.currentValue;
            if (changed) {
                // console.log(this.TAG, `ngOnChanges() ${k} changed from`, change.previousValue, 'to', change.currentValue);
                if (k === 'events') {
                    _this.attachEventListeners(_this.elementId, _this.plot, _this.events);
                    return;
                }
                var plotlyField = PlotlyComponent.plotlyFields.includes(k);
                plotlyField ? _this.plot[k] = change.currentValue : _this[k] = change.currentValue;
                redraw = true;
            }
        });
        if (redraw) {
            console.log(this.TAG, "ngOnChanges() redrawing");
            // [ts] Property 'redraw' does not exist on type 'PlotlyStatic'.
            Plotly.redraw(this.plot);
        }
    };
    PlotlyComponent.plotlyFields = ['data', 'layout', 'configuration', 'events'];
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
