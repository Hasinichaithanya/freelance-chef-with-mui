export const getLocationName = async (lat, long) => {
    try {
        const location = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
        );
        const resp = await location.json()
        return {
            city: resp.city,
            state: resp.principalSubdivision,
            country: resp.countryName
        };
    } catch (err) {
        console.log(err);
        return null
    }
};


export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new Error("Your browser does not support location"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    locationName: await getLocationName(position.coords.latitude, position.coords.longitude)
                });
            },
            (error) => {
                reject(new Error("Please grant location access: " + error.message));
            }
        );
    });
};