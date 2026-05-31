import React, { useEffect } from 'react'
import './List.css'
import { useState } from 'react'
import axios from 'axios'
const List = () => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    await axios.get('http://localhost:4000/api/food/list')
    .then((response) => {
      setList(response.data.data)
    })
    .catch((err) => {
      console.log(err);
      
    })
    
  }

  const removeFood = async(foodId) => {
    // pass as data because it is a config object
    await axios.delete('http://localhost:4000/api/food/remove', {
      data: {
        id: foodId
      }
    })
    .then((res) => {
      console.log('Removed');  
    })
    .catch((err) => {
      console.log('Error Occured');
      
    })
    await fetchList()
  }
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div className='list add flex-cols'>
      <p>All Food Lists</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`http://localhost:4000/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List