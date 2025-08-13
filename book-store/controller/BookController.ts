import axios from "axios";
export const fetchBooks = async (page = 1, per_page = 10, search = '') => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-book?action=all&page=${page}&per_page=${per_page}&search=${search}`);

        return {
            items: response.data.data.items,
            meta: response.data.data.meta
        }
    } catch (error) {
        throw error;
    }
};

export async function DropDownBookByID(search = '', title = '') {
    try{
        // await delay(1000);
        const normalizedSearch = search.trim().toLowerCase();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-book?action=dropdown-id&search=${normalizedSearch}&title=${title}`);
        // console.log(response.data.data)
        return response.data.data
    } catch (error) {
        throw error;
    }
}