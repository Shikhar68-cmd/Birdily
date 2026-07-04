import axios from "axios";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const searchLocations = async (query) => {
    try {

        const res = await axios.get(
            "https://api.geoapify.com/v1/geocode/autocomplete",
            {
                params: {
                    text: query,
                    format: "json",
                    limit: 5,
                    apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
                },
            }
        );

        return res.data.results;
    } catch (err) {
        console.log(err);
    }
};



