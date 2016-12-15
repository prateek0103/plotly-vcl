export declare class PlotlyComponent {
    private TAG;
    private static readonly plotlyFields;
    private static readonly recreateFields;
    private initialized;
    private plot;
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
    private attachEventListeners(elementId, plot, events);
    addTraces(traces: any | any[], index?: number): void;
    deleteTraces(traces: number | number[]): void;
    ngOnChanges(changes: any): void;
}
