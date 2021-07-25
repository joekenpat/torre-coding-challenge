import axios from "axios";

/**
 * Prepare data from result to be used by internal components
 *
 * @param {Object} data
 */
const prepareAccountData = (data) => {
  return {
    name: data.person.name,
    headline: data.person.professionalHeadline,
    location: {
      lat: data.person.location.latitude,
      lng: data.person.location.longitude,
      country: data.person.location.country,
    },
    avatarUrl: data.person.picture,
    remoteWorking: data.person.flags.remoter,
    stats: {
      jobs: data.person.stats.jobs,
      education: data.person.stats.education,
      skills: data.person.stats.stenght,
      learning: data.person.stats.interest,
    },
    links: data.person.links.map((link) => ({
      name: link.name,
      url: link.address,
    })),
    bio: data.person.summaryOfBio,
  };
};

/**
 * Geocode list of address from an Array
 *
 * @param {String} username
 */
export default function GetUserDetail(username) {
  axios({
    method: "get",
    url: "https://torre.bio/api/bios/" + username,
    config: { headers: { Accept: "application/json" } },
  })
    .then((res) => {
      return prepareAccountData(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
    });
}
