import React,{useState,useEffect} from 'react'
import "./main.css";
import Axios from 'axios';

export default function Main() {
  const [location, setLocation] = useState([]);
  const [totalsqft,setTotalsqft]=useState(0);
  const [bhk,setbhk]=useState(0);
  const [bath,setbath]=useState(0);
  const [loc,setLoc]=useState("");
  const [estprice,setEstprice]=useState("");
  useEffect(()=>{
   
    Axios.get("/get_location_names").then((response)=>{
      // setList(response.data);
      // console.log(response.data);
     setLocation(response.data.locations);
      console.log(location)
    });
    
},[]);
const handleChange = (e) => {
  setLoc(e.target.value);
};
function submit(e){
  e.preventDefault();
   if((bath>bhk+2) || bhk==0 || bath ==0 || totalsqft==0 || loc === "Select location in Bangalore"){
    document.getElementById("err").style.display="flex";
    alert("Please Enter Correct Details!!!");
    
     return;

   }
  Axios.post("/predict_home_price",{

  location:loc,
  bhk:bhk,
  bath:bath,
  total_sqft:totalsqft

}).then((response)=>{
console.log(response.data.estimated_price)

if(parseFloat(response.data.estimated_price)<0){
  document.getElementById("err").style.display="flex";
  alert("Please Enter Correct Details!!!");
  
   return;
}
setEstprice(response.data.estimated_price+" lacs")
});
  
  
}
    return (
        <div className="main">
         <div className="header"> <h1> House  Price Prediction</h1></div>
          <div className="img">
            <div className="form"> 
              <div className="container">
                <form method="post" onSubmit={submit}>
                  <div className="row">
                    <div className="col-25">
                      <label for="fname">Total Sqft</label>
                    </div>
                    <div className="col-75">
                      <input value={totalsqft} onChange={(e)=>setTotalsqft(e.target.value)} type="number"  name="total_sqft" placeholder="Enter Area .."  required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label for="lname"> Rooms</label>
                    </div>
                    <div className="col-75">
                      <input value={bhk}   onChange={(e)=>setbhk(e.target.value)} type="number" name="bhk" placeholder="Enter no. of Room"  required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label for="bath">Bathrooms</label>
                    </div>
                    <div className="col-75">
                      <input value={bath}   onChange={(e)=>setbath(e.target.value)}  type="number"  name="bath" placeholder="Enter no. of Bathroom"  required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label for="country">Location </label>
                    </div>
                    <div className="col-75">
                    
                      <select value={loc} onChange={handleChange} required>
                      <option selected="selected">
                        Select location in Bangalore
                        </option>
                      {
                        
                        location.map((val,key)=>{
                          return (
                            <option value={val} >{val}</option>
                          )
                        })
                      }
                        {/* <option value="australia">Bangalore</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option> */}
                      </select>
                    </div>
                  </div>
                  <h7 id="err"><strong style={{color:"red"}}> ** </strong> Please Enter Correct details and make sure to select the location</h7>

                  <div className="row">
                    <button id="submitbtn" type="submit" value="Submit"> Submit</button> 

                  </div>

                 
                </form>
              </div>
               </div>
            <div className="result"><span> <strong> Estimated Price : </strong> </span> <strong>{estprice}  </strong>  </div>
          </div>
        </div>
    )
}
