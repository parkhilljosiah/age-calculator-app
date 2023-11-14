// initializes today's date and stores within today variable
let today = new Date();

// initializes day, month, and year variables using today
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

// ensures that date is formatted correctly
let formattedDate = `${day}/${month}/${year}`;

// uses regex to check id the date is formatted, then checks to see if the date that the user gave is a valid date
function isValidDate(s) {
  if (!/^\d\d\/\d\d\/\d\d\d\d$/.test(s)) {
    return false;
  }
  const parts = s.split("/").map((p) => parseInt(p, 10));
  parts[0] -= 1;
  const d = new Date(parts[2], parts[0], parts[1]);
  return (
    d.getMonth() === parts[0] &&
    d.getDate() === parts[1] &&
    d.getFullYear() === parts[2]
  );
}

// takes in a number and returns the positive value of said number
function handleNegativeIntegers(num) {
  if (num < 0) {
    return (num -= num * 2);
  }
  return num;
}

// takes in the month, subtracts the value by 1 if the day that was given by the user is larger than today's date
function handleMonth(i, m) {
  let monthDifference;

  if (i > day) {
    monthDifference = month - m - 1;
  } else {
    monthDifference = month - m;
  }

  return monthDifference;
}

function handleClick(event) {
  event.preventDefault();

  let inputDay = document.getElementById("day").value;
  let inputMonth = document.getElementById("month").value;
  let inputYear = document.getElementById("year").value;

  // checks if user input day is empty/null, then verifies that the day is a real day on the calendar
  if (inputDay === "" || inputDay === null) {
    document.getElementById("field__required__one").style.display = "block";
    document.getElementById("invalid__day").style.display = "none";
    document
      .getElementById("day__container")
      .classList.add("field__required__input");
  } else if (
    inputDay < 1 ||
    inputDay > 31 ||
    (inputMonth == 4 && inputDay > 30) ||
    (inputMonth == 6 && inputDay > 30) ||
    (inputMonth == 9 && inputDay > 30) ||
    (inputMonth == 11 && inputDay > 30)
  ) {
    document.getElementById("field__required__one").style.display = "none";
    document.getElementById("invalid__day").style.display = "block";
    document
      .getElementById("day__container")
      .classList.add("field__required__input");
  } else {
    document.getElementById("field__required__one").style.display = "none";
    document
      .getElementById("day__container")
      .classList.remove("field__required__input");
  }

  // checks if user input month is empty/null, then verifies that the month is a real month on the calendar
  if (inputMonth === "" || inputMonth === null) {
    document.getElementById("field__required__two").style.display = "block";
    document
      .getElementById("month__container")
      .classList.add("field__required__input");
  } else if (inputMonth > 12) {
    document.getElementById("field__required__two").style.display = "none";
    document.getElementById("invalid__month").style.display = "block";
    document
      .getElementById("month__container")
      .classList.add("field__required__input");
  } else {
    document.getElementById("field__required__two").style.display = "none";
    document.getElementById("invalid__month").style.display = "none";
    document
      .getElementById("month__container")
      .classList.remove("field__required__input");
  }

  // checks if user input year is empty/null, then verifies that the year is in the past
  if (inputYear === "" || inputYear === null) {
    document.getElementById("field__required__three").style.display = "block";
    document
      .getElementById("year__container")
      .classList.add("field__required__input");
  } else if (inputYear > year) {
    document.getElementById("field__required__three").style.display = "none";
    document.getElementById("invalid__year").style.display = "block";
    document
      .getElementById("year__container")
      .classList.add("field__required__input");
  } else {
    document.getElementById("field__required__three").style.display = "none";
    document.getElementById("invalid__year").style.display = "none";
    document
      .getElementById("year__container")
      .classList.remove("field__required__input");
  }

  let numDay = parseInt(inputDay);
  let numMonth = parseInt(inputMonth);
  let numYear = parseInt(inputYear);

  /* checks if date is valid, gets the difference of the dates, and then parses the variables into a final value and 
  then displays the values on the document */
  if (isValidDate(`${inputMonth}/${inputDay}/${inputYear}`)) {
    let dayDifference = day - numDay;
    let finalDay = handleNegativeIntegers(dayDifference);

    let finalMonth = handleMonth(inputDay, numMonth);

    let yearDifference = year - numYear;
    let finalYear = handleNegativeIntegers(yearDifference);

    document.getElementById("calcYears").innerHTML = finalYear;
    document.getElementById("calcMonths").innerHTML = finalMonth;
    document.getElementById("calcDays").innerHTML = finalDay;

    document
      .getElementById("day__container")
      .classList.remove("field__required__input");
    document
      .getElementById("month__container")
      .classList.remove("field__required__input");
    document
      .getElementById("year__container")
      .classList.remove("field__required__input");

    document.getElementById("field__required__one").style.display = "none";
    document.getElementById("invalid__day").style.display = "none";
    document.getElementById("field__required__two").style.display = "none";
    document.getElementById("invalid__month").style.display = "none";
    document.getElementById("field__required__three").style.display = "none";
    document.getElementById("invalid__year").style.display = "none";
  }
}
