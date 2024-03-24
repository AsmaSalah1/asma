import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from './details.module.css'
function Details() {
 
  const [Loader,setLoader]=useState(true);
  const [details, setDetails] =useState([]);

  const getDetails =async()=>{
      const urlParams=new URLSearchParams(window.location.search);//بترجعلي الراميترز الموجودة بالرابط
      console.log(urlParams);
      const id=urlParams.get("id"); //بتجيب الاي دي 
      console.log("id=",id);
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
        console.log("details",data.products);
        setDetails(data.products);
        setLoader(false);
  }
  useEffect(() => {
      getDetails();
    }, []);
    // if(loader){
    //   return (
    //     <>
    //       <Loader />
    //     </>
    //   );
    //     }
    //     setLoader(false);

     return(
  <>
  <div className={style.dad}>
     {
      details.map((det)=>(

      <Link className="card" key={det._id} style={{width: '21rem'}}  to={`/ProDetails?id=${det._id} `} >
<img src={det.mainImage.secure_url} className={`${style.cardk} `} alt={ det.name}/>
<h3>{det.price } 💲 </h3>
<div className="card-body" style={{height: '133px'}}>
  <h5 className="card-title">{det.name}</h5>
  {/* <p className="card-text">{det.description}</p> */}
  <Link to={`/ProDetails?id=${det._id} `}className="btn btn-secondary">Show details</Link>
</div>
</Link>

// {/* <div key={det._id}>
// <h3>{det.name}</h3>
// <img src={det.mainImage.secure_url} alt="..." />
// <p>{det.price}</p>
// </div> */}
      ))
      }
</div>
      
  
  </>
)
}

export default Details;

{
  /* <ul>
{det.reviews.map( (rev)=>{
<div>
        <li>{rev.comment}</li>
   
</div>
} )}
</ul> */
}
