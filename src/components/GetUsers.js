import React from 'react'
import './GetUser.css'
import logo from '../images/cat_logo.png'

let page=1;
async function getUsers(){
  let count=0;
  let getUsersList=document.getElementById('GetUsersCards')
  let spinners=document.getElementById('loader')
  count++;
  if(count===1){
    getUsersList.style.visibility='hidden'
    spinners.style.visibility='visible';
  }
  setTimeout(()=>{
    getUsersList.style.visibility='visible'
    spinners.style.visibility='hidden'
  },2000);
  let url;
  if(page===0){
   url = `https://reqres.in/api/users?page=${(page+2)}`;
}else{
     url = `https://reqres.in/api/users?page=${(page)}`;
  }
   fetch(url).then(res=>res.json()).then(data=>{
    let users=data.data;
    console.log(page)
    page=(page+1)%2;
    let UsersContainer=document.getElementById('GetUsersCards');
    UsersContainer.innerHTML=null;
    users.forEach(function(user){
      let userCard=document.createElement('div');
      let name=document.createElement('div');
      let img=document.createElement('img');
      let firstName=document.createElement('span')
      let lastName=document.createElement('span')
      let email=document.createElement('span')
      img.setAttribute('src',user.avatar);
      img.classList.add('circleImg');
      userCard.classList.add('card');
      userCard.classList.add('Tilt');
      lastName.classList.add('name');
      firstName.classList.add('name');
      email.classList.add('emailText');
      firstName.textContent=user.first_name;
      lastName.textContent=user.last_name;
      email.textContent=user.email;
      name.appendChild(firstName)
      name.appendChild(lastName)
      userCard.appendChild(img)
      userCard.appendChild(name)
      userCard.appendChild(email)
      UsersContainer.appendChild(userCard)
    })
   })
}
const GetUsers = () => {
  return (
    <div>
      <div className='header'>
        <div id='logo' style={{padding:'0.4rem',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <img  src={logo} alt='logo' style={{width:'3.2rem',marginRight:'0.3rem'}}/>
      <span id='logo-name' className='emailText' style={{color:'cyan'}}>Mew</span>
        </div>
       <ul>
        <li>Home</li>
        <li>Plans</li>
        <li>About</li>
        <li>Resources</li>
       </ul>
       <button id='getUsers' onClick={getUsers}>Get Users</button>
    </div>
    <button className="btn btn-primary hide" id='loader'>
      <span className="spinner-grow spinner-grow-sm" ></span>
         Loading...
    </button>
    <div className='GetUsersCards' id='GetUsersCards'>
       
    </div>
    </div>
  )
}

export default GetUsers
