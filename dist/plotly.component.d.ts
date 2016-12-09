export declare class PlotlyComponent {
    private TAG;
    private initialized;
    private plot;
    private static readonly plotlyFields;
    private static readonly recreateFields;
    private elementId;
    private plotClass;
    private data;
    private layout;
    private configuration;
    private events;
    private debug;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    attachEventListeners(elementId: string, plot: any, events: any): void;
    removeEventListeners(elementId: string, plot: any, events: any): void;
    ngOnChanges(changes: any): void;
}
