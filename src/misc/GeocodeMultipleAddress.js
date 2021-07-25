import Geocode from "react-geocode";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

/**
 * Geocode list of address from an Array
 *
 * @param {Array} addresses
 * @returns {Array}
 */
export default function GeocodeMultipleAddress(addresses) {
  let geocoded_address = [];
  addresses.forEach((address) => {
    Geocode.fromAddress(address, API_KEY).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        geocoded_address.push({ lat: lat, lng: lng });
      },
      (error) => {
        geocoded_address.push({ lat: 0, lng: 0 });
      }
    );
  });
//   console.log(geocoded_address);
  return geocoded_address;
}
