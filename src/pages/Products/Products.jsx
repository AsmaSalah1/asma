import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './../../component/loader/Loader';
import { Link } from 'react-router-dom';
import style from './products.module.css'
import './products.css'
function Products() {
  const [loader, setLoader] = useState(true);
const[products,setProducts]=useState([]);
const[search,setSearch]=useState('');
const [myData,setMyData]=useState('search');
let numberOfPage={};
  const getProducts = async (myData,searchPro) => {
    // console.log(myData);
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10&${myData}=${searchPro}`);
    // const lenght =4;
    // const limit = data.total;
    //  numberOfPage = data.total/4;
    // console.log(numberOfPage);
    // console.log(data.products);
    //  console.log("s = ",search);

    setProducts(data.products);
    setLoader(false);
  }
  const serchProducts=async(e)=>{
    if(e){
    // console.log(e.target.value);
    await setSearch(e.target.value);
    //  console.log("search",search);
    getProducts('search',e.target.value);

    }
    else{
    getProducts('search','');

    }
  }

  const selectSprtPro=async(e)=>{
    // console.log("selectSprtPro");
    // await setMyData('sort');
    // await setSearch(e.target.value);
    getProducts('sort',e.target.value);

  }
  const selectMaxPrice=(e)=>{
    // console.log("selectMaxPrice");
    getProducts('price[gte]',e.target.value);
    if(e){
      getProducts('price[gte]',e.target.value);
  
      }
      else{
        getProducts('search','');
  
      }
  }
  const selectMinPrice=(e)=>{
    if(e){
if(e.target.value==null){
  getProducts('search','');

}else{
  getProducts('price[lte]',e.target.value);

}
  
      }
      else{
        getProducts('search','');
  
      }

  }
  useEffect(() => {
    serchProducts();
    //getProducts();
  }, []);
 
  if (loader) {
    return <Loader/>
  }
  
  return (
    <>

<div className={style.f}>
<div
// className="d-flex justify-content-center "
>
        
          <input
            type="text"
            name="text"
            placeholder="search a product"
            className={style.search}
            onChange={serchProducts}
          />
         {/* {" "} */}
        </div>
       <div className={style.sort}>
        <p>Sort by</p>
<select onClick={selectSprtPro}>
<option value="defult">defult</option>

  <option value="name">name</option>
  <option value="-name">-name</option>

  <option value="finalPrice">finalPrice</option>
  <option value="-finalPrice">-finalPrice</option>

  <option value="discount">discount</option>
  <option value="-discount">-discount</option>

</select>
</div>
<input className={style.search2} onChange={selectMaxPrice}  placeholder='mix price you want'/>
<input className={style.search2} onChange={selectMinPrice} placeholder='max price you want'/>
</div>
<div className={style.nine}>
  <span>products</span>
</div>

<div className='row mm '>
    {products.map((pro)=>(
 <Link to={`/ProDetails?id=${pro._id} `} className={`card  mt-4 bgg ${style.widthh}`}  key={pro._id} style={{width: '40rem'}}>
  <img src={pro.mainImage.secure_url} className="card-imgf-top yy" alt={pro.name} />
  <div className="card-body">
    <h5 className="card-title">{pro.name}</h5>
    {/* <p className="card-text pp">{pro.description}</p> */}
    <h4 className="card-text">{pro.price} 💲 </h4>
    <Link to={`/ProDetails?id=${pro._id} `}className="btn btn-outline-dark lin">Show details</Link>

  </div>
</Link>
    ))}
    </div>
    <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </a>
    </li>

    <li className="page-item"><button className="page-link" href="#">1</button></li>
    <li className="page-item"><button className="page-link" href="#">2</button></li>
    <li className="page-item"><button className="page-link" href="#">3</button></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">»</span>
      </a>
    </li>
  </ul>
</nav>

    </>
  )
}

export default Products



// import React from 'react'
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ReactPaginate from "react-paginate";

// import { useEffect, useState } from 'react'
// function Products() {
//     const[product,setProduct]=useState([]);
//     const[product1,setProduct1]=useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(4);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = product.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//     const getData = async ()=>{
//       const {data}= await axios.get(`https://ecommerce-node4.vercel.app/products?page=1&limit=50`);
//       setProduct(data.products);
//     };
//     const getData1 = async ()=>{
//       const {data}= await axios.get(`https://ecommerce-node4.vercel.app/products?page=${currentPage}&limit=6`);
//       setProduct1(data.products);
//     };
      
//     useEffect( ()=>{
//       getData(); 
//       getData1();
//   }
//      , [currentPage]) 

//      const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <>
//          {product1.map((ele) =>
//     <div key={ele.id} className={style.productCard}> 
//       <img src= {ele.mainImage.secure_url} className={style.productImage} />
//       <h2 className={style.productName}>{ele.name}</h2>
//       <h3 className={style.productName}>price={ele.price}</h3>
//       {/* <Link  to={/Detiles?id=${ele.id}} className={style.link}>ShowDetelis</Link> */}
//       </div>
//       ) 
//       }
     

//       <div style={{textAlign:"center"}}>
//         <button
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>

//         {Array.from(
//           { length: Math.ceil(product.length / productsPerPage) },
//           (_, index) => (
//             <button key={index + 1} onClick={() => paginate(index + 1)}>
//               {index + 1}
//             </button>
//           )
//         )}

//         <button
//           onClick={() => paginate(currentPage + 1)}
//           disabled={indexOfLastProduct >= product.length}
//         >
//           Next
//         </button>
//       </div>
    
//     </>
//   )
// }

// export default Products