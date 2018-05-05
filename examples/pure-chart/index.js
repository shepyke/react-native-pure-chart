import React from 'react'
import PropTypes from 'prop-types'
import {View,Text} from 'react-native'

import LineChart from './components/line-chart'
import ColumnChart from './components/column-chart'

export default class PureChart extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: this.props.data,
        }
        this.renderChart = this.renderChart.bind(this)
    }
    renderChart () {
        if(this.checkObjectData()) {
            if (this.props.type === 'line') {
                return <LineChart {...this.props} />
            } else if (this.props.type === 'bar') {
                return <ColumnChart {...this.props} />
            } else if (this.props.type === 'pie') {
                return null
            }
        }else{
            return (
                <View
                    style={[{height: this.props.height, justifyContent: 'center', alignSelf: 'center'}]}>
                    <Text style={[{color: this.props.color}]}>No data available</Text>
                </View>
            )
        }
    }
    render () {
        return (
            <View>
                {this.renderChart()}
            </View>
        )
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
        });
    }

    checkObjectData(){
        for (let obj of this.state.data) {
            if(obj.data.length > 0) return true;
        }
        return false;
    }
}


PureChart.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    color: PropTypes.string,
    height: PropTypes.number,
    numberOfYAxisGuideLine: PropTypes.number,
    customValueRenderer: PropTypes.func
}
PureChart.defaultProps = {
    color: '#297AB1',
    height: 100,
    numberOfYAxisGuideLine: 5
}