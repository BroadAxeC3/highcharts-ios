!/**
 * Highstock JS v11.4.0 (2024-03-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function n(t,e,n,r){t.hasOwnProperty(e)||(t[e]=r.apply(null,n),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}n(e,"Stock/Indicators/TrendLine/TrendLineIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),o=t.seriesTypes.sma,i=e.extend,s=e.merge,a=e.isArray,u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.updateAllPoints=!0,e}return r(e,t),e.prototype.getValues=function(t,e){for(var n=t.xData,r=t.yData,o=[],i=[],s=[],u=[],l=e.index,c=0,p=0,d=0,h=0,f=0,y=0;y<n.length;y++)(0===y||n[y]!==n[y-1])&&f++,o.push(f);for(var y=0;y<o.length;y++)d+=o[y],h+=a(r[y])?r[y][l]:r[y];for(var g=d/o.length,v=h/r.length,y=0;y<o.length;y++){var m=a(r[y])?r[y][l]:r[y];c+=(o[y]-g)*(m-v),p+=Math.pow(o[y]-g,2)}for(var y=0;y<o.length;y++)if(n[y]!==s[s.length-1]){var _=n[y],m=v+c/p*(o[y]-g);i.push([_,m]),s.push(_),u.push(m)}return{xData:s,yData:u,values:i}},e.defaultOptions=s(o.defaultOptions,{params:{period:void 0,index:3}}),e}(o);return i(u.prototype,{nameBase:"Trendline",nameComponents:void 0}),t.registerSeriesType("trendline",u),u}),n(e,"masters/indicators/trendline.src.js",[e["Core/Globals.js"]],function(t){return t})});