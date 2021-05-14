import {css} from "lit-element";

export const appContainerCss = css` 
:host{
    background: red;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-family: Lato, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 14px;
    color: #555;
}
.page-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    height: 100%;
    max-height: 200px;
    text-align: center;
}

.dn {
    display: none !important;
}


.flex {
    display: flex;
}

.flex-grow {
    flex-grow: 1;
}

.flex-space {
    flex-grow: 1;
}


.feather-icon {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
}

.feather-icon--medium {
    width: 48px;
    height: 48px;
}

.feather-icon--lite {
    stroke-width: 1.5px;
}


.kxs-tasks_task {
    display: flex;
    height: 54px;
    overflow: hidden;
    box-sizing: border-box;
    margin: 1px 1px 0 1px;
    flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.02);
    /*border-bottom: 1px solid rgba(0, 0, 0, 0.07);*/
}

.kxs-tasks_task:first-of-type {
    height: 53px;
}

.kxs-tasks_task:nth-child(even) {
    background: rgba(0, 0, 0, 0.01);
}

.kxs-tasks_task:hover {
    background: rgba(76, 161, 252, 0.07);
}

.kxs-task_controls {
    display: flex;
}

.task-control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
}

.task-control:first-of-type {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.task-control:hover {
    background: rgba(0, 0, 0, 0.03);
    cursor: pointer;
}

.task-control svg {
    width: 25px;
    height: 25px;
}

.kxs-task_full {
    flex-basis: 100%;
    padding: 10px;
    background: rgba(49, 128, 48, 0.07);
    border-top: 1px solid rgba(0, 0, 0, 0.01);
}

.kxs-task_icon {
    width: 50px;
    height: 100%;
    opacity: 0.8;
    align-items: center;
    justify-content: center;
    font-size: .9em;
    cursor: pointer;
    display: flex;
}

.kxs-task_icon .feather-icon {
    stroke: white;
}

.kxs-task_icon.green {
    background: darkgreen;
}

.kxs-task_icon.red {
    background: red;
}

.kxs-task_icon.orange {
    background: orange;
}

.kxs-task_summary {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 5px 10px;
    font-size: 90%;
    justify-content: center;
}

.kxs-task_summary p {
    margin: 3px 0 0 0;
}`;
