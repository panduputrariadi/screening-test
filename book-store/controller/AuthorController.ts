import axios from "axios";
export const fetchAuthors = async (page = 1, per_page = 10) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-author?action=all&page=${page}&per_page=${per_page}`);

        return {
            items: response.data.data.items,
            meta: response.data.data.meta
        }
    } catch (error) {
        throw error;
    }
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function DropDownAuthor(search = '') {
    try{
        await delay(1000);
        const normalizedSearch = search.trim().toLowerCase();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-author?action=dropdown&search=${normalizedSearch}`);
        // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        throw error;
    }
}