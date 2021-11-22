
import './App.css';
import { useState,useEffect } from 'react';
import { Loader1 } from './components/loader/loader1';
import  Main  from './components/main/main';

function App() {
  const [isLoading,setLoading]=useState(true);

  function rep(){
      setLoading(false);
  }
  



useEffect(()=>{
    setTimeout(()=>rep(),5000)
})

  return (
    <div className="App">
      {isLoading? <Loader1 />:<Main />}
    </div>
  );
}

export default App;
