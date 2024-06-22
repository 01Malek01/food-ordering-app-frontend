import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page" , searchState.page.toString());
    params.set('selectedCuisines', searchState.selectedCuisines.join(','));//as it's an array we have to convert it to comma separated string
    params.set("sortOption",searchState.sortOption);
    const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);
    if (!res.ok) {
      throw new Error("Failed to fetch restaurants");
    }
    return res.json();
  };

  const { data: results, isLoading } = useQuery(
    //we added searchState to tell it we want to rerun the query when the searchState changes
    ["searchRestaurants",searchState],
    createSearchRequest,
    {
      enabled: !!city, //only run this query if city is not undefined
    }
  );
  return {
    results,
    isLoading,
  };
};
