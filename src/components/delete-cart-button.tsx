// "use client"

// import React, { useCallback, useContext } from 'react'
// import { Button } from './ui/button'
// import { toast } from "sonner"
// import { CartProctContext } from './header-navigation'

// const DeleteCartProduct = ({id}: {id: number}) => {
//     const { productsCartState } = useContext(CartProctContext)
//     const addProduct = useCallback(async (id: string, position: number) => {
  
//       try {
//         const resposHTTP = await fetch(`/api/cart`, {
//           method: 'POST',
//           credentials: "include",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({id: id})
//         })
    
//         // GET BODY
//         await resposHTTP.json()
//         const cartStorageString = sessionStorage.getItem('cart')
//         if (cartStorageString) {
//           const cartStorage = JSON.parse(cartStorageString)
//           cartStorage.splice(position,1)
//           sessionStorage.setItem("cart", cartStorage)
    
//           setCartProductsState(cartStorage)
//           toast("Item removed", {
//             description: "The item has been removed from your cart",
//             action: {
//               label: "Undo",
//               onClick: () => console.log("Undo"),
//             },
//           })
//         } 
//       } catch(err) {
//         toast("Item removed", {
//           description: "The item has been removed",
//           action: {
//             label: "Undo",
//             onClick: () => console.log("Undo"),
//           },
//         })
  
//       }
  
//     }, [])
//   return (
//     <Button onClick={() => addProduct(id)} className="w-full bg-navy-blue hover:bg-navy-blue/90 text-white rounded-full flex items-center align-center justify-center">Añadir al carrito</Button>
//   )
// }

// export default DeleteCartProduct