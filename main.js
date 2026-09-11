// =====================================
// CAMPUSHUB JAVASCRIPT
// =====================================


// EVENT DATA

const events = [

    {
        id: 1,
        name: "TechFest Hackathon",
        category: "Tech",
        description:
            "24-hour build sprint for student teams, judged by faculty and startup founders.",
        date: "Fri, Sep 12",
        time: "10:00",
        venue: "Innovation Hall",
        spots: 172
    },

    {
        id: 2,
        name: "Battle of the Bands",
        category: "Music",
        description:
            "Eight campus bands compete for the year's headline slot at Founders' Fest.",
        date: "Sat, Sep 13",
        time: "18:00",
        venue: "Open Air Amphitheatre",
        spots: 500
    },

    {
        id: 3,
        name: "Startup Pitch Night",
        category: "Business",
        description:
            "Six student ventures pitch to a panel of alumni investors for seed funding.",
        date: "Tue, Sep 16",
        time: "17:00",
        venue: "B-School Auditorium",
        spots: 150
    },

    {
        id: 4,
        name: "Campus Art Walk",
        category: "Art",
        description:
            "Open-air exhibition of student sculpture, print, and installation work.",
        date: "Sat, Sep 20",
        time: "12:00",
        venue: "Fine Arts Quad",
        spots: 200
    },

    {
        id: 5,
        name: "Wellness & Yoga Fest",
        category: "Wellness",
        description:
            "Sunrise yoga, breathwork workshops, and a campus wellness resource fair.",
        date: "Thu, Sep 25",
        time: "07:00",
        venue: "Lawn Grounds",
        spots: 250
    },

    {
        id: 6,
        name: "Inter-College Football Cup",
        category: "Sports",
        description:
            "Knockout final against three neighbouring colleges with a finals-day crowd.",
        date: "Thu, Oct 2",
        time: "15:00",
        venue: "Sports Complex",
        spots: 350
    }

];


// =====================================
// DISPLAY EVENTS
// =====================================

function displayEvents(eventList) {

    const container =
        document.getElementById("eventContainer");

    container.innerHTML = "";

    eventList.forEach(function(event) {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `

            <div class="event-category">
                ${event.category}
            </div>

            <h3>
                ${event.name}
            </h3>

            <p class="event-description">
                ${event.description}
            </p>

            <div class="event-details">

                🕐 ${event.date} · ${event.time}

                <br>

                📍 ${event.venue}

                <br>

                👥 ${event.spots} spots left

            </div>

            <button onclick="registerEvent(${event.id})">
                Register
            </button>

        `;

        container.appendChild(card);

    });

}


// =====================================
// FILTER EVENTS
// =====================================

function filterEvents(category) {

    if (category === "All") {

        displayEvents(events);

        return;
    }

    const filtered =
        events.filter(function(event) {

            return event.category === category;

        });

    displayEvents(filtered);

}


// =====================================
// REGISTRATION
// =====================================

function registerEvent(id) {

    const event =
        events.find(function(event) {

            return event.id === id;

        });


    let registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    // Check duplicate registration

    const alreadyRegistered =
        registrations.find(function(item) {

            return item.id === id;

        });


    if (alreadyRegistered) {

        alert(
            "You are already registered for this event!"
        );

        return;
    }


    // Generate pass

    const passCode =
        "CH-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const registration = {

        id: event.id,

        name: event.name,

        date: event.date,

        venue: event.venue,

        passCode: passCode,

        checkedIn: false

    };


    registrations.push(registration);


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    showPass(registration);

    updateDashboard();


    alert(
        "Registration successful!\n\nYour Pass Code is: " +
        passCode
    );

}


// =====================================
// SHOW PASS
// =====================================

function showPass(event) {

    const passCard =
        document.getElementById("passCard");


    passCard.innerHTML = `

        <h3>${event.name}</h3>

        <p>
            📅 ${event.date}
        </p>

        <p>
            📍 ${event.venue}
        </p>

        <div class="pass-code">
            ${event.passCode}
        </div>

        <p>
            Show this pass at the event entrance.
        </p>

    `;

}


// =====================================
// CHECK-IN
// =====================================

function checkIn() {

    const input =
        document.getElementById("passInput");

    const message =
        document.getElementById("checkMessage");


    const code =
        input.value.trim();


    let registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    const registration =
        registrations.find(function(item) {

            return item.passCode === code;

        });


    if (!registration) {

        message.innerText =
            "❌ Invalid pass code.";

        message.style.color = "red";

        return;
    }


    if (registration.checkedIn) {

        message.innerText =
            "⚠️ This pass is already checked in.";

        message.style.color = "orange";

        return;
    }


    registration.checkedIn = true;


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    let checkins =
        Number(
            localStorage.getItem("checkins")
        ) || 0;


    checkins++;


    localStorage.setItem(
        "checkins",
        checkins
    );


    message.innerText =
        "✅ Check-in successful!";

    message.style.color = "green";


    input.value = "";


    updateDashboard();

}


