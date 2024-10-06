export function changeCartItemCount(cartItemId: number, action: '+' | '-') {
    const cartStore = useCartStore()
    cartStore.changeCountCartItem(cartItemId, action)
}