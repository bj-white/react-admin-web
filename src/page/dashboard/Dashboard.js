import React from 'react';
import { connect } from 'react-redux';
import * as echarts from 'echarts';

class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        this.onResize = this.onResize.bind(this);
    }

	componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('mains'));
        // 绘制图表
        this.myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ['足球', '篮球', '乒乓球', '羽毛球', '网球', '橄榄球']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });

        window.addEventListener('resize', this.onResize);
    }

    onResize () {
        console.log('resize...');
        this.myChart.resize();
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        return (
            <div id="mains" style={{ width: '100%', height: 400 }}/>
        );
    }
}

export default connect()(Dashboard);
