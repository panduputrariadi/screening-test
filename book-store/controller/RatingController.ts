import { toast } from "sonner";
import { CreateRating } from "../schema/RatingSchema";

export async function PostRating(data: CreateRating) {
  try {    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-rating?action=give`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",        
      },
      body: JSON.stringify(data),
    });

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error(resJson.message || "Failed to create category");
    }

    return resJson;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Network error");
    throw error;
  }
}