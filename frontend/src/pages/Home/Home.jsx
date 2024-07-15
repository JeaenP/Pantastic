import React, { useState } from 'react'
  import './Home.css' 
  import Header from '../../components/Header/Header'
  import ExploreMenu from '../../components/ExploreMenu/Exploremenu'
  import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
  import MoreInfo from '../../components/MoreInfo/MoreInfo'
  const Home = () => {
    const [category, setCategory]= useState("All");

    return (
      <div>
        <Header/>
        <div className="carousel">
          <ExploreMenu category={category} setCategory={setCategory}/>
          <FoodDisplay category={category}/>
          <MoreInfo/>
        </div>
      </div>
    )
  }

  export default Home