import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
export default function SearchPage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results } = useSearchRestaurants(searchState, city);
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1, //it will make a new request tp backend on each change of cuisines so we reset page
    }));
  };
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  return (
    //on large screens make the left column 250px and the right take the remaining space
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          isExpanded={isExpanded}
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          onExpandClick={() => setIsExpanded((prevState) => !prevState)}
        />{" "}
      </div>
      <div id="main-content" className="flex flex-col gap-5 ">
        <SearchBar
          //we added searchQuery as a prop to the search bar to persist the value the user typed between each render
          searchQuery={searchState.searchQuery}
          placeHolder="Search By Cuisine or Restaurant Name"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
        />
        <div className="flex justify-between gap-3 flex-col lg:flex-row">
          <SearchResultInfo total={results?.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
          {results?.data.map((restaurant) => (
            <SearchResultCard key={restaurant._id} restaurant={restaurant} />
          ))}
          <PaginationSelector
            page={results?.pagination.page ?? 1} //?? : if left hand side is null or undefined it ill return the right hand side
            pages={results?.pagination.pages ?? 1} //?? : if left hand side is null or undefined it ill return the right hand side
            onPageChange={setPage}
          />
      </div>
    </div>
  );
}
