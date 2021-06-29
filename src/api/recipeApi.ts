import axios, { AxiosResponse } from 'axios';
import { MealT } from '../types/Meal';

const xhr = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});
export const getRandomMeal = () => xhr.get('/random.php');
export const getRandom5Meal = async (): Promise<Array<MealT>> => {
  const datas = await Promise.all([
    xhr.get('/random.php'),
    xhr.get('/random.php'),
    xhr.get('/random.php'),
    xhr.get('/random.php'),
    xhr.get('/random.php'),
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
