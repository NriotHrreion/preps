import { to } from "../preps/to";

export class Tool {
    public random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public async sleep(ms: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    }

    public is(obj1: any, obj2: any): boolean {
        if(typeof obj1 !== typeof obj2) return false;
        if(typeof obj1 !== "object") return Object.is(obj1, obj2); // primitive
        if(obj1 instanceof Array && obj2 instanceof Array) return to(obj1).is(obj2); // array
        if(obj1 instanceof Array || obj2 instanceof Array) return false; // object !== array

        // window object (browser)
        if(typeof window === "object" && (obj1 === window || obj2 === window)) {
            return Object.is(obj1, obj2);
        }

        // global object (node.js)
        if(typeof global === "object" && (obj1 === global || obj2 === global)) {
            return Object.is(obj1, obj2);
        }

        // dom element
        if(typeof window === "object" && obj1 instanceof HTMLElement && obj2 instanceof HTMLElement) {
            return obj1.isEqualNode(obj2);
        }

        // obj1 -> obj2
        for(let i in obj1) {
            var ok = false;
            for(let j in obj2) {
                if(i === j && this.is(obj1[i], obj2[j])) {
                    ok = true;
                    break;
                }
            }
            if(!ok) return false;
        }

        // obj2 -> obj1
        for(let i in obj2) {
            var ok = false;
            for(let j in obj1) {
                if(i === j && this.is(obj1[i], obj2[j])) {
                    ok = true;
                    break;
                }
            }
            if(!ok) return false;
        }

        return true;
    }
}
