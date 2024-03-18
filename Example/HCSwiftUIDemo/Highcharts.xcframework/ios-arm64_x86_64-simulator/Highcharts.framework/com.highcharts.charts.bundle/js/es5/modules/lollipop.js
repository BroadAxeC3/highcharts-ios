!/**
 * Highcharts JS v11.4.0 (2024-03-04)
 *
 * (c) 2009-2024 Sebastian Bochan, Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/lollipop",["highcharts"],function(o){return t(o),t.Highcharts=o,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var o=t?t._modules:{};function e(t,o,e,r){t.hasOwnProperty(o)||(t[o]=r.apply(null,e),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:o,module:t[o]}})))}e(o,"Series/Lollipop/LollipopPoint.js",[o["Core/Series/SeriesRegistry.js"],o["Core/Utilities.js"]],function(t,o){var e,r=this&&this.__extends||(e=function(t,o){return(e=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])})(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw TypeError("Class extends value "+String(o)+" is not a constructor or null");function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}),n=t.series.prototype.pointClass,i=t.seriesTypes,s=i.scatter.prototype.pointClass,p=i.dumbbell.prototype.pointClass,l=o.extend,a=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return r(o,t),o}(n);return l(a.prototype,{destroy:p.prototype.destroy,pointSetState:s.prototype.setState,setState:p.prototype.setState}),a}),e(o,"Series/Lollipop/LollipopSeries.js",[o["Series/Lollipop/LollipopPoint.js"],o["Core/Series/SeriesRegistry.js"],o["Core/Series/Series.js"],o["Core/Utilities.js"]],function(t,o,e,r){var n,i=this&&this.__extends||(n=function(t,o){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=o[e])})(t,o)},function(t,o){if("function"!=typeof o&&null!==o)throw TypeError("Class extends value "+String(o)+" is not a constructor or null");function e(){this.constructor=t}n(t,o),t.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}),s=o.seriesTypes,p=s.column.prototype,l=s.dumbbell.prototype;s.scatter;var a=r.extend,u=r.merge,c=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return i(o,t),o.prototype.drawPoints=function(){var o,e=this.points.length,r=0;for(t.prototype.drawPoints.apply(this,arguments);r<e;)o=this.points[r],this.drawConnector(o),r++},o.prototype.translate=function(){p.translate.apply(this,arguments);for(var t=0,o=this.points;t<o.length;t++){var e=o[t],r=e.pointWidth,n=e.shapeArgs;(null==n?void 0:n.x)&&(n.x+=r/2,e.plotX=n.x||0)}},o.defaultOptions=u(e.defaultOptions,{threshold:0,connectorWidth:1,groupPadding:.2,pointPadding:.1,states:{hover:{lineWidthPlus:0,connectorWidthPlus:1,halo:!1}},lineWidth:0,dataLabels:{align:void 0,verticalAlign:void 0},pointRange:1}),o}(e);return a(c.prototype,{alignDataLabel:p.alignDataLabel,crispCol:p.crispCol,drawConnector:l.drawConnector,drawDataLabels:p.drawDataLabels,getColumnMetrics:p.getColumnMetrics,getConnectorAttribs:l.getConnectorAttribs,pointClass:t}),o.registerSeriesType("lollipop",c),c}),e(o,"masters/modules/lollipop.src.js",[o["Core/Globals.js"]],function(t){return t})});