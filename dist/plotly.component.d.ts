export declare class PlotlyComponent {
    initialized: boolean;
    data: any;
    layout: any;
    elementId: string;
    class: string;
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: any;
    }): void;
}
