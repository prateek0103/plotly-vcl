'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _angular_core = require('@angular/core');
var _angular_common = require('@angular/common');

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
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "data", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', Object)
    ], PlotlyComponent.prototype, "layout", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], PlotlyComponent.prototype, "elementId", void 0);
    __decorate([
        _angular_core.Input(), 
        __metadata('design:type', String)
    ], PlotlyComponent.prototype, "class", void 0);
    PlotlyComponent = __decorate([
        _angular_core.Component({
            selector: 'plotly',
            template: "<div class=\"{{class}}\" id=\"{{elementId}}\"></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], PlotlyComponent);
    return PlotlyComponent;
}());

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