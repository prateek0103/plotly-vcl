import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  keyframes,
  animate } from '@angular/core';
import template from './plotly.component.html';
import {Inject} from '@angular/core';
import Plotly from 'plotly';

declare var Plotly: any;

const plotlyAnimationDuration = 1500;

@Component({
  selector: 'plotly',
  template,
  directives: [],
  animations: [
    trigger('animationState', [
      transition('void => *', [
        style({opacity: 0}),
        animate(plotlyAnimationDuration + 'ms ease-out', style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(plotlyAnimationDuration + 'ms ease-in', style({opacity: 0}))
      ])
    ])
  ],
  styles: ['position:absolute; left:0;'],
})
export class PlotlyComponent {

  componentState: string = "loading";

  @Input()
  data: any;

  @Input()
  layout: any;

  @Input()
  elementId: string;

  private initialized = false;

  private plots: any[];
  private cnt = 0;

  constructor() {
    this.plots = [];
  }

  ngAfterViewChecked() {
    this.plots.forEach(plot=>{
      if(!plot.rendered) {
        plot.rendered = true;
        Plotly.plot(plot.elementId, plot.data, plot.layout);
      }
    });
  }

  pushData() {
    this.cnt++;
    if(this.layout && this.data) {
      this.plots.pop();
      this.plots.push({
        elementId: this.elementId + this.cnt,
        rendered: false,
        data: this.data,
        layout: this.layout
      });
    }
  }

  ngOnChanges(changes: {[propertyName: string]: any}) {
    this.pushData();
  }
}
