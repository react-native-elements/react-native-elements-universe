import React from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Path, Circle, G, Text } from 'react-native-svg';
const CircularSlider = ({ thumbRadius = 12, trackRadius = 100, trackWidth = 5, trackTintColor, trackColor, value = 0, minimumValue = 0, maximumValue = 100, onChange = (x) => x, thumbTextColor = 'white', thumbTextSize = 10, noThumb = false, showText = false, showThumbText = false, thumbColor, textColor, textSize = 80, theme, }) => {
    var _a, _b, _c, _d, _f;
    const [location, setLocation] = React.useState({ x: 0, y: 0 });
    const viewRef = React.useRef(null);
    const valuePercentage = ((value - minimumValue) * 100) / maximumValue;
    const { current: panResponder } = React.useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => location.x && location.y,
        onPanResponderMove: (_e, { moveX, moveY }) => {
            let angle = cartesianToPolar(moveX - location.x, moveY - location.y);
            onChange(angle / 3.6);
        },
    }));
    const polarToCartesian = React.useCallback((angleToChange) => {
        let r = trackRadius;
        let hC = trackRadius + thumbRadius;
        let a = ((angleToChange - 90) * Math.PI) / 180.0;
        let x = hC + r * Math.cos(a);
        let y = hC + r * Math.sin(a);
        return { x, y };
    }, [trackRadius, thumbRadius]);
    const cartesianToPolar = React.useCallback((x, y) => {
        let hC = trackRadius + thumbRadius;
        if (x === 0) {
            return y > hC ? 0 : 180;
        }
        else if (y === 0) {
            return x > hC ? 90 : 270;
        }
        else {
            return (Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
                (x > hC ? 90 : 270));
        }
    }, [trackRadius, thumbRadius]);
    const width = (trackRadius + thumbRadius) * 2;
    const startCoord = polarToCartesian(0);
    const endCoord = polarToCartesian(valuePercentage * 3.6);
    return (<View style={{ width, height: width }} ref={viewRef} onLayout={() => {
            var _a;
            (_a = viewRef.current) === null || _a === void 0 ? void 0 : _a.measure((x, y, w, h, px, py) => {
                setLocation({
                    x: px + w / 2,
                    y: py + h / 2,
                });
            });
        }}>
      <Svg width={width} height={width} ref={viewRef}>
        <Circle r={trackRadius} cx={width / 2} cy={width / 2} stroke={trackTintColor || ((_a = theme === null || theme === void 0 ? void 0 : theme.colors) === null || _a === void 0 ? void 0 : _a.grey5)} strokeWidth={trackWidth}/>

        <Path stroke={trackColor || ((_b = theme === null || theme === void 0 ? void 0 : theme.colors) === null || _b === void 0 ? void 0 : _b.primary)} strokeWidth={trackWidth} fill="none" d={`M${startCoord.x} ${startCoord.y} A ${trackRadius} ${trackRadius} 0 ${valuePercentage * 3.6 > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}/>
        {showText && (<Text x={trackRadius + thumbRadius} y={trackRadius + 40} fontSize={textSize} fill={textColor || trackColor || ((_c = theme === null || theme === void 0 ? void 0 : theme.colors) === null || _c === void 0 ? void 0 : _c.primary)} textAnchor="middle">
            {Math.ceil(value).toString()}
          </Text>)}

        {!noThumb && (<G x={endCoord.x - thumbRadius} y={endCoord.y - thumbRadius}>
            <Circle r={thumbRadius} cx={thumbRadius} cy={thumbRadius} fill={thumbColor || trackColor || ((_d = theme === null || theme === void 0 ? void 0 : theme.colors) === null || _d === void 0 ? void 0 : _d.primary)} {...panResponder.panHandlers}/>
            {showThumbText && (<Text x={thumbRadius} y={thumbRadius + thumbTextSize / 2} fontSize={10} fill={thumbTextColor || ((_f = theme === null || theme === void 0 ? void 0 : theme.colors) === null || _f === void 0 ? void 0 : _f.white)} textAnchor="middle">
                {Math.ceil(value).toString().padStart(2, '0')}
              </Text>)}
          </G>)}
      </Svg>
    </View>);
};
export default CircularSlider;
