import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ColorOption {
    name: string;
    value: string;
}

export interface Product {
    _id: string;
    productName: string;
    price: number;
    description: string;
    brandName: string;
    stock: number;
    colors: ColorOption[];
    category: string;
    images: string[];
}

interface ProductFormState {
    productName: string;
    price: string;
    description: string;
    brandName: string;
    stock: string;
    colors: ColorOption[];
    category: string;
    images: string[];
    products: Product[];
    cart: any[];
    wishlist: any[];
    orderHistory: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductFormState = {
    productName: '',
    price: '',
    description: '',
    brandName: '',
    stock: '',
    colors: [],
    category: '',
    images: [],
    products: [],
    cart: [],
    wishlist: [],
    orderHistory: [],
    loading: false,
    error: null,
}

const productFormSlice = createSlice({
    name: 'productForm',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ field: keyof ProductFormState; value: any }>) => {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },
        resetForm: (state) => {
            state.productName = '';
            state.price = '';
            state.description = '';
            state.brandName = '';
            state.stock = '';
            state.colors = [];
            state.category = '';
            state.images = [];
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
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

export const fetchProducts = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const response = await fetch('https://backend-of-nemo.vercel.app/products');
            const data = await response.json();
            dispatch(setProducts(data.data || data));
        } catch (error: any) {
            console.error('Error fetching products:', error);
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const {
    updateField,
    resetForm,
    setProducts,
    setLoading,
    setError,
    addToCart,
    updateQuantity,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    checkoutSuccess
} = productFormSlice.actions
export default productFormSlice.reducer