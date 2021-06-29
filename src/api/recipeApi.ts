import axios, { AxiosResponse } from 'axios';
import { MealT } from '../types/Meal';

const xhr = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});
export const getRandomMeal = () => xhr.get('/random.php');
export const getRandom5Meal = async (): Promise<Array<MealT>> => {
  // on mobile the requests are cached so the same meal appears 5 times
  const preventCacheOptions = () => ({
    params: {
      random: Math.floor(Math.random() * 9999),
    },
  });
  const datas = await Promise.all([
    xhr.get('/random.php', preventCacheOptions()),
    xhr.get('/random.php', preventCacheOptions()),
    xhr.get('/random.php', preventCacheOptions()),
    xhr.get('/random.php', preventCacheOptions()),
    xhr.get('/random.php', preventCacheOptions()),
  ]);
  return datas.map((data) => data.data.meals[0]);
};

type SearchMealResponseT = {
  meals: Array<MealT>;
};
export const searchMeal = async (
  searchText: string,
): Promise<AxiosResponse<SearchMealResponseT>> =>
  xhr.get(`/search.php?s=${searchText}`);

export const getMeal = async (
  mealId: string,
): Promise<AxiosResponse<SearchMealResponseT>> =>
  xhr.get(`/lookup.php?i=${mealId}`);
