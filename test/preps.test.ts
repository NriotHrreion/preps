import { to } from "../src";

describe("preps test", () => {
    it("string operations", () => {
        expect(to("hello").as("world").f()).toBe("world");
        expect(to("hello").as((value) => value.length.toString()).f()).toBe("5");
        expect(to("hello").add(" world").f()).toBe("hello world");
        expect(to("hello").add(" world").split("l").f()).toEqual(["he", "", "o wor", "d"]);
        expect(to("hello").add(" world").cut(2).f()).toEqual(["he", "llo world"]);
        expect(to("hello").cutfine().f()).toEqual(["h", "e", "l", "l", "o"]);
    });

    it("array operations", () => {
        expect(to([1, 2, 3, true, 5]).remove(true).f()).toEqual([1, 2, 3, 5]);
        expect(to([1, 2, 3, true, 5]).remove(3).f()).toEqual([1, 2, 3, 5]);
        expect(to([1, 2, 3, 4, 5]).removeIndex(2).f()).toEqual([1, 2, 4, 5]);
        expect(to([1, 2, 3, 4, 5]).removeItem(3).f()).toEqual([1, 2, 4, 5]);
        expect(to([1, 2, 3, 4, 5]).foreach((item) => item + 1).f()).toEqual([2, 3, 4, 5, 6]);
    });
});
