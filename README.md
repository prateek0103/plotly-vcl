#Installation

```
jspm install ng-vcl-plotly=github:ng-vcl/plotly@master
```

**Following override must be placed in your package.json: (run jspm install afterwars!)**

```
"github:plotly/plotly.js@1.15.0": {
  "main": "./dist/index.js"
}
```
or
```
jspm install plotly=github:plotly/plotly.js@1.15.0 -o "{main:'dist/plotly.js'}"
```

# Usage

```
<plotly
  [data]="data"
  [layout]="layout"
  [elementId]="'myDiv1'"></plotly>
```
