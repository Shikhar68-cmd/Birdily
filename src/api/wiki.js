import axios from "axios";

export async function getBirdImage(name) {
    try {
        const response = await axios.get(
            "https://en.wikipedia.org/api/rest_v1/page/summary/" +
            encodeURIComponent(name)
        );

        return response.data.thumbnail?.source || null;
    }
    catch(err){
        return null;
    }
}