import logo from './logo.svg';
import './App.css';
import { useCallback, useRef, useState } from 'react';
import InfiniteScroll from './InfiniteScroll';

function App() {
const [query,setQuery]=useState("")

const controllerRef=useRef(null)



//supoose we are passing any function to component
//whenevr the parent component get re-rendered 
//then the funtion which are not using use Callback are also created fresh in the memory 
//and that child component also get re-rendered

const [data,setdata]=useState("")

const handleInput=useCallback((e)=>{
  setQuery(e.target.value)

},[]
)


const renderItem=useCallback(({title},key,ref)=><div ref={ref}  >{title}</div>)

const getData=useCallback((query,pageNumber)=>{

  return new Promise(async(resolve,reject)=>{
    try{
      if(controllerRef.current) controllerRef.current.abort()
      controllerRef.current=new AbortController()

    const promise= await  fetch(''+new URLSearchParams({
        q:query,
        page:pageNumber
      }),{signal:controllerRef.current.signal})

const data=await promise.json()
setdata((prev)=>[...prev,...data.docs])
resolve()

    }
    catch(err){
reject()

    }
   
  })
},[]
)
  return (
  
   <>
   


   <input  type='text' value={query}  onChange={handleInput} />
   <InfiniteScroll 
   renderListItem={renderItem}
   getData={getData}
   ListData={data}
   query={query}
   
   
   />
   
   </>
  );
}

export default App;
