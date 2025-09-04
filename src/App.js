import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Users from './components/Users';
import Albums from './components/Albums';
import Post from './components/Post';
import Products from './components/Products';
import Todo from './components/Todo';
import Database from './components/Database';




function App() {

  


  return (
    <>
    <h1>Users list</h1>
    <Users></Users>
    <h1>
      Products
    </h1>
    <Products></Products>
    {/* <h1>albums</h1>
    <Albums></Albums>
    <h1>Posts</h1>
    <Post></Post> */}
    
    <Todo></Todo>
    <h1>Database</h1>
    <Database></Database>
    
    </>
  );
}

export default App;
