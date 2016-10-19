import { Component, Input } from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'vcl-plotly',
  templateUrl: './plotly.component.html'
})
export class PlotlyComponent {

  initialized: boolean = false;

  @Input()
  elementId: string = 'plot';

  @Input()
  data: any = {};

  @Input()
  layout: any = {};

  @Input()
  configuration: any = {};

  @Input()
  class: string = 'plot';

  constructor() {
  }

  ngAfterViewInit() {
    Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
    this.initialized = true;
  }

  ngOnChanges(changes: { [propertyName: string]: any }) {
    if (this.initialized && this.elementId && this.data && this.layout
      && this.configuration) {
      Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
    }
  }
}
