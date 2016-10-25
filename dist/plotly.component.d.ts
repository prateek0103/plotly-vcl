import { SimpleChanges } from '@angular/core';
export declare class PlotlyComponent {
    initialized: boolean;
    plot: any;
    elementId: string;
    plotClass: string;
    data: any;
    layout: any;
    configuration: any;
    events: any;
    ngAfterViewInit(): void;
    attachEventListeners(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
