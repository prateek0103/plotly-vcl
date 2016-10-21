# Usage

```ts
import { VCLPlotlyModule } from 'plotly-vcl';

@NgModule({
    ...
    imports: [
      VCLPlotlyModule
    ]
    ...
})
export class AppModule {}
```

```html
<vcl-plotly
  [data]="data"
  [layout]="layout"
  [elementId]="'myDiv1'"
  [class]="'customClass'">
</vcl-plotly>
```

# Importing plotly

if you want to use plotly in combination with zone.js,
you must include plotly *before* zone.js in your project!

```ts
import 'plotly.js';

import 'zone.js/dist/zone';
```

see also: https://github.com/plotly/plotly.js/issues/955

