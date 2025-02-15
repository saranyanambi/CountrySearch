import { useEffect, useState } from "react"
import axios from "axios";
import "./Country.css";
const Country=()=>{
    const[card,setCard]=useState([])
    const[query,setQuery]=useState("")
    const[filterCard,setFilterCard]=useState([]);
    useEffect(()=>{
        const fetchimage=async()=>{
            try{
                let res=await axios.get("https://restcountries.com/v3.1/all")
                console.log(res.data[0].flags)
                setCard(res.data)
                setFilterCard(res.data);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchimage();
    },[]);

    const handlechange=(e)=>{
        setQuery(e.target.value);
        setFilterCard(
        card.filter((item)=>item.name.common.toLowerCase().includes(query.toLowerCase()))
        )
    }
    return(
        <div>
            <div>
                <input type="text" name="country" placeholder="Search Country"  value={query}
                onChange={(e)=>handlechange(e)} className="search-bar"/>
            </div>
        <div className="countryList">
            {filterCard.map((item)=>(
                <div className="countryCard" key={(item.cca3)}>
                <img src={item.flags.svg} className="country-img"/>
                <p>{item.name.common}</p>
                </div>
            ))}
        </div>
        </div>
    )
}
export default Country;