export declare class PlotlyComponent {
    initialized: boolean;
    elementId: string;
    data: any;
    layout: any;
    configuration: any;
    class: string;
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: any;
    }): void;
}
