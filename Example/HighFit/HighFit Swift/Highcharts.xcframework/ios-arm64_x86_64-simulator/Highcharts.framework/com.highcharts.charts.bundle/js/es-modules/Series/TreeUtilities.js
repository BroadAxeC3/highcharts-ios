/* *
 *
 *  (c) 2014-2024 Highsoft AS
 *
 *  Authors: Jon Arild Nygard / Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Color from '../Core/Color/Color.js';
import U from '../Core/Utilities.js';
const { extend, isArray, isNumber, isObject, merge, pick, relativeLength } = U;
/* *
 *
 *  Functions
 *
 * */
/* eslint-disable valid-jsdoc */
/**
 * @private
 */
function getColor(node, options) {
    const index = options.index, mapOptionsToLevel = options.mapOptionsToLevel, parentColor = options.parentColor, parentColorIndex = options.parentColorIndex, series = options.series, colors = options.colors, siblings = options.siblings, points = series.points, chartOptionsChart = series.chart.options.chart;
    let getColorByPoint, point, level, colorByPoint, colorIndexByPoint, color, colorIndex;
    /**
     * @private
     */
    const variateColor = (color) => {
        const colorVariation = level && level.colorVariation;
        if (colorVariation &&
            colorVariation.key === 'brightness' &&
            index &&
            siblings) {
            return Color.parse(color).brighten(colorVariation.to * (index / siblings)).get();
        }
        return color;
    };
    if (node) {
        point = points[node.i];
        level = mapOptionsToLevel[node.level] || {};
        getColorByPoint = point && level.colorByPoint;
        if (getColorByPoint) {
            colorIndexByPoint = point.index % (colors ?
                colors.length :
                chartOptionsChart.colorCount);
            colorByPoint = colors && colors[colorIndexByPoint];
        }
        // Select either point color, level color or inherited color.
        if (!series.chart.styledMode) {
            color = pick(point && point.options.color, level && level.color, colorByPoint, parentColor && variateColor(parentColor), series.color);
        }
        colorIndex = pick(point && point.options.colorIndex, level && level.colorIndex, colorIndexByPoint, parentColorIndex, options.colorIndex);
    }
    return {
        color: color,
        colorIndex: colorIndex
    };
}
/**
 * Creates a map from level number to its given options.
 *
 * @private
 *
 * @param {Object} params
 * Object containing parameters.
 * - `defaults` Object containing default options. The default options are
 *   merged with the userOptions to get the final options for a specific
 *   level.
 * - `from` The lowest level number.
 * - `levels` User options from series.levels.
 * - `to` The highest level number.
 *
 * @return {Highcharts.Dictionary<object>|null}
 * Returns a map from level number to its given options.
 */
function getLevelOptions(params) {
    let result = {}, defaults, converted, i, from, to, levels;
    if (isObject(params)) {
        from = isNumber(params.from) ? params.from : 1;
        levels = params.levels;
        converted = {};
        defaults = isObject(params.defaults) ? params.defaults : {};
        if (isArray(levels)) {
            converted = levels.reduce((obj, item) => {
                let level, levelIsConstant, options;
                if (isObject(item) && isNumber(item.level)) {
                    options = merge({}, item);
                    levelIsConstant = pick(options.levelIsConstant, defaults.levelIsConstant);
                    // Delete redundant properties.
                    delete options.levelIsConstant;
                    delete options.level;
                    // Calculate which level these options apply to.
                    level = item.level + (levelIsConstant ? 0 : from - 1);
                    if (isObject(obj[level])) {
                        merge(true, obj[level], options); // #16329
                    }
                    else {
                        obj[level] = options;
                    }
                }
                return obj;
            }, {});
        }
        to = isNumber(params.to) ? params.to : 1;
        for (i = 0; i <= to; i++) {
            result[i] = merge({}, defaults, isObject(converted[i]) ? converted[i] : {});
        }
    }
    return result;
}
/**
 * @private
 * @todo Combine buildTree and buildNode with setTreeValues
 * @todo Remove logic from Treemap and make it utilize this mixin.
 */
function setTreeValues(tree, options) {
    const before = options.before, idRoot = options.idRoot, mapIdToNode = options.mapIdToNode, nodeRoot = mapIdToNode[idRoot], levelIsConstant = (options.levelIsConstant !== false), points = options.points, point = points[tree.i], optionsPoint = point && point.options || {}, children = [];
    let childrenTotal = 0;
    tree.levelDynamic = tree.level - (levelIsConstant ? 0 : nodeRoot.level);
    tree.name = pick(point && point.name, '');
    tree.visible = (idRoot === tree.id ||
        options.visible === true);
    if (typeof before === 'function') {
        tree = before(tree, options);
    }
    // First give the children some values
    tree.children.forEach((child, i) => {
        const newOptions = extend({}, options);
        extend(newOptions, {
            index: i,
            siblings: tree.children.length,
            visible: tree.visible
        });
        child = setTreeValues(child, newOptions);
        children.push(child);
        if (child.visible) {
            childrenTotal += child.val;
        }
    });
    // Set the values
    const value = pick(optionsPoint.value, childrenTotal);
    tree.visible = value >= 0 && (childrenTotal > 0 || tree.visible);
    tree.children = children;
    tree.childrenTotal = childrenTotal;
    tree.isLeaf = tree.visible && !childrenTotal;
    tree.val = value;
    return tree;
}
/**
 * Update the rootId property on the series. Also makes sure that it is
 * accessible to exporting.
 *
 * @private
 *
 * @param {Object} series
 * The series to operate on.
 *
 * @return {string}
 * Returns the resulting rootId after update.
 */
function updateRootId(series) {
    let rootId, options;
    if (isObject(series)) {
        // Get the series options.
        options = isObject(series.options) ? series.options : {};
        // Calculate the rootId.
        rootId = pick(series.rootNode, options.rootId, '');
        // Set rootId on series.userOptions to pick it up in exporting.
        if (isObject(series.userOptions)) {
            series.userOptions.rootId = rootId;
        }
        // Set rootId on series to pick it up on next update.
        series.rootNode = rootId;
    }
    return rootId;
}
/**
 * Get the node width, which relies on the plot width and the nodeDistance
 * option.
 *
 * @private
 */
function getNodeWidth(series, columnCount) {
    const { chart, options } = series, { nodeDistance = 0, nodeWidth = 0 } = options, { plotSizeX = 1 } = chart;
    // Node width auto means they are evenly distributed along the width of
    // the plot area
    if (nodeWidth === 'auto') {
        if (typeof nodeDistance === 'string' && /%$/.test(nodeDistance)) {
            const fraction = parseFloat(nodeDistance) / 100, total = columnCount + fraction * (columnCount - 1);
            return plotSizeX / total;
        }
        const nDistance = Number(nodeDistance);
        return ((plotSizeX + nDistance) /
            (columnCount || 1)) - nDistance;
    }
    return relativeLength(nodeWidth, plotSizeX);
}
/* *
 *
 *  Default Export
 *
 * */
const TreeUtilities = {
    getColor,
    getLevelOptions,
    getNodeWidth,
    setTreeValues,
    updateRootId
};
export default TreeUtilities;
