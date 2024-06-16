import { ArraySubject } from "./array";
import { CSSSubject } from "./css";
import { Subject } from "./subject";

type EventEnum = keyof HTMLElementEventMap;
type EventHandler<K extends EventEnum> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;

export class DOMSubject extends Subject<HTMLElement> {
    public readonly type = "dom";

    private eventControllers: Map<EventEnum, AbortController> = new Map();

    public constructor(obj: HTMLElement) {
        super(obj);
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

    public css(): CSSSubject {
        return new CSSSubject(this.value.style);
    }

    public on<K extends EventEnum>(event: EventEnum, handler: EventHandler<K>): DOMSubject {
        var controller: AbortController;

        if(this.eventControllers.has(event)) {
            controller = this.eventControllers.get(event);
        } else {
            controller = new AbortController();
            this.eventControllers.set(event, controller);
        }

        this.value.addEventListener(event, handler, { signal: controller.signal });

        return this;
    }

    public once<K extends EventEnum>(event: EventEnum, handler: EventHandler<K>): DOMSubject {
        this.value.addEventListener(event, handler, { once: true });
        
        return this;
    }

    // public off(event: EventEnum): DOMSubject {
    //     if(this.eventControllers.has(event)) this.eventControllers.get(event).abort();

    //     return this;
    // }

    public final(): HTMLElement {
        return this.value;
    }
}
