const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today day">${i}</div>`;
    } else {
      days += `<div class="day">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }

  addCurrentClass();
  removeCurrentClass();
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

/** button to dysplay ures form */

// let btn = document.querySelector(".btn");
// btn.addEventListener("click", clickHandler);

// function clickHandler(event) {
//   console.log("Button Clicked");

//   console.log(gapi);

//   document.querySelector(".appoitment").style.display = "block";
//   document.querySelector(".calendar").style.display = "none";
//   btn.style.display = "none";
// }

// this will add the current class to the clicked div
// current class: is a css class with light green background
function addCurrentClass(params) {
  document.querySelectorAll(".day").forEach((element) => {
    element.addEventListener("click", (e) => {
      if (!element.classList.contains("today")) {
        element.classList.add("current");
      }
      showFreeTimeSlots(e.target.textContent);
    });
  });
}

// this will remove the current class from the previously selected div
function removeCurrentClass() {
  document.querySelector(".days").addEventListener(
    "click",
    (e) => {
      let current = document.querySelector(".current");
      if (current) {
        document.querySelector(".current").classList.remove("current");
      }
    },
    true
  );
}

async function showFreeTimeSlots(currentSelectedDay) {
  let events = await retrieveTheEventsList();
  let dates = events.map((e) => new Date(e.start.dateTime));
  let currentSelectedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    currentSelectedDay
  );
  //console.log(currentSelectedDate);
  let hours = [...document.querySelectorAll("[data-hour]")];
  dates.forEach((date) => {
    if (
      date.getFullYear() === currentSelectedDate.getFullYear() &&
      date.getMonth() === currentSelectedDate.getMonth() &&
      date.getDate() === currentSelectedDate.getDate()
    ) {
      let bookedHours = hours.filter(
        (hour) => hour.getAttribute("data-hour") === date.getHours() + ""
      );
      bookedHours.forEach((e) => {
        e.parentElement.classList.add("booked");
      });
    } else {
      hours.forEach((hour) => hour.parentElement.classList.remove("booked"));
    }
  });
}

// this will retrieve list all event from google api
async function retrieveTheEventsList() {
  let event_list = await gapi.client.calendar.events.list({
    calendarId: "primary",
  });

  return event_list.result.items;
}

const timePickers = document.querySelectorAll(".time-picker__hour");
timePickers.forEach((element) => {
  element.addEventListener("click", (e) => {
    const form = document.querySelector(".appoitment");
    form.style.display = "block";
  });
});

document.querySelectorAll("input").addEventListener("click", (e) => {
  e.stopPropagation();
});

document.querySelector("body").addEventListener("click", () => {
  const form = document.querySelector(".appoitment");
  if (form.style.display === "block") {
    form.style.display = "none";
    console.log("hello");
  }
});
