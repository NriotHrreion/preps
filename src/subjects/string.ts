import { ArraySubject } from "./array";
import { Subject } from "./subject";

export class StringSubject extends Subject<string> {
    public readonly type = "string";

    public constructor(obj: string) {
        super(obj);
    }

    public as(operation: string | ((value: string) => string | void)): StringSubject {
        if(typeof operation === "string") {
            this.value = operation;
        }

        if(typeof operation === "function") {
            var newValue = operation(this.value);
            
            if(typeof newValue === "string") this.value = newValue;
        }

        return this;
    }

    public is(str: string): boolean {
        return this.value === str;
    }

    public add(str: string): StringSubject {
        this.value += str;

        return this;
    }

    public cut(index: number): ArraySubject {
        if(this.value.length <= 1) this.error("Length of string must be greater than 1.");
        if(index > this.value.length) this.error("Index out of the length of string.");

        const before = this.value.substring(0, index);
        const after = this.value.substring(index, this.value.length);

        return new ArraySubject([before, after]);
    }

    public split(separator: string): ArraySubject {
        return new ArraySubject(this.value.split(separator));
    }

    public cutfine(): ArraySubject {
        return this.split("");
    }

    public final(): string {
        return this.value;
    }
}
