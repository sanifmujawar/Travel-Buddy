/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the blur-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 3000,
    delay: 400,
    // reset: true // Animations repeat
})

sr.reveal(`.home__data, .explore__data, .explore__user, .footer__container`)
sr.reveal(`.home__card`, { delay: 600, distance: '100px', interval: 100 })
sr.reveal(`.about__data, .join__image, .currency__image`, { origin: 'right' })
sr.reveal(`.about__image, .join__data, .currency__data`, { origin: 'left' })
sr.reveal(`.popular__card`, { interval: 200 })

var form = document.getElementById("buddy-form");
var results = document.getElementById("output-container");
var button = document.getElementById("submit-button");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var destinationInput = document.getElementById("destination");
var attractionInput = document.getElementById("attractions");
var dateInput = document.getElementById("date-selector");
var dataOutput = document.getElementById("output-container");

//event listener and function to store user input data
form.addEventListener("submit", function travelInfo(event) {
    event.preventDefault();
    var searchName = nameInput.value;
    var searchEmail = emailInput.value;
    var searchDestination = destinationInput.value;
    var searchDate = dateInput.value;
    var searchAttraction = attractionInput.value;

    console.log(searchName);
    console.log(searchEmail);
    console.log(searchDestination);
    console.log(searchAttraction);
    console.log(searchDate);
    //api url to get location ID and longtitude/latitude
    var tripLocation = `https://api.geoapify.com/v1/geocode/search?text=${searchDestination}&lang=en&limit=10&type=city&apiKey=e4ecef705ece4451a30f714a57fb5101`;
    console.log(tripLocation);
    //fetch function
    fetch(tripLocation)
        .then(function (response) {
            return response.json();
        })
        .then(function returnLocation(data) {
            var locationID = data.features[0].properties.place_id;
            var locationLon = data.features[0].properties.lon;
            var locationLat = data.features[0].properties.lat;
            //api to generate static map from data from previous api
            var locationMap = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=800&height=600&format=jpeg&center=lonlat:${locationLon},${locationLat}&zoom=13.5&apiKey=e4ecef705ece4451a30f714a57fb5101`;
            //creating img element and appending to new div
            console.log(locationMap);
            var imgDiv = document.createElement("div");
            var newMap = document.createElement("img");
            newMap.setAttribute("src", locationMap);
            newMap.setAttribute("id", "map-image");

            dataOutput.appendChild(imgDiv);
            imgDiv.appendChild(newMap);
            //api to find data on requested venues/attractions
            var tripEvents = `https://api.geoapify.com/v2/places?categories=${searchAttraction}&filter=place:${locationID}&limit=30&apiKey=e4ecef705ece4451a30f714a57fb5101`;
            console.log(tripEvents);

            fetch(tripEvents)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (let j = 0; j < data.features.length; j++) {
                        var resultsName = data.features[j].properties.name;
                        // var resultsOpen =
                        //   data.features[j].properties.datasource.raw.opening_hours;

                        // var resultsPhone = data.features[j].properties.datasource.raw.phone;
                        // var resultsWeb = data.features[j].properties.datasource.raw.url;
                        // console.log(resultsAddress);
                        // console.log(resultsOpen);
                        // console.log(resultsPhone);
                        // console.log(resultsWeb);

                        // var newDiv = document.createElement("div");
                        // newDiv.classList.add("result-div");
                        var newAddressButton = document.createElement("button");
                        newAddressButton.classList.add("result-button");
                        var newTextAddress = document.createTextNode(resultsName);

                        // dataOutput.appendChild(newDiv);
                        dataOutput.appendChild(newAddressButton);
                        newAddressButton.appendChild(newTextAddress);
                    }
                });
        });
});

form.addEventListener("click", function clearInfo() { });