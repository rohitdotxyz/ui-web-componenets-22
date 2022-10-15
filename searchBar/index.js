const searchForm = document.querySelector(".search__form");
const searchField = searchForm["search"]


const wait = document.querySelector(".wait");
const error = document.querySelector(".error");

// search results
const searchSuggestionsBox = document.querySelector(".search__suggestion-box");
const searchSuggestions = document.querySelector(".search-suggestions");

// final results
const searchResults = document.querySelector(".search-results-suggestions");


function renderSearch(text) {
    const templateString = `<li class="search-suggestion">
        <a href="#" class="search-suggestion__link">
            <span class="search-suggestion__text">${text}</span>
        <span class="search-suggestion__seperator">-</span>
        <span class="search-suggestion__text">using abs</span>
        </a >
    </li > `;
    return templateString;
}

function fetchDummyData(str, length) {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((data) => {
            const newData = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.title.indexOf(str) > -1) {
                    newData.push(renderSearch(element.title.replaceAll(str, "<b>" + str + "</b>")))
                } else if (element.body.indexOf(str) > -1) {
                    newData.push(renderSearch(element.body.replaceAll(str, "<b>" + str + "</b>")))
                }
            }

            const number = length > 0 ? length : newData.length;
            return newData.slice(newData.length - number);
        });
}

function throttle(callback, delay = 100) {
    let clickedTime = 0;

    function timeout(val) {
        console.log(clickedTime, Date.now())
        if (clickedTime > Date.now()) {
            console.log(true)
        } else {
            clickedTime = Date.now() + delay;
            console.log(false)
            callback(val)
        }
    }
    return timeout;
}

// let timeoutId;
function debounce(callback, delay = 100) {
    let timeoutId;

    function timeout(val1, val2) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(function () {
            callback(val1, val2)
        }, delay)
    }
    return timeout;
}

var colorArray = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

function enterAndSearch(inputString) {
    fetchDummyData(inputString).then(data => {
        searchResults.style.display = "block";
        searchResults.style.backgroundColor = colorArray[Math.floor(Math.random() * colorArray.length)]
        searchResults.innerHTML = data.join("");
    }).catch(err => {
        console.log(err)
    })
}

function typeAndSearch(inputString, datumCount) {
    console.log(inputString, datumCount)

    if (inputString == "") {
        return false;
    }

    fetchDummyData(inputString, datumCount).then(data => {
        if (data.length) {
            wait.style.display = "none"
            error.style.display = "none"
            searchSuggestionsBox.style.display = "block";
            searchSuggestions.innerHTML = data.join("");
            return false;
        } else {
            throw new Error("404 no data found")
        }
    }).catch(err => {
        wait.style.display = "none"
        error.style.display = "block";
        searchSuggestionsBox.style.display = "none";
        error.innerHTML = err.message
        return false;
    })
}

const invokeDebounce = debounce(typeAndSearch, 5000)
const invokeThrottle = throttle(enterAndSearch, 5000)


searchForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const searchFieldValue = searchField.value;
    if (searchFieldValue == "") {
        searchSuggestionsBox.style.display = "none";
        return false;
    }

    invokeThrottle(searchFieldValue)
    searchField.blur()
})

function stopSearch() {
    error.style.display = "none";
    wait.style.display = "none"
    searchSuggestionsBox.style.display = "none";
    invokeDebounce("", 0);
}

searchField.addEventListener("keyup", function (e) {
    e.preventDefault()
    const searchFieldValue = searchField.value;

    if (searchFieldValue == "") {
        stopSearch()
        return false;
    } else if (searchFieldValue != "") {
        wait.style.display = "block"
        invokeDebounce(searchFieldValue, 5);
    }
})

searchField.addEventListener("blur", function (e) {
    stopSearch()
    invokeDebounce("", 0);
})



