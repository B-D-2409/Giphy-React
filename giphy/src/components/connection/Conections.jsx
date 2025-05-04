// import { useState, useEffect } from "react";
// export default function Connections() {
//     const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

//     const [giphy, setGifs] = useState([]);

//     useEffect(() => {

//         const fetchGifs = async () => {
//             try{
//                 const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10`);
//                 const data = await response.json();
//                 setGifs(data.data);

//             }catch(error) {
//                 console.error(`Error fetching gifs:`, error);
                
//             }
//         }

//         fetchGifs();
//     },[]);
// }