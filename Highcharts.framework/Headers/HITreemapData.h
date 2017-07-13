/**
* (c) 2009-2017 Highsoft AS
*
* License: www.highcharts.com/license
* For commercial usage, a valid license is required. To purchase a license for Highcharts iOS, please see our website: https://shop.highsoft.com/
* In case of questions, please contact sales@highsoft.com
*/

#import "HITreemapDataEvents.h"
#import "HIColor.h"


/**
* description: An array of data points for the series. For the treemap series type, points can be given in the following ways:
 
An array of numerical values. In this case, the numerical values will 
 	be interpreted as value options.  Example:
data: [0, 5, 3, 5]

An array of objects with named values. The objects are
 	point configuration objects as seen below. If the total number of data points exceeds the series' turboThreshold, this option is not available.
data: [{
    value: 7,
    name: "Point2",
    color: "#00FF00"
}, {
    value: 2,
    name: "Point1",
    color: "#FF00FF"
}]

* demo: The demos use a line series, but the principle is the same for all types.

http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/chart/reflow-true/ : Numerical values
http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/series/data-array-of-arrays/ : Arrays of numeric x and y
http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/series/data-array-of-arrays-datetime/ : Arrays of datetime x and y
http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/series/data-array-of-name-value/ : Arrays of point.name and y
http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/series/data-array-of-objects/ :  Config objects

*/
@interface HITreemapData: HIChartsJSONSerializable

/**
* description: Individual point events
*/
@property(nonatomic, readwrite) HITreemapDataEvents *events;
/**
* description: Whether the data point is selected initially.
* default: false
*/
@property(nonatomic, readwrite) NSNumber /* Bool */ *selected;
/**
* description: Requires Accessibility module
A description of the point to add to the screen reader information about the point.
* demo: http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/maps/accessibility/accessible-map/ : Accessible map
* default: undefined
*/
@property(nonatomic, readwrite) NSString *definition;
/**
* description: The id of a series in the drilldown.series array to use for a drilldown for this point.
* demo: http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/drilldown/basic/ : Basic drilldown
*/
@property(nonatomic, readwrite) NSString *drilldown;
/**
* description: The name of the point as shown in the legend, tooltip, dataLabel etc.
If the xAxis.type is set to category, and no categories option exists, the category will be pulled from the point.name of the last series defined. For multiple series, best practice however is to define xAxis.categories.
* demo: http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/series/data-array-of-objects/ : Point names
*/
@property(nonatomic, readwrite) NSString *name;
/**
* description: Individual data label for each point. The options are the same as the ones for  plotOptions.series.dataLabels
* demo: http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/point/datalabels/ : Show a label for the last value
*/
@property(nonatomic, readwrite) id dataLabels;
/**
* description: The rank for this point's data label in case of collision. If two data labels are about to overlap, only the one with the highest labelrank will be drawn.
*/
@property(nonatomic, readwrite) NSNumber *labelrank;
/**
* description: Serves a purpose only if a colorAxis object is defined in the chart options. This value will decide which color the point gets from the scale of the colorAxis.
* demo: http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/demo/treemap-coloraxis : Treemap with a colorAxis
* default: undefined
*/
@property(nonatomic, readwrite) NSNumber *colorValue;
/**
* description: http://www.highcharts.com/docs/chart-design-and-style/style-by-css : Styled mode only. A specific color index to use for the point, so its graphic representations are given the class name highcharts-color-{n}.
*/
@property(nonatomic, readwrite) NSNumber *colorIndex;
/**
* description: An additional, individual class name for the data point's graphic representation.
*/
@property(nonatomic, readwrite) NSString *className;
/**
* description: An id for the point. This can be used after render time to get a pointer to the point object through chart.get().
* demo: http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/point/id/ : Remove an id'd point
*/
@property(nonatomic, readwrite) NSString *id;
/**
* description: The value of the point, resulting in a relative area of the point in the treemap.
*/
@property(nonatomic, readwrite) NSNumber *value;
/**
* description: The color of the point. In heat maps the point color is rarely set explicitly, as we use the color to denote the value. Options for this are set in the colorAxis configuration.
*/
@property(nonatomic, readwrite) HIColor *color;
/**
* description: Only for treemap. Use this option to build a tree structure. The value should be the id of the point which is the parent. If no points has a matching id, or this option is undefined, then the parent will be set to the root.
* demo: http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/point/parent/ : Point parent, http://jsfiddle.net/gh/get/jquery/3.1.1/highcharts/highcharts/tree/master/samples/highcharts/demo/treemap-with-levels/ : Example where parent id is not matching
* default: undefined
*/
@property(nonatomic, readwrite) NSString *parent;

-(NSDictionary *)getParams;

@end
