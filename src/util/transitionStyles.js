import {
    CSSTransition,
    transit
} from "react-css-transition";

export const opacityAppear = {
    defaultStyle: {
        opacity: 0,
        display: "none"
    },
    enterInitStyle: {
        display: "block",
        opacity: 0
    },
    enterStyle: {
        display: "block",
        opacity: transit(1, 500, "ease-in-out") 
    },
    leaveStyle: {
        display: "block",
        opacity: transit(0, 200, "ease-in-out"),
    },
    activeStyle: {
        opacity: 1.0
    }
};


export const slideIn = {
    defaultStyle: {
        transform: "translate(120vw, 0)",
        "zIndex":"100",
        display:"none",
        opacity: 0,
        position:"relative"
    },
    enterInitStyle: {
        transform: "translate(120vw, 0)",
        "zIndex": "100",
        display: "inherit",
        opacity: .01
    },
    enterStyle: {
        transform: transit("translate(0, 0)", 500, "ease-in-out"),
        opacity: transit(1, 500, "ease-in-out"),
        position: "relative",
        "zIndex": "100",
    },
    leaveStyle: {
        opacity: transit(0, 450, "ease-in-out"),
        position: "relative",
        "zIndex": "100",
    },
    activeStyle: {
        transform: "translate(0, 0)",
        opacity:1,
        position: "relative",
        "zIndex": "100",


    },

};