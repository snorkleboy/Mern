import { CSSTransition, transit } from "react-css-transition";

export const opacityAppear = {
    defaultStyle: { opacity: 0, display: "none" },
    enterInitStyle: { display: "inherit", opacity: .01 },
    enterStyle: { opacity: transit(1, 500, "ease-in-out") },
    leaveStyle: { opacity: transit(0, 200, "ease-in-out") },
    activeStyle: { opacity: 1 }
};