const DEFAULTS = {
  value: 50,
  animated: false,
  hidden: false,
};

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export class Progress {
  constructor(element, options = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError("Progress requires an HTML element");
    }

    this.element = element;
    this.arc = element.querySelector(".progress__arc");

    if (!this.arc) {
      throw new Error("Progress arc was not found");
    }

    this.state = { ...DEFAULTS, ...options };
    this.init();
  }

  init() {
    this.arc.style.strokeDasharray = CIRCUMFERENCE;
    this.update();
  }

  setValue(value) {
    if (typeof value !== "number" || value < 0 || value > 100) {
      throw new RangeError("Value must be between 0 and 100");
    }
    this.state.value = value;
    this.update();
    return this;
  }

  setAnimated(animated) {
    this.state.animated = Boolean(animated);
    this.element.classList.toggle("progress--animated", this.state.animated);
    return this;
  }

  setHidden(hidden) {
    this.state.hidden = Boolean(hidden);
    this.element.hidden = this.state.hidden;
    return this;
  }

  getState() {
    return { ...this.state };
  }

  destroy() {
    this.element.classList.remove("progress--animated");
    this.element.hidden = false;
    this.arc.style.removeProperty("stroke-dasharray");
    this.arc.style.removeProperty("stroke-dashoffset");
    this.element.removeAttribute("aria-label");
  }

  update() {
    const offset = CIRCUMFERENCE * (1 - this.state.value / 100);
    this.arc.style.strokeDashoffset = offset;
    this.element.setAttribute("aria-label", `Прогресс: ${this.state.value}%`);
    this.element.classList.toggle("progress--animated", this.state.animated);
    this.element.hidden = this.state.hidden;
  }
}