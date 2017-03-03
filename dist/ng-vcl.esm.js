import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addTraces, deleteTraces, newPlot, redraw, relayout } from 'plotly.js';
import * as Plotly from 'plotly.js';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

var PlotlyComponent = PlotlyComponent_1 = (function () {
    function PlotlyComponent() {
        this.initialized = false;
        this.debug = false;
        // TSLint otherwise complaining about an unused variable.
        this.plotClass;
    }
    PlotlyComponent.prototype.ngOnInit = function () {
        this.tag = PlotlyComponent_1.Tag + "." + this.elementId;
    };
    PlotlyComponent.prototype.ngAfterViewInit = function () {
        var tag = this.tag + ".ngAfterViewInit()";
        if (this.debug)
            console.log(tag, "initializting");
        newPlot(this.elementId, this.data, this.layout, this.configuration);
        this.plot = document.getElementById(this.elementId);
        this.attachEventListeners(this.events);
        this.initialized = true;
        if (this.debug)
            console.log(tag, "initialized, this:", this);
    };
    PlotlyComponent.prototype.attachEventListeners = function (events) {
        var _this = this;
        var tag = this.tag + ".attachEventListeners()";
        if (this.debug)
            console.log(tag, "events:", events);
        Object.keys(events || {}).forEach(function (k) {
            _this.plot.on(k, function (data, event) {
                if (_this.debug)
                    console.log(tag, "called event (" + k + ")");
                events[k](data, event, _this.elementId, _this.plot, Plotly);
            });
        });
        if (this.debug)
            console.log(tag, "this:", this);
    };
    PlotlyComponent.prototype.addTraces = function (traces, index) {
        if (index === void 0) { index = this.data.length; }
        var tag = this.tag + ".addTraces()";
        if (this.debug)
            console.log(tag, "traces (", traces, ") index (" + index + ")");
        addTraces(this.plot, traces, index);
    };
    PlotlyComponent.prototype.deleteTraces = function (traces) {
        var tag = this.tag + ".deleteTraces()";
        if (this.debug)
            console.log(tag, "traces:", traces);
        deleteTraces(this.plot, traces);
    };
    PlotlyComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var tag = this.tag + ".ngOnChanges()";
        if (this.debug)
            console.log(tag, "changes:", changes);
        if (!this.initialized || !this.plot) {
            if (this.debug)
                console.log(tag, "ignored changes (initialized - " + this.initialized + ", plot - " + this.plot + ")");
            return;
        }
        // Apply changes.
        var changedKeys = Object.keys(changes);
        changedKeys.forEach(function (k) {
            var change = changes[k];
            if (change.previousValue !== change.currentValue) {
                if (_this.debug)
                    console.log(tag, k + " changed from", change.previousValue, 'to', change.currentValue);
                _this[k] = change.currentValue;
                var plotlyField = includes(PlotlyComponent_1.plotlyFields, k);
                if (plotlyField) {
                    _this.plot[k] = _this[k];
                }
                // It looks like either on purpose or due to a bug, the shapes in layout get
                // ignored (and removed) from the layout object on 'relayout' call.
                // This forces a redraw.
                if (k === 'layout' && change.currentValue.shapes) {
                    changedKeys.push('shapes');
                }
            }
        });
        if (includesArr(changedKeys, PlotlyComponent_1.recreateFields)) {
            // Recreate the plot on recreateFields.
            if (this.debug)
                console.log(tag, "re-creating, this:", this);
            this.ngAfterViewInit();
        }
        else if (changedKeys.length === 1 && includes(changedKeys, 'layout')) {
            // If only the layout was changed, relayout.
            if (this.debug)
                console.log(tag, "re-layouting, this:", this);
            relayout(this.plot, this.layout);
        }
        else {
            // Redraw the plot (data or shapes changed).
            if (this.debug)
                console.log(tag, "re-drawing, this:", this);
            redraw(this.plot);
        }
    };
    return PlotlyComponent;
}());
PlotlyComponent.Tag = 'PlotlyComponent';
PlotlyComponent.plotlyFields = ['data', 'layout', 'configuration', 'events'];
PlotlyComponent.recreateFields = ['elementId', 'plotClass', 'configuration', 'events'];
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotlyComponent.prototype, "debug", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PlotlyComponent.prototype, "elementId", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PlotlyComponent.prototype, "plotClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], PlotlyComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotlyComponent.prototype, "layout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotlyComponent.prototype, "configuration", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PlotlyComponent.prototype, "events", void 0);
PlotlyComponent = PlotlyComponent_1 = __decorate([
    Component({
        selector: 'vcl-plotly',
        template: "<div id=\"{{ elementId }}\" class=\"{{ plotClass }}\"></div>\n"
    }),
    __metadata("design:paramtypes", [])
], PlotlyComponent);
function includes(arr, val) {
    return arr.indexOf(val) !== -1;
}
function includesArr(arr, vals) {
    return vals.some(function (val) { return includes(arr, val); });
}
var PlotlyComponent_1;

var VCLPlotlyModule = (function () {
    function VCLPlotlyModule() {
    }
    return VCLPlotlyModule;
}());
VCLPlotlyModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [PlotlyComponent],
        declarations: [PlotlyComponent],
        providers: [],
    })
], VCLPlotlyModule);

export { VCLPlotlyModule };
