import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor,
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';

class LineChartScreen extends React.Component {
  constructor() {
    super();
    
    this.state = {
      data: {},

      // marker: {
      //   enabled: true,
      //   digits: 2,
      //   backgroundTint: processColor('teal'),
      //   markerColor: processColor('#F0C0FF8C'),
      //   textColor: processColor('white'),
      // },
      xAxis: {
        granularityEnabled: true,
        granularity: 1,
      },
      // visibleRange: {x: {min: 1, max: 20}};
     
    };
  }

  componentDidMount() {
  }
  componentDidUpdate() {
    this.onPressLearnMore();
  }

  onPressLearnMore() {
    // console.log('nbr de BPM ='+ this.props.data.length);
    let dernieresValues = this.props.data.map((e) => {
      return {y: e[1]};
    });

    this.refs.chart.setDataAndLockIndex({
      dataSets: [
        {
          values: dernieresValues,
          config: {
            // mode:'CUBIC_BEZIER',

            drawValues: false,
            lineWidth: 2,
            drawCircles: false,
            drawCircleHole: false,
            color: processColor('rgb(242,4,4)'),
            drawFilled: true,
            // enableDashedLine:true,
            // fillColor:processColor("rgb(255,145,153)"),
            fillGradient: {
              colors: [
                processColor('rgb(255,0,0)'),
                processColor('rgb(89,189,252)'),
              ],
              positions: [0, 0.5],
              angle: 90,
              orientation: 'TOP_BOTTOM',
            },
            fillAlpha: 255,
          },
        },
      ],
    });
    this.refs.chart.fitScreen();
  }

  handleSelect(event) {
    console.log('on touche?');
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <View style={{flex: 1}}>


        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: 'BPM de ludo'}}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            drawGridBackground={true}
            borderColor={processColor('black')}
            borderWidth={1}
            drawBorders={true}
            autoScaleMinMaxEnabled={true}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            // visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            // animation={{durationX:2000}}
            keepPositionOnRotation={true}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log('touché !')}
            // onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'orange',
    // backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
    backgroundColor:"lightgrey"
  },
});

export default LineChartScreen;
