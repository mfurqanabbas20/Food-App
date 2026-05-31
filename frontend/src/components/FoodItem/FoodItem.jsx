import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, img, price, description, category }) => {

  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={url+'/images/'+img} alt="" />
        {!cartItems[id] ? (
          <button className="add" onClick={() => addToCart(id)}>Add</button>
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
          // 6:58
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
    
        </div>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
