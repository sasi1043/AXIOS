import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';



export default function Database() {

    //creating states for tfoot inbox ---> for adding new date::
    const[newName,setNewName]=useState("");
    // const[newCity,setNewCity]=useState("");
    const[newAge,setNewAge]=useState("");
  const[newCity,setNewCity]=useState("");

    // const[newStreet,setNewStreet]=useState("");


    //to edit data's in api::
    const[editingId,setEditingId]=useState(null);


    //creating state
  const[users,setUsers]=useState([]);

  //create useEffect
  useEffect(()=>{
    fetch('http://localhost:3001/users')
    .then((response)=> response.json())
    .then((data)=>setUsers(data))
  },[])//empty array is for running the fetch for only one time


  //function for adding data's --in tfoot
  function addUser(){
    const name=newName.trim();
    // const city=newCity.trim();
    const age =newAge;
    const city=newCity.trim(); 
    // const street=newStreet.trim();

    if(name && city && age){
        fetch('http://localhost:3001/users',
            {
                method: "POST",
                body: JSON.stringify({name,age,city}),
                    headers:{
                        "Content-Type": "application/json; charset=utf-8"
                    }

            }
        )
        .then((response)=>response.json())
        .then((data)=>{setUsers([...users,data]);alert("user added Successfully");
            setNewName("");
            setNewCity("");
            // setNewStreet("")
            setNewAge("");
        })
    }
  }
  //fill the value of input field with respect to id of edit button
  function startEdit(user){
    setEditingId(user.id)
    setNewName(user.name || "");
    setNewAge(user.age || "");
    setNewCity(user.city || "");
  }
  //update (Put)
  function updateUser(){
    const name=newName.trim();
    const age=newAge;
    const city=newCity.trim();

    if(!editingId || !name || !city || !age)
      return ;
      fetch(`http://localhost:3001/users/${editingId}`,
        {
        method:"PUT",//put is used here for updating value
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({name,age,city})
        }
      )
      .then((response)=>response.json())
      .then((updated)=>{
        setUsers((prev)=>
        prev.map((u)=>
          u.id === editingId?
        {
          ...u,
          name,
          age,city
        }:u));
        alert("user updated successfully");
        cancelEdit();
      }
    )
    .catch(()=>alert("update Failed"));
  }
  //cancel edit mode
  function cancelEdit(){
    setEditingId(null)
     setNewName("");
      setNewCity("");
      setNewAge("");
        }
  
        //delete function
        function deleteUser(id){
          if(!window.confirm("do you want to delete")) return;
          fetch(`http://localhost:3001/users/${id}`,{method:"DELETE"})
          .then(()=>{
            setUsers((prev)=>prev.filter((u)=>u.id !==id))
            alert("user deleted success")
          })
          .catch(()=>alert("user delete failed!!"))
        }
 return (
    <div>
      <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>ADDRESS</th>
          <th>CITY</th>
          
        </tr>
      </thead>
      <tbody>
        {users.map((user)=>
        <tr key={user.id}>
          <td>{user.name}</td>
          {/* <td>{user.address.city},{user.address.street}</td> */}
          <td>{user.age}</td>
          <td>{user.city}</td>
          <td>
            <Button variant='warning' onClick={()=>startEdit(user)}>Edit</Button>
            <Button variant='danger' style={{marginLeft:'5px'}} onClick={()=>deleteUser(user.id)}>Delete</Button>
          </td>
        </tr>
        )
      }
        
      </tbody>
      <tfoot>
        <tr>
            <td></td>
            <td> <input type='text' placeholder='enter your name' value={newName}  onChange={(e)=>setNewName(e.target.value)}></input></td>
            {/* <td> <input type='text' placeholder='enter your city' value={newCity} onChange={(e)=>setNewCity(e.target.value)}></input>
           <input type='text' placeholder='enter your street' value={newStreet} onChange={(e)=>setNewStreet(e.target.value)}></input>
            </td> */}
            <td> <input type='number' placeholder='enter your age' value={newAge} onChange={(e)=>setNewAge(e.target.value)}></input></td>
           <td> <input type='text' placeholder='enter your name' value={newCity}  onChange={(e)=>setNewCity(e.target.value)}></input></td>

            <td> 
              {editingId?(
                <>
                <Button variant='success' onClick={updateUser}>update User</Button>
                <Button variant='danger' onClick={cancelEdit}>cancel</Button>
                </>
              ):(
                <Button variant='success' onClick={addUser}>add user</Button>
              )
              
              }
            </td>
        </tr>
      </tfoot>
    </Table> 
    </div>
  )
}
