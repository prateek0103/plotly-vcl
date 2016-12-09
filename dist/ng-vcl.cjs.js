'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _angular_core = require('@angular/core');
var _angular_common = require('@angular/common');
var Plotly = require('plotly.js');

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
                _this[k] = change.currentValue;
                var plotlyField = includes(PlotlyComponent.plotlyFields, k);
                if (plotlyField) {
                    _this.plot[k] = _this[k];
                }
                if (k === 'events') {
                    _this.attachEventListeners(_this.elementId, _this.plot, _this.events);
                }
                else {
                    redraw = true;
                }
            }
        });
        if (redraw) {
            // console.log(this.TAG, `ngOnChanges() redrawing`);
            // console.log(this.TAG, `ngOnChanges() this:`, this);
            // [ts] Property 'redraw' does not exist on type 'PlotlyStatic'.
            Plotly.redraw(this.plot);
        }
    };
    PlotlyComponent.plotlyFields = ['data', 'layout', 'configuration', 'events'];
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], PlotlyComponent.prototype, "elementId", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], PlotlyComponent.prototype, "plotClass", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Array)
    ], PlotlyComponent.prototype, "data", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "layout", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "configuration", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "events", void 0);
    PlotlyComponent = __decorate([
        _angular_core.Component({
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

var VCLPlotlyModule = (function () {
    function VCLPlotlyModule() {
    }
    VCLPlotlyModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            exports: [PlotlyComponent],
            declarations: [PlotlyComponent],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], VCLPlotlyModule);
    return VCLPlotlyModule;
}());

exports.VCLPlotlyModule = VCLPlotlyModule;