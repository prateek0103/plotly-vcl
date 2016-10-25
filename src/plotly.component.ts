import {
  Component,
  Input,
  SimpleChanges
} from '@angular/core';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'vcl-plotly',
  templateUrl: './plotly.component.html'
})
export class PlotlyComponent {

  initialized: boolean = false;

  plot: any;

  @Input()
  elementId: string = 'elementId';

  @Input()
  plotClass: string = 'plotClass';

  @Input()
  data: any = [];

  @Input()
  layout: any = {};

  @Input()
  configuration: any = {};

  @Input()
  events: any = {};

  ngAfterViewInit() {
    this.plot = document.getElementById(this.elementId);
    Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
    this.attachEventListeners();
    this.initialized = true;
  }

  attachEventListeners() {
    Object.keys(this.events || {}).forEach(event => {
      this.plot.on(event, (event, data) => {
        this.events[event](event, data, this.elementId, this.plot, Plotly);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized && this.elementId && this.data
      && this.layout && this.configuration) {
      Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
      this.attachEventListeners();
    }
  }
}
