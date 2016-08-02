# Usage

```
<plotly
  [data]="data"
  [layout]="layout"
  [elementId]="'myDiv1'"></plotly>
```

**Following override must be placed in your package.json: (run jspm install afterwars!)**

```
"github:plotly/plotly.js@1.15.0": {
  "main": "./dist/index.js"
}
```