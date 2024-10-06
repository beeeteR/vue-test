import { defineStore } from 'pinia'
import type { ICartItem } from '~/shared/types/cart'

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: [] as ICartItem[]
    }),
    getters: {
        getCartItemForCartId: (state) => (itemId: number) => state.cart.find(item => item.id === itemId),
        getCartItemForProductId: (state) => (productId: number) => state.cart.find(item => item.productId === productId),
        getCart: (state) => state.cart,
        getCartCountItems: (state) => state.cart.reduce((acc, item) => {
            return acc += item.count
        }, 0),
        checkProductInCart(state) {
            return (productId: number) => Boolean(this.getCartItemForProductId(productId))
        }
    },
    actions: {
        addCartItem(productId: number) {
            const id = Date.now()
            this.cart.push({
                id: id,
                count: 1,
                productId: productId
            })
            return id
        },
        changeCountCartItem(cartItemId: number, action: '+' | '-') {
            const cartItem = this.cart.find(item => item.id === cartItemId)
            if (cartItem) {
                switch (action) {
                    case '+':
                        cartItem.count += 1
                        break;
                    case '-':
                        cartItem.count -= 1
                        break;
                }
                if (cartItem.count === 0) this.deleteCartItem(cartItem.id)
            }
        },
        deleteCartItem(cartItemId: number) {
            this.cart = this.cart.filter(item => item.id != cartItemId)
        }
    }
})