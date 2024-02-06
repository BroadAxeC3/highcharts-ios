/**
 * Highstock JS v11.3.0 (2024-01-10)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Fus
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/price-envelopes",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function o(t,e,o,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}o(e,"Stock/Indicators/MultipleLinesComposition.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var o,i=t.seriesTypes.sma.prototype,n=e.defined,r=e.error,a=e.merge;return function(t){var e=["bottomLine"],o=["top","bottom"],s=["top"];function p(t){return"plot"+t.charAt(0).toUpperCase()+t.slice(1)}function l(t,e){var o=[];return(t.pointArrayMap||[]).forEach(function(t){t!==e&&o.push(p(t))}),o}function c(){var t,e=this,o=e.pointValKey,s=e.linesApiNames,c=e.areaLinesNames,h=e.points,u=e.options,f=e.graph,d={options:{gapSize:u.gapSize}},y=[],m=l(e,o),g=h.length;if(m.forEach(function(e,o){for(y[o]=[];g--;)t=h[g],y[o].push({x:t.x,plotX:t.plotX,plotY:t[e],isNull:!n(t[e])});g=h.length}),e.userOptions.fillColor&&c.length){var v=y[m.indexOf(p(c[0]))],b=1===c.length?h:y[m.indexOf(p(c[1]))],x=e.color;e.points=b,e.nextPoints=v,e.color=e.userOptions.fillColor,e.options=a(h,d),e.graph=e.area,e.fillGraph=!0,i.drawGraph.call(e),e.area=e.graph,delete e.nextPoints,delete e.fillGraph,e.color=x}s.forEach(function(t,o){y[o]?(e.points=y[o],u[t]?e.options=a(u[t].styles,d):r('Error: "There is no '+t+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'),e.graph=e["graph"+t],i.drawGraph.call(e),e["graph"+t]=e.graph):r('Error: "'+t+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")}),e.points=h,e.options=u,e.graph=f,i.drawGraph.call(e)}function h(t){var e,o=[],n=[];if(t=t||this.points,this.fillGraph&&this.nextPoints){if((e=i.getGraphPath.call(this,this.nextPoints))&&e.length){e[0][0]="L",o=i.getGraphPath.call(this,t),n=e.slice(0,o.length);for(var r=n.length-1;r>=0;r--)o.push(n[r])}}else o=i.getGraphPath.apply(this,arguments);return o}function u(t){var e=[];return(this.pointArrayMap||[]).forEach(function(o){e.push(t[o])}),e}function f(){var t,e=this,o=this.pointArrayMap,n=[];n=l(this),i.translate.apply(this,arguments),this.points.forEach(function(i){o.forEach(function(o,r){t=i[o],e.dataModify&&(t=e.dataModify.modifyValue(t)),null!==t&&(i[n[r]]=e.yAxis.toPixels(t,!0))})})}t.compose=function(t){var i=t.prototype;return i.linesApiNames=i.linesApiNames||e.slice(),i.pointArrayMap=i.pointArrayMap||o.slice(),i.pointValKey=i.pointValKey||"top",i.areaLinesNames=i.areaLinesNames||s.slice(),i.drawGraph=c,i.getGraphPath=h,i.toYData=u,i.translate=f,t}}(o||(o={})),o}),o(e,"Stock/Indicators/PriceEnvelopes/PriceEnvelopesIndicator.js",[e["Stock/Indicators/MultipleLinesComposition.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,o){var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=e.seriesTypes.sma,a=o.extend,s=o.isArray,p=o.merge,l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.init=function(){t.prototype.init.apply(this,arguments),this.options=p({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},e.prototype.getValues=function(e,o){var i,n,r,a,p,l,c,h,u=o.period,f=o.topBand,d=o.bottomBand,y=e.xData,m=e.yData,g=m?m.length:0,v=[],b=[],x=[];if(!(y.length<u)&&s(m[0])&&4===m[0].length){for(h=u;h<=g;h++)p=y.slice(h-u,h),l=m.slice(h-u,h),a=(c=t.prototype.getValues.call(this,{xData:p,yData:l},o)).xData[0],n=(i=c.yData[0])*(1+f),r=i*(1-d),v.push([a,n,i,r]),b.push(a),x.push([n,i,r]);return{values:v,xData:b,yData:x}}},e.defaultOptions=p(r.defaultOptions,{marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">●</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>'},params:{period:20,topBand:.1,bottomBand:.1},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}}),e}(r);return a(l.prototype,{areaLinesNames:["top","bottom"],linesApiNames:["topLine","bottomLine"],nameComponents:["period","topBand","bottomBand"],nameBase:"Price envelopes",pointArrayMap:["top","middle","bottom"],parallelArrays:["x","y","top","bottom"],pointValKey:"middle"}),t.compose(l),e.registerSeriesType("priceenvelopes",l),l}),o(e,"masters/indicators/price-envelopes.src.js",[],function(){})});