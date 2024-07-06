declare var preps: Preps.prepsExport;
export = preps;
export as namespace Preps;

declare namespace Preps {
    type SubjectTypes = string | any[] | HTMLElement;

    type SubjectTypeDeterminer<S> = (
        S extends string
        ? StringSubject
        : S extends any[]
            ? ArraySubject
            : S extends HTMLElement
                ? DOMSubject
                : never
    );

    interface Subject<S = any> {
        readonly type: string
    
        log(): void
    
        final(...args: any[]): S
    
        // An alias for `final()`
        f(...args: any[]): S
    }

    interface StringSubject extends Subject<string> {
        readonly type: "string";
    
        new(obj: string)
    
        as(operation: string | ((value: string) => string | void)): StringSubject
    
        is(str: string): boolean
    
        add(str: string): StringSubject
    
        cut(index: number): ArraySubject
    
        split(separator: string): ArraySubject
    
        cutfine(): ArraySubject
    }

    interface ArraySubject<T = any> extends Subject<T[]> {
        readonly type: "array"
    
        new(obj: T[])
    
        as(operation: T[] | ((value: T[]) => T[] | void)): ArraySubject
    
        is(arr: T[]): boolean
    
        foreach(cb: (item: T, index: number, arr: T[]) => T | void): ArraySubject
    
        remove(which: number | T): ArraySubject
    
        removeIndex(index: number): ArraySubject
    
        removeItem(target: T): ArraySubject
    
        removeItems(target: T): ArraySubject
    
        put(index: number, item: T): ArraySubject
    
        join(separator: string): StringSubject
    
        sort(): ArraySubject
    
        reverse(): ArraySubject
    
        shuffle(): ArraySubject
    
        filter(cb: (item: T) => boolean): ArraySubject
    
        cut(index: number): ArraySubject
    
        final<I extends void | number, R = I extends number ? T : T[]>(index: I): R
    }

    type EventEnum = keyof HTMLElementEventMap;
    type EventHandler<K extends EventEnum> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;

    interface DOMSubject extends Subject<HTMLElement> {
        readonly type: "dom"
    
        new(obj: HTMLElement)
    
        as(operation: HTMLElement | ((value: HTMLElement) => HTMLElement | void)): DOMSubject
    
        clear(): DOMSubject
    
        classes(): ArraySubject
    
        has(className: string): boolean
    
        attr<V extends string | undefined = undefined, R = V extends string ? DOMSubject : StringSubject>(key: string, value?: V): R
    
        css(): CSSSubject
    
        on<K extends EventEnum>(event: EventEnum, handler: EventHandler<K>): DOMSubject
    
        once<K extends EventEnum>(event: EventEnum, handler: EventHandler<K>): DOMSubject
    
        off(event: EventEnum): DOMSubject
    }

    interface CSSSubject extends Subject<CSSStyleDeclaration> {
        readonly type: "css"
    
        new(obj: CSSStyleDeclaration)
    
        get(key: string): string
    
        set(key: string, value: string): CSSSubject
    
        is(key: string, value: string): boolean
    
        map(): Map<string, string>
    }

    interface Tool {
        random(min: number, max: number): number
    
        sleep(ms: number): Promise<void>
    
        is(obj1: any, obj2: any): boolean
    }

    export interface prepsExport {
        to<S extends SubjectTypes, R = SubjectTypeDeterminer<S>>(obj: S): R
        
        at(selector: string): DOMSubject
        
        by(): Tool
    }
}
