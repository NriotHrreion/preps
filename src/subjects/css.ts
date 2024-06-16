import { Subject } from "./subject";

export class CSSSubject extends Subject<CSSStyleDeclaration> {
    public readonly type = "css";

    public constructor(obj: CSSStyleDeclaration) {
        super(obj);
    }

    public get(key: string): string {
        return this.value.getPropertyValue(key);
    }

    public set(key: string, value: string): CSSSubject {
        this.value[key] = value;

        return this;
    }

    public is(key: string, value: string): boolean {
        return this.get(key) === value;
    }

    public map(): Map<string, string> {
        var map = new Map<string, string>();

        for(let key in this.value) {
            map.set(key, this.value.getPropertyValue(key));
        }

        return map;
    }

    public final(): CSSStyleDeclaration {
        return this.value;
    }
}
