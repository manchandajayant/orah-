import React, { useRef, useEffect } from "react"
import { Chart, registerables } from "chart.js"

import styled from "styled-components"
import { Colors } from "shared/styles/colors"

Chart.register(...registerables)


var myChart: any = undefined
var config = {
    backgroundColor: ["#76BA99", "#F37878", "#FFDCAE"],
    borderColor:["#76BA99", "#F37878", "#FFDCAE"]
}

type Props = {
    [key: string]: any
}

// TODO: Fix all types in this component
const BarChart: React.FC<Props> = ({ data }) => {
    let chartRef = useRef<any>(null)
    
    useEffect(() => {
        if (null !== chartRef.current) {
            const ctx: any = chartRef.current?.getContext("2d")
            myChart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: ["present", "absent", "late"],
                    datasets: [
                        {
                            label: "Present",
                            data: [data?.present, data?.absent, data?.late],
                            borderColor: config.borderColor,
                            backgroundColor: config.backgroundColor,
                            borderWidth: 1,
                            hoverOffset: 8,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: 'rgb(0,0,0)',
                                usePointStyle:true,
                                pointStyle:'rectRounded',
                                padding:10,
                            },
                            position:'bottom'
                        },
                    },
                    
                    scales: {
                        x: {
                     
                            ticks: {
                                display: false,
                            },
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                        },
                        y: {
                            ticks: {
                                display: false,
                            },
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                        },
                    },
                },
            })
        }
        return () => {
            if (myChart) {
                myChart?.destroy()
            }
        }
    }, [chartRef.current, data])

    return (
        <D>
            <canvas ref={chartRef}></canvas>
        </D>
    )
}

export default BarChart

const D = styled.div`
    height: 290px;
    width: 290px;
    display: flex;
    margin-top:2%;
    justify-content: center;
    @media screen and (max-width: 800px) {
        height: 200px;
        width: 200px;
        margin-left:20%;
    }
`
