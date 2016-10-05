import { Component, Input } from '@angular/core';
// import * as Plotly from 'plotly.js';

declare var Plotly: any;

@Component({
  selector: 'vcl-plotly',
  templateUrl: './plotly.component.html'
})
export class PlotlyComponent {

  initialized: boolean = false;

  @Input()
  data: any = {};

  @Input()
  layout: any = {};

  @Input()
  elementId: string = 'plot';

  @Input()
  class: string = 'plot';

  constructor() {
  }

  ngAfterViewInit() {
    Plotly.newPlot(this.elementId, this.data, this.layout);
    this.initialized = true;
  }

  ngOnChanges(changes: {[propertyName: string]: any}) {
    if (this.initialized && this.elementId && this.data && this.layout) {
      Plotly.newPlot(this.elementId, this.data, this.layout);
    }
  }
}
