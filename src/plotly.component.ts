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
  events: any = [];

  ngAfterViewInit() {
    Plotly.newPlot(this.elementId, this.data, this.layout, this.configuration);
    this.attachEventListeners();
    this.initialized = true;
  }

  // TODO: https://plot.ly/javascript/hover-events/#triggering-hover-events
  attachEventListeners() {
    this.events.forEach(event => {
      // Attach event listener on the plot.
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
