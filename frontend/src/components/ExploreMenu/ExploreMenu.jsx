import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At rerum
        officiis sint voluptas debitis harum porro consequatur? Labore
        reprehenderit eum soluta fugiat eius aspernatur, excepturi tempora sed
        doloribus, nostrum voluptates!
      </p>
      <hr />
    </div>
  );
};

export default ExploreMenu;
