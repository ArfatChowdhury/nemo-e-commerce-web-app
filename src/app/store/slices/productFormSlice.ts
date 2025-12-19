import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductFormState {
    cart: any[];
    wishlist: any[];
}

const initialState: ProductFormState = {
    cart: [],
    wishlist: [],
}

const productFormSlice = createSlice({
    name: 'productForm',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            state.cart.push(action.payload)
        },
        removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
            state.cart = state.cart.filter((item: any) => item._id !== action.payload._id)
        },
        addToWishlist: (state, action: PayloadAction<any>) => {
            state.wishlist.push(action.payload)
        },
        removeFromWishlist: (state, action: PayloadAction<{ _id: string }>) => {
            state.wishlist = state.wishlist.filter((item: any) => item._id !== action.payload._id)
        }
    }
})

export const { addToCart, removeFromCart, addToWishlist, removeFromWishlist } = productFormSlice.actions
export default productFormSlice.reducer