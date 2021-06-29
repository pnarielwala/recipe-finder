import Link from 'components/Link';
import { Image, Text } from 'theme-ui';
import { MealT } from 'types/Meal';
import styles from './MealCard.module.scss';

type PropsT = {
  meal: MealT;
};
const MealCard = (props: PropsT) => (
  <div className={styles.container}>
    <Link
      className={styles.link}
      to={`/recipe/${props.meal.idMeal}`}
      //
      // my={4}
      // sx={{ textDecoration: 'none', color: 'initial' }}
    >
      <Text
        as="h2"
        className={styles.text}
        //
        // sx={{ textAlign: 'center' }}
      >
        {props.meal.strMeal}
      </Text>
      <Image
        src={props.meal.strMealThumb}
        alt="" // no need because of text above
        className={styles.image}
        //
        // mt={3}
        // sx={{ width: '100%' }}
      />
    </Link>
  </div>
);

export default MealCard;
