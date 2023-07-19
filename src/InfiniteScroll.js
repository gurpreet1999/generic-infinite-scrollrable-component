import React, { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScroll = (props) => {
  const { renderListItem, getData, ListData, query } = props;
const pageNumber=useRef(1)
const [loading,setloading]=useState(false)

const observer=useRef(null)

const lastElementObserver=useCallback(node=>{
if(loading) return
if(observer.current) observer.current.disconnect()
observer.current=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
        pageNumber.current+=1
        fetchData()

    }
})

if(node){
    observer.current.observe(node)
}

})
const renderList=useCallback(()=>{
return ListData.map((item,index)=>{

    if(index===ListData.length-1) return renderListItem(item,index,lastElementObserver)
return renderListItem(item,index,null)
})
},[])

const fetchData=useCallback(()=>{
    setloading(true)
    getData(query,pageNumber.current).finally((()=>{
        setloading(false)
    }))
},[query])

  useEffect(()=>{

   fetchData()

  },[fetchData])

  return <>
  {renderList()}
  {loading && 'LOADING'}

  
  </>
};

export default InfiniteScroll;
