import { to } from "./to";
import { DOMSubject } from "../subjects/dom";

export function at(selector: string): DOMSubject {
    var elem = document.querySelector(selector);

    if(elem instanceof HTMLElement) {
        return to(elem);
    }

    return to(document.body);
}
