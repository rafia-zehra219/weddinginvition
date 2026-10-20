
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");

const WHATSAPP_NUMBER = "923001234567"; // Apna number yahan likho

const events = {
  Mehndi: {
    date: "22 April 2027",
    time: "6:00 PM",
    venue: "Ramada Lawn, North Nazimabad, Karachi"
  },
  Baraat: {
    date: "25 April 2027",
    time: "7:00 PM",
    venue: "Grand Marquee, Gulshan-e-Iqbal, Karachi"
  },
  Walima: {
    date: "27 April 2027",
    time: "7:00 PM",
    venue: "Pearl Continental Hotel, Karachi"
  }
};

// Opening animation
document.getElementById("openCard").addEventListener("click", () => {
  opening.classList.add("closed");
  invitation.classList.add("revealed");
  createSparkles(45);
});

// Floating golden particles
function createSparkles(amount = 15) {
  const container = document.getElementById("sparkles");

  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.animationDuration = (4 + Math.random() * 6) + "s";
    sparkle.style.animationDelay = Math.random() * 3 + "s";
    sparkle.style.fontSize = (10 + Math.random() * 14) + "px";

    container.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
    });
  }
}

// Continuously create a few sparkles
setInterval(() => createSparkles(3), 1800);

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Invitation text
function invitationMessage(eventName) {
  let message = `Assalam-o-Alaikum! 💍

You are warmly invited to the wedding of Ayesha & Zain.

ہماری شادی کی خوشیوں میں آپ کو شرکت کی دعوت ہے۔ ❤️`;

  if (eventName && events[eventName]) {
    const e = events[eventName];

    message += `

${eventName}
Date: ${e.date}
Time: ${e.time}
Venue: ${e.venue}`;
  } else {
    message += `

Mehndi: ${events.Mehndi.date}
Baraat: ${events.Baraat.date}
Walima: ${events.Walima.date}

Please join us for our special celebration!`;
  }

  return message;
}

function shareOnWhatsApp(message) {
  const url = "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-share]").forEach(button => {
  button.addEventListener("click", () => {
    shareOnWhatsApp(invitationMessage());
  });
});

document.querySelectorAll("[data-event]").forEach(button => {
  button.addEventListener("click", () => {
    shareOnWhatsApp(invitationMessage(button.dataset.event));
  });
});

// Music toggle: starts only after visitor clicks
musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "♫ Music: ON";
    } else {
      music.pause();
      musicBtn.textContent = "♫ Music: OFF";
    }
  } catch {
    alert("Music play nahi ho saka. Internet connection check karo.");
  }
});

// RSVP via WhatsApp
document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;

  if (!name || !attendance) return;

  const message = `Wedding RSVP — Ayesha & Zain

Guest: ${name}
Response: ${attendance}

Thank you for the invitation! ❤️`;

  shareOnWhatsApp(message);
});
