const API = "http://localhost:3000/api/auth";

function register(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;
  const pass2 = document.getElementById("pass2").value;

  if(!name || !email || !pass || !pass2){
    msg.innerText = "Todos los campos son obligatorios";
    return;
  }

  if(pass.length < 6){
    msg.innerText = "La contraseña mínimo 6 caracteres";
    return;
  }

  if(pass !== pass2){
    msg.innerText = "Las contraseñas no coinciden";
    return;
  }

  fetch(API+"/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      nombres:name,
      email:email,
      password:pass
    })
  })
  .then(r=>r.json())
  .then(d=>{
    alert(d.msg);
    location.href="login.html";
  });
}

function login(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:email,
      password:pass
    })
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.token){
      alert("Bienvenido");
    }else{
      msg.innerText = d.msg;
    }
  });
}