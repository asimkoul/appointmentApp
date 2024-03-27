function handleFormSubmit(event){
 
    event.preventDefault();
    // save details   
    let userDetails={
      username:event.target.username.value,
      email:event.target.email.value,
      phone:event.target.phone.value
    }
    localStorage.setItem(userDetails.username, JSON.stringify(userDetails))
    axios.post("https://crudcrud.com/api/5613b7d227f4483f9725dafd8cb6ec52/appointmentData",userDetails)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
    showUserOnScreen(userDetails)
  }
  function showUserOnScreen(obj){
    const userList=document.querySelector("ul")
    const userItem=document.createElement("li")
    userItem.appendChild(document.createTextNode(
        `${obj.username} - ${obj.email} - ${obj.phone} `
    ))
    const delBtn=document.createElement("button")
    delBtn.appendChild(document.createTextNode("Delete"))
    userItem.appendChild(delBtn)

    const editBtn=document.createElement("button")
    editBtn.appendChild(document.createTextNode("Edit"))
    userItem.appendChild(editBtn)
    userList.appendChild(userItem)
    delBtn.addEventListener("click",function(){
        userList.removeChild(userItem)
        localStorage.removeItem(obj.username)
    })
    editBtn.addEventListener("click",function(){
    userList.removeChild(userItem)
    localStorage.removeItem(obj.username)

    document.getElementById("username").value=obj.username
    document.getElementById("email").value=obj.email
    document.getElementById("phone").value=obj.phone

    })
  }
  // fetch details on refresh
  window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/5613b7d227f4483f9725dafd8cb6ec52/appointmentData")
    .then((res)=>{
      console.log(res)
      for(let i=0;i<res.data.length;i++){
        showUserOnScreen(res.data[i]);
      }
    })
    .catch((err)=>console.log(err))
  })
