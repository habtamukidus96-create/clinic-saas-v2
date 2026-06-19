let clinicId = localStorage.getItem("clinicId");

async function login(){
  const email = document.getElementById("email").value;

  const res = await fetch("/api/login", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  localStorage.setItem("clinicId", data.clinicId);

  window.location.href = "dashboard.html";
}

async function book(){
  await fetch(`/api/book/${clinicId}`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      name:name.value,
      phone:phone.value,
      date:date.value
    })
  });

  alert("Appointment booked ✔");
  load();
}

async function load(){
  const res = await fetch(`/api/appointments/${clinicId}`);
  const data = await res.json();

  document.getElementById("appointments").innerHTML =
    data.map(a =>
      `<div class="card">${a.name} - ${a.phone} - ${a.date}</div>`
    ).join("");
}

if(window.location.pathname.includes("dashboard")){
  load();
}
