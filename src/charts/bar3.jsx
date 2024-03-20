import React from 'react';
import ReactECharts from 'echarts-for-react';
import benewake from '../echarts-theme/benewake.json';

export default function Bar3() {

    let data = [
        [
            "13.01.04.041",
            "TFmini-S-V1.8.1(单品包装)-V1.0",
            "794"
        ],
        [
            "13.01.04.042",
            "TFmini-S-V1.8.1(整箱包装)-V1.0",
            "5,096"
        ],
        [
            "13.01.08.005",
            "TFmini Plus-2400标品(单品包装)-V1.0",
            "2,719"
        ],
        [
            "13.01.08.006",
            "TFmini Plus-2400标品(整箱包装)-V1.0",
            "1,507"
        ],
        [
            "13.01.07.001",
            "TF-luna(标品/单品包装)-V1.0",
            "2,996"
        ],
        [
            "13.01.07.002",
            "TF-luna(标品/整箱包装)-V1.0",
            "11,982"
        ],
        [
            "13.01.07.010",
            "TF-Luna-OW",
            "5,991"
        ],
        [
            "13.01.07.006",
            "TF-Luna-N(整箱包装)",
            "196"
        ],
        [
            "13.01.09.002",
            "TF350-485(单品包装)-V1.0",
            "50"
        ],
        [
            "13.01.05.006",
            "TF03-485(单品包装)-V1.1",
            "121"
        ],
        [
            "13.01.05.018",
            "TF03-485(整箱包装)-V1.1",
            "121"
        ],
        [
            "13.01.05.005",
            "TF03-UART(单品包装)-V1.1",
            "242"
        ],
        [
            "13.01.05.017",
            "TF03-UART(整箱包装)-V1.1",
            "543"
        ],
        [
            "13.01.02.023",
            "TF02-Pro标品(整箱包装)-V1.0",
            "798"
        ],
        [
            "13.01.02.024",
            "TF02-Pro标品(单品包装)-V1.0",
            "800"
        ],
        [
            "13.01.02.039",
            "TF02-Pro-Breezer",
            "498"
        ],
        [
            "13.01.04.048",
            "TFmini-i-485(单品包装)-V1.0",
            "255"
        ],
        [
            "13.01.04.051",
            "TFmini-i-485(整箱) 2m散线",
            "598"
        ],
        [
            "13.01.04.049",
            "TFmini-i-CAN(单品包装)-V1.0",
            "102"
        ],
        [
            "13.01.04.056",
            "TFmini-i-CAN-2m散线-V1.1",
            "400"
        ],
        [
            "13.01.02.036",
            "TF02-i-CAN(单品包装)-V1.0",
            "101"
        ],
        [
            "13.01.08.011",
            "TFmini Plus-YE",
            "1,506"
        ],
        [
            "13.01.05.035",
            "TF03-100-CAN-无logo-SDJL(整箱包装)",
            "30"
        ],
        [
            "13.01.05.021",
            "TF03-V3-MT",
            "150"
        ]
    ]
    data.forEach(array => { if (array[2] != "6月组装") array[2] = Number(array[2].replace(",", "")) })
    const option = {
        tooltip: {
            trigger: "item"
        },
        xAxis: {
            axisLabel: {
            }
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                fontSize: "10px",
                lineHeight: 5,
                interval: 0,
                padding: 0,
            }
        },
        dataset: [
            {
                dimensions: ["物料编码", "物料名称", "6月组装"],
                source: data
            },
            {
                transform: {
                    type: 'sort',
                    config: { dimension: '6月组装', order: 'asc' }
                }
            }
        ],
        grid: {
            containLabel: true,
            left: "0%",
            top: "0%",
            bottom: "0%"
        },
        series: { type: 'bar', encode: { x: '6月组装', y: '物料名称' }, datasetIndex: 1 },
    }
    return (
        <div class="bar3 span3">
            <h1>2023年6月生产预计</h1>
            <ReactECharts
                option={option}
                style={{
                    height: '500px',
                    width: '100%',
                }}
                theme={benewake}
            />
        </div>
    )
}
