# vue-flexboxgrid
Forked from [Alex Chopin's vue adaptation](https://github.com/alexchopin/vue-flexboxgrid). from the original [Flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid) library.
The reason I forked this was so that I could customise the values and use my own sass variables and breakpoints.

This plugin is not installable. The `flexboxgrid` directory needs to be placed in Nuxt JS plugin directory. Then the index.js file need to be imported into the nuxt.config.js file. 


## Components and Props

### Container

Component:
```html
<container>
  Your content
</container>
```
Props:
```js
hero: { type: Boolean, default: false },
fluid: { type: Boolean, default: false }
```

### Row

Component:
```html
<row>
  Your content
</row>
```
Props:
```js
reverse: { type: Boolean, default: false },
startXs: { type: Boolean, default: false },
centerXs: { type: Boolean, default: false },
endXs: { type: Boolean, default: false },
topXs: { type: Boolean, default: false },
middleXs: { type: Boolean, default: false },
bottomXs: { type: Boolean, default: false },
aroundXs: { type: Boolean, default: false },
betweenXs: { type: Boolean, default: false },
startSm: { type: Boolean, default: false },
centerSm: { type: Boolean, default: false },
endSm: { type: Boolean, default: false },
topSm: { type: Boolean, default: false },
middleSm: { type: Boolean, default: false },
bottomSm: { type: Boolean, default: false },
aroundSm: { type: Boolean, default: false },
betweenSm: { type: Boolean, default: false },
startMd: { type: Boolean, default: false },
centerMd: { type: Boolean, default: false },
endMd: { type: Boolean, default: false },
topMd: { type: Boolean, default: false },
middleMd: { type: Boolean, default: false },
bottomMd: { type: Boolean, default: false },
aroundMd: { type: Boolean, default: false },
betweenMd: { type: Boolean, default: false },
startLg: { type: Boolean, default: false },
centerLg: { type: Boolean, default: false },
endLg: { type: Boolean, default: false },
topLg: { type: Boolean, default: false },
middleLg: { type: Boolean, default: false },
bottomLg: { type: Boolean, default: false },
aroundLg: { type: Boolean, default: false },
betweenLg: { type: Boolean, default: false }
```

### Column

Component:
```html
<column>
  Your content
</column>
```
Props:
```js
firstXs: { type: Boolean, default: false },
lastXs: { type: Boolean, default: false },
firstSm: { type: Boolean, default: false },
lastSm: { type: Boolean, default: false },
firstMd: { type: Boolean, default: false },
lastMd: { type: Boolean, default: false },
firstLg: { type: Boolean, default: false },
lastLg: { type: Boolean, default: false },
xsOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
smOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
mdOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
lgOffset: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
xs: { type: String, default: '12', validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
sm: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
md: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } },
lg: { type: String, validator (v) { var i = parseInt(v); return !isNaN(i) && v > 0 && v < 13 } }
```