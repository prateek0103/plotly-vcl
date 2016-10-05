# Usage

```
...
import { VCLPlotlyModule } from 'plotly-vcl';
...

@NgModule({
    ...
    imports: [
      VCLPlotlyModule
    ]
    ...
})
export class AppModule {}
```

```
<vcl-plotly
  [data]="data"
  [layout]="layout"
  [elementId]="'myDiv1'"
  [class]="'customClass'">
</vcl-plotly>
```

# Including plotly.min.js

To work properly you need to copy the plotly.min.js file from ```node_modules/plotly/dist/plotly.min.js``` and include it in your index.html
