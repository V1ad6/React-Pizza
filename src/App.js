import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";

function App() {
  const [cartPizzas, setCartPizzas] = useState([]);
  const [lastCartId, setLastCartId] = useState(0);
  const [price, setPrice] = useState(
    cartPizzas.reduce((sum, currentPizza) => sum + currentPizza.price * currentPizza.count, 0)
  );

  useEffect(() => {
    setPrice(cartPizzas.reduce((sum, currentPizza) => sum + currentPizza.price * currentPizza.count, 0));
  }, [cartPizzas]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage 
                                      cartPizzas={cartPizzas} 
                                      setCartPizzas={setCartPizzas} 
                                      cartCount={cartPizzas.length} 
                                      cartPrice={cartPizzas.reduce((sum, currentPizza) => sum + currentPizza.price, 0)}
                                      lastCartId={lastCartId}
                                      setLastCartId={setLastCartId}
                                  />}/>
          <Route path='/cart' element={<Cart 
                                          pizzas={cartPizzas} 
                                          setPizzas={setCartPizzas} 
                                          price={price}
                                          setPrice={setPrice}
                                          lastCartId={lastCartId}
                                          setLastCartId={setLastCartId}
                                      />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;