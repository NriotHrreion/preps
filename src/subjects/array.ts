import { to } from "../preps/to";
import { by } from "../preps/by";
import { StringSubject } from "./string";
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

    public is(arr: T[]): boolean {
        if(this.value.length !== arr.length) return false;

        for(let i = 0; i < this.value.length; i++) {
            var item1 = this.value[i];
            var item2 = arr[i];

            if(item1 instanceof Array) {
                if(!(item2 instanceof Array)) return false;
                if(!to(item1).is(item2)) return false;
            } else if(item1 !== item2) {
                return false;
            }
        }
        
        return true;
    }

    public foreach(cb: (item: T, index: number, arr: T[]) => T | void): ArraySubject {
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
        if(index < 0) this.error("Index out of the length of array.");
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

    public removeItem(target: T): ArraySubject {
        var begin = false;

        for(let i = 0; i < this.value.length; i++) {
            if(begin) {
                if(i + 1 === this.value.length) {
                    this.value.pop();
                    return this;
                }

                this.value[i] = this.value[i + 1];
            } else if(this.value[i] === target) {
                begin = true;
                i--;
                continue;
            }
        }

        return this;
    }

    public removeItems(target: T): ArraySubject {
        return this.filter((item) => item === target);
    }

    public put(index: number, item: T): ArraySubject {
        if(index < 0) this.error("Index out of the length of array.");
        if(index >= this.value.length) {
            this.value.push(item);
            return this;
        }

        var tmp1: T = this.value[index];
        for(let i = index; i < this.value.length; i++) {
            if(i === index) {
                this.value[i] = item;
                continue;
            }

            var tmp2 = tmp1;
            tmp1 = this.value[i];
            this.value[i] = tmp2;
        }
        this.value.push(tmp1);

        return this;
    }

    public join(separator: string): StringSubject {
        return new StringSubject(this.value.join(separator));
    }

    public sort(): ArraySubject {
        for(let i = 0; i < this.value.length; i++) {
            for(let j = this.value.length - 1; j >= 0; j--) {
                if(typeof this.value[j] !== "number") throw new Error("Only number array can be sorted.");

                if(j === 0 || this.value[j] >= this.value[j - 1]) {
                    continue;
                } else if(j > 0 && this.value[j] < this.value[j - 1]) {
                    var tmp = this.value[j];
                    this.value[j] = this.value[j - 1]
                    this.value[j - 1] = tmp;
                }
            }
        }

        return this;
    }

    public reverse(): ArraySubject {
        var arr = [];

        for(let i = this.value.length - 1; i >= 0; i--) {
            arr.push(this.value[i]);
        }

        return new ArraySubject(arr);
    }

    public shuffle(): ArraySubject {
        var arr = [];

        while(this.value.length > 0) {
            var index = by().random(0, this.value.length - 1);
            arr.push(this.value[index]);
            this.removeIndex(index);
        }

        return new ArraySubject(arr);
    }

    public filter(cb: (item: T) => boolean): ArraySubject {
        for(let i = 0; i < this.value.length; i++) {
            if(cb(this.value[i])) {
                this.remove(i);
                i--;
            }
        }

        return this;
    }

    public cut(index: number): ArraySubject {
        if(index < 0) return new ArraySubject([[], [...this.value]]);
        if(index >= this.value.length) return new ArraySubject([[...this.value], []]);

        var arr1 = [], arr2 = [];
        this.foreach((item, i) => {
            i < index
            ? arr1.push(item)
            : arr2.push(item);
        });

        return new ArraySubject([arr1, arr2]);
    }

    public final<I extends void | number, R = I extends number ? T : T[]>(index: I): R {
        if(typeof index === "number") return this.value[index];
        return this.value as R;
    }
}
