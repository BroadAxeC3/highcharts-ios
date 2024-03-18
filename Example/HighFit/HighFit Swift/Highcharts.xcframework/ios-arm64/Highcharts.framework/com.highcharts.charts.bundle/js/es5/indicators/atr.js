!/**
 * Highstock JS v11.4.0 (2024-03-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/atr",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function o(t,e,o,n){t.hasOwnProperty(e)||(t[e]=n.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}o(e,"Stock/Indicators/ATR/ATRIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=t.seriesTypes.sma,s=e.isArray,i=e.merge;function a(t,e){return Math.max(t[1]-t[2],void 0===e?0:Math.abs(t[1]-e[3]),void 0===e?0:Math.abs(t[2]-e[3]))}var u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.getValues=function(t,e){var o,n,r,i,u=e.period,c=t.xData,p=t.yData,h=p?p.length:0,f=[[c[0],p[0]]],l=[],d=[],y=[],g=0,v=1,m=0;if(!(c.length<=u)&&s(p[0])&&4===p[0].length){for(i=1;i<=h;i++)((function(t,e,o,n){var r=e[n],s=o[n];t.push([r,s])})(f,c,p,i),u<v)?(o=i,n=g,g=(r=[c[o-1],(n*(u-1)+a(p[o-1],p[o-2]))/u])[1],l.push(r),d.push(r[0]),y.push(r[1])):(u===v?(g=m/(i-1),l.push([c[i-1],g]),d.push(c[i-1]),y.push(g)):m+=a(p[i-1],p[i-2]),v++);return{values:l,xData:d,yData:y}}},e.defaultOptions=i(r.defaultOptions,{params:{index:void 0}}),e}(r);return t.registerSeriesType("atr",u),u}),o(e,"masters/indicators/atr.src.js",[e["Core/Globals.js"]],function(t){return t})});