import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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

var PlotlyComponent = (function () {
    function PlotlyComponent() {
        this.TAG = 'PlotlyComponent';
        this.initialized = false;
        this.elementId = 'elementId';
        this.plotClass = 'plotlyPlot';
        this.debug = false;
        // TSLint otherwise complaining about an unused variable.
        this.plotClass;
    }
    PlotlyComponent.prototype.ngOnInit = function () {
        this.TAG = this.TAG + "." + this.elementId;
    };
    PlotlyComponent.prototype.ngAfterViewInit = function () {
        // if (this.debug) console.log(this.TAG, `ngAfterViewInit() initializting`);
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
    PlotlyComponent.prototype.removeEventListeners = function (elementId, plot, events) {
        Object.keys(events || {}).forEach(function (eventName) {
            plot.on(eventName, function (event, data) {
                events[eventName](data, event, elementId, plot, Plotly);
            });
        });
    };
    PlotlyComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.debug)
            console.log(this.TAG, 'ngOnChanges() changes:', changes);
        if (!this.initialized || !this.plot) {
            if (this.debug)
                console.log(this.TAG, "ngOnChanges() ignored changes (initialized - " + this.initialized + ", plot - " + this.plot + ")");
            return;
        }
        // Apply changes.
        var changedKeys = Object.keys(changes);
        changedKeys.forEach(function (k) {
            var change = changes[k];
            if (change.previousValue !== change.currentValue) {
                if (_this.debug)
                    console.log(_this.TAG, "ngOnChanges() " + k + " changed from", change.previousValue, 'to', change.currentValue);
                _this[k] = change.currentValue;
                var plotlyField = includes(PlotlyComponent.plotlyFields, k);
                if (plotlyField) {
                    _this.plot[k] = _this[k];
                }
            }
        });
        // Recreate the plot on recreateFields.
        if (includesArr(changedKeys, PlotlyComponent.recreateFields)) {
            if (this.debug)
                console.log(this.TAG, "ngOnChanges() re-creating, this:", this);
            this.ngAfterViewInit();
        }
        else if (changedKeys.length === 1 && includes(changedKeys, 'layout')) {
            if (this.debug)
                console.log(this.TAG, "ngOnChanges() re-layouting, this:", this);
            Plotly.relayout(this.plot);
        }
        else {
            if (this.debug)
                console.log(this.TAG, "ngOnChanges() re-drawing, this:", this);
            Plotly.redraw(this.plot);
        }
    };
    PlotlyComponent.plotlyFields = ['data', 'layout', 'configuration', 'events'];
    PlotlyComponent.recreateFields = ['elementId', 'plotClass', 'configuration', 'events'];
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], PlotlyComponent.prototype, "elementId", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], PlotlyComponent.prototype, "plotClass", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], PlotlyComponent.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "layout", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "configuration", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "events", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PlotlyComponent.prototype, "debug", void 0);
    PlotlyComponent = __decorate([
        Component({
            selector: 'vcl-plotly',
            template: "<div class=\"{{plotClass}}\" id=\"{{elementId}}\"></div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], PlotlyComponent);
    return PlotlyComponent;
}());
function includes(arr, val) {
    return arr.indexOf(val) !== -1;
}
function includesArr(arr, vals) {
    return vals.some(function (val) { return includes(arr, val); });
}

var VCLPlotlyModule = (function () {
    function VCLPlotlyModule() {
    }
    VCLPlotlyModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [PlotlyComponent],
            declarations: [PlotlyComponent],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], VCLPlotlyModule);
    return VCLPlotlyModule;
}());

export { VCLPlotlyModule };