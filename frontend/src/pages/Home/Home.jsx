import React, {useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import FoodItem from '../../components/FoodItem/FoodItem'
const Home = () => {
  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <FoodDisplay category={category}/>
      <ExploreMenu/>
      <FoodItem/>
      <AppDownload/>
    </div>
  )
}

export default Home