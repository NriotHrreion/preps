import { StringSubject } from "../subjects/string";
import { ArraySubject } from "../subjects/array";
import { DOMSubject } from "../subjects/dom";

export type SubjectTypes = string | any[] | HTMLElement;

export type SubjectTypeDeterminer<S> = (
    S extends string
    ? StringSubject
    : S extends any[]
        ? ArraySubject
        : S extends HTMLElement
            ? DOMSubject
            : never
);

export function to<S extends SubjectTypes, R = SubjectTypeDeterminer<S>>(obj: S): R {
    if(typeof obj === "string") {
        return new StringSubject(obj) as R;
    }
    if(obj instanceof Array) {
        return new ArraySubject(obj) as R;
    }
    if(window && obj instanceof HTMLElement) {
        return DOMSubject.of(obj) as R;
    }
}