// =====================================
// DASHBOARD
// =====================================

function updateDashboard() {

    let registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    let checkins =
        Number(
            localStorage.getItem("checkins")
        ) || 0;


    let spent =
        Number(
            localStorage.getItem("spent")
        ) || 75000;


    const totalBudget = 100000;


    document.getElementById(
        "eventCount"
    ).innerText = events.length;


    document.getElementById(
        "registrationCount"
    ).innerText = registrations.length;


    document.getElementById(
        "checkinCount"
    ).innerText = checkins;


    document.getElementById(
        "remainingSmall"
    ).innerText =
        "₹" +
        (totalBudget - spent)
        .toLocaleString("en-IN");


    updateBudget();

}


// =====================================
// BUDGET
// =====================================

function updateBudget() {

    let spent =
        Number(
            localStorage.getItem("spent")
        ) || 75000;


    const totalBudget = 100000;


    const remaining =
        totalBudget - spent;


    document.getElementById(
        "spent"
    ).innerText =
        "₹" +
        spent.toLocaleString("en-IN");


    document.getElementById(
        "remaining"
    ).innerText =
        "₹" +
        remaining.toLocaleString("en-IN");


    let percentage =
        (spent / totalBudget) * 100;


    document.getElementById(
        "progressBar"
    ).style.width =
        percentage + "%";

}


// =====================================
// ADD EXPENSE
// =====================================

function addExpense() {

    const input =
        document.getElementById(
            "expenseInput"
        );


    const amount =
        Number(input.value);


    if (amount <= 0) {

        alert(
            "Please enter a valid amount."
        );

        return;
    }


    let spent =
        Number(
            localStorage.getItem("spent")
        ) || 75000;


    if (spent + amount > 100000) {

        alert(
            "This expense exceeds the budget!"
        );

        return;
    }


    spent += amount;


    localStorage.setItem(
        "spent",
        spent
    );


    input.value = "";


    updateDashboard();

}


// =====================================
// AI ASSISTANT
// =====================================

function openChat() {

    document.getElementById(
        "chatBox"
    ).style.display = "flex";

}


function closeChat() {

    document.getElementById(
        "chatBox"
    ).style.display = "none";

}


// =====================================
// SEND MESSAGE
// =====================================

function sendMessage() {

    const input =
        document.getElementById(
            "chatInput"
        );


    const text =
        input.value.trim();


    if (text === "") {

        return;

    }


    addMessage(
        text,
        "user-message"
    );


    input.value = "";


    setTimeout(function() {

        const reply =
            getReply(text);


        addMessage(
            reply,
            "bot-message"
        );

    }, 400);

}


// =====================================
// ASSISTANT ANSWERS
// =====================================

function getReply(text) {

    const message =
        text.toLowerCase();


    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey")
    ) {

        return "Hello! 👋 How can I help you?";

    }


    if (
        message.includes("event") ||
        message.includes("events")
    ) {

        return "📅 CampusHub currently has 6 upcoming events. Check the Events section.";

    }


    if (
        message.includes("register") ||
        message.includes("registration")
    ) {

        return "📝 Choose an event and click the Register button.";

    }


    if (
        message.includes("pass") ||
        message.includes("ticket")
    ) {

        return "🎟️ After registration, a unique digital pass code is generated.";

    }


    if (
        message.includes("budget") ||
        message.includes("expense")
    ) {

        return "💰 The total event budget is ₹1,00,000. You can add expenses in the Budget section.";

    }


    if (
        message.includes("check") ||
        message.includes("attendance")
    ) {

        return "✅ Enter your digital pass code in the Check-In section.";

    }


    if (
        message.includes("tech") ||
        message.includes("hackathon")
    ) {

        return "💻 TechFest Hackathon is a 24-hour student coding event.";

    }


    if (
        message.includes("sports") ||
        message.includes("football")
    ) {

        return "⚽ The Inter-College Football Cup is one of our upcoming sports events.";

    }


    if (
        message.includes("music") ||
        message.includes("band")
    ) {

        return "🎵 Battle of the Bands is our upcoming music event.";

    }


    return "🤖 I can help you with events, registration, digital passes, check-in and budget.";

}


// =====================================
// ADD CHAT MESSAGE
// =====================================

function addMessage(text, className) {

    const messages =
        document.getElementById(
            "messages"
        );


    const message =
        document.createElement("div");


    message.className =
        className;


    message.innerText =
        text;


    messages.appendChild(
        message
    );


    messages.scrollTop =
        messages.scrollHeight;

}


// =====================================
// START WEBSITE
// =====================================

displayEvents(events);

updateDashboard();