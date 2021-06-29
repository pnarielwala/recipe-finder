import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMeal } from 'api/recipeApi';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { Box, Button, Image, Text } from 'theme-ui';
import { MealT } from 'types/Meal';

type PropsT = {
  mealId: string;
};

const Recipe = (props: PropsT) => {
  const history = useHistory();

  const [favorites, setFavorites] = useState<{
    [key: string]: MealT | undefined;
  }>(() => {
    const favorites = JSON.parse(
      localStorage.getItem('recipe-favorites') ?? '{}',
    );
    return favorites;
  });

  useEffect(() => {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const { data, isLoading } = useQuery('recipe-' + props.mealId, () =>
    getMeal(props.mealId),
  );

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const meal = data?.data.meals?.[0];
  if (meal) {
    const isFavorite = !!favorites[props.mealId];
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
            px: 3,
            bg: '#e0e0e0',
          }}
        >
          <Button
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              history.push('/');
            }}
            backgroundColor="transparent"
            aria-label="Back"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </Button>
          <Button
            sx={{ cursor: 'pointer' }}
            aria-label="Favorite"
            onClick={() => {
              setFavorites((prevFavorites) => {
                const favoriteMeal = prevFavorites[meal.idMeal];
                if (!!favoriteMeal) {
                  const removedFavorites = { ...prevFavorites };
                  delete removedFavorites[meal.idMeal];
                  return removedFavorites;
                } else {
                  return {
                    ...prevFavorites,
                    [meal.idMeal]: meal,
                  };
                }
              });
            }}
            backgroundColor="transparent"
          >
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              color={isFavorite ? 'red' : 'white'}
            />
          </Button>
        </Box>

        <Image
          src={meal.strMealThumb}
          alt="" //
          sx={{
            width: ['100%', '300px'],
            m: [0, 3],
          }}
        />

        <Box p={3}>
          <Text as="h1">{meal.strMeal}</Text>

          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            {[...new Array(20)].map((_, index) => {
              const measureKey = 'strMeasure' + (index + 1);
              const ingrKey = 'strIngredient' + (index + 1);
              return (
                <Text mt={1}>{`${meal[measureKey]} ${meal[ingrKey]}`}</Text>
              );
            })}
          </Box>

          <Text as="h2">Directions</Text>
          <Text as="p" mt={2}>
            {meal.strInstructions}
          </Text>
        </Box>
      </Box>
    );
  }

  return null;
};

export default Recipe;
