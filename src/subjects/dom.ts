import { ArraySubject } from "./array";
import { CSSSubject } from "./css";
import { StringSubject } from "./string";
import { Subject } from "./subject";

type EventEnum = keyof HTMLElementEventMap;
type EventHandler<K extends EventEnum> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;

interface TaggedHTMLElement extends HTMLElement {
    $prepsTag?: string
}

export class DOMSubject extends Subject<HTMLElement> {
    public readonly type = "dom";

    private static currentTag: number = -1;
    private static elements: Map<string, DOMSubject> = new Map();
    private eventControllers: Map<EventEnum, AbortController[]> = new Map();

    public constructor(obj: HTMLElement) {
        super(obj);
    }

    public static of(_elem: HTMLElement): DOMSubject {
        var elem = _elem as TaggedHTMLElement;
        if(elem.$prepsTag) return DOMSubject.elements.get(elem.$prepsTag);
        
        elem.$prepsTag = elem.tagName + "-" + (++DOMSubject.currentTag);
        var subject = new DOMSubject(elem);
        DOMSubject.elements.set(elem.$prepsTag, subject);
        return subject;
    }

    public as(operation: HTMLElement | ((value: HTMLElement) => HTMLElement | void)): DOMSubject {
        if(operation instanceof HTMLElement) {
            this.value = operation;
        }

        if(typeof operation === "function") {
            var newValue = operation(this.value);
            
            if(newValue instanceof HTMLElement) this.value = newValue;
        }

        return this;
    }

    public clear(): DOMSubject {
        while(this.value.lastElementChild) {
            this.value.removeChild(this.value.lastElementChild);
        }

        return this;
    }

    public classes(): ArraySubject {
        return new ArraySubject(new Array(this.value.classList));
    }

    public has(className: string): boolean {
        return this.value.classList.contains(className);
    }

    public attr<V extends string | undefined = undefined, R = V extends string ? DOMSubject : StringSubject>(key: string, value?: V): R {
        if(value) {
            this.value.setAttribute(key, value);
            return this as unknown as R;
        }

        return new StringSubject(this.value.getAttribute(key)) as R;
    }

    public css(): CSSSubject {
        return new CSSSubject(this.value.style);
    }

    public on<K extends EventEnum>(event: EventEnum, handler: EventHandler<K>): DOMSubject {
        var controller: AbortController = new AbortController();

        if(!this.eventControllers.has(event)) {
            this.eventControllers.set(event, [controller]);
        }

        this.eventControllers.set(event, [...this.eventControllers.get(event), controller]);
        this.value.addEventListener(event, handler, { signal: controller.signal });

        return this;
    }

    public once<K extends EventEnum>(event: EventEnum, handler: EventHandler<K>): DOMSubject {
        this.value.addEventListener(event, handler, { once: true });
        
        return this;
    }

    public off(event: EventEnum): DOMSubject {
        if(this.eventControllers.has(event)) {
            this.eventControllers.get(event).forEach((controller) => controller.abort());
            this.eventControllers.set(event, []);
        }

        return this;
    }

    public final(): HTMLElement {
        return this.value;
    }
}
