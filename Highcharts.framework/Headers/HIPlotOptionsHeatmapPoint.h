/**
* (c) 2009-2017 Highsoft AS
*
* License: www.highcharts.com/license
* For commercial usage, a valid license is required. To purchase a license for Highcharts iOS, please see our website: https://shop.highsoft.com/
* In case of questions, please contact sales@highsoft.com
*/

#import "HIPlotOptionsHeatmapPointEvents.h"


/**
* description: Properties for each single point
*/
@interface HIPlotOptionsHeatmapPoint: HIChartsJSONSerializable

/**
* description: Events for each single point
*/
@property(nonatomic, readwrite) HIPlotOptionsHeatmapPointEvents *events;

-(NSDictionary *)getParams;

@end
