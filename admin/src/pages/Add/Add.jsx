import React, {useState} from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
const Add = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: ''
  })
  const handleChange = (e) => {
    setData((prev) => {
     return {
      ...prev,
      [e.target.name] : e.target.value
     }
     
    })
  }
  const submitData = async () => {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)

    console.log('Data Is After Submiting', data);
    const response = await axios.post('http://localhost:4000/api/food/add', formData)
    if(response.data.success){
      console.log('Data Inserted', data);
      setData(() => {
        return {
          name: '',
          description: '',
          category: 'Salad',
          price: ''
        }
      })
      setImage(false)
    }
    
  }
  return (
    <div className='add'>
      <div className="flex-col">
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={handleChange} value={data.name} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={handleChange} value = {data.description} name="description" rows="6" placeholder='Write Content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={handleChange} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Veg">Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodle">Noodle</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="Number" name="price" onChange={handleChange} placeholder='$20' />
          </div>
        </div>
        <button onClick={submitData} type="submit" className='add-btn'>Add</button>
      </div>
    </div>
  )
}

export default Add