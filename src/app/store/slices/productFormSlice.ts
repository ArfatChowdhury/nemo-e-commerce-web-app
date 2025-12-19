import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductFormState {
    cart: any[];
    wishlist: any[];
    orderHistory: any[];
}

const initialState: ProductFormState = {
    cart: [],
    wishlist: [],
    orderHistory: []
}

const productFormSlice = createSlice({
    name: 'productForm',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const existingItem = state.cart.find((item: any) => item._id === action.payload._id)
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1
            } else {
                state.cart.push({ ...action.payload, quantity: 1 })
            }
        },
        updateQuantity: (state, action: PayloadAction<{ _id: string, change: number }>) => {
            const item = state.cart.find((item: any) => item._id === action.payload._id)
            if (item) {
                const newQuantity = (item.quantity || 1) + action.payload.change
                if (newQuantity > 0) {
                    item.quantity = newQuantity
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
            state.cart = state.cart.filter((item: any) => item._id !== action.payload._id)
        },
        addToWishlist: (state, action: PayloadAction<any>) => {
            state.wishlist.push(action.payload)
        },
        removeFromWishlist: (state, action: PayloadAction<{ _id: string }>) => {
            state.wishlist = state.wishlist.filter((item: any) => item._id !== action.payload._id)
        },
        checkoutSuccess: (state) => {

            const newOrder = {
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString(),
                items: [...state.cart],
                total: state.cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)
            };
            state.orderHistory.push(newOrder);
            state.cart = [];
        }
    }
})

export const { addToCart, updateQuantity, removeFromCart, addToWishlist, removeFromWishlist, checkoutSuccess } = productFormSlice.actions
export default productFormSlice.reducer