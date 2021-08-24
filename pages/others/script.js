const locationdiv = document.querySelector("#location")
document.addEventListener('DOMContentLoaded', getLocation)
const btn = document.querySelector(".form__button");
const pincodeinput=document.querySelector("#locationpin")


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        btn.disabled = false;
    } else {
        locationdiv.innerHTML = "Location permission is required";
        btn.disabled = true;
    }
}

async function showPosition(position) {
    const resp = await axios.get("https://apis.mapmyindia.com/advancedmaps/v1/3d55e2de5a3026eb364a88a598ff35d8/rev_geocode?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude
    )
    const pincode = resp.data.results[0].pincode
    pincodeinput.value=Number(pincode);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationdiv.innerHTML = "Location permission is necessary for the app to work."
            btn.disabled = true;
            break;
        case error.POSITION_UNAVAILABLE:
            locationdiv.innerHTML = "Location information is unavailable."
            btn.disabled = true;
            break;
        case error.TIMEOUT:
            locationdiv.innerHTML = "Location request timed out, try again"
            btn.disabled = true;
            break;
        case error.UNKNOWN_ERROR:
            locationdiv.innerHTML = "An unknown error occurred."
            btn.disabled = true;
            break;
    }
}