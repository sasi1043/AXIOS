import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';


function Post() {

    //useState for input box in post table(tfoot)
    const[newTitle,setNewTitle]=useState("");
    const[newBody,setNewBody]=useState("")


    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response)=>response.json())
        .then((data)=>setPosts(data.slice(0,10)))
    },[])

    function addPost(){
      const title=newTitle.trim();
      const body=newBody.trim();

      if(title && body){
        fetch("https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: JSON.stringify({title,body}),
            headers:{
              "Content-Type": "application/json; charset=utf-8"
            }
          }
        )

        .then((response)=>response.json())
        .then((data)=>{
          setPosts([...posts,data]);
          alert("added succcessfully");
          setNewTitle("")
          setNewBody("")
        })
      }

    }


  return (
    <div>
        <Table>
      <thead>
        <tr>
          <th>title</th>
          <th>body</th>         
          <th>actions</th> 
          
          
        </tr>
      </thead>
      <tbody>
        {posts.map((post)=>
        <tr key={post.id}>
          <td>{post.title}</td>
          <td>{post.body}</td>
          
          
          <td>
            <Button variant='danger'>Delete</Button>
          </td>
        </tr>
        )
      }
        
      </tbody>
      <tfoot>
        <tr>
          <td> <input type='text' placeholder='enter title' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}></input></td>
          <td> <input type='text' placeholder='enter body' value={newBody} onChange={(e)=>setNewBody(e.target.value)}></input></td>
          <Button variant='success' onClick={addPost}>add Post</Button>
        </tr>
      </tfoot>
    </Table> 
        </div>
  )
}

export default Post
