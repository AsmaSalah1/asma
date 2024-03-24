import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
export const UserContext = createContext(); //بعملها عشان اعرف الكونتيس
const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [userName, setUserName] = useState(null);


  const getUserData = () => {
    if (userToken != null) {
      // لانه بتشتغل كل ما يصير تغيير ع اليوزر توكن و عند فتح الصغحة فيمكن انه يكون نـــل
      const decoded = jwtDecode(userToken);
      setUserName(decoded.userName);
    }
  };
  useEffect(() => {
    getUserData();
  }, [userToken] )
  //  بحط الاشياء الي بدي ابعتها للصفحات التانية
  return (
    <UserContext.Provider value={{ userName ,setUserToken,setUserName}}>
      {/*{{}} بحط ثنتين عشان اذا كان عندي اكتر من متغير  */}
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;


  /* 
        
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

const UserContextProvider =({children})=>{
    const[userToken,setUserTocken]=useState(localStorage.getItem('userToken'));
    //عرفتها داحل اليوزر عشان يرجعليي كل المعلومات عن ليوزر 
    //بالبدايه بتكون null
    //لما اغير الحاله انو المستخدم يسجل دخول بتغير معنا الوضع 

    const[Auth,setAuth]=useState(null);
    const[userName,setUserName]=useState(null);
    //ايش بنستفيد من هاي الخطوه ؟
    //انو بصير اعطي ال فاليو  الي ب\دي يوخدها 
    // هيك بصير اي كومبوننت موجود عنا بالمشروع بقدر يشوف المتغير الي اسمو  يوزر نام 
 

    // اول ما تتغير عنا ال useToken 
    // رح يتغير عنا اشي معين 
      // اكيد رح استخدم ال يوز ايفيكت 
      // رح تشتغل اول ما يشتغل البرنامج ولما يتغير اليوزر توكين
    const getUserData =()=>{
        //لازم افحص اذا في توكين او لء 
        if(userToken!=null){
            const decoded = jwtDecode(token);
            setAuth(decoded);
            setUserName(decoded.userName);
            // الديكوديد تحتوي على كل اشي من يوزر نام والايدي
    //decoded
    // بتحتوي على كل المعلومات الي برجعلنا اياها الباك ايند
        }
    }
      useEffect(()=>{
        getUserData();
      },
      [userToken])
return <UserContext.Provider value={{setUserTocken , userName}}>
    {children}
</UserContext.Provider>


};
export default UserContextProvider;
          */