/**
 * Highcharts JS v11.3.0 (2024-01-10)
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/draggable-points",["highcharts"],function(r){return e(r),e.Highcharts=r,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var r=e?e._modules:{};function t(e,r,t,a){e.hasOwnProperty(r)||(e[r]=a.apply(null,t),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:r,module:e[r]}})))}t(r,"Extensions/DraggablePoints/DragDropUtilities.js",[r["Core/Utilities.js"]],function(e){var r=e.addEvent;return{addEvents:function(e,t,a,o){var i=t.map(function(t){return r(e,t,a,o)});return function(){for(var e=0;e<i.length;e++)(0,i[e])()}},countProps:function(e){return Object.keys(e).length},getFirstProp:function(e){for(var r in e)if(Object.hasOwnProperty.call(e,r))return e[r]},getNormalizedEvent:function(e,r){return void 0===e.chartX||void 0===e.chartY?r.pointer.normalize(e):e}}}),t(r,"Extensions/DraggablePoints/DragDropDefaults.js",[],function(){return{dragSensitivity:2,dragHandle:{className:"highcharts-drag-handle",color:"#fff",lineColor:"rgba(0, 0, 0, 0.6)",lineWidth:1,zIndex:901},guideBox:{default:{className:"highcharts-drag-box-default",lineWidth:1,lineColor:"#888",color:"rgba(0, 0, 0, 0.1)",cursor:"move",zIndex:900}}}}),t(r,"Extensions/DraggablePoints/DraggableChart.js",[r["Core/Animation/AnimationUtilities.js"],r["Extensions/DraggablePoints/DragDropUtilities.js"],r["Extensions/DraggablePoints/DragDropDefaults.js"],r["Core/Globals.js"],r["Core/Utilities.js"]],function(e,r,t,a,o){var i=e.animObject,n=r.addEvents,s=r.countProps,d=r.getFirstProp,g=r.getNormalizedEvent,p=a.composed,l=a.doc,h=o.addEvent,u=o.merge,c=o.pick,x=o.pushUnique;function m(){var e=this.dragHandles||{};if(e){for(var r=0,t=Object.keys(e);r<t.length;r++){var a=t[r];e[a].destroy&&e[a].destroy()}delete this.dragHandles}}function f(e,r){var a=this.dragGuideBox,o=u(t.guideBox,r),i=u(o.default,o[e]);return a.attr({class:i.className,stroke:i.lineColor,strokeWidth:i.lineWidth,fill:i.color,cursor:i.cursor,zIndex:i.zIndex}).css({pointerEvents:"none"})}function v(e){var r=this.options.chart||{},t=r.panKey&&r.panKey+"Key";return e[this.zooming.key&&this.zooming.key+"Key"]||e[t]}function D(e){return({left:"right",right:"left",top:"bottom",bottom:"top"})[e]}function y(e,r){var t,a=function(e){var r=e.series,t=r.options.data||[],a=r.options.dragDrop.groupBy,o=[];if(r.boosted)for(var i=0,n=t.length;i<n;++i)o.push(new r.pointClass(r,t[i])),o[o.length-1].index=i;else o=r.points;return e.options[a]?o.filter(function(r){return r.options[a]===e.options[a]}):[e]}(r),o=r.series,i=o.chart;c(o.options.dragDrop&&o.options.dragDrop.liveRedraw,!0)||(i.dragGuideBox=t=o.getGuideBox(a),i.setGuideBoxState("default",o.options.dragDrop.guideBox).add(o.group)),i.dragDropData={origin:function(e,r,t){for(var a={chartX:e.chartX,chartY:e.chartY,guideBox:t&&{x:t.attr("x"),y:t.attr("y"),width:t.attr("width"),height:t.attr("height")},points:{}},o=0;o<r.length;o++){for(var i=r[o],n=i.series.dragDropProps||{},s={},d=0,g=Object.keys(n);d<g.length;d++){var p=g[d],l=n[p],h=i.series[l.axis+"Axis"];s[p]=i[p],i.series.chart.mapView&&i.plotX&&i.plotY?s[p+"Offset"]="x"===p?i.plotX:i.plotY:s[p+"Offset"]=h.toPixels(i[p])-(h.horiz?e.chartX:e.chartY)}s.point=i,a.points[i.id]=s}return a}(e,a,t),point:r,groupedPoints:a,isDragging:!0}}function P(e,r){var t=r.dragDropData;if(t&&t.isDragging&&t.draggedPastSensitivity&&t.point.series){var a=t.point,o=t.newPoints,i=s(o),n=1===i?d(o):null;r.dragHandles&&r.hideDragHandles(),e.preventDefault(),r.cancelClick=!0,a.firePointEvent("drop",{origin:t.origin,chartX:e.chartX,chartY:e.chartY,newPoints:o,numNewPoints:i,newPoint:n&&n.newValues,newPointId:n&&n.point.id},function(){w(r)})}delete r.dragDropData,r.dragGuideBox&&(r.dragGuideBox.destroy(),delete r.dragGuideBox)}function b(){if(!this.hasAddedDragDropEvents){var e,r;e=this,r=e.container,function(e){var r=e.series?e.series.length:0;if(e.hasCartesianSeries&&!e.polar||e.mapView){for(;r--;)if(e.series[r].options.dragDrop&&function(e){for(var r,t=["draggableX","draggableY"],a=e.dragDropProps||{},o=0,i=Object.keys(a);o<i.length;o++)(r=a[i[o]]).optionName&&t.push(r.optionName);for(var n=t.length;n--;)if(e.options.dragDrop[t[n]])return!0}(e.series[r]))return!0}return!1}(e)&&(n(r,["mousedown","touchstart"],function(r){(function(e,r){var t=r.hoverPoint,a=u(t&&t.series.options.dragDrop,t&&t.options.dragDrop),o=a.draggableX||!1,i=a.draggableY||!1;if(r.cancelClick=!1,!(!(o||i)||r.zoomOrPanKeyPressed(e))&&!r.hasDraggedAnnotation){if(r.dragDropData&&r.dragDropData.isDragging){P(e,r);return}t&&function(e){var r,t,a,o=e.series,i=o.chart,n=o.options.dragDrop||{},s=e.options&&e.options.dragDrop,d=o.dragDropProps;for(var g in d)"x"===(r=d[g]).axis&&r.move?t=!0:"y"===r.axis&&r.move&&(a=!0);return(n.draggableX&&t||n.draggableY&&a)&&!(s&&!1===s.draggableX&&!1===s.draggableY)&&(!!(o.yAxis&&o.xAxis)||i.mapView)}(t)&&(r.mouseIsDown=!1,y(e,t),t.firePointEvent("dragStart",e))}})(g(r,e),e)}),n(r,["mousemove","touchmove"],function(r){(function(e,r){if(!r.zoomOrPanKeyPressed(e)){var a,o,i,n,g,p,l,h,x,m,f=r.dragDropData,v=0;f&&f.isDragging&&f.point.series&&(h=(l=f.point).series.options.dragDrop,e.preventDefault(),f.draggedPastSensitivity||(f.draggedPastSensitivity=(a=c(l.options.dragDrop&&l.options.dragDrop.dragSensitivity,h&&h.dragSensitivity,t.dragSensitivity),i=(o=r.dragDropData.origin).chartX,n=o.chartY,Math.sqrt(((g=e.chartX)-i)*(g-i)+((p=e.chartY)-n)*(p-n))>a)),f.draggedPastSensitivity&&(f.newPoints=function(e,r){var t=e.point,a=t.series,o=a.chart,i=u(a.options.dragDrop,t.options.dragDrop),n={},s=e.updateProp,d={},g=t.series.dragDropProps;for(var p in g){var l=g[p];(!s||s===p&&l.resize&&(!l.optionName||!1!==i[l.optionName]))&&(s||l.move&&("x"===l.axis&&i.draggableX||"y"===l.axis&&i.draggableY))&&(o.mapView?n["x"===p?"lon":"lat"]=l:n[p]=l)}for(var h=0,c=s?[t]:e.groupedPoints;h<c.length;h++){var x=c[h];d[x.id]={point:x,newValues:x.getDropValues(e.origin,r,n)}}return d}(f,e),m=1===(v=s(x=f.newPoints))?d(x):null,l.firePointEvent("drag",{origin:f.origin,newPoints:f.newPoints,newPoint:m&&m.newValues,newPointId:m&&m.point.id,numNewPoints:v,chartX:e.chartX,chartY:e.chartY},function(){var r,t,a,o,i,n,s,d,g,p,h,x,m,f,v,y,P,b,z;a=(t=(r=l.series).chart).dragDropData,i=(o=u(r.options.dragDrop,l.options.dragDrop)).draggableX,n=o.draggableY,s=a.origin,d=a.updateProp,g=e.chartX-s.chartX,p=e.chartY-s.chartY,h=g,t.inverted&&(g=-p,p=-h),c(o.liveRedraw,!0)?(w(t,!1),l.showDragHandles()):d?(x=g,m=p,y=(v=(f=l.series).chart).dragDropData,P=f.dragDropProps[y.updateProp],b=y.newPoints[l.id].newValues,z="function"==typeof P.resizeSide?P.resizeSide(b,l):P.resizeSide,P.beforeResize&&P.beforeResize(v.dragGuideBox,b,l),function(e,r,t){var a;switch(r){case"left":a={x:e.attr("x")+t.x,width:Math.max(1,e.attr("width")-t.x)};break;case"right":a={width:Math.max(1,e.attr("width")+t.x)};break;case"top":a={y:e.attr("y")+t.y,height:Math.max(1,e.attr("height")-t.y)};break;case"bottom":a={height:Math.max(1,e.attr("height")+t.y)}}e.attr(a)}(v.dragGuideBox,"x"===P.axis&&f.xAxis.reversed||"y"===P.axis&&f.yAxis.reversed?D(z):z,{x:"x"===P.axis?x-(y.origin.prevdX||0):0,y:"y"===P.axis?m-(y.origin.prevdY||0):0})):t.dragGuideBox.translate(i?g:0,n?p:0),s.prevdX=g,s.prevdY=p})))}})(g(r,e),e)},{passive:!1}),h(r,"mouseleave",function(r){P(g(r,e),e)}),e.unbindDragDropMouseUp=n(l,["mouseup","touchend"],function(r){P(g(r,e),e)},{passive:!1}),e.hasAddedDragDropEvents=!0,h(e,"destroy",function(){e.unbindDragDropMouseUp&&e.unbindDragDropMouseUp()}))}}function w(e,r){var t,a=e.dragDropData.newPoints,o=i(r);e.isDragDropAnimating=!0;for(var n=0,s=Object.keys(a);n<s.length;n++)(t=a[s[n]]).point.update(t.newValues,!1);e.redraw(o),setTimeout(function(){delete e.isDragDropAnimating,e.hoverPoint&&!e.dragHandles&&e.hoverPoint.showDragHandles()},o.duration)}return{compose:function e(r){if(x(p,e)){var t=r.prototype;t.hideDragHandles=m,t.setGuideBoxState=f,t.zoomOrPanKeyPressed=v,h(r,"render",b)}},flipResizeSide:D,initDragDrop:y}}),t(r,"Extensions/DraggablePoints/DragDropProps.js",[r["Extensions/DraggablePoints/DraggableChart.js"],r["Core/Utilities.js"]],function(e,r){var t=e.flipResizeSide,a=r.isNumber,o=r.merge,i=r.pick,n={x:{axis:"x",move:!0},y:{axis:"y",move:!0}},s={x:{axis:"x",move:!0},y:{axis:"y",move:!1,resize:!0,beforeResize:function(e,r,t){var o,n=i(t.yBottom,t.series.translatedThreshold),s=e.attr("y"),d=a(t.stackY)?t.stackY-(t.y||0):t.series.options.threshold||0,g=d+r.y;(t.series.yAxis.reversed?g<d:g>=d)?(o=e.attr("height"),e.attr({height:Math.max(0,Math.round(o+(n?n-s-o:0)))})):e.attr({y:Math.round(s+(n?n-s:0))})},resizeSide:function(e,r){var a=r.series.chart.dragHandles,o=e.y>=(r.series.options.threshold||0)?"top":"bottom",i=t(o);return a&&a[i]&&(a[i].destroy(),delete a[i]),o},handlePositioner:function(e){var r=e.shapeArgs||e.graphic&&e.graphic.getBBox()||{},t=e.series.yAxis.reversed,a=e.series.options.threshold||0,o=e.y||0;return{x:r.x||0,y:!t&&o>=a||t&&o<a?r.y||0:(r.y||0)+(r.height||0)}},handleFormatter:function(e){var r=e.shapeArgs||{},t=r.r||0,a=r.width||0,o=a/2;return[["M",t,0],["L",o-5,0],["A",1,1,0,0,0,o+5,0],["A",1,1,0,0,0,o-5,0],["M",o+5,0],["L",a-t,0]]}}},d={x:s.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(e){return{x:e.shapeArgs.x||0,y:e.lowPlot}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e<=r.q1}},q1:{optionName:"draggableQ1",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(e){return{x:e.shapeArgs.x||0,y:e.q1Plot}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e<=r.median&&e>=r.low}},median:{axis:"y",move:!0},q3:{optionName:"draggableQ3",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(e){return{x:e.shapeArgs.x||0,y:e.q3Plot}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e<=r.high&&e>=r.median}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(e){return{x:e.shapeArgs.x||0,y:e.highPlot}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e>=r.q3}}},g={x:s.x,y:s.y,target:{optionName:"draggableTarget",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(e){var r=e.targetGraphic.getBBox();return{x:e.barX,y:r.y+r.height/2}},handleFormatter:s.y.handleFormatter}},p={x:s.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(e){return{x:e.shapeArgs.x,y:e.plotLow}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e<=r.open&&e<=r.close}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(e){return{x:e.shapeArgs.x,y:e.plotHigh}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e>=r.open&&e>=r.close}},open:{optionName:"draggableOpen",axis:"y",move:!0,resize:!0,resizeSide:function(e){return e.open>=e.close?"top":"bottom"},handlePositioner:function(e){return{x:e.shapeArgs.x,y:e.plotOpen}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e<=r.high&&e>=r.low}},close:{optionName:"draggableClose",axis:"y",move:!0,resize:!0,resizeSide:function(e){return e.open>=e.close?"bottom":"top"},handlePositioner:function(e){return{x:e.shapeArgs.x,y:e.plotClose}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e<=r.high&&e>=r.low}}},l={x:s.x,y:o(s.y,{handleFormatter:function(e){return e.isSum||e.isIntermediateSum?null:s.y.handleFormatter(e)}})},h={x:{axis:"x",move:!0},low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(e){var r=e.shapeArgs||e.graphic.getBBox();return{x:r.x||0,y:(r.y||0)+(r.height||0)}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e<=r.high}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(e){var r=e.shapeArgs||e.graphic.getBBox();return{x:r.x||0,y:r.y||0}},handleFormatter:s.y.handleFormatter,propValidate:function(e,r){return e>=r.low}}},u={x:h.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(e){var r=e.graphics&&e.graphics[0]&&e.graphics[0].getBBox();return r?{x:r.x+r.width/2,y:r.y+r.height/2}:{x:-999,y:-999}},handleFormatter:x,propValidate:h.low.propValidate},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(e){var r=e.graphics&&e.graphics[1]&&e.graphics[1].getBBox();return r?{x:r.x+r.width/2,y:r.y+r.height/2}:{x:-999,y:-999}},handleFormatter:x,propValidate:h.high.propValidate}},c={y:{axis:"y",move:!0},x:{optionName:"draggableX1",axis:"x",move:!0,resize:!0,resizeSide:"left",handlePositioner:function(e){return f(e,"x")},handleFormatter:m,propValidate:function(e,r){return e<=r.x2}},x2:{optionName:"draggableX2",axis:"x",move:!0,resize:!0,resizeSide:"right",handlePositioner:function(e){return f(e,"x2")},handleFormatter:m,propValidate:function(e,r){return e>=r.x}}};function x(e){var r=e.graphic?e.graphic.getBBox().width/2+1:4;return[["M",0-r,0],["a",r,r,0,1,0,2*r,0],["a",r,r,0,1,0,-2*r,0]]}function m(e){var r=e.shapeArgs||e.graphic.getBBox(),t=r.r||0,a=r.height-t,o=r.height/2;return[["M",0,t],["L",0,o-5],["A",1,1,0,0,0,0,o+5],["A",1,1,0,0,0,0,o-5],["M",0,o+5],["L",0,a]]}function f(e,r){var t=e.series,a=t.xAxis,o=t.yAxis,i=t.chart.inverted,n=t.columnMetrics?t.columnMetrics.offset:-e.shapeArgs.height/2,s=a.toPixels(e[r],!0),d=o.toPixels(e.y,!0);return i&&(s=a.len-s,d=o.len-d),{x:Math.round(s),y:Math.round(d+=n)}}return{arearange:u,boxplot:d,bullet:g,column:s,columnrange:h,flags:n,gantt:{y:c.y,start:o(c.x,{optionName:"draggableStart",validateIndividualDrag:function(e){return!e.milestone}}),end:o(c.x2,{optionName:"draggableEnd",validateIndividualDrag:function(e){return!e.milestone}})},line:n,ohlc:p,waterfall:l,xrange:c}}),t(r,"Extensions/DraggablePoints/DraggablePoints.js",[r["Extensions/DraggablePoints/DragDropUtilities.js"],r["Extensions/DraggablePoints/DraggableChart.js"],r["Extensions/DraggablePoints/DragDropDefaults.js"],r["Extensions/DraggablePoints/DragDropProps.js"],r["Core/Globals.js"],r["Core/Utilities.js"]],function(e,r,t,a,o,i){var n=e.addEvents,s=e.getNormalizedEvent,d=r.initDragDrop,g=o.composed,p=i.addEvent,l=i.clamp,h=i.isNumber,u=i.merge,c=i.pick,x=i.pushUnique;function m(e){var r=e.series&&e.series.chart,t=r&&r.dragDropData;r&&r.dragHandles&&!(t&&(t.isDragging&&t.draggedPastSensitivity||t.isHoveringHandle===e.id))&&r.hideDragHandles()}function f(){var e=this;setTimeout(function(){e.series&&m(e)},10)}function v(){var e=this;setTimeout(function(){var r,t,a,o;return a=(t=(r=e.series)&&r.chart)&&t.dragDropData,o=t&&t.is3d&&t.is3d(),void(!t||a&&a.isDragging&&a.draggedPastSensitivity||t.isDragDropAnimating||!r.options.dragDrop||o||(t.dragHandles&&t.hideDragHandles(),e.showDragHandles()))},12)}function D(){var e=this.series.chart,r=e.dragHandles;r&&r.point===this.id&&e.hideDragHandles()}function y(e,r,t){for(var a=this.series,o=a.chart,i=o.mapView,n=u(a.options.dragDrop,this.options.dragDrop),s={},d=e.points[this.id],g=1===Object.keys(t).length,p=0,x=Object.keys(t);p<x.length;p++){var m=x[p],f=t[m],v=d.point[m],D=a[f.axis+"Axis"],y=i?function(e,r,t){if(i){var a=c(n["dragPrecision"+r],0),s=i.pixelsToLonLat({x:0,y:0}),d=i.pixelsToLonLat({x:o.plotBox.width,y:o.plotBox.height}),g=c(n["dragMin"+r],s&&s[t],-1/0),p=c(n["dragMax"+r],d&&d[t],1/0),h=e[t];if("Orthographic"===i.projection.options.name)return h;if("lat"===t){(isNaN(g)||g>i.projection.maxLatitude)&&(g=i.projection.maxLatitude),(isNaN(p)||p<-1*i.projection.maxLatitude)&&(p=-1*i.projection.maxLatitude);var u=p;p=g,g=u}if(!i.projection.hasCoordinates){var x=i.pixelsToLonLat({x:e.chartX-o.plotLeft,y:o.plotHeight-e.chartY+o.plotTop});x&&(h=x[t])}return a&&(h=Math.round(h/a)*a),l(h,g,p)}}(r,f.axis.toUpperCase(),m):function(e,r){var t=a[r.toLowerCase()+"Axis"].categories?1:0,o=c(n["dragPrecision"+r],t),i=c(n["dragMin"+r],-1/0),s=c(n["dragMax"+r],1/0),d=e;return o&&(d=Math.round(d/o)*o),l(d,i,s)}(D.toValue((D.horiz?r.chartX:r.chartY)+d[m+"Offset"]),f.axis.toUpperCase());h(y)&&!(g&&f.propValidate&&!f.propValidate(y,this))&&void 0!==v&&(s[m]=y)}return s}function P(){for(var e=this,r=e.series,a=r.chart,o=a.inverted,i=a.renderer,g=u(r.options.dragDrop,e.options.dragDrop),l=r.dragDropProps||{},h=a.dragHandles,c=function(c){var x=l[c],f=u(t.dragHandle,x.handleOptions,g.dragHandle),v={class:f.className,"stroke-width":f.lineWidth,fill:f.color,stroke:f.lineColor},D=f.pathFormatter||x.handleFormatter,y=x.handlePositioner,P=!x.validateIndividualDrag||x.validateIndividualDrag(e),b=void 0,w=void 0,z=void 0;if(x.resize&&P&&x.resizeSide&&D&&(g["draggable"+x.axis.toUpperCase()]||g[x.optionName])&&!1!==g[x.optionName]){h?h.point=e.id:h=a.dragHandles={group:i.g("drag-drop-handles").add(r.markerGroup||r.group),point:e.id},b=y(e),v.d=z=D(e);var A=e.series.xAxis.categories?-.5:0;if(!z||b.x<A||b.y<0)return{value:void 0};v.cursor=f.cursor||("x"===x.axis!=!!o?"ew-resize":"ns-resize"),(w=h[x.optionName])||(w=h[x.optionName]=i.path().add(h.group)),v.translateX=o?r.yAxis.len-b.y:b.x,v.translateY=o?r.xAxis.len-b.x:b.y,o&&(v.rotation=-90),w.attr(v),n(w.element,["touchstart","mousedown"],function(r){var t,o;t=s(r,a),(o=e.series.chart).zoomOrPanKeyPressed(t)||(o.mouseIsDown=!1,d(t,e),o.dragDropData.updateProp=t.updateProp=c,e.firePointEvent("dragStart",t),t.stopPropagation(),t.preventDefault())},{passive:!1}),p(h.group.element,"mouseover",function(){a.dragDropData=a.dragDropData||{},a.dragDropData.isHoveringHandle=e.id}),n(h.group.element,["touchend","mouseout"],function(){var r;(r=e.series.chart).dragDropData&&e.id===r.dragDropData.isHoveringHandle&&delete r.dragDropData.isHoveringHandle,r.hoverPoint||m(e)})}},x=0,f=Object.keys(l);x<f.length;x++){var v=c(f[x]);if("object"==typeof v)return v.value}}function b(e){for(var r,t=this.chart,a=1/0,o=-1/0,i=1/0,n=-1/0,s=0;s<e.length;s++){var d=e[s],g=d.graphic&&d.graphic.getBBox()||d.shapeArgs;if(g){var p=void 0,l=d.x2;h(l)&&(p=d.series.xAxis.translate(l,!1,!1,!1,!0));var u=!(g.width||g.height||g.x||g.y);r=!0,a=Math.min(d.plotX||0,p||0,u?1/0:g.x||0,a),o=Math.max(d.plotX||0,p||0,(g.x||0)+(g.width||0),o),i=Math.min(d.plotY||0,u?1/0:g.y||0,i),n=Math.max((g.y||0)+(g.height||0),n)}}return r?t.renderer.rect(a,i,o-a,n-i):t.renderer.g()}return{compose:function e(t,o){if(r.compose(t),x(g,e)){var i=o.prototype.pointClass,n=o.types,s=o.prototype,d=i.prototype;d.getDropValues=y,d.showDragHandles=P,p(i,"mouseOut",f),p(i,"mouseOver",v),p(i,"remove",D),s.dragDropProps=a.line,s.getGuideBox=b;for(var l=0,h=["arearange","boxplot","bullet","column","columnrange","flags","gantt","ohlc","waterfall","xrange"];l<h.length;l++){var u=h[l];n[u]&&(n[u].prototype.dragDropProps=a[u])}for(var c=0,m=["bellcurve","gauge","histogram","map","mapline","pareto","pie","sankey","sma","sunburst","treemap","vector","windbarb","wordcloud"];c<m.length;c++){var u=m[c];n[u]&&(n[u].prototype.dragDropProps=null)}}}}}),t(r,"masters/modules/draggable-points.src.js",[r["Core/Globals.js"],r["Extensions/DraggablePoints/DraggablePoints.js"]],function(e,r){r.compose(e.Chart,e.Series)})});