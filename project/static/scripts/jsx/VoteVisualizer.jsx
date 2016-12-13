import React from 'react';
import FlipMove from 'react-flip-move';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';


export default class VoteVisualizer extends React.Component {

    static getNoVotes(altCopy) {

        if (altCopy.length == 0) return null;

        for (let i in altCopy) {
            if (altCopy[i][0] == "not_voted") {
                return altCopy.splice(i, 1)[0][1]
            }
        }
    }

    render() {

        let noVotes = null;
        let listVisualization = null;

        if (this.props.alternatives) {

            let altCopy = this.props.alternatives.slice();
            noVotes = VoteVisualizer.getNoVotes(altCopy);

            altCopy.sort((a, b) => a[1] - b[1]);
            altCopy.reverse();

            listVisualization = altCopy.map(alternative => {

                let altText = alternative[0] === "not_voted" ? "Ej röstat" : alternative[0];

                return (
                    <li
                        key={alternative[0]}
                        className="vote-visualizer-item"
                    >

                        <text className="vote-visualizer-text">{altText}</text>
                        <text className="vote-visualizer-number">{alternative[1]}</text>
                    </li>
                );
            });

            // TODO Other visualizations here
        }

        return (

            <Tabs defaultActiveKey={"Lista"} id="vote-visualizer">
                <Tab eventKey={"Lista"} title="Lista" className="vote-visualizer-body">
                    <ul>
                        <FlipMove
                            staggerDelayBy={300}
                            enterAnimation="none"
                            disableAllAnimations={this.props.disableAllAnimations}
                        >
                            {listVisualization}
                        </FlipMove>
                        <h3 id="vote-visualizer-notvoted">Inte röstat: {noVotes}</h3>
                    </ul>
                </Tab>
            </Tabs>
        );
    }
}
