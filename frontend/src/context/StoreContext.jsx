import { createContext , useEffect, useState} from "react";
import { food_list } from "../assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const url = 'http://localhost:4000'
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);

    const addToCart =  async (itemId) => {
        // if it's not available
        if(!cartItems[itemId]){
            setCartItems((prev) => {
                return {
                    ...prev,
                    [itemId] : 1
                }
            })
        }
        else {
            setCartItems((prev) => {
                return {
                    ...prev,
                    [itemId] : prev[itemId] + 1
                }
            })
        }
        if(token){
            console.log('added');
            
            // third define headers
        await axios.post(url+'/api/cart/add', {itemId}, {headers: {token}})

        }
    }

    const removeFromCart = async (itemId) => {
            setCartItems((prev) => {
                return {
                    ...prev, 
                    [itemId] : prev[itemId] - 1
                }
            })
            if(token){
                // third define headers
                console.log('Deleted Successfully');
                
                await axios.delete(url+'/api/cart/remove',{
                    data: {itemId},
                    headers: {token}
                })
                console.log('woow');
                
            }
    }
    const getTotalCartAmount = () => {
        let total_amount = 0;
        for(let item in cartItems){   
            let item_info = food_list.find((product) => product._id === item)
            total_amount = total_amount + item_info.price * cartItems[item];
        }
        return total_amount
    }

    const fetchFoodList = async () => {
        await axios.get(url+'/api/food/list')
        .then((response) => {
            console.log(response);
            setFoodList(response.data.data)
        })
    }
    const loadCartData = async (token) => {
        const response = await axios.post(url+'/api/cart/get',{},{headers: {token}})
        // console.log(response.data);
        console.log('Load Cart Data', response);
        
        setCartItems(response.data.cartData)
    }
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;
