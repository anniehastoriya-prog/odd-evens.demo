// On my page I want code  to sort some odd and even numbers
// I want the numbers to go to a bank box, then be sorted out into an odds and evens box.
// I want a box where the user can write the numbers,
// A button where it sends the numbers to the bank first.
// A button for sorting one number at a time
// A button for sorting all numbers

// html elements
//<h1> Odds And Evens</h1>
//<p> Add a number to the bank</p>
//<button> Add Number </button>
//<button> Sort 1< /button>
//<button> Sort All </button>
//<h2> Bank </h2>
//<h2> Odda </h2>
// //<h2> Evens </h2>
// rough draft or psuecocode

// state

const bank = [];
const odds = [];
const evens = [];

// this function addss the number to the bank
function addToBank(number) {
  bank.push(number);
  render();
}

// moves the first number to either the odds or even bucket
function sort() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

// sorts the first nmber in the bank
function sortOne() {
  sort();
  render();
}

// will sort all the numbers in the bank
function sortAll() {
  while (bank.length) {
    sort();
  }
  render();
}

// Components
//this lets you adda number to the bank, sort one number, or sort all the numbers

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number" />
    </label>
    <button type="submit" data-action="add"> Add number</button>
    <button type="submit" data-action="sortOne"> Sort 1</button>
    <button type="submit" data-action="sortAll"> Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;
    // Determine which action to take based on the data attribute of the button that submitted the form
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");

      //  Guard against adding 0 to the bank if the input is empty
      if (number === null || number === "") return;

      // The unary plus operator converts its operand to Number type
      addToBank(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });

  return $form;
}

/**
 * A single number in a NumberBank
 * @param {number} n
 */
function NumberInBank(n) {
  const $span = document.createElement("span");
  $span.textContent = n;
  return $span;
}

/**
 * A labeled group of Numbers
 * @component
 * @param {string} label
 * @param {number[]} numbers
 */
function NumberBank(label, numbers) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
    <h2>${label}</h2>
    <output></output>
  `;

  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);

  return $bank;
}
// render
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Odds and Events</h1>
      <NumberForm></NumberForm>
      <NumberBank id="bank"></NumberBank>
      <NumberBank id="odds"></NumberBank>
      <NumberBank id="evens"></NumberBank>
    `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberBank#bank").replaceWith(NumberBank("Bank", bank));
  $app.querySelector("NumberBank#odds").replaceWith(NumberBank("Odds", odds));
  $app
    .querySelector("NumberBank#evens")
    .replaceWith(NumberBank("Evens", evens));
}
render();
