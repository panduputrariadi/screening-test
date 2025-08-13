import axios from "axios";
export const fetchBooks = async (page = 1, per_page = 10) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-book?action=all&page=${page}&per_page=${per_page}`);

        return {
            items: response.data.data.items,
            meta: response.data.data.meta
        }
    } catch (error) {
        throw error;
    }
};