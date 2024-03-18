!/**
 * Highcharts JS v11.4.0 (2024-03-04)
 *
 * Module for adding patterns and images as point fills.
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Torstein Hønsi, Øystein Moseng
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/pattern-fill",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function i(t,e,i,r){t.hasOwnProperty(e)||(t[e]=r.apply(null,i),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}i(e,"Extensions/PatternFill.js",[e["Core/Animation/AnimationUtilities.js"],e["Core/Defaults.js"],e["Core/Utilities.js"]],function(t,e,i){let{animObject:r}=t,{getOptions:a}=e,{addEvent:n,defined:o,erase:s,extend:h,merge:l,pick:p,removeEvent:c,wrap:d}=i,f=function(){let t=[],e=a().colors,i=0;for(let r of["M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5","M 0 5 L 5 0 M -0.5 0.5 L 0.5 -0.5 M 4.5 5.5 L 5.5 4.5","M 2 0 L 2 5 M 4 0 L 4 5","M 0 2 L 5 2 M 0 4 L 5 4","M 0 1.5 L 2.5 1.5 L 2.5 0 M 2.5 5 L 2.5 3.5 L 5 3.5"])t.push({path:r,color:e[i++],width:5,height:5,patternTransform:"scale(1.4 1.4)"});for(let r of(i=5,["M 0 0 L 5 10 L 10 0","M 3 3 L 8 3 L 8 8 L 3 8 Z","M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0","M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11","M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9"]))t.push({path:r,color:e[i],width:10,height:10}),i+=5;return t}();function u(t,e){let i=JSON.stringify(t),r=i.length||0,a=0,n=0,o;if(e){o=Math.max(Math.floor(r/500),1);for(let t=0;t<r;t+=o)a+=i.charCodeAt(t);a&=a}for(;n<r;++n)a=(a<<5)-a+i.charCodeAt(n),a&=a;return a.toString(16).replace("-","1")}function g(){if(this.renderer&&(this.renderer.defIds||[]).filter(t=>t&&t.indexOf&&0===t.indexOf("highcharts-pattern-")).length){for(let t of this.series)if(t.visible)for(let e of t.points){let t=e.options&&e.options.color;t&&t.pattern&&(t.pattern._width="defer",t.pattern._height="defer")}this.redraw(!1)}}function m(){let t={},e=this.renderer,i=(e.defIds||[]).filter(t=>t.indexOf&&0===t.indexOf("highcharts-pattern-"));if(i.length)for(let r of([].forEach.call(this.renderTo.querySelectorAll('[color^="url("], [fill^="url("], [stroke^="url("]'),i=>{let r=i.getAttribute("fill")||i.getAttribute("color")||i.getAttribute("stroke");r&&(t[r.replace(e.url,"").replace("url(#","").replace(")","")]=!0)}),i))!t[r]&&(s(e.defIds,r),e.patternElements[r]&&(e.patternElements[r].destroy(),delete e.patternElements[r]))}function y(){let t=this.options.color;t&&t.pattern&&("string"==typeof t.pattern.path&&(t.pattern.path={d:t.pattern.path}),this.color=this.options.color=l(this.series.options.color,t))}function x(t){let e=t.args[0],i=t.args[1],r=t.args[2],a=this.chartIndex||0,n=e.pattern,o="#333333";if(void 0!==e.patternIndex&&f&&(n=f[e.patternIndex]),!n)return!0;if(n.image||"string"==typeof n.path||n.path&&n.path.d){let t=r.parentNode&&r.parentNode.getAttribute("class");t=t&&t.indexOf("highcharts-legend")>-1,("defer"===n._width||"defer"===n._height)&&M.call({graphic:{element:r}},n),(t||!n.id)&&((n=l({},n)).id="highcharts-pattern-"+a+"-"+u(n)+u(n,!0)),this.addPattern(n,!this.forExport&&p(n.animation,this.globalAnimation,{duration:100})),o=`url(${this.url}#${n.id+(this.forExport?"-export":"")})`}else o=n.color||o;return r.setAttribute(i,o),e.toString=function(){return o},!1}function w(){let t=this.chart.isResizing;if(this.isDirtyData||t||!this.chart.hasRendered)for(let e of this.points){let i=e.options&&e.options.color;i&&i.pattern&&(t&&!(e.shapeArgs&&e.shapeArgs.width&&e.shapeArgs.height)?(i.pattern._width="defer",i.pattern._height="defer"):e.calculatePatternDimensions(i.pattern))}}function M(t){if(t.width&&t.height)return;let e=this.graphic&&(this.graphic.getBBox&&this.graphic.getBBox(!0)||this.graphic.element&&this.graphic.element.getBBox())||{},i=this.shapeArgs;if(i&&(e.width=i.width||e.width,e.height=i.height||e.height,e.x=i.x||e.x,e.y=i.y||e.y),t.image){if(!e.width||!e.height){t._width="defer",t._height="defer";let e=this.series.chart.mapView&&this.series.chart.mapView.getSVGTransform().scaleY;o(e)&&e<0&&(t._inverted=!0);return}t.aspectRatio&&(e.aspectRatio=e.width/e.height,t.aspectRatio>e.aspectRatio?e.aspectWidth=e.height*t.aspectRatio:e.aspectHeight=e.width/t.aspectRatio),t._width=t.width||Math.ceil(e.aspectWidth||e.width),t._height=t.height||Math.ceil(e.aspectHeight||e.height)}t.width||(t._x=t.x||0,t._x+=e.x-Math.round(e.aspectWidth?Math.abs(e.aspectWidth-e.width)/2:0)),t.height||(t._y=t.y||0,t._y+=e.y-Math.round(e.aspectHeight?Math.abs(e.aspectHeight-e.height)/2:0))}function L(t,e){let a=p(e,!0),n=r(a),o=t.color||"#333333",s=t.height||("number"==typeof t._height?t._height:0)||32,h=t.width||("number"==typeof t._width?t._width:0)||32,l,d=t.id,f;if(!d&&(this.idCounter=this.idCounter||0,d="highcharts-pattern-"+this.idCounter+"-"+(this.chartIndex||0),++this.idCounter),this.forExport&&(d+="-export"),this.defIds=this.defIds||[],this.defIds.indexOf(d)>-1)return;this.defIds.push(d);let u={id:d,patternUnits:"userSpaceOnUse",patternContentUnits:t.patternContentUnits||"userSpaceOnUse",width:h,height:s,x:t._x||t.x||0,y:t._y||t.y||0};t._inverted&&(u.patternTransform="scale(1, -1)",t.patternTransform&&(t.patternTransform+=" scale(1, -1)")),t.patternTransform&&(u.patternTransform=t.patternTransform);let g=this.createElement("pattern").attr(u).add(this.defs);if(g.id=d,t.path){if(f=i.isObject(t.path)?t.path:{d:t.path},t.backgroundColor){let e;e=t.backgroundColor,this.rect(0,0,h,s).attr({fill:e}).add(g)}l={d:f.d},this.styledMode||(l.stroke=f.stroke||o,l["stroke-width"]=p(f.strokeWidth,2),l.fill=f.fill||"none"),f.transform&&(l.transform=f.transform),this.createElement("path").attr(l).add(g),g.color=o}else t.image&&(a?this.image(t.image,0,0,h,s,function(){this.animate({opacity:p(t.opacity,1)},n),c(this.element,"load")}).attr({opacity:0}).add(g):this.image(t.image,0,0,h,s).add(g));return t.image&&a||void 0===t.opacity||[].forEach.call(g.element.childNodes,e=>{e.setAttribute("opacity",t.opacity)}),this.patternElements=this.patternElements||{},this.patternElements[d]=g,g}function b(t){let e=this.options.color;e&&e.pattern&&!e.pattern.color?(delete this.options.color,t.apply(this,[].slice.call(arguments,1)),e.pattern.color=this.color,this.color=this.options.color=e):t.apply(this,[].slice.call(arguments,1))}function _(){if(!this.chart?.mapView)return;let t=this.chart.renderer,e=t.patternElements;t.defIds?.length&&e&&this.points.filter(function(t){return!!t.graphic&&(t.graphic.element.hasAttribute("fill")||t.graphic.element.hasAttribute("color")||t.graphic.element.hasAttribute("stroke"))&&!t.options.color?.pattern?.image&&!!t.group?.scaleX&&!!t.group?.scaleY}).map(function(e){return{id:(e.graphic?.element.getAttribute("fill")||e.graphic?.element.getAttribute("color")||e.graphic?.element.getAttribute("stroke")||"").replace(t.url,"").replace("url(#","").replace(")",""),x:e.group?.scaleX||1,y:e.group?.scaleY||1}}).filter(function(t,e,i){return""!==t.id&&-1!==t.id.indexOf("highcharts-pattern-")&&!i.some(function(i,r){return i.id===t.id&&r<e})}).forEach(function(t){let i=t.id;e[i].scaleX=1/t.x,e[i].scaleY=1/t.y,e[i].updateTransform("patternTransform")})}return{compose:function(t,e,i){let r=e.prototype.pointClass,a=r.prototype;a.calculatePatternDimensions||(n(t,"endResize",g),n(t,"redraw",m),h(a,{calculatePatternDimensions:M}),n(r,"afterInit",y),n(e,"render",w),d(e.prototype,"getColor",b),n(e,"afterRender",_),n(e,"mapZoomComplete",_),h(i.prototype,{addPattern:L}),n(i,"complexColor",x))},patterns:f}}),i(e,"masters/modules/pattern-fill.src.js",[e["Core/Globals.js"],e["Extensions/PatternFill.js"]],function(t,e){return t.patterns=e.patterns,e.compose(t.Chart,t.Series,t.SVGRenderer),t})});