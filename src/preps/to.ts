import { ArraySubject } from "../subjects/array";
import { StringSubject } from "../subjects/string";

export type SubjectTypes = string | any[];

export type SubjectTypeDeterminer<S> = (
    S extends string
    ? StringSubject
    : S extends any[]
        ? ArraySubject
        : never
);

export function to<S extends SubjectTypes, R = SubjectTypeDeterminer<S>>(obj: S): R {
    if(typeof obj === "string") {
        return new StringSubject(obj) as R;
    }
    if(obj instanceof Array) {
        return new ArraySubject(obj) as R;
    }
}
