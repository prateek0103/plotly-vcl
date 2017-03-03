export declare class PlotlyComponent {
    private static readonly Tag;
    private static readonly plotlyFields;
    private static readonly recreateFields;
    private tag;
    private initialized;
    private plot;
    private debug;
    private elementId;
    private plotClass;
    private data;
    private layout;
    private configuration;
    private events;
    constructor();
    private ngOnInit();
    private ngAfterViewInit();
    private attachEventListeners(events);
    addTraces(traces: any | any[], index?: number): void;
    deleteTraces(traces: number | number[]): void;
    private ngOnChanges(changes);
}
