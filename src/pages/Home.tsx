import { useState } from "react";
import { INutritionixResponse } from "../models/INutriProduct";
import Pagination from "../components/Pagination";
import { Spinner } from "../components/Spinner";
import { SideChatModal } from "../components/SideChatModal";
//import { Dropdown } from "../components/Dropdown";

export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<INutritionixResponse | null>(null);

  //filer 
  //const [filterValue, setFilterValue] = useState<string>("branded");

  //loading spinner
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  // Calculate paginated products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // const filteredProducts =
  // filterValue === "branded"
  //   ? searchResult?.branded || []
  //   : searchResult?.common || [];

  const currentProducts = searchResult?.branded.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to update the current page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const SearchProduct = () => {
    console.log("du försöker hitta en produkt");
    fetchData();
  };

  const fetchData = async () => {
    const appId = import.meta.env.VITE_NUTRITIONIX_ID;
    const appKey = import.meta.env.VITE_NUTRITIONIX_KEY;

    try {
      setLoading(true);
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${searchValue}`,
        {
          method: "GET",
          headers: {
            "x-app-id": appId,
            "x-app-key": appKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: INutritionixResponse = await response.json();
      console.log(data);
      setSearchResult(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleFilterChange = (value: string) => {
  //   setFilterValue(value);
  //   setCurrentPage(1); // Reset to first page when filter changes
  // };



  return (
    <>

      <div className="bg-green-200 dark:bg-green-700 p-3 rounded-md flex flex-col gap-3">
        <h1 className="text-2xl ">Hej! och vällkommen till NutriTrack</h1>
        <p>
          Mitt nam är Mona och jag har utvecklat den app med hjälp av{" "}
          <a
            className="font-normal"
            href="https://developer.nutritionix.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nutritionix's API
          </a>
        </p>
        <p>Här kan du enkelt söka produkter och ta reda på kalorier osv</p>
      </div>

      <div className="search">
        <h2 className="heading">Börja med att söka på något produkt</h2>
        <div className="flex gap-3 md:w-2/3 mx-auto">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Sök produkt"
            className="input-field w-full"
          />
          {/* <div className="">
             <Dropdown onFilterChange={handleFilterChange} />
          </div> */}

          <button
            onClick={SearchProduct}
            className="border border-black dark:border-slate-400 flex justify-center items-center p-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div className="search-result mt-4">
          <div className="">


            {loading ? (
              <>
                <Spinner />
              </>) : (
              <>

                {searchResult !== null ? (
                  <>
                    {currentProducts?.length && currentProducts.length > 0 ? (<> <p className="text-center">Vi hittade {searchResult?.branded.length} produkter som är branded</p>   <ul className="flex flex-col gap-4 justify-center">
                      {currentProducts.map((product, index) => (
                        <li key={index} className="mb-2 border p-2 rounded-lg bg-slate-50 w-full md:w-2/3 mx-auto">
                          <div className="flex items-center justify-between gap-5">
                            <div className="img__container rounded-md w-32 h-32 bg-white">
                              <img
                                src={product.photo.thumb}
                                alt={product.food_name}
                                className="object-cover max-h-32 mx-auto"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="font-semibold">{product.food_name}</div>
                              <span className="text-gray-600 ml-auto">
                                {product.brand_name}
                              </span>
                            </div>

                            <span className="text-gray-600 self-end">

                              {product.nf_calories} kkal
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                      <Pagination
                        productsPerPage={productsPerPage}
                        totalProducts={searchResult?.branded.length || 0}
                        currentPage={currentPage}
                        paginate={paginate}
                      />
                    </>) : (
                      <>
                        Vi hittade inga produkter
                      </>)}
                  </>
                ) : (
                  <p className="text-gray-500"></p>
                )}
              </>
            )}

          </div>

        </div>

        <div className="calcCals">
          <SideChatModal />

        </div>
      </div>
    </>
  );
};
