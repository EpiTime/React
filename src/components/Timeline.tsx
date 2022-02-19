import Chart from "react-google-charts";
import React from "react";
import ReactDOM from "react-dom";

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
const columns = [
    {type: "string", id: "President"},
    {type: 'string', id: 'Name'},
    {type: "datetime", id: "Start"},
    {type: "datetime", id: "End"}
];

const rows = [
    ['Math', 'Projet 1', new Date(2022, 0, 1), new Date(2022, 0, 10)],
    ['Math', 'Projet 2', new Date(2022, 0, 11), new Date(2022, 0, 20)],
    ['Math', 'Projet 3', new Date(2022, 0, 21), new Date(2022, 0, 30)],
    ['Math', 'Projet 4', new Date(2022, 1, 1), new Date(2022, 1, 10)],
    ['Graphique', 'Defender', new Date(2022, 0, 1), new Date(2022, 0, 20)],
    ['Graphique2', 'RPG', new Date(2022, 0, 25), new Date(2022, 2, 10)],
    //[ 'Unix', '42sh', new Date(2022, 0, 25), new Date(2022, 2, 10) ],
];

interface Props {
    year?: string;
}

interface States {
    json?: string;
}

const data = [columns, ...rows];

class Timeline extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            json: ""
        }
    }

    render() {
        if (this.props.year !== undefined) {
            const get_request = {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }
            const post_request = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*'
                }
            }
            fetch('http://localhost:8080/year/' + this.props.year, post_request).then(response => {
                fetch('http://localhost:8080/modules/', get_request)
                    .then(response => response.json())
                    .then(data => this.setState({json: data}));
            })
        }

        return (
            <div className="App">
                <p>{this.state.json}</p>
                <Chart
                    chartType="Timeline"
                    data={data}
                    width="100%"
                    height="300px"
                    // controls={[
                    //   {
                    //     controlType: "DateRangeFilter",
                    //     options: {
                    //       filterColumnIndex: 1
                    //     },
                    //     controlPosition: "bottom"
                    //   }
                    // ]}
                    chartEvents={[
                        {
                            eventName: "ready",
                            callback: ({chartWrapper, google}) => {
                                const chart = chartWrapper.getChart();
                                // @ts-ignore
                                google.visualization.events.addListener(chart, "click", (e) => {
                                    console.log("CLICK");
                                });
                            }
                        }
                    ]}
                />
                <div id="register">
                    <button>Connection</button>
                </div>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Timeline/>, rootElement);

const hide_list = document.getElementById("hide_list");

if (hide_list != null) {
    while (hide_list.firstElementChild != null) {
        hide_list.removeChild(hide_list.firstElementChild);
    }

    let module_list: any[] = []

    for (let elm of rows) {
        if (!module_list.includes(elm[0])) {
            module_list.push(elm[0]);
            console.log(elm[0]);
        }
    }

    for (let count = 0; count < module_list.length; count++) {
        let div = document.createElement("div");
        let button = document.createElement("button");
        button.innerHTML = "Hide";
        hide_list.appendChild(div);
        div.appendChild(button);
    }
}

export default Timeline;