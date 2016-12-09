import { Component, Input, SimpleChange } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'vcl-plotly',
  templateUrl: './plotly.component.html'
})
export class PlotlyComponent {
  private TAG: string = 'PlotlyComponent';

  private initialized: boolean = false;

  private plot: any;

  private static readonly plotlyFields: string[] = ['data', 'layout', 'configuration', 'events'];

  @Input() private elementId: string = 'elementId';

  @Input() private plotClass: string = 'plotlyPlot';

  @Input() private data: any[] = [];

  @Input() private layout: any;

  @Input() private configuration: any;

  @Input() private events: any;

  constructor() {
    // TSLint otherwise complaining about an unused variable.
    this.plotClass;
  }

  ngOnInit() {
    this.TAG = `${this.TAG}.${this.elementId}`;
  }

  ngAfterViewInit() {
    Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
    this.plot = document.getElementById(this.elementId);
    this.attachEventListeners(this.elementId, this.plot, this.events);
    this.initialized = true;
  }

  attachEventListeners(elementId: string, plot: any, events: any) {
    Object.keys(events || {}).forEach(eventName => {
      plot.on(eventName, (event, data) => {
        events[eventName](data, event, elementId, plot, Plotly);
      });
    });
  }

  ngOnChanges(changes: any) {
    // console.log(this.TAG, 'ngOnChanges() changes:', changes);
    if (!this.initialized || !this.plot) {
      // console.log(this.TAG, `ngOnChanges() ignored changes (initialized - ${this.initialized}, plot - ${this.plot})`);
      return;
    }

    let redraw = false;
    Object.keys(changes).forEach(k => {
      const change: SimpleChange = changes[k];
      const changed: boolean = change.previousValue !== change.currentValue;

      if (changed) {
        // console.log(this.TAG, `ngOnChanges() ${k} changed from`, change.previousValue, 'to', change.currentValue);
        this[k] = change.currentValue;

        const plotlyField: boolean = includes(PlotlyComponent.plotlyFields, k);
        if (plotlyField) {
          this.plot[k] = this[k];
        }

        if (k === 'events') {
          this.attachEventListeners(this.elementId, this.plot, this.events);
        } else {
          redraw = true;
        }
      }
    });

    if (redraw) {
      // console.log(this.TAG, `ngOnChanges() redrawing`);
      // console.log(this.TAG, `ngOnChanges() this:`, this);
      // [ts] Property 'redraw' does not exist on type 'PlotlyStatic'.
      (<any>Plotly).redraw(this.plot);
    }
  }
}

function includes(arr: any[], val: any): boolean {
  return arr.indexOf(val) !== -1;
}
