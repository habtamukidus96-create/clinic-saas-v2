// Smooth scroll for navigation

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){
            target.scrollIntoView({
                behavior:'smooth'
            });
        }
    });
});

// Animated stats

const stats = document.querySelectorAll(".stat-card h2");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const el = entry.target;

            const text = el.innerText;

            const targetNumber =
                parseInt(text.replace(/\D/g,'')) || 0;

            let count = 0;

            const speed = targetNumber / 60;

            const update = () => {

                count += speed;

                if(count < targetNumber){

                    el.innerText =
                    Math.floor(count) +
                    text.replace(/[0-9]/g,'');

                    requestAnimationFrame(update);

                } else {

                    el.innerText = text;

                }

            };

            update();

            observer.unobserve(el);

        }

    });

});

stats.forEach(stat => observer.observe(stat));


// Booking form

const bookingForm =
document.querySelector(".booking form");

if(bookingForm){

bookingForm.addEventListener("submit", function(e){

    e.preventDefault();

    alert(
    "✅ Appointment request submitted successfully!"
    );

    bookingForm.reset();

});

}
function toggleChat(){

const chat =
document.getElementById("chatWindow");

chat.classList.toggle("show-chat");

}

function sendMessage(){

const input =
document.getElementById("userMessage");

const message =
input.value.trim();

if(!message) return;

const body =
document.getElementById("chatBody");

body.innerHTML +=
`<div class="user-message">${message}</div>`;

let reply =
"Please contact our clinic for more information.";

if(message.toLowerCase().includes("doctor")){
reply =
"We have pediatric, dental and general doctors available.";
}

if(message.toLowerCase().includes("appointment")){
reply =
"You can book appointments using the form below.";
}

if(message.toLowerCase().includes("hours")){
reply =
"We are open Monday to Saturday from 8AM to 8PM.";
}

setTimeout(()=>{

body.innerHTML +=
`<div class="bot-message">${reply}</div>`;

body.scrollTop =
body.scrollHeight;

},500);

input.value="";

}
