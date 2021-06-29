import { useState } from 'react';
import { Box, Image, Text, Button, Input } from 'theme-ui';
import { useQuery } from 'react-query';
import { getRandom5Meal, searchMeal } from '../../api/recipeApi';
import MealCard from './components/MealCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'components/Link';
import { MealT } from 'types/Meal';

const Home = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [listType, setListType] = useState<'random' | 'favorites'>('random');
  const [favorites] = useState<{ [key: string]: MealT }>(() => {
    const favorites = JSON.parse(
      localStorage.getItem('recipe-favorites') ?? '{}',
    );
    return favorites;
  });

  const { data: meals } = useQuery('recipe-random', () => getRandom5Meal(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: searchResults, isLoading } = useQuery(
    'recipe-search-' + searchValue,
    () => searchMeal(searchValue),
    {
      enabled: searchValue.length > 2,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  const favoriteMeals = Object.values(favorites);
  const mealsToShow = listType === 'random' ? meals : favoriteMeals;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundImage:
            'url(https://raw.githubusercontent.com/EverlyWell/react-challenge/master/assets/home-background.jpg)',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Image
          sx={{
            width: '150px',
            height: '150px',
          }}
          src="https://github.com/EverlyWell/react-challenge/blob/master/assets/logo.png?raw=true"
          alt="logo"
        />
      </Box>
      {favoriteMeals.length > 0 && (
        <Button
          bg="lightblue"
          m={3}
          onClick={() =>
            setListType(listType === 'random' ? 'favorites' : 'random')
          }
        >
          {listType === 'random' ? 'Show Favorites' : 'Show Recipes of the day'}
        </Button>
      )}
      <Text
        as="h1"
        mt={3}
        sx={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontWeight: 'normal',
          color: '#737373',
          fontSize: '20px',
        }}
      >
        {listType === 'favorites' ? 'Favorites' : 'Recipes of the day'}
      </Text>
      <Button
        bg="red"
        p={3}
        onClick={() => setShowSearch(true)}
        aria-label="Search"
        sx={{
          width: 'auto',
          position: 'fixed',
          right: 10,
          bottom: 20,
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faSearch} color="white" />
      </Button>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {mealsToShow?.map((meal) => (
          <Box sx={{ width: ['100%', null, '33.33%'], p: [0, null, 2] }}>
            <MealCard key={meal.idMeal} meal={meal} />
          </Box>
        ))}
      </Box>

      {showSearch && (
        <Box
          sx={{
            flexDirection: 'column',
            position: 'fixed',
            zIndex: 100,
            background: 'white',
            width: '100%',
            height: '100%',
            top: 0,
            display: 'flex',
          }}
        >
          <Box bg="#e0e0e0" sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{ width: '50px', height: '50px', bg: 'transparent' }}
              onClick={() => {
                setShowSearch(false);
                setSearchValue('');
              }}
              aria-label="Back"
            >
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </Button>
            <Input
              onChange={(event) => setSearchValue(event.target.value)}
              value={searchValue}
              placeholder="I'm craving..."
              sx={{ borderColor: 'transparent' }}
              autoFocus
            />
          </Box>
          <Box pt={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            {searchValue.length > 2 &&
              (searchResults?.data.meals ? (
                searchResults.data.meals.map((meal) => (
                  <Link
                    py={2}
                    px={3}
                    to={`/recipe/${meal.idMeal}`}
                    sx={{ textDecoration: 'none', color: 'black' }}
                  >
                    {meal.strMeal}
                  </Link>
                ))
              ) : !isLoading ? (
                <Box py={2} px={3}>
                  No Results
                </Box>
              ) : null)}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
