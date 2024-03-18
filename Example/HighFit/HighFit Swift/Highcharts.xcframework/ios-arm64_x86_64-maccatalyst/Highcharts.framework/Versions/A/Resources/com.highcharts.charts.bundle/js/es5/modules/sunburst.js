!/**
 * Highcharts JS v11.4.0 (2024-03-04)
 *
 * (c) 2016-2024 Highsoft AS
 * Authors: Jon Arild Nygard
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/sunburst",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function r(t,e,r,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,r),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}r(e,"Extensions/Breadcrumbs/BreadcrumbsDefaults.js",[],function(){return{lang:{mainBreadcrumb:"Main"},options:{buttonTheme:{fill:"none",height:18,padding:2,"stroke-width":0,zIndex:7,states:{select:{fill:"none"}},style:{color:"#334eff"}},buttonSpacing:5,floating:!1,format:void 0,relativeTo:"plotBox",rtl:!1,position:{align:"left",verticalAlign:"top",x:0,y:void 0},separator:{text:"/",style:{color:"#666666",fontSize:"0.8em"}},showFullPath:!0,style:{},useHTML:!1,zIndex:7}}}),r(e,"Extensions/Breadcrumbs/Breadcrumbs.js",[e["Extensions/Breadcrumbs/BreadcrumbsDefaults.js"],e["Core/Templating.js"],e["Core/Globals.js"],e["Core/Utilities.js"]],function(t,e,r,i){var o=e.format,s=r.composed,n=i.addEvent,a=i.defined,l=i.extend,p=i.fireEvent,h=i.isString,d=i.merge,u=i.objectEach,c=i.pick,v=i.pushUnique;function f(){if(this.breadcrumbs){var t=this.resetZoomButton&&this.resetZoomButton.getBBox(),e=this.breadcrumbs.options;t&&"right"===e.position.align&&"plotBox"===e.relativeTo&&this.breadcrumbs.alignBreadcrumbsGroup(-t.width-e.buttonSpacing)}}function g(){this.breadcrumbs&&(this.breadcrumbs.destroy(),this.breadcrumbs=void 0)}function y(){var t=this.breadcrumbs;if(t&&!t.options.floating&&t.level){var e=t.options,r=e.buttonTheme,i=(r.height||0)+2*(r.padding||0)+e.buttonSpacing,o=e.position.verticalAlign;"bottom"===o?(this.marginBottom=(this.marginBottom||0)+i,t.yOffset=i):"middle"!==o?(this.plotTop+=i,t.yOffset=-i):t.yOffset=void 0}}function b(){this.breadcrumbs&&this.breadcrumbs.redraw()}function m(t){!0===t.resetSelection&&this.breadcrumbs&&this.breadcrumbs.alignBreadcrumbsGroup()}return function(){function e(t,r){this.elementList={},this.isDirty=!0,this.level=0,this.list=[];var i=d(t.options.drilldown&&t.options.drilldown.drillUpButton,e.defaultOptions,t.options.navigation&&t.options.navigation.breadcrumbs,r);this.chart=t,this.options=i||{}}return e.compose=function(e,r){v(s,"Breadcrumbs")&&(n(e,"destroy",g),n(e,"afterShowResetZoom",f),n(e,"getMargins",y),n(e,"redraw",b),n(e,"selection",m),l(r.lang,t.lang))},e.prototype.updateProperties=function(t){this.setList(t),this.setLevel(),this.isDirty=!0},e.prototype.setList=function(t){this.list=t},e.prototype.setLevel=function(){this.level=this.list.length&&this.list.length-1},e.prototype.getLevel=function(){return this.level},e.prototype.getButtonText=function(t){var e=this.chart,r=this.options,i=e.options.lang,s=c(r.format,r.showFullPath?"{level.name}":"← {level.name}"),n=i&&c(i.drillUpText,i.mainBreadcrumb),l=r.formatter&&r.formatter(t)||o(s,{level:t.levelOptions},e)||"";return(h(l)&&!l.length||"← "===l)&&a(n)&&(l=r.showFullPath?n:"← "+n),l},e.prototype.redraw=function(){this.isDirty&&this.render(),this.group&&this.group.align(),this.isDirty=!1},e.prototype.render=function(){var t=this.chart,e=this.options;!this.group&&e&&(this.group=t.renderer.g("breadcrumbs-group").addClass("highcharts-no-tooltip highcharts-breadcrumbs").attr({zIndex:e.zIndex}).add()),e.showFullPath?this.renderFullPathButtons():this.renderSingleButton(),this.alignBreadcrumbsGroup()},e.prototype.renderFullPathButtons=function(){this.destroySingleButton(),this.resetElementListState(),this.updateListElements(),this.destroyListElements()},e.prototype.renderSingleButton=function(){var t=this.chart,e=this.list,r=this.options.buttonSpacing;this.destroyListElements();var i=this.group?this.group.getBBox().width:r,o=e[e.length-2];!t.drillUpButton&&this.level>0?t.drillUpButton=this.renderButton(o,i,r):t.drillUpButton&&(this.level>0?this.updateSingleButton():this.destroySingleButton())},e.prototype.alignBreadcrumbsGroup=function(t){if(this.group){var e=this.options,r=e.buttonTheme,i=e.position,o="chart"===e.relativeTo||"spacingBox"===e.relativeTo?void 0:"plotBox",s=this.group.getBBox(),n=2*(r.padding||0)+e.buttonSpacing;i.width=s.width+n,i.height=s.height+n;var a=d(i);t&&(a.x+=t),this.options.rtl&&(a.x+=i.width),a.y=c(a.y,this.yOffset,0),this.group.align(a,!0,o)}},e.prototype.renderButton=function(t,e,r){var i=this,o=this.chart,s=i.options,n=d(s.buttonTheme),a=o.renderer.button(i.getButtonText(t),e,r,function(e){var r,o=s.events&&s.events.click;o&&(r=o.call(i,e,t)),!1!==r&&(s.showFullPath?e.newLevel=t.level:e.newLevel=i.level-1,p(i,"up",e))},n).addClass("highcharts-breadcrumbs-button").add(i.group);return o.styledMode||a.attr(s.style),a},e.prototype.renderSeparator=function(t,e){var r=this.chart,i=this.options.separator,o=r.renderer.label(i.text,t,e,void 0,void 0,void 0,!1).addClass("highcharts-breadcrumbs-separator").add(this.group);return r.styledMode||o.css(i.style),o},e.prototype.update=function(t){d(!0,this.options,t),this.destroy(),this.isDirty=!0},e.prototype.updateSingleButton=function(){var t=this.chart,e=this.list[this.level-1];t.drillUpButton&&t.drillUpButton.attr({text:this.getButtonText(e)})},e.prototype.destroy=function(){this.destroySingleButton(),this.destroyListElements(!0),this.group&&this.group.destroy(),this.group=void 0},e.prototype.destroyListElements=function(t){var e=this.elementList;u(e,function(r,i){(t||!e[i].updated)&&((r=e[i]).button&&r.button.destroy(),r.separator&&r.separator.destroy(),delete r.button,delete r.separator,delete e[i])}),t&&(this.elementList={})},e.prototype.destroySingleButton=function(){this.chart.drillUpButton&&(this.chart.drillUpButton.destroy(),this.chart.drillUpButton=void 0)},e.prototype.resetElementListState=function(){u(this.elementList,function(t){t.updated=!1})},e.prototype.updateListElements=function(){for(var t,e,r=this.elementList,i=this.options.buttonSpacing,o=this.list,s=this.options.rtl,n=s?-1:1,a=function(t,e){return n*t.getBBox().width+n*e},l=function(t,e,r){t.translate(e-t.getBBox().width,r)},p=this.group?a(this.group,i):i,h=0,d=o.length;h<d;++h){var u=h===d-1,c=void 0,v=void 0;r[(e=o[h]).level]?(c=(t=r[e.level]).button,t.separator||u?t.separator&&u&&(t.separator.destroy(),delete t.separator):(p+=n*i,t.separator=this.renderSeparator(p,i),s&&l(t.separator,p,i),p+=a(t.separator,i)),r[e.level].updated=!0):(c=this.renderButton(e,p,i),s&&l(c,p,i),p+=a(c,i),u||(v=this.renderSeparator(p,i),s&&l(v,p,i),p+=a(v,i)),r[e.level]={button:c,separator:v,updated:!0}),c&&c.setState(u?2:0)}},e.defaultOptions=t.options,e}()}),r(e,"Series/ColorMapComposition.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var r,i=t.seriesTypes.column.prototype,o=e.addEvent,s=e.defined;return function(t){function e(t){this.moveToTopOnHover&&this.graphic&&this.graphic.attr({zIndex:t&&"hover"===t.state?1:0})}t.pointMembers={dataLabelOnNull:!0,moveToTopOnHover:!0,isValid:function(){return null!==this.value&&this.value!==1/0&&this.value!==-1/0&&(void 0===this.value||!isNaN(this.value))}},t.seriesMembers={colorKey:"value",axisTypes:["xAxis","yAxis","colorAxis"],parallelArrays:["x","y","value"],pointArrayMap:["value"],trackerGroups:["group","markerGroup","dataLabelsGroup"],colorAttribs:function(t){var e={};return s(t.color)&&(!t.state||"normal"===t.state)&&(e[this.colorProp||"fill"]=t.color),e},pointAttribs:i.pointAttribs},t.compose=function(t){return o(t.prototype.pointClass,"afterSetState",e),t}}(r||(r={})),r}),r(e,"Series/Treemap/TreemapAlgorithmGroup.js",[],function(){return function(){function t(t,e,r,i){this.height=t,this.width=e,this.plot=i,this.direction=r,this.startDirection=r,this.total=0,this.nW=0,this.lW=0,this.nH=0,this.lH=0,this.elArr=[],this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(t,e){return Math.max(t/e,e/t)}}}return t.prototype.addElement=function(t){this.lP.total=this.elArr[this.elArr.length-1],this.total=this.total+t,0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH)),this.elArr.push(t)},t.prototype.reset=function(){this.nW=0,this.lW=0,this.elArr=[],this.total=0},t}()}),r(e,"Series/Treemap/TreemapNode.js",[],function(){return function(){function t(){this.childrenTotal=0,this.visible=!1}return t.prototype.init=function(t,e,r,i,o,s,n){return this.id=t,this.i=e,this.children=r,this.height=i,this.level=o,this.series=s,this.parent=n,this},t}()}),r(e,"Series/DrawPointUtilities.js",[],function(){var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};return{draw:function(e,r){var i=r.animatableAttribs,o=r.onComplete,s=r.css,n=r.renderer,a=e.series&&e.series.chart.hasRendered?void 0:e.series&&e.series.options.animation,l=e.graphic;if(r.attribs=t(t({},r.attribs),{class:e.getClassName()})||{},e.shouldDraw())l||(l="text"===r.shapeType?n.text():"image"===r.shapeType?n.image(r.imageUrl||"").attr(r.shapeArgs||{}):n[r.shapeType](r.shapeArgs||{}),e.graphic=l,l.add(r.group)),s&&l.css(s),l.attr(r.attribs).animate(i,!r.isNew&&a,o);else if(l){var p=function(){e.graphic=l=l&&l.destroy(),"function"==typeof o&&o()};Object.keys(i).length?l.animate(i,void 0,function(){return p()}):p()}}}}),r(e,"Series/Treemap/TreemapPoint.js",[e["Series/DrawPointUtilities.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,r){var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),s=e.seriesTypes,n=s.pie.prototype.pointClass,a=s.scatter.prototype.pointClass,l=r.extend,p=r.isNumber,h=r.pick,d=function(e){function r(){var t=null!==e&&e.apply(this,arguments)||this;return t.shapeType="rect",t}return o(r,e),r.prototype.draw=function(e){t.draw(this,e)},r.prototype.getClassName=function(){var t=this.series,r=t.options,i=e.prototype.getClassName.call(this);return this.node.level<=t.nodeMap[t.rootNode].level?i+=" highcharts-above-level":this.node.isLeaf||h(r.interactByLeaf,!r.allowTraversingTree)?this.node.isLeaf||(i+=" highcharts-internal-node"):i+=" highcharts-internal-node-interactive",i},r.prototype.isValid=function(){return!!(this.id||p(this.value))},r.prototype.setState=function(t){e.prototype.setState.apply(this,arguments),this.graphic&&this.graphic.attr({zIndex:"hover"===t?1:0})},r.prototype.shouldDraw=function(){return p(this.plotY)&&null!==this.y},r}(a);return l(d.prototype,{setVisible:n.prototype.setVisible}),d}),r(e,"Series/Treemap/TreemapSeriesDefaults.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var r=e.isString;return{allowTraversingTree:!1,animationLimit:250,borderRadius:0,showInLegend:!1,marker:void 0,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var t=this&&this.point?this.point:{};return r(t.name)?t.name:""},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,colorKey:"colorValue",opacity:.15,states:{hover:{borderColor:"#999999",brightness:t.seriesTypes.heatmap?0:.1,halo:!1,opacity:.75,shadow:!1}},legendSymbol:"rectangle"}}),r(e,"Series/Treemap/TreemapUtilities.js",[],function(){var t;return(t||(t={})).recursive=function t(e,r,i){var o;!1!==(o=r.call(i||this,e))&&t(o,r,i)},t}),r(e,"Series/TreeUtilities.js",[e["Core/Color/Color.js"],e["Core/Utilities.js"]],function(t,e){var r=e.extend,i=e.isArray,o=e.isNumber,s=e.isObject,n=e.merge,a=e.pick,l=e.relativeLength;return{getColor:function(e,r){var i,o,s,n,l,p,h,d=r.index,u=r.mapOptionsToLevel,c=r.parentColor,v=r.parentColorIndex,f=r.series,g=r.colors,y=r.siblings,b=f.points,m=f.chart.options.chart;return e&&(o=b[e.i],s=u[e.level]||{},o&&s.colorByPoint&&(l=o.index%(g?g.length:m.colorCount),n=g&&g[l]),f.chart.styledMode||(p=a(o&&o.options.color,s&&s.color,n,c&&((i=s&&s.colorVariation)&&"brightness"===i.key&&d&&y?t.parse(c).brighten(i.to*(d/y)).get():c),f.color)),h=a(o&&o.options.colorIndex,s&&s.colorIndex,l,v,r.colorIndex)),{color:p,colorIndex:h}},getLevelOptions:function(t){var e,r,l,p,h,d,u={};if(s(t))for(p=o(t.from)?t.from:1,d=t.levels,r={},e=s(t.defaults)?t.defaults:{},i(d)&&(r=d.reduce(function(t,r){var i,l,h;return s(r)&&o(r.level)&&(l=a((h=n({},r)).levelIsConstant,e.levelIsConstant),delete h.levelIsConstant,delete h.level,s(t[i=r.level+(l?0:p-1)])?n(!0,t[i],h):t[i]=h),t},{})),h=o(t.to)?t.to:1,l=0;l<=h;l++)u[l]=n({},e,s(r[l])?r[l]:{});return u},getNodeWidth:function(t,e){var r=t.chart,i=t.options,o=i.nodeDistance,s=void 0===o?0:o,n=i.nodeWidth,a=void 0===n?0:n,p=r.plotSizeX,h=void 0===p?1:p;if("auto"===a){if("string"==typeof s&&/%$/.test(s))return h/(e+parseFloat(s)/100*(e-1));var d=Number(s);return(h+d)/(e||1)-d}return l(a,h)},setTreeValues:function t(e,i){var o=i.before,s=i.idRoot,n=i.mapIdToNode[s],l=!1!==i.levelIsConstant,p=i.points[e.i],h=p&&p.options||{},d=[],u=0;e.levelDynamic=e.level-(l?0:n.level),e.name=a(p&&p.name,""),e.visible=s===e.id||!0===i.visible,"function"==typeof o&&(e=o(e,i)),e.children.forEach(function(o,s){var n=r({},i);r(n,{index:s,siblings:e.children.length,visible:e.visible}),o=t(o,n),d.push(o),o.visible&&(u+=o.val)});var c=a(h.value,u);return e.visible=c>=0&&(u>0||e.visible),e.children=d,e.childrenTotal=u,e.isLeaf=e.visible&&!u,e.val=c,e},updateRootId:function(t){var e,r;return s(t)&&(r=s(t.options)?t.options:{},e=a(t.rootNode,r.rootId,""),s(t.userOptions)&&(t.userOptions.rootId=e),t.rootNode=e),e}}}),r(e,"Series/Treemap/TreemapSeries.js",[e["Extensions/Breadcrumbs/Breadcrumbs.js"],e["Core/Color/Color.js"],e["Series/ColorMapComposition.js"],e["Core/Globals.js"],e["Core/Series/SeriesRegistry.js"],e["Series/Treemap/TreemapAlgorithmGroup.js"],e["Series/Treemap/TreemapNode.js"],e["Series/Treemap/TreemapPoint.js"],e["Series/Treemap/TreemapSeriesDefaults.js"],e["Series/Treemap/TreemapUtilities.js"],e["Series/TreeUtilities.js"],e["Core/Utilities.js"]],function(t,e,r,i,o,s,n,a,l,p,h,d){var u,c=this&&this.__extends||(u=function(t,e){return(u=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}u(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),v=e.parse,f=i.composed,g=i.noop,y=o.seriesTypes,b=y.column,m=y.scatter,x=h.getColor,S=h.getLevelOptions,T=h.updateRootId,w=d.addEvent,P=d.correctFloat,L=d.defined,A=d.error,C=d.extend,O=d.fireEvent,R=d.isArray,B=d.isObject,j=d.isString,I=d.merge,M=d.pick,N=d.pushUnique,D=d.stableSort,_=!1;function U(){var t,e=this.xAxis,r=this.yAxis;e&&r&&(this.is("treemap")?(t={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,minPadding:0,max:100,maxPadding:0,startOnTick:!1,title:void 0,tickPositions:[]},C(r.options,t),C(e.options,t),_=!0):_&&(r.setOptions(r.userOptions),e.setOptions(e.userOptions),_=!1))}var E=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return c(r,e),r.compose=function(t){N(f,"TreemapSeries")&&w(t,"afterBindAxes",U)},r.prototype.algorithmCalcPoints=function(t,e,r,i){var o,s,n,a,l,p=r.plot,h=r.elArr.length-1,d=r.lW,u=r.lH,c=0;e?(d=r.nW,u=r.nH):l=r.elArr[h];for(var v=0,f=r.elArr;v<f.length;v++){var g=f[v];(e||c<h)&&(0===r.direction?(o=p.x,s=p.y,a=g/(n=d)):(o=p.x,s=p.y,n=g/(a=u)),i.push({x:o,y:s,width:n,height:P(a)}),0===r.direction?p.y=p.y+a:p.x=p.x+n),c+=1}r.reset(),0===r.direction?r.width=r.width-d:r.height=r.height-u,p.y=p.parent.y+(p.parent.height-r.height),p.x=p.parent.x+(p.parent.width-r.width),t&&(r.direction=1-r.direction),e||r.addElement(l)},r.prototype.algorithmFill=function(t,e,r){for(var i,o,s,n,a,l=[],p=e.direction,h=e.x,d=e.y,u=e.width,c=e.height,v=0;v<r.length;v++){var f=r[v];i=e.width*e.height*(f.val/e.val),o=h,s=d,0===p?(u-=n=i/(a=c),h+=n):(c-=a=i/(n=u),d+=a),l.push({x:o,y:s,width:n,height:a}),t&&(p=1-p)}return l},r.prototype.algorithmLowAspectRatio=function(t,e,r){for(var i,o=[],n={x:e.x,y:e.y,parent:e},a=e.direction,l=r.length-1,p=new s(e.height,e.width,a,n),h=0,d=0;d<r.length;d++){var u=r[d];i=e.width*e.height*(u.val/e.val),p.addElement(i),p.lP.nR>p.lP.lR&&this.algorithmCalcPoints(t,!1,p,o,n),h===l&&this.algorithmCalcPoints(t,!0,p,o,n),++h}return o},r.prototype.alignDataLabel=function(t,e,r){var i=r.style;i&&!L(i.textOverflow)&&e.text&&e.getBBox().width>(e.text.textWidth||0)&&e.css({textOverflow:"ellipsis",width:i.width+="px"}),b.prototype.alignDataLabel.apply(this,arguments),t.dataLabel&&t.dataLabel.attr({zIndex:(t.node.zIndex||0)+1})},r.prototype.calculateChildrenAreas=function(t,e){var r=this.options,i=this.mapOptionsToLevel[t.level+1],o=M(this[i&&i.layoutAlgorithm]&&i.layoutAlgorithm,r.layoutAlgorithm),s=r.alternateStartingDirection,n=t.children.filter(function(t){return!t.ignore}),a=[];i&&i.layoutStartingDirection&&(e.direction="vertical"===i.layoutStartingDirection?0:1),a=this[o](e,n);for(var l=-1,p=0;p<n.length;p++){var h=n[p],d=a[++l];h.values=I(d,{val:h.childrenTotal,direction:s?1-e.direction:e.direction}),h.pointValues=I(d,{x:d.x/this.axisRatio,y:100-d.y-d.height,width:d.width/this.axisRatio}),h.children.length&&this.calculateChildrenAreas(h,h.values)}},r.prototype.createList=function(t){var e=this.chart,r=e.breadcrumbs,i=[];if(r){var o=0;i.push({level:o,levelOptions:e.series[0]});for(var s=t.target.nodeMap[t.newRootId],n=[];s.parent||""===s.parent;)n.push(s),s=t.target.nodeMap[s.parent];for(var a=0,l=n.reverse();a<l.length;a++){var p=l[a];i.push({level:++o,levelOptions:p})}i.length<=1&&(i.length=0)}return i},r.prototype.drawDataLabels=function(){for(var t,r,i=this.mapOptionsToLevel,o=this.points.filter(function(t){return t.node.visible}),s=0;s<o.length;s++){var n=o[s];r=i[n.node.level],t={style:{}},n.node.isLeaf||(t.enabled=!1),r&&r.dataLabels&&(t=I(t,r.dataLabels),this.hasDataLabels=function(){return!0}),n.shapeArgs&&(t.style.width=n.shapeArgs.width,n.dataLabel&&n.dataLabel.css({width:n.shapeArgs.width+"px"})),n.dlOptions=I(t,n.options.dataLabels)}e.prototype.drawDataLabels.call(this)},r.prototype.drawPoints=function(t){void 0===t&&(t=this.points);for(var e=this.chart,r=e.renderer,i=e.styledMode,o=this.options,s=i?{}:o.shadow,n=o.borderRadius,a=e.pointCount<o.animationLimit,l=o.allowTraversingTree,p=0,h=t;p<h.length;p++){var d=h[p],u=d.node.levelDynamic,c={},v={},f={},g="level-group-"+d.node.level,y=!!d.graphic,b=a&&y,m=d.shapeArgs;d.shouldDraw()&&(d.isInside=!0,n&&(v.r=n),I(!0,b?c:v,y?m:{},i?{}:this.pointAttribs(d,d.selected?"select":void 0)),this.colorAttribs&&i&&C(f,this.colorAttribs(d)),this[g]||(this[g]=r.g(g).attr({zIndex:1e3-(u||0)}).add(this.group),this[g].survive=!0)),d.draw({animatableAttribs:c,attribs:v,css:f,group:this[g],imageUrl:d.imageUrl,renderer:r,shadow:s,shapeArgs:m,shapeType:d.shapeType}),l&&d.graphic&&(d.drillId=o.interactByLeaf?this.drillToByLeaf(d):this.drillToByGroup(d))}},r.prototype.drillToByGroup=function(t){var e=!1;return t.node.isLeaf||t.node.level-this.nodeMap[this.rootNode].level!=1||(e=t.id),e},r.prototype.drillToByLeaf=function(t){var e,r=!1;if(t.node.parent!==this.rootNode&&t.node.isLeaf)for(e=t.node;!r;)(e=this.nodeMap[e.parent]).parent===this.rootNode&&(r=e.id);return r},r.prototype.drillToNode=function(t,e){A(32,!1,void 0,{"treemap.drillToNode":"use treemap.setRootNode"}),this.setRootNode(t,e)},r.prototype.drillUp=function(){var t=this.nodeMap[this.rootNode];t&&j(t.parent)&&this.setRootNode(t.parent,!0,{trigger:"traverseUpButton"})},r.prototype.getExtremes=function(){var t=e.prototype.getExtremes.call(this,this.colorValueData),r=t.dataMin,i=t.dataMax;return this.valueMin=r,this.valueMax=i,e.prototype.getExtremes.call(this)},r.prototype.getListOfParents=function(t,e){for(var r=R(t)?t:[],i=R(e)?e:[],o=r.reduce(function(t,e,r){var i=M(e.parent,"");return void 0===t[i]&&(t[i]=[]),t[i].push(r),t},{"":[]}),s=0,n=Object.keys(o);s<n.length;s++){var a=n[s],l=o[a];if(""!==a&&-1===i.indexOf(a)){for(var p=0;p<l.length;p++){var h=l[p];o[""].push(h)}delete o[a]}}return o},r.prototype.getTree=function(){var t=this.data.map(function(t){return t.id}),e=this.getListOfParents(this.data,t);return this.nodeMap={},this.nodeList=[],this.buildTree("",-1,0,e)},r.prototype.buildTree=function(t,e,r,i,o){for(var s,n=[],a=this.points[e],l=0,p=0,h=i[t]||[];p<h.length;p++){var d=h[p];l=Math.max((s=this.buildTree(this.points[d].id,d,r+1,i,t)).height+1,l),n.push(s)}for(var u=new this.NodeClass().init(t,e,n,l,r,this,o),c=0;c<n.length;c++)n[c].parentNode=u;return this.nodeMap[u.id]=u,this.nodeList.push(u),a&&(a.node=u,u.point=a),u},r.prototype.hasData=function(){return!!this.processedXData.length},r.prototype.init=function(r,i){var o=this,s=I(i.drillUpButton,i.breadcrumbs),n=w(o,"setOptions",function(t){var e=t.userOptions;L(e.allowDrillToNode)&&!L(e.allowTraversingTree)&&(e.allowTraversingTree=e.allowDrillToNode,delete e.allowDrillToNode),L(e.drillUpButton)&&!L(e.traverseUpButton)&&(e.traverseUpButton=e.drillUpButton,delete e.drillUpButton)});e.prototype.init.call(this,r,i),delete o.opacity,o.eventsToUnbind.push(n),o.options.allowTraversingTree&&(o.eventsToUnbind.push(w(o,"click",o.onClickDrillToNode)),o.eventsToUnbind.push(w(o,"setRootNode",function(t){var e=o.chart;e.breadcrumbs&&e.breadcrumbs.updateProperties(o.createList(t))})),o.eventsToUnbind.push(w(o,"update",function(t,e){var r=this.chart.breadcrumbs;r&&t.options.breadcrumbs&&r.update(t.options.breadcrumbs)})),o.eventsToUnbind.push(w(o,"destroy",function(t){var e=this.chart;e.breadcrumbs&&!t.keepEventsForUpdate&&(e.breadcrumbs.destroy(),e.breadcrumbs=void 0)}))),r.breadcrumbs||(r.breadcrumbs=new t(r,s)),o.eventsToUnbind.push(w(r.breadcrumbs,"up",function(t){for(var e=this.level-t.newLevel,r=0;r<e;r++)o.drillUp()}))},r.prototype.onClickDrillToNode=function(t){var e=t.point,r=e&&e.drillId;j(r)&&(e.setState(""),this.setRootNode(r,!0,{trigger:"click"}))},r.prototype.pointAttribs=function(t,e){var r,i=B(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},o=t&&i[t.node.level]||{},s=this.options,n=e&&s.states&&s.states[e]||{},a=t&&t.getClassName()||"",l={stroke:t&&t.borderColor||o.borderColor||n.borderColor||s.borderColor,"stroke-width":M(t&&t.borderWidth,o.borderWidth,n.borderWidth,s.borderWidth),dashstyle:t&&t.borderDashStyle||o.borderDashStyle||n.borderDashStyle||s.borderDashStyle,fill:t&&t.color||this.color};return -1!==a.indexOf("highcharts-above-level")?(l.fill="none",l["stroke-width"]=0):-1!==a.indexOf("highcharts-internal-node-interactive")?(r=M(n.opacity,s.opacity),l.fill=v(l.fill).setOpacity(r).get(),l.cursor="pointer"):-1!==a.indexOf("highcharts-internal-node")?l.fill="none":e&&(l.fill=v(l.fill).brighten(n.brightness).get()),l},r.prototype.setColorRecursive=function(t,e,r,i,o){var s=this&&this.chart,n=s&&s.options&&s.options.colors;if(t){var a=x(t,{colors:n,index:i,mapOptionsToLevel:this.mapOptionsToLevel,parentColor:e,parentColorIndex:r,series:this,siblings:o}),l=this.points[t.i];l&&(l.color=a.color,l.colorIndex=a.colorIndex);for(var p=-1,h=0,d=t.children||[];h<d.length;h++){var u=d[h];this.setColorRecursive(u,a.color,a.colorIndex,++p,t.children.length)}}},r.prototype.setPointValues=function(){for(var t=this.points,e=this.xAxis,r=this.yAxis,i=this.chart.styledMode,o=0;o<t.length;o++){var s=t[o],n=s.node,a=n.pointValues,l=n.visible;if(a&&l){var p=a.height,h=a.width,d=a.x,u=a.y,c=i?0:(this.pointAttribs(s)["stroke-width"]||0)%2/2,v=Math.round(e.toPixels(d,!0))-c,f=Math.round(e.toPixels(d+h,!0))-c,g=Math.round(r.toPixels(u,!0))-c,y=Math.round(r.toPixels(u+p,!0))-c,b={x:Math.min(v,f),y:Math.min(g,y),width:Math.abs(f-v),height:Math.abs(y-g)};s.plotX=b.x+b.width/2,s.plotY=b.y+b.height/2,s.shapeArgs=b}else delete s.plotX,delete s.plotY}},r.prototype.setRootNode=function(t,e,r){O(this,"setRootNode",C({newRootId:t,previousRootId:this.rootNode,redraw:M(e,!0),series:this},r),function(t){var e=t.series;e.idPreviousRoot=t.previousRootId,e.rootNode=t.newRootId,e.isDirty=!0,t.redraw&&e.chart.redraw()})},r.prototype.setState=function(t){this.options.inactiveOtherPoints=!0,e.prototype.setState.call(this,t,!1),this.options.inactiveOtherPoints=!1},r.prototype.setTreeValues=function(t){for(var e=this.options,r=this.rootNode,i=this.nodeMap[r],o="boolean"!=typeof e.levelIsConstant||e.levelIsConstant,s=[],n=this.points[t.i],a=0,l=0,p=t.children;l<p.length;l++){var h=p[l];h=this.setTreeValues(h),s.push(h),h.ignore||(a+=h.val)}D(s,function(t,e){return(t.sortIndex||0)-(e.sortIndex||0)});var d=M(n&&n.options.value,a);return n&&(n.value=d),C(t,{children:s,childrenTotal:a,ignore:!(M(n&&n.visible,!0)&&d>0),isLeaf:t.visible&&!a,levelDynamic:t.level-(o?0:i.level),name:M(n&&n.name,""),sortIndex:M(n&&n.sortIndex,-d),val:d}),t},r.prototype.sliceAndDice=function(t,e){return this.algorithmFill(!0,t,e)},r.prototype.squarified=function(t,e){return this.algorithmLowAspectRatio(!0,t,e)},r.prototype.strip=function(t,e){return this.algorithmLowAspectRatio(!1,t,e)},r.prototype.stripes=function(t,e){return this.algorithmFill(!1,t,e)},r.prototype.translate=function(){var t,r,i,o,s=this,n=s.options,a=T(s);e.prototype.translate.call(this);var l=s.tree=s.getTree();t=s.nodeMap[a],""===a||t&&t.children.length||(s.setRootNode("",!1),a=s.rootNode,t=s.nodeMap[a]),s.mapOptionsToLevel=S({from:t.level+1,levels:n.levels,to:l.height,defaults:{levelIsConstant:s.options.levelIsConstant,colorByPoint:n.colorByPoint}}),p.recursive(s.nodeMap[s.rootNode],function(t){var e=t.parent,r=!1;return t.visible=!0,(e||""===e)&&(r=s.nodeMap[e]),r}),p.recursive(s.nodeMap[s.rootNode].children,function(t){for(var e=!1,r=0;r<t.length;r++){var i=t[r];i.visible=!0,i.children.length&&(e=(e||[]).concat(i.children))}return e}),s.setTreeValues(l),s.axisRatio=s.xAxis.len/s.yAxis.len,s.nodeMap[""].pointValues=r={x:0,y:0,width:100,height:100},s.nodeMap[""].values=i=I(r,{width:r.width*s.axisRatio,direction:"vertical"===n.layoutStartingDirection?0:1,val:l.val}),s.calculateChildrenAreas(l,i),s.colorAxis||n.colorByPoint||s.setColorRecursive(s.tree),n.allowTraversingTree&&(o=t.pointValues,s.xAxis.setExtremes(o.x,o.x+o.width,!1),s.yAxis.setExtremes(o.y,o.y+o.height,!1),s.xAxis.setScale(),s.yAxis.setScale()),s.setPointValues()},r.defaultOptions=I(m.defaultOptions,l),r}(m);return C(E.prototype,{buildKDTree:g,colorAttribs:r.seriesMembers.colorAttribs,colorKey:"colorValue",directTouch:!0,getExtremesFromAll:!0,getSymbol:g,optionalAxis:"colorAxis",parallelArrays:["x","y","value","colorValue"],pointArrayMap:["value"],pointClass:a,NodeClass:n,trackerGroups:["group","dataLabelsGroup"],utils:p}),r.compose(E),o.registerSeriesType("treemap",E),E}),r(e,"Series/Sunburst/SunburstPoint.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var r,i=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),o=t.series.prototype.pointClass,s=t.seriesTypes.treemap.prototype.pointClass,n=e.correctFloat,a=e.extend,l=e.pInt,p=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.getDataLabelPath=function(t){var e,r,i=this.series.chart.renderer,o=this.shapeExisting,s=o.r+l((null===(e=t.options)||void 0===e?void 0:e.distance)||0),a=o.start,p=o.end,h=a+(p-a)/2,d=h<0&&h>-Math.PI||h>Math.PI;return a===-Math.PI/2&&n(p)===n(1.5*Math.PI)&&(a=-Math.PI+Math.PI/360,p=-Math.PI/360,d=!0),p-a>Math.PI&&(d=!1,r=!0,p-a>2*Math.PI-.01&&(a+=.01,p-=.01)),this.dataLabelPath&&(this.dataLabelPath=this.dataLabelPath.destroy()),this.dataLabelPath=i.arc({open:!0,longArc:r?1:0}).attr({start:d?a:p,end:d?p:a,clockwise:+d,x:o.x,y:o.y,r:(s+o.innerR)/2}).add(i.defs),this.dataLabelPath},e.prototype.isValid=function(){return!0},e}(s);return a(p.prototype,{getClassName:o.prototype.getClassName,haloPath:o.prototype.haloPath,setState:o.prototype.setState}),p}),r(e,"Series/Sunburst/SunburstUtilities.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){var r=t.seriesTypes.treemap,i=e.isNumber,o=e.isObject,s=e.merge;function n(t,e){var r=[];if(i(t)&&i(e)&&t<=e)for(var o=t;o<=e;o++)r.push(o);return r}return{calculateLevelSizes:function(t,e){var r,a,l,p,h,d=o(e)?e:{},u=0;if(o(t)){r=s({},t),l=n(i(d.from)?d.from:0,i(d.to)?d.to:0),p=Object.keys(r).filter(function(t){return -1===l.indexOf(+t)}),a=h=i(d.diffRadius)?d.diffRadius:0;for(var c=0;c<l.length;c++){var v=l[c],f=r[v],g=f.levelSize.unit,y=f.levelSize.value;"weight"===g?u+=y:"percentage"===g?(f.levelSize={unit:"pixels",value:y/100*a},h-=f.levelSize.value):"pixels"===g&&(h-=y)}for(var b=0;b<l.length;b++){var v=l[b],f=r[v];if("weight"===f.levelSize.unit){var m=f.levelSize.value;r[v].levelSize={unit:"pixels",value:m/u*h}}}for(var x=0;x<p.length;x++){var v=p[x];r[v].levelSize={value:0,unit:"pixels"}}}return r},getLevelFromAndTo:function(t){var e=t.level;return{from:e>0?e:1,to:e+t.height}},range:n,recursive:r.prototype.utils.recursive}}),r(e,"Series/Sunburst/SunburstNode.js",[e["Series/Treemap/TreemapNode.js"]],function(t){var e,r=this&&this.__extends||(e=function(t,r){return(e=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,r)},function(t,r){if("function"!=typeof r&&null!==r)throw TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)});return function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e}(t)}),r(e,"Series/Sunburst/SunburstSeriesDefaults.js",[],function(){return{center:["50%","50%"],clip:!1,colorByPoint:!1,opacity:1,dataLabels:{allowOverlap:!0,defer:!0,rotationMode:"circular",style:{textOverflow:"ellipsis"}},rootId:void 0,levelIsConstant:!0,levelSize:{value:1,unit:"weight"},slicedOffset:10}}),r(e,"Series/Sunburst/SunburstSeries.js",[e["Series/CenteredUtilities.js"],e["Core/Globals.js"],e["Core/Series/SeriesRegistry.js"],e["Series/Sunburst/SunburstPoint.js"],e["Series/Sunburst/SunburstUtilities.js"],e["Series/TreeUtilities.js"],e["Core/Utilities.js"],e["Series/Sunburst/SunburstNode.js"],e["Series/Sunburst/SunburstSeriesDefaults.js"]],function(t,e,r,i,o,s,n,a,l){var p,h=this&&this.__extends||(p=function(t,e){return(p=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),d=t.getCenter,u=t.getStartAndEndRadians,c=e.noop,v=r.seriesTypes,f=v.column,g=v.treemap,y=s.getColor,b=s.getLevelOptions,m=s.setTreeValues,x=s.updateRootId,S=n.defined,T=n.error,w=n.extend,P=n.fireEvent,L=n.isNumber,A=n.isObject,C=n.isString,O=n.merge,R=n.splat,B=180/Math.PI,j=function(t,e,r,i){return{x:t+Math.cos(r)*i,y:e+Math.sin(r)*i}};function I(t,e){var r=e.mapIdToNode,i=t.parent,o=i?r[i]:void 0,s=e.series,n=s.chart,a=s.points[t.i],l=y(t,{colors:s.options.colors||n&&n.options.colors,colorIndex:s.colorIndex,index:e.index,mapOptionsToLevel:e.mapOptionsToLevel,parentColor:o&&o.color,parentColorIndex:o&&o.colorIndex,series:e.series,siblings:e.siblings});return t.color=l.color,t.colorIndex=l.colorIndex,a&&(a.color=t.color,a.colorIndex=t.colorIndex,t.sliced=t.id!==e.idRoot&&a.sliced),t}var M=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return h(e,t),e.prototype.alignDataLabel=function(e,r,i){if(!i.textPath||!i.textPath.enabled)return t.prototype.alignDataLabel.apply(this,arguments)},e.prototype.animate=function(t){var e,r=this.chart,i=[r.plotWidth/2,r.plotHeight/2],o=r.plotLeft,s=r.plotTop,n=this.group;t?(e={translateX:i[0]+o,translateY:i[1]+s,scaleX:.001,scaleY:.001,rotation:10,opacity:.01},n.attr(e)):(e={translateX:o,translateY:s,scaleX:1,scaleY:1,rotation:0,opacity:1},n.animate(e,this.options.animation))},e.prototype.drawPoints=function(){var t,e=this,r=e.mapOptionsToLevel,i=e.shapeRoot,o=e.group,s=e.hasRendered,n=e.rootNode,a=e.idPreviousRoot,l=e.nodeMap,p=l[a],h=p&&p.shapeArgs,d=e.points,u=e.startAndEndRadians,c=e.chart,v=c&&c.options&&c.options.chart||{},g="boolean"!=typeof v.animation||v.animation,y=e.center,b={x:y[0],y:y[1]},m=y[3]/2,x=e.chart.renderer,T=!!(g&&s&&n!==a&&e.dataLabelsGroup),P=!1,C=!1;T&&(e.dataLabelsGroup.attr({opacity:0}),t=function(){P=!0,e.dataLabelsGroup&&e.dataLabelsGroup.animate({opacity:1,visibility:"inherit"})});for(var j=0;j<d.length;j++){var I=d[j],M=I.node,N=r[M.level],D=I.shapeExisting||{},_=M.shapeArgs||{},U=!!(M.visible&&M.shapeArgs),E=void 0,W=void 0;_.borderRadius=e.options.borderRadius,E=s&&g?function(t,e){var r=e.point,i=e.radians,o=e.innerR,s=e.idRoot,n=e.idPreviousRoot,a=e.shapeExisting,l=e.shapeRoot,p=e.shapePreviousRoot,h=e.visible,d={},u={end:t.end,start:t.start,innerR:t.innerR,r:t.r,x:t.x,y:t.y};return h?!r.graphic&&p&&((d=s===r.id?{start:i.start,end:i.end}:p.end<=t.start?{start:i.end,end:i.end}:{start:i.start,end:i.start}).innerR=d.r=o):r.graphic&&(n===r.id?u={innerR:o,r:o}:l&&(u=l.end<=a.start?{innerR:o,r:o,start:i.end,end:i.end}:{innerR:o,r:o,start:i.start,end:i.start})),{from:d,to:u}}(_,{center:b,point:I,radians:u,innerR:m,idRoot:n,idPreviousRoot:a,shapeExisting:D,shapeRoot:i,shapePreviousRoot:h,visible:U}):{to:_,from:{}},w(I,{shapeExisting:_,tooltipPos:[_.plotX,_.plotY],drillId:function(t,e,r){var i;return t.node.isLeaf||(i=e===t.id?r[e].parent:t.id),i}(I,n,l),name:""+(I.name||I.id||I.index),plotX:_.plotX,plotY:_.plotY,value:M.val,isInside:U,isNull:!U}),I.dlOptions=function(t){var e,r,i=t.point,o=A(t.shapeArgs)?t.shapeArgs:{},s=A(t.optionsPoint)?t.optionsPoint.dataLabels:{},n=O({style:{}},R(A(t.level)?t.level.dataLabels:{})[0],s),a=n.rotationMode;return L(n.rotation)||(("auto"===a||"circular"===a)&&(n.useHTML&&"circular"===a&&(a="auto"),i.innerArcLength<1&&i.outerArcLength>o.radius?(e=0,i.dataLabelPath&&"circular"===a&&(n.textPath={enabled:!0})):i.innerArcLength>1&&i.outerArcLength>1.5*o.radius?"circular"===a?n.textPath={enabled:!0,attributes:{dy:5}}:a="parallel":(i.dataLabel&&i.dataLabel.textPath&&"circular"===a&&(n.textPath={enabled:!1}),a="perpendicular")),"auto"!==a&&"circular"!==a&&(i.dataLabel&&i.dataLabel.textPath&&(n.textPath={enabled:!1}),e=o.end-(o.end-o.start)/2),"parallel"===a?n.style.width=Math.min(2.5*o.radius,(i.outerArcLength+i.innerArcLength)/2):!S(n.style.width)&&o.radius&&(n.style.width=1===i.node.level?2*o.radius:o.radius),"perpendicular"===a&&i.outerArcLength<16&&(n.style.width=1),n.style.width=Math.max(n.style.width-2*(n.padding||0),1),r=e*B%180,"parallel"===a&&(r-=90),r>90?r-=180:r<-90&&(r+=180),n.rotation=r),n.textPath&&(0===i.shapeExisting.innerR&&n.textPath.enabled?(n.rotation=0,n.textPath.enabled=!1,n.style.width=Math.max(2*i.shapeExisting.r-2*(n.padding||0),1)):i.dlOptions&&i.dlOptions.textPath&&!i.dlOptions.textPath.enabled&&"circular"===a&&(n.textPath.enabled=!0),n.textPath.enabled&&(n.rotation=0,n.style.width=Math.max((i.outerArcLength+i.innerArcLength)/2-2*(n.padding||0),1))),n}({point:I,level:N,optionsPoint:I.options,shapeArgs:_}),!C&&U&&(C=!0,W=t),I.draw({animatableAttribs:E.to,attribs:w(E.from,!c.styledMode&&e.pointAttribs(I,I.selected&&"select")),onComplete:W,group:o,renderer:x,shapeType:"arc",shapeArgs:_})}T&&C?(e.hasRendered=!1,e.options.dataLabels.defer=!0,f.prototype.drawDataLabels.call(e),e.hasRendered=!0,P&&t()):f.prototype.drawDataLabels.call(e),e.idPreviousRoot=n},e.prototype.layoutAlgorithm=function(t,e,r){var i=t.start,o=t.end-i,s=t.val,n=t.x,a=t.y,l=r&&A(r.levelSize)&&L(r.levelSize.value)?r.levelSize.value:0,p=t.r,h=p+l,d=r&&L(r.slicedOffset)?r.slicedOffset:0;return(e||[]).reduce(function(t,e){var r=1/s*e.val*o,u=j(n,a,i+r/2,d),c={x:e.sliced?u.x:n,y:e.sliced?u.y:a,innerR:p,r:h,radius:l,start:i,end:i+r};return t.push(c),i=c.end,t},[])},e.prototype.setRootNode=function(e,r,i){if(1===this.nodeMap[e].level&&1===this.nodeList.filter(function(t){return 1===t.level}).length){if(""===this.idPreviousRoot)return;e=""}t.prototype.setRootNode.call(this,e,r,i)},e.prototype.setShapeArgs=function(t,e,r){var i=r[t.level+1],o=t.children.filter(function(t){return t.visible}),s=[];s=this.layoutAlgorithm(e,o,i);for(var n=-1,a=0;a<o.length;a++){var l=o[a],p=s[++n],h=p.start+(p.end-p.start)/2,d=p.innerR+(p.r-p.innerR)/2,u=p.end-p.start,c=0===p.innerR&&u>6.28?{x:p.x,y:p.y}:j(p.x,p.y,h,d),v=l.val?l.childrenTotal>l.val?l.childrenTotal:l.val:l.childrenTotal;this.points[l.i]&&(this.points[l.i].innerArcLength=u*p.innerR,this.points[l.i].outerArcLength=u*p.r),l.shapeArgs=O(p,{plotX:c.x,plotY:c.y}),l.values=O(p,{val:v}),l.children.length&&this.setShapeArgs(l,l.values,r)}},e.prototype.translate=function(){var t,e=this.options,r=this.center=this.getCenter(),i=this.startAndEndRadians=u(e.startAngle,e.endAngle),s=r[3]/2,n=r[2]/2,a=x(this),l=this.nodeMap,p=l&&l[a],h={};this.shapeRoot=p&&p.shapeArgs,this.processedXData||this.processData(),this.generatePoints(),P(this,"afterTranslate");var d=this.tree=this.getTree(),c=C((p=(l=this.nodeMap)[a]).parent)?p.parent:"",v=l[c],f=o.getLevelFromAndTo(p),g=f.from,y=f.to;t=b({from:g,levels:this.options.levels,to:y,defaults:{colorByPoint:e.colorByPoint,dataLabels:e.dataLabels,levelIsConstant:e.levelIsConstant,levelSize:e.levelSize,slicedOffset:e.slicedOffset}}),t=o.calculateLevelSizes(t,{diffRadius:n-s,from:g,to:y}),m(d,{before:I,idRoot:a,levelIsConstant:e.levelIsConstant,mapOptionsToLevel:t,mapIdToNode:l,points:this.points,series:this});var S=l[""].shapeArgs={end:i.end,r:s,start:i.start,val:p.val,x:r[0],y:r[1]};this.setShapeArgs(v,S,t),this.mapOptionsToLevel=t;for(var w=0,L=this.points;w<L.length;w++){var A=L[w];h[A.id]&&T(31,!1,this.chart),h[A.id]=!0}},e.defaultOptions=O(g.defaultOptions,l),e}(g);return w(M.prototype,{axisTypes:[],drawDataLabels:c,getCenter:d,isCartesian:!1,onPointSupported:!0,pointAttribs:f.prototype.pointAttribs,pointClass:i,NodeClass:a,utils:o}),r.registerSeriesType("sunburst",M),M}),r(e,"masters/modules/sunburst.src.js",[e["Core/Globals.js"],e["Extensions/Breadcrumbs/Breadcrumbs.js"]],function(t,e){return t.Breadcrumbs=t.Breadcrumbs||e,t.Breadcrumbs.compose(t.Chart,t.defaultOptions),t})});