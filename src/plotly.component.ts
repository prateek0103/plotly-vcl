import { Component, Input, SimpleChange } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'vcl-plotly',
  templateUrl: './plotly.component.html'
})
export class PlotlyComponent {
  private TAG: string = 'PlotlyComponent';

  private static readonly plotlyFields: string[] = ['data', 'layout', 'configuration', 'events'];

  private static readonly recreateFields: string[] = ['elementId', 'plotClass', 'configuration', 'events'];

  private initialized: boolean = false;

  private plot: any;

  @Input() private elementId: string = 'elementId';

  @Input() private plotClass: string = 'plotlyPlot';

  @Input() private data: any[];

  @Input() private layout: any;

  @Input() private configuration: any;

  @Input() private events: any;

  @Input() private debug: boolean = false;

  constructor() {
    // TSLint otherwise complaining about an unused variable.
    this.plotClass;
  }

  ngOnInit() {
    this.TAG = `${this.TAG}.${this.elementId}`;
  }

  ngAfterViewInit() {
    if (this.debug) console.log(this.TAG, `ngAfterViewInit() initializting`);
    Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
    this.plot = document.getElementById(this.elementId);
    this.attachEventListeners(this.elementId, this.plot, this.events);
    this.initialized = true;
  }

  private attachEventListeners(elementId: string, plot: any, events: any) {
    Object.keys(events || {}).forEach(eventName => {
      plot.on(eventName, (event, data) => {
        events[eventName](data, event, elementId, plot, Plotly);
      });
    });
  }

  public addTraces(traces: any | any[], index: number = -1) {
    if (this.debug) console.log(this.TAG, `addTraces traces (`, traces, `) index (${index !== -1 ? index : this.data.length})`);
    if (index === -1) {
      (<any>Plotly).addTraces(this.plot, traces);
    } else {
      (<any>Plotly).addTraces(this.plot, traces, index);
    }
  }

  public deleteTraces(traces: number | number[]) {
    if (this.debug) console.log(this.TAG, `deleteTraces() traces:`, traces);
    (<any>Plotly).deleteTraces(this.plot, traces);
  }

  ngOnChanges(changes: any) {
    if (this.debug) console.log(this.TAG, 'ngOnChanges() changes:', changes);
    if (!this.initialized || !this.plot) {
      if (this.debug) console.log(this.TAG, `ngOnChanges() ignored changes (initialized - ${this.initialized}, plot - ${this.plot})`);
      return;
    }

    // Apply changes.
    const changedKeys: string[] = Object.keys(changes);
    changedKeys.forEach(k => {
      const change: SimpleChange = changes[k];
      if (change.previousValue !== change.currentValue) {
        if (this.debug) console.log(this.TAG, `ngOnChanges() ${k} changed from`, change.previousValue, 'to', change.currentValue);
        this[k] = change.currentValue;

        const plotlyField: boolean = includes(PlotlyComponent.plotlyFields, k);
        if (plotlyField) {
          this.plot[k] = this[k];
        }
      }
    });

    // Recreate the plot on recreateFields.
    if (includesArr(changedKeys, PlotlyComponent.recreateFields)) {
      if (this.debug) console.log(this.TAG, `ngOnChanges() re-creating, this:`, this);
      this.ngAfterViewInit();
      // If only the layout was changed, relayout.
    } else if (changedKeys.length === 1 && includes(changedKeys, 'layout')) {
      if (this.debug) console.log(this.TAG, `ngOnChanges() re-layouting, this:`, this);
      (<any>Plotly).relayout(this.plot);
      // Redraw the plot (data changed).
    } else {
      if (this.debug) console.log(this.TAG, `ngOnChanges() re-drawing, this:`, this);
      (<any>Plotly).redraw(this.plot);
    }
  }
}

function includes(arr: any[], val: any): boolean {
  return arr.indexOf(val) !== -1;
}

function includesArr(arr: any[], vals: any[]): boolean {
  return vals.some(val => includes(arr, val));
}
