import actionTypes from "../actions/actionTypes";
import { updatedObject } from "./utility";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 6.9,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = updatedObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      });
      return updatedObject(state, {
        ingredients: updatedIngredient,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
      });
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredients = updatedObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      });
      return updatedObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
      });
    case actionTypes.SET_INGREDIENTS:
      return updatedObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 6.9,
        error: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updatedObject(state, {
        error: true,
      });
    default:
      return state;
  }
};

export default reducer;
