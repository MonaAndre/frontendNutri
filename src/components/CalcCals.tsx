import  { useState } from "react";
import { INutriFood } from "../models/INutriFood";
import { Spinner } from "./Spinner";

export const CalcCals = () => {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState<INutriFood[]>([]);
  const [totalCalories, setTotalCalories] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNutrients = async () => {
    const appId = import.meta.env.VITE_NUTRITIONIX_ID;
    const appKey = import.meta.env.VITE_NUTRITIONIX_KEY;

    setLoading(true);
    setTotalCalories(null);
    try {
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "x-app-id": appId,
            "x-app-key": appKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFoods(data.foods);

      // Calculate total calories
      const total = data.foods.reduce(
        (acc: number, food: INutriFood) => acc + (food.nf_calories || 0),
        0
      );
      setTotalCalories(total);
    } catch (error) {
      console.error("Error fetching nutrients:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto">
      <h3 className="text-lg mb-5">Calculate Calories</h3>
      <p className="my-2">What products and how many of thos you would like to cals cclas for?</p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your food here (e.g., 'salad with 2 apples and 1 carrot')"
        rows={3}
        className="input-field w-full"
      ></textarea>
      <div className="w-2/3 mx-auto">
 <button
        onClick={fetchNutrients}
        disabled={!query || loading}
        className="btn secondary-btn mb-10"
      >
        Get Calories
       </button>
      </div>
     
      {loading ? <Spinner/>:<>
      
      
      {foods.length > 0 && (
        <div className="foods">
          <h2>Food Details</h2>
          <ul>
            {foods.map((food, index) => (
              <li key={index}>
                <strong>{food.food_name}</strong>: {food.nf_calories} kcal
              </li>
            ))}
          </ul>
        </div>
      )}

      {totalCalories !== null && (
        <div className="total-calories mt-4">
          <h2>Total Calories: {totalCalories} kcal</h2>
        </div>
      )}
      
      </> }

      
    </div>
  );
};

