import { Directive } from "../../core.js";

export class FormDirective extends Directive {
  constructor() {
    super();
  }

  apply(element, value, component) {
    if (element instanceof HTMLInputElement) {
      if (element.type === "checkbox") {
        element.checked = component[value];
        if (!element.formControl) {
          element.addEventListener("input", () => {
            component[value] = element.checked;
          });
        }
      } else if (element.type === "radio") {
        element.name = element.name || value;
        element.checked = element.value === component[value];
        element.addEventListener("input", () => {
          if (element.checked) {
            component[value] = element.value;
          }
        });
      } else if (["number", "range"].includes(element.type)) {
        element.value = `${ component[value] }`;
        if (!element.formControl) {
          element.addEventListener("input", () => {
            component[value] = +element.value;
          });
        }
      } else {
        element.value = component[value];
        if (!element.formControl) {
          element.addEventListener("input", () => {
            component[value] = element.value;
          });
        }
      }
    } else if (element instanceof HTMLTextAreaElement) {
      element.value = component[value];
      if (!element.formControl) {
        element.addEventListener("input", () => {
          component[value] = element.value;
        });
      }
    } else if (element instanceof HTMLSelectElement) {
      element.value = component[value];
      if (!element.formControl) {
        element.addEventListener("input", () => {
          component[value] = element.value;
        });
      }
    } else if (element.component) {
      if (typeof element.component.setValue === "function") {
        element.component.setValue(component[value]);
      }
      if (!element.formControl) {
        element.component.registerOnChange(newValue => component[value] = newValue);
      }
    }
    element ? element.formControl = true : void 0;
  }
}
