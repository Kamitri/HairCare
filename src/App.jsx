import './App.scss';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import AppNavBar from './components/AppNavBar';
import Products from './components/Products';
import Product from './components/Product';
import NotFound from './components/NotFound'
import Home from './components/Home'
import BlogPost from './components/BlogPost';
import BlogHome from './components/BlogHome';
import Brand from './components/Brand';
import Compare from './components/Compare';
import ContactUs from './components/ContactUs';
import Cart from './components/Cart';
import AboutUs from './components/AboutUs';
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import ComparisonContext from './components/ComparisonContext';
import CartContext from './components/CartContext'

function App() {
	const [comparisonList, setComparisonList] = useState([]);
	const [shoppingCart, setShoppingCart] = useState([]);
	useEffect(() => {
		AOS.init({
		  duration : 1000
		});
	  }, []);

	return (
		<div className='App'>
			<CartContext.Provider value={{'shoppingCart': shoppingCart, 'setShoppingCart': setShoppingCart}}>
				<ComparisonContext.Provider value={{'comparisonList': comparisonList, 'setComparisonList': setComparisonList }}>
					<AppNavBar></AppNavBar>

					<div className='mb-4'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/home' element={<Home />} />
        					<Route path='/products' element={<Products/>} />
							<Route path='/products/:category' element={<Products/>} />
							<Route path='/product/:productId' element={<Product />} />
							<Route path='/blog' element={<BlogHome />} />
							<Route path='/blog/:postId' element={<BlogPost />} />
							<Route path='/brand/:brandId' element={<Brand />} />
							<Route path='/compare' element={<Compare />}/>
							<Route path='/contact-us' element={<ContactUs />} />
							<Route path='/about-us' element={<AboutUs />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='*' element={<NotFound />}/>
      					</Routes>
					</div>

      				<Footer></Footer>
			 	</ComparisonContext.Provider>
			</CartContext.Provider>
		</div>
	);
}

export default App;
