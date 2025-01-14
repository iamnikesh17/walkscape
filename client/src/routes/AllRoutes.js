import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartPage, HomePage, Login, OrderListPage, OrderPage, PaymentPage, PlaceOrderPage, ProductCreatePage, ProductDetail, ProductListPage, ProductUpdatePage, ProfilePage, Register, ShippingPage, UserEditPage, UserListPage } from '../pages'
import PrivateRoutes from './PrivateRoutes'
import { AdminRoutes } from './AdminRoutes'

export const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/page/:pageNumber' element={<HomePage/>}></Route>
            <Route path='/search/:keyword' element={<HomePage/>}></Route>
            <Route path='/search/:keyword/page/:pageNumber' element={<HomePage/>}></Route>
            <Route path='/product-detail/:id' element={<ProductDetail/>}></Route>
            <Route path='/cart' element={<CartPage/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/shipping' element={<PrivateRoutes><ShippingPage/></PrivateRoutes>}></Route>
            <Route path='/payment' element={<PrivateRoutes><PaymentPage/></PrivateRoutes>}></Route>
            <Route path='/place-order' element={<PrivateRoutes><PlaceOrderPage/></PrivateRoutes>}></Route>
            <Route path='/order/:id' element={<PrivateRoutes><OrderPage/></PrivateRoutes>}></Route>
            <Route path="/profile" element={<PrivateRoutes><ProfilePage/></PrivateRoutes>}></Route>

            <Route path='/admin/orderlist' element={<AdminRoutes><OrderListPage/></AdminRoutes>}></Route>
            <Route path='/admin/productslist' element={<AdminRoutes><ProductListPage/></AdminRoutes>}></Route>
            <Route path='/admin/productslist/:pageNumber' element={<AdminRoutes><ProductListPage/></AdminRoutes>}></Route>
            <Route path='/admin/products/create' element={<AdminRoutes><ProductCreatePage/></AdminRoutes>}></Route>
            <Route path='/admin/products/:id/edit' element={<AdminRoutes><ProductUpdatePage/></AdminRoutes>}></Route>
            <Route path="/admin/userlist" element={<AdminRoutes><UserListPage/></AdminRoutes>}></Route>
            <Route path='/admin/users/:id/edit' element={<AdminRoutes><UserEditPage/></AdminRoutes>}></Route>
        </Routes>
    </>
)
}
