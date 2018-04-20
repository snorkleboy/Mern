import {
    CSSTransition,
    transit
} from "react-css-transition";
import { relative } from "path";

export const opacityAppear = {
    defaultStyle: {
        opacity: 0,
        display: "none",
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

export const slideInTop = {
    defaultStyle: {
        transform: "translate(0, -10vh)",
        opacity: 0,
        position: "relative",
        zIndex:'-1',
        display:"none"
    },
    enterInitStyle:{
        display: "block",
        transform: "translate(0, -10vh)",
        opacity: .01,
        position: "relative",

    },
    enterStyle: {
        transform: transit("translate(0, 0)", 500, "ease-in-out"),
        opacity: transit(.99, 500, "ease-in-out"),
        position: "relative",
        zIndex: '-1',

    },
    leaveStyle: {
        zIndex: '-1',
        position: "relative",
        transform: transit("translate(0,-10vh)", 500, "ease-in-out"),
        opacity: transit(0, 450, "ease-in-out"),

    },
    activeStyle: {
        zIndex: '10',
        position: "relative",
        transform: "translate(0, 0)",
        opacity: .99,
    },

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