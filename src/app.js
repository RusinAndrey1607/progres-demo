import { Progress } from "./components/progress/progress.js";

const progressElement = document.querySelector("#progress");
const controls = document.querySelector("#controls");
const valueInput = document.querySelector("#value");
const animateInput = document.querySelector("#animate");
const hideInput = document.querySelector("#hide");
const errorElement = document.querySelector("#value-error");

const progress = new Progress(progressElement, {
  value: Number(valueInput.value),
});

valueInput.addEventListener("input", () => {
  const rawValue = valueInput.value.trim();
  const value = Number(rawValue);

  const isValid = rawValue !== "" && Number.isInteger(value) && value >= 0 && value <= 100;

  if (!isValid) {
    const message = "Введите целое число от 0 до 100";
    valueInput.setCustomValidity(message);
    errorElement.textContent = message;
    progress.setValue(0);
    return;
  }

  valueInput.setCustomValidity("");
  errorElement.textContent = "";
  progress.setValue(value);
});

animateInput.addEventListener("change", (e) => {
  progress.setAnimated(e.target.checked);
});

hideInput.addEventListener("change", (e) => {
  progress.setHidden(e.target.checked);
});

controls.addEventListener("submit", (e) => {
  e.preventDefault();
});