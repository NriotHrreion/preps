export abstract class Subject<S = any> {
    public abstract readonly type: string;

    protected value: S;

    protected constructor(obj: S) {
        this.value = obj;
    }

    public log() {
        console.log(this.final());
    }

    protected error(message?: string) {
        throw new Error(message);
    }

    public abstract final(): S;

    // An alias for `final()`
    public f(): S {
        return this.final();
    }
}
