import type { ICart } from "@/types/ICart";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface CartSliceType{
    cart: ICart | null;
}
const initialState:CartSliceType = {
    cart: null
};

export const CartSlice = createSlice({
    name: 'patkingArea',
    initialState: initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ICart>) => {
            state.cart = action.payload;
        },
        resetCart: (state) => {
            state.cart = null;
        }
    }
})

export const { setCart, resetCart } = CartSlice.actions;
export default CartSlice.reducer;