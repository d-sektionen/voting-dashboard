import React from 'react';
import FlipMove from 'react-flip-move';
import PieChart from 'react-simple-pie-chart';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';


export default class VoteVisualizer extends React.Component {

    static getNoVotes(altCopy) {

        if (altCopy.length === 0) return null;

        for (let i in altCopy) {
            if (altCopy[i][0] === "not_voted") {
                return altCopy.splice(i, 1)[0][1]
            }
        }
    }

    /* accepts parameters
     * h  Object = {h:x, s:y, v:z}
     * OR
     * h, s, v
     */
    static hsbToHex(h, s, b) {
        let red, green, blue, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s;
            b = h.b;
            h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = b * (1 - s);
        q = b * (1 - f * s);
        t = b * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                red = b;
                green = t;
                blue = p;
                break;
            case 1:
                red = q;
                green = b;
                blue = p;
                break;
            case 2:
                red = p;
                green = b;
                blue = t;
                break;
            case 3:
                red = p;
                green = q;
                blue = b;
                break;
            case 4:
                red = t;
                green = p;
                blue = b;
                break;
            case 5:
                red = b;
                green = p;
                blue = q;
                break;
            default:
                break;
        }

        return ("#" +
            Math.round(red * 255).toString(16) +
            Math.round(green * 255).toString(16) +
            Math.round(blue * 255).toString(16)
        );
    }

    static hsbGradient(steps, colours) {
        const parts = colours.length - 1;
        const gradient = new Array(steps);
        let gradientIndex = 0;
        let partSteps = Math.floor(steps / parts);
        const remainder = steps - (partSteps * parts);

        for (let col = 0; col < parts; col++) {
            // get colours
            const c1 = colours[col],
                c2 = colours[col + 1];
            // determine clockwise and counter-clockwise distance between hues
            const distCCW = (c1.h >= c2.h) ? c1.h - c2.h : 1 + c1.h - c2.h;
            const distCW = (c1.h >= c2.h) ? 1 + c2.h - c1.h : c2.h - c1.h;
            // ensure we get the right number of steps by adding remainder to final part
            if (col === parts - 1) partSteps += remainder;

            // make gradient for this part
            for (let step = 0; step < partSteps; step++) {
                const p = step / partSteps;
                // interpolate h, s, b
                let h = (distCW <= distCCW) ? c1.h + (distCW * p) : c1.h - (distCCW * p);
                if (h < 0) h = 1 + h;
                if (h > 1) h--;
                const s = (1 - p) * c1.s + p * c2.s;
                const b = (1 - p) * c1.b + p * c2.b;
                // add to gradient array
                gradient[gradientIndex] = {h: h, s: s, b: b};
                gradientIndex++;
            }
        }
        return gradient;
    }

    render() {

        if (!this.props.alternatives) return null;

        let altCopy = this.props.alternatives.slice();
        const noVotes = VoteVisualizer.getNoVotes(altCopy);

        altCopy.sort((a, b) => a[1] - b[1]);
        altCopy.reverse();

        const colorTransitions = [{h: 0, s: 0, b: 0.58}, {h: 0, s: 0, b: 0.22}];
        const hsbColors = VoteVisualizer.hsbGradient(altCopy.length, colorTransitions);

        const listVisualization = altCopy.map((alternative, i) => {

            // TODO I think this is redundant as getNoVotes already extracts it
            // let altText = alternative[0] === "not_voted" ? "Ej röstat" : alternative[0];
            let altText = alternative[0];

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


        const pieItems = altCopy.map((alternative, i) => {
            return {
                color: VoteVisualizer.hsbToHex(hsbColors[i]),
                value: alternative[1]
            }
        });

        pieItems.push({
            color: "#e5e5e5",           // "white" for noVotes
            value: noVotes
        });

        // TODO Add labels, style it, and better colors.


        // TODO Other visualizations here


        return (

            <Tabs defaultActiveKey={"List"} id="vote-visualizer">
                <Tab eventKey={"List"} title="Lista" className="vote-visualizer-body">
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
                <Tab eventKey={"PieChart"} title="Pie chart" className="vote-visualizer-body">
                    <PieChart
                        slices={pieItems}
                    />
                </Tab>
            </Tabs>
        );
    }
}
