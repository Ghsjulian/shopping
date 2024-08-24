import Ordered from "./components/Ordered";
import Layouts from "./layouts/Layouts";
import Protect from "./Protection/Protect";
import PrivatePath from "./Protection/PrivatePath";
import AdminProdtection from "./Protection/AdminProdtection";
import Home from "./pages/Home";
import About from "./components/AboutSection";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/404";
import LatestProducts from "./components/LatestProducts";
import Profile from "./components/Profile";
import ViewProduct from "./components/ViewProduct";
import Cart from "./components/Cart";
import SearchView from "./components/SearchView";
import ConfirmOrder from "./components/ConfirmOrder";
import Notifications from "./components/Notifications";
/* Admin Components Here */
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import AllProducts from "./admin/AllProducts";
import EditProduct from "./admin/EditProduct";
import AllOrders from "./admin/Ordered";
import ViewOrder from "./admin/ViewOrder";
/* Admin Components Here */

const MyRoutes = [
    {
        path: "/",
        index: true,
        element: (
            <Layouts>
                <Home />
            </Layouts>
        )
    },
    {
        path: "/about",
        element: (
            <Layouts>
                <About isTrue={true} />
            </Layouts>
        )
    },
    {
        path: "/contact",
        element: (
            <Layouts>
                <Contact isTrue={true} />
            </Layouts>
        )
    },
    {
        path: "/signup",
        element: (
            <Protect>
                <Layouts>
                    <Signup />
                </Layouts>
            </Protect>
        )
    },
    {
        path: "/login",
        element: (
            <Protect>
                <Layouts>
                    <Login />
                </Layouts>
            </Protect>
        )
    },
    {
        path: "/view-product/:id",
        element: (
            <Layouts>
                <ViewProduct />
            </Layouts>
        )
    },
    {
        path: "/cart",
        element: (
            <PrivatePath>
                <Layouts>
                    <Cart />
                </Layouts>
            </PrivatePath>
        )
    },
    {
        path: "/confirm-order/:userid/:price",
        element: (
            <PrivatePath>
                <Layouts>
                    <ConfirmOrder />
                </Layouts>
            </PrivatePath>
        )
    },
    {
        path: "/orders",
        element: (
            <PrivatePath>
                <Layouts>
                    <Ordered />
                </Layouts>
            </PrivatePath>
        )
    },
    {
        path: "/notifications",
        element: (
            <PrivatePath>
                <Layouts>
                    <Notifications />
                </Layouts>
            </PrivatePath>
        )
    },
    {
        path: "/profile",
        element: (
            <PrivatePath>
                <Layouts>
                    <Profile />
                </Layouts>
            </PrivatePath>
        )
    },
    {
        path: "/latest-products",
        element: (
            <Layouts>
                <LatestProducts />
            </Layouts>
        )
    },
    {
        path: "/search/:query",
        element: (
            <Layouts>
                <SearchView />
            </Layouts>
        )
    },
    /* Admin Routes Here */
    {
        path: "/admin/dashboard",
        element: (
            <AdminProdtection>
                <Layouts>
                    <Dashboard />
                </Layouts>
            </AdminProdtection>
        )
    },
    {
        path: "/admin/add-product",
        element: (
            <AdminProdtection>
                <Layouts>
                    <AddProduct />
                </Layouts>
            </AdminProdtection>
        )
    },
    {
        path: "/admin/products",
        element: (
            <AdminProdtection>
                <Layouts>
                    <AllProducts />
                </Layouts>
            </AdminProdtection>
        )
    },
    {
        path: "/admin/edit-product/:id",
        element: (
            <AdminProdtection>
                <Layouts>
                    <EditProduct />
                </Layouts>
            </AdminProdtection>
        )
    },
    {
        path: "/admin/orders",
        element: (
            <AdminProdtection>
                <Layouts>
                    <AllOrders />
                </Layouts>
            </AdminProdtection>
        )
    },
    {
        path: "/admin/view-order/:userId",
        element: (
            <AdminProdtection>
                <Layouts>
                    <ViewOrder />
                </Layouts>
            </AdminProdtection>
        )
    },
    /* Admin Routes Here */
    {
        path: "*",
        element: <NotFound />
    }
];

export default MyRoutes;
