let dashTopAnimationId = null;
let dashMiddleAnimationId = null;
let dashBottomAnimationId = null;
let animationRunning = false;

const menuBtn = document.querySelector(".btn")

menuBtn.addEventListener("click", function (e) {

    const dashTopProps = {
        dash: e.currentTarget.children[0],
        start: -100,
        end: 100,
        angleStart: 0,
        angleEnd: 45,
        fps: 1
    }

    const dashMiddleProps = {
        dash: e.currentTarget.children[1],
        start: 1,
        end: 0,
        fps: 1
    }

    const dashBottomProps = {
        dash: e.currentTarget.children[2],
        start: 100,
        end: -100,
        angleStart: 0,
        angleEnd: -45,
        fps: 1
    }

    const dashDependencyFactors = {
        movement: 5,
        roatation: 1,
        opacity: 0.01
    }

    if (animationRunning) {
        return false;
    }

    if (this.classList.contains("open")) {
        this.classList.remove("open")
        this.classList.add("closed")

        animationRunning = true;

        clearInterval(dashTopAnimationId);
        dashTopAnimationId = setInterval(dashTopFrame, dashTopProps.fps);
        function dashTopFrame() {


            if (dashTopProps.angleStart == dashTopProps.angleEnd) {
                if (dashTopProps.start == dashTopProps.end) {
                    clearInterval(dashTopAnimationId);
                    return false;
                } else {
                    dashTopProps.end = dashTopProps.end - dashDependencyFactors.movement;
                    dashTopProps.dash.style.transform = "translateY(" + dashTopProps.end + "%)";
                }
            } else {
                dashTopProps.angleEnd = dashTopProps.angleEnd - 1;
                dashTopProps.dash.style.transform = "translateY(" + dashTopProps.end + "%) rotateZ(" + dashTopProps.angleEnd + "deg)";
            }
        }

        clearInterval(dashMiddleAnimationId);
        dashMiddleAnimationId = setInterval(dashMiddleFrame, dashMiddleProps.fps);
        function dashMiddleFrame() {
            if (dashMiddleProps.start == dashMiddleProps.end) {
                clearInterval(dashMiddleAnimationId);
                animationRunning = false;
                return false;
            } else {
                dashMiddleProps.end = Number((dashMiddleProps.end + dashDependencyFactors.opacity).toFixed(2));
                dashMiddleProps.dash.style.opacity = dashMiddleProps.end;
            }
        }

        clearInterval(dashBottomAnimationId);
        dashBottomAnimationId = setInterval(dashBottomFrame, dashBottomProps.fps);
        function dashBottomFrame() {
            if (dashBottomProps.angleStart == dashBottomProps.angleEnd) {
                if (dashBottomProps.start == dashBottomProps.end) {
                    clearInterval(dashBottomAnimationId);
                    return false;
                } else {
                    dashBottomProps.end = dashBottomProps.end + dashDependencyFactors.movement;
                    dashBottomProps.dash.style.transform = "translateY(" + dashBottomProps.end + "%)";
                }
            } else {
                dashBottomProps.angleEnd = dashBottomProps.angleEnd + 1;
                dashBottomProps.dash.style.transform = "translateY(" + dashBottomProps.end + "%) rotateZ(" + dashBottomProps.angleEnd + "deg)";
            }
        }

    } else {
        this.classList.remove("closed")
        this.classList.add("open")

        animationRunning = true;
        clearInterval(dashTopAnimationId);
        dashTopAnimationId = setInterval(dashTopFrame, dashTopProps.fps);
        function dashTopFrame() {
            if (dashTopProps.start == dashTopProps.end) {
                if (dashTopProps.angleStart == dashTopProps.angleEnd) {
                    clearInterval(dashTopAnimationId);
                    return false;
                } else {
                    dashTopProps.angleStart++;
                    dashTopProps.dash.style.transform = "translateY(" + dashTopProps.start + "%) rotateZ(" + dashTopProps.angleStart + "deg)";
                }
            } else {
                dashTopProps.start = dashTopProps.start + dashDependencyFactors.movement;
                dashTopProps.dash.style.transform = "translateY(" + dashTopProps.start + "%)";
            }
        }

        clearInterval(dashMiddleAnimationId);
        dashMiddleAnimationId = setInterval(dashMiddleFrame, dashMiddleProps.fps);
        function dashMiddleFrame() {
            if (dashMiddleProps.start == dashMiddleProps.end) {
                clearInterval(dashMiddleAnimationId);
                animationRunning = false;
                return false;
            } else {
                dashMiddleProps.start = Number((dashMiddleProps.start - dashDependencyFactors.opacity).toFixed(2));
                dashMiddleProps.dash.style.opacity = dashMiddleProps.start;
            }
        }

        clearInterval(dashBottomAnimationId);
        dashBottomAnimationId = setInterval(dashBottomFrame, dashBottomProps.fps);
        function dashBottomFrame() {
            if (dashBottomProps.start == dashBottomProps.end) {
                if (dashBottomProps.angleStart == dashBottomProps.angleEnd) {
                    clearInterval(dashBottomAnimationId);
                    return false;
                } else {
                    dashBottomProps.angleStart--;
                    dashBottomProps.dash.style.transform = "translateY(" + dashBottomProps.start + "%) rotateZ(" + dashBottomProps.angleStart + "deg)";
                }
            } else {
                dashBottomProps.start = dashBottomProps.start - dashDependencyFactors.movement;
                dashBottomProps.dash.style.transform = "translateY(" + dashBottomProps.start + "%)";
            }
        }
    }
})

