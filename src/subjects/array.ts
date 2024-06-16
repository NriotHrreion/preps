import { Subject } from "./subject";

export class ArraySubject<T = any> extends Subject<any[]> {
    public readonly type = "array";

    public constructor(obj: T[]) {
        super(obj);

        this.value = obj;
    }

    public as(operation: T[] | ((value: T[]) => T[] | void)): ArraySubject {
        if(operation instanceof Array) {
            this.value = operation;
        }

        if(typeof operation === "function") {
            var newValue = operation(this.value);
            
            if(newValue instanceof Array) this.value = newValue;
        }

        return this;
    }

    public foreach(cb: (item: T, index: number, array: T[]) => T | void): ArraySubject {
        for(let i = 0; i < this.value.length; i++) {
            var newValue = cb(this.value[i], i, this.value);

            if(newValue) this.value[i] = newValue;
        }

        return this;
    }

    public remove(which: number | T): ArraySubject {
        return (
            typeof which === "number"
            ? this.removeIndex(which)
            : this.removeItem(which)
        );
    }

    public removeIndex(index: number): ArraySubject {
        if(index >= this.value.length) return this;

        for(let i = 0; i < this.value.length; i++) {
            if(i >= index) {
                if(i + 1 === this.value.length) {
                    this.value.pop();
                    return this;
                }

                this.value[i] = this.value[i + 1];
            }
        }
    }

    public removeItem(item: T): ArraySubject {
        var begin = false;

        for(let i = 0; i < this.value.length; i++) {
            if(begin) {
                if(i + 1 === this.value.length) {
                    this.value.pop();
                    return this;
                }

                this.value[i] = this.value[i + 1];
            } else if(this.value[i] === item) {
                begin = true;
                i--;
                continue;
            }
        }

        return this;
    }

    public final<I extends void | number, R = I extends number ? T : T[]>(index: I): R {
        if(typeof index === "number") return this.value[index];
        return this.value as R;
    }
}
