import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';



export default function Albums() {

  //creating use state for input box for adding album
    const[newAlbum,setNewAlbum]=useState(0);
    const[newTitle,setNewTitle]=useState("");
    const [newUrl,setNewUrl]=useState("");


    const[albums,setAlbums]=useState([]);

    useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then((response)=>response.json())
    .then((data)=>setAlbums(data.slice(0,20)))
},[])


  function addAlbum(){
    const alb=newAlbum;
    const title=newTitle.trim();
    const url=newUrl.trim();
     
    if(alb && title && url){
      fetch('https://jsonplaceholder.typicode.com/photos',
        {
          method: "POST",
          body:  JSON.stringify({alb,title,url}),
          headers:{
              "Content-Type": "application/json; charset=utf-8"
          }
        }
      )
      .then((response)=>response.json())
      .then((data)=>{setAlbums([...albums,data]);
        alert("successfully added")
        setNewAlbum("")
        setNewTitle("")
        setNewUrl("")
      })
    }

    }


  return (
    <div className="container">
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>COMPANY NAME</th>          
        </tr>
      </thead>
      <tbody>
        {albums.map((album)=>
        <tr key={album.id}>
          <td>{album.albumId}</td>
          <td>{album.title}</td>
          <td>{album.url}</td>
          <td>
            <Button variant='warning'>Edit</Button>
            <Button variant='danger'>Delete</Button>
          </td>
        </tr>
        )
      }
      </tbody>
      <tfoot>
        <tr>
          <td> <input type="number" placeholder="enter album id" value={newAlbum} onChange={(e)=>setNewAlbum(e.target.value)}></input></td>
          <td> <input type="text" placeholder="enter title" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}></input></td>
          <td> <input type="text" placeholder="enter url" value={newUrl} onChange={(e)=>setNewUrl(e.target.value)}></input></td>
          <Button variant="success" onClick={addAlbum}>Add Albums</Button>
        </tr>
      </tfoot>
    </Table> 
    
    </div>
  )
}
