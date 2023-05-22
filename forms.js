import { Module } from "../core.js";
import { FormDirective } from "./forms.js";
export { FormDirective } from "./directives/form.directive.js";

export class FormsModule extends Module {
  constructor() {
    super({
      components: [],
      directives: [
        FormDirective
      ],
      inject: []
    })
  }
}
