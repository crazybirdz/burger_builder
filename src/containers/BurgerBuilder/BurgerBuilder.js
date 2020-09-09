import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildContols/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
    },
    totalPrice: 4,
    purchasable: false,
    ordered: false,
  };

  handleUpdatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  handleAdded = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = newCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + priceAddition;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredient,
    });
    this.handleUpdatePurchaseState(updatedIngredient);
  };

  handleRemoved = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = newCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + priceDeduction;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredient,
    });
    this.handleUpdatePurchaseState(updatedIngredient);
  };

  handleOrdered = () => {
    this.setState({ ordered: true });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal ordered={this.state.ordered}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.handleAdded}
          ingredientRemoved={this.handleRemoved}
          disabled={disableInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.handleOrdered}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
