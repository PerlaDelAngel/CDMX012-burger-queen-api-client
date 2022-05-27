import { Header } from "../../components/Header/header";
import { Footer } from "../../components/Footer/footer";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Orders.css'
import cart from '../../assets/Shopping Cart.png';
import { Menu } from "../../components/Menus/Menus";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";

export const Orders = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3333/products')
            .then((response) => {
                return response.json()
            })
            .then((products) => {
                setProducts(products)
            })
    }, [])

    let orderProducts = products.map((product) => {return {product: product.name, price: product.price}});

    let initialTable = '';

    if(location.state !== null){
        orderProducts = location.state.order.products;
        initialTable = location.state.order.client
    }

    const [menu, setMenu] = useState('breakfast');
    const [table, setTable] = useState(initialTable);
    const [isOpen, setIsOpen] = useState(false);

    const handleChangeTable = (e) => {
        setTable(e.target.value)
    }

    const breakfastMenu = () => {
        return (
            <Menu products={products} 
            btn={'dinnerBtn'} 
            type={'breakfast'} 
            name={'breakfastMenu'} 
            orderProducts={orderProducts}>
            </Menu>
        );
    }

    const dinnerMenu = () => {
        return (
            <Menu products={products} 
            btn={'breakfastBtn'} 
            type={'dinner'} 
            name={'dinnerMenu'} 
            orderProducts={orderProducts}>
            </Menu>
        );
    }

    return (
        <>
            <Header />
            <h1>Orders</h1>

            <div className="table-input">
                <label htmlFor="table-num" className="table-label">Table: </label>
                <input type="number" id="tableNum" name="table-num" min="1" max="30" onChange={handleChangeTable} value={table}></input>
            </div>

            <div className="menuButtons">
                <button className='breakfastBtn' onClick={() => setMenu('breakfast')}>Breakfast</button>
                <button className='dinnerBtn' onClick={() => setMenu('dinner')}>Dinner</button>
            </div>
            {menu === 'breakfast' ? breakfastMenu() : dinnerMenu()}


            <button className="verify-order-btn" onClick={() => {

                const filtered = orderProducts.filter((product) => {
                    return product.qty > 0 ;
                });

                if (filtered.length > 0) {
                    navigate('/verify-order', {
                        state: {
                            order: {
                                products: orderProducts,
                                client: table
                            }
                        }
                    })
                } else {
                    setIsOpen(true);
                }
            }}>
                <img src={cart} alt="shopping cart icon" className="cart-icon"></img>
                Verify the order
            </button>
            <ErrorModal open={isOpen} onClose={() => setIsOpen(false)} />
            <Footer />
        </>
    );
}