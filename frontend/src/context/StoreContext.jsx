import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://pantastic-backend.onrender.com";
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [food_list, setFoodList] = useState([]);
    const [profileImageUrl, setProfileImageUrl] = useState(localStorage.getItem("profileImageUrl") || "");

    const addToCart = async (itemId) => {
        console.log('Adding to cart:', itemId);
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
        }
    };
    
    const removeFromCart = async (itemId) => {
        console.log('Removing from cart:', itemId);
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const clearCart = () => {
        setCartItems({});
      };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
        setCartItems(response.data.cartData);
    };

    const loadUserData = async (token) => {
        const response = await axios.get(url + "/api/user/profile", { headers: { Authorization: `Bearer ${token}` } });
        setUser(response.data.user);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await loadUserData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        profileImageUrl,
        setProfileImageUrl,
        user,
        setUser,
        clearCart
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
