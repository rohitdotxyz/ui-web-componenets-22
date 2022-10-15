const tabsContainer = document.querySelector(".tabs");
const allTabs = tabsContainer.querySelectorAll(".tab");
const tabIndicator = document.querySelector(".tab__indicator");
const tabsContent = document.querySelector(".tabs-content");
const allTabsContent = tabsContent.querySelectorAll(".tab-content")

let previousSlide = 1;
let currentSlide = 1;
let classesTimeoutId = null;
let currentTab = allTabs[currentSlide];
let currentTabContent = allTabsContent[currentSlide];
calulateTabIndicatorPosition(currentTab);
currentTabContent.classList.add("currentContent");
tabIndicator.classList.add("tab__indicator--no-transition")


let lastThrottleClicked = null;
function throttle(callback, delay) {
    function throttleTimeout(val1, val2) {
        let now = Date.now();
        if (lastThrottleClicked < now) {
            lastThrottleClicked = now + delay;
            callback(val1, val2, delay)
            console.log("throttle invoked")
        } else {
            console.log(lastThrottleClicked, "throttle function is disabled, come again after 5 seconds.")
        }
    }
    return throttleTimeout;
}


let debounceTimer = null;
function debounce(callback, delay) {
    function debounceTimeout(val1, val2) {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
        debounceTimer = setTimeout(function () {
            callback(val1, val2)
        }, delay)
    }
    return debounceTimeout;
}


function calulateTabIndicatorPosition(tab) {
    const tabDimensions = tab.getBoundingClientRect();

    tabIndicator.classList.remove("tab__indicator--no-transition")

    // when tabs are vertical
    const topPosition = tab.offsetTop + (tabDimensions.height / 2) + "px";
    tabIndicator.style.setProperty("--topPosition", topPosition)

    // when tabs are horizontal
    const leftPosition = tab.offsetLeft + (tabDimensions.width / 2) + "px";
    tabIndicator.style.setProperty("--leftPosition", leftPosition)
    return false;
}

function tab(hoveredTab) {
    const tab = hoveredTab.closest(".tab");
    if (!tab) {
        return false;
    }

    const indexOfCurrentTab = tab.dataset.tab;
    calulateTabIndicatorPosition(tab)

    if (previousSlide == indexOfCurrentTab) {
        return false
    }

    const currentTabContent = allTabsContent[indexOfCurrentTab];
    const previousTabContent = allTabsContent[previousSlide];

    if (indexOfCurrentTab > previousSlide) {
        previousTabContent.classList.add("moveContentUp")
        previousTabContent.classList.remove("currentContent")
        currentTabContent.classList.add("moveContentUp")

        clearTimeout(classesTimeoutId)
        classesTimeoutId = setTimeout(function () {
            currentTabContent.classList.remove("moveContentUp")
            currentTabContent.classList.add("currentContent")
            previousTabContent.classList.remove("moveContentUp")
        }, 250)

        previousSlide = indexOfCurrentTab;
        currentSlide = indexOfCurrentTab;

    } else {
        previousTabContent.classList.add("moveContentDown")
        previousTabContent.classList.remove("currentContent")
        currentTabContent.classList.add("moveContentDown")

        clearTimeout(classesTimeoutId)
        classesTimeoutId = setTimeout(function () {
            currentTabContent.classList.remove("moveContentDown")
            currentTabContent.classList.add("currentContent")
            previousTabContent.classList.remove("moveContentDown")
        }, 250)

        previousSlide = indexOfCurrentTab;
        currentSlide = indexOfCurrentTab;
    }
}

const invokeThrottle = throttle(tab, 250);
const invokeDebounce = debounce(tab, 250);

// best works with click event
tabsContainer.addEventListener("mouseover", function (e) {
    console.log(e.type)
    if (e.type == "click") {
        invokeThrottle(e.target)
    } else {
        invokeDebounce(e.target)
    }
})

window.addEventListener("resize", function (e) {
    currentTab = allTabs[currentSlide];
    calulateTabIndicatorPosition(currentTab);
    currentTabContent = allTabsContent[currentSlide];
    currentTabContent.classList.add("currentContent");
    tabIndicator.classList.add("tab__indicator--no-transition");
})