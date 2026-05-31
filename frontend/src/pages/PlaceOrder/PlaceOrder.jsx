import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const PlaceOrder = () => {

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)

  const handleChange = (event) => {
    setData((prev) => {
      return {
        ...prev, 
        [event.target.name]: event.target.value
      }
    })
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let item_info = item
        item_info["quantity"] = cartItems[item._id]
        orderItems.push(item_info)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }    
    let response = await axios.post(url+'/api/order/place', orderData, {headers: {token}})
    if(response.data.success){
      const {session_url} = response.data
      window.location.href = session_url
    }
    else {
      alert("Error")
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart')
    }
  }, [token])

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={handleChange} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={handleChange} name='lastName' value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <div>
          <input required onChange={handleChange} name='email' value={data.email} type="email" placeholder='Email Address'/>
          <input required onChange={handleChange} name='street' value={data.street} type="text" placeholder='Street'/>
        </div>
        <div className="multi-fields">
          <input required onChange={handleChange} name='city' value={data.city} type="text" placeholder='City' />
          <input required onChange={handleChange} name='state' value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={handleChange} name='zipCode' value={data.zipCode} type="text" placeholder='Zip Code' />
          <input required onChange={handleChange} name='country' value={data.country} type="text" placeholder='Country' />
        </div>
        <input required onChange={handleChange} name='phone' value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() > 0 ? '2' : '0'}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : getTotalCartAmount()}</p>
            </div>
            <button type="submit" onClick={placeOrder}>PROCEEDD TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder