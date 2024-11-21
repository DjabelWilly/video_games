// import React, { useState } from "react";
// import axios from "axios";

// const NintendoGames = () => {
//   const [nintendoGames, setNintendoGames] = useState([]);

//   const fetchNintendoGames = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/games/nintendo"
//       );
//       setNintendoGames(response.data);
//     } catch (error) {
//       console.error("Error fetching Nintendo games:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Nintendo Games</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>plateforme</th>
//             <th>annee</th>
//             <th>genre</th>
//             <th>editeur</th>
//             <th>ventes EU</th>
//             <th>ventes US</th>
//             <th>ventes JP</th>
//             <th>ventes autres</th>
//             <th>ventes global</th>
//           </tr>
//         </thead>
//         <tbody>
//           {nintendoGames.length > 0 ? (
//             nintendoGames.map((jeu) => (
//               <tr key={jeu._id}>
//                 <td className="name">{jeu.name}</td>
//                 <td>{jeu.platform}</td>
//                 <td>{jeu.year}</td>
//                 <td className="genre">{jeu.genre}</td>
//                 <td className="publisher">{jeu.publisher}</td>
//                 <td>{jeu.euSales}</td>
//                 <td>{jeu.naSales}</td>
//                 <td>{jeu.jpSales}</td>
//                 <td>{jeu.otherSales}</td>
//                 <td>{jeu.globalSales}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10">Aucun jeu trouvé</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NintendoGames;
