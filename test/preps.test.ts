import { to, by } from "../src";

describe("preps test", () => {
    it("string operations", () => {
        expect(to("hello").type).toBe("string");
        
        expect(to("hello").add("world ").is("helloworld ")).toBeTruthy();
        expect(to("hello").add("world ").is("hello world")).toBeFalsy();
        expect(to("hello").as("world").f()).toBe("world");
        expect(to("hello").as((value) => value.length.toString()).f()).toBe("5");
        expect(to("hello").add(" world").f()).toBe("hello world");
        expect(to("hello").add(" world").split("l").f()).toEqual(["he", "", "o wor", "d"]);
        expect(to("hello").add(" world").cut(2).f()).toEqual(["he", "llo world"]);
        expect(to("hello").cutfine().f()).toEqual(["h", "e", "l", "l", "o"]);
    });

    it("array operations", () => {
        expect(to([1, 2, 3, 4, 5]).type).toBe("array");

        expect(to([1, 2, 3, 4, 5]).as((value) => [...value, 6]).f()).toEqual([1, 2, 3, 4, 5, 6]);
        expect(to([1, 2, 3, true, 5]).remove(true).f()).toEqual([1, 2, 3, 5]);
        expect(to([1, 2, 3, true, 5]).remove(3).f()).toEqual([1, 2, 3, 5]);
        expect(to([1, 2, 3, 4, 5]).removeIndex(2).f()).toEqual([1, 2, 4, 5]);
        expect(to([1, 2, 3, 4, 5]).removeIndex(5).f()).toEqual([1, 2, 3, 4, 5]);
        expect(to([1, 2, 3, 4, 5]).removeItem(3).f()).toEqual([1, 2, 4, 5]);
        expect(to([3, 1, 2, 3, 3, 3, 4, 5, 3, 7, 3]).removeItems(3).f()).toEqual([1, 2, 4, 5, 7]);
        expect(to([1, 2, 3, 4, 5]).put(1, 10).f()).toEqual([1, 10, 2, 3, 4, 5]);
        expect(to([1, 2, 3, 4, 5]).put(4, 10).f()).toEqual([1, 2, 3, 4, 10, 5]);
        expect(to([1, 2, 3, 4, 5]).put(5, 10).f()).toEqual([1, 2, 3, 4, 5, 10]);
        expect(to([1, 2, 3, 4, 5]).foreach((item) => item + 1).f()).toEqual([2, 3, 4, 5, 6]);
        expect(to([1, 2, 3, 4, 5]).foreach((item) => item + 1).f(3)).toBe(5);
        expect(to([1, "", 3, 4, 5]).reverse().f()).toEqual([5, 4, 3, "", 1]);
        expect(to([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).filter((item) => item % 2 === 0).f()).toEqual([1, 3, 5, 7, 9]);
        expect(to([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).cut(4).f()).toEqual([[1, 2, 3, 4], [5, 6, 7, 8, 9, 10]]);
        expect(to(["3", true, 200, [1, 2, 3], null]).is(["3", true, 200, [1, 2, 3], null])).toBeTruthy();
        expect(to(["3", true, 200, [1, 2, 3], null]).is(["3", false, 200, [1, 2, 3], null])).toBeFalsy();
        expect(to(["3", true, 200, [1, 2, 3], null]).is(["3", true, 200, [1, 2], null])).toBeFalsy();
        expect(to(["3", true, 200, [1, 2, 3], null]).is(["3", true, 200, 5, null])).toBeFalsy();
        expect(to(["3", true, 200, [1, 2], null]).is(["3", true, 200, [1, 2, 3], null])).toBeFalsy();
        expect(to(["3", true, 200, 5, null]).is(["3", true, 200, [1, 2, 3], null])).toBeFalsy();
        expect(to(["3", true, 200, { a: 1, b: [] }, null]).is(["3", true, 200, { a: 1, b: [] }, null])).toBeTruthy();
        expect(to(["3", true, 200, { a: 1, b: [] }, null]).is(["3", true, 200, { a: 1, b: [0] }, null])).toBeFalsy();
        expect(to(["3", true, 200, { a: 2, b: [] }, null]).is(["3", true, 200, { a: 1, b: [] }, null])).toBeFalsy();
    });

    it("tools", () => {
        expect(by().is(10, "hello")).toBeFalsy();

        expect(by().is(10, 10)).toBeTruthy();

        expect(by().is(["3", true, 200, [1, 2, 3], null], ["3", true, 200, [1, 2], null])).toBeFalsy();

        expect(by().is({}, [])).toBeFalsy();
        expect(by().is({ a: 1, b: [] }, [5, { b: 123 }])).toBeFalsy();

        expect(by().is(global, global)).toBeTruthy();
        expect(by().is({ a: 1, b: [] }, global)).toBeFalsy();
        expect(by().is(global, { a: 1, b: [] })).toBeFalsy();

        expect(by().is({ a: 1, b: [] }, { a: 1, b: [] })).toBeTruthy();
        expect(by().is({ a: 1, b: { test1: "Hello", test2: {} } }, { a: 1, b: { test1: "Hello", test2: {} } })).toBeTruthy();
        expect(by().is({ a: 1, d: true, b: [], asdf: "hi" }, { b: [], asdf: "hi", d: true, a: 1 })).toBeTruthy();
        expect(by().is({ a: 1, b: [] }, { a: 1, c: [] })).toBeFalsy();
        expect(by().is({ a: 1, b: [0] }, { a: 1, b: [1] })).toBeFalsy();
        expect(by().is({ a: 1, b: ["3", true, 200, [1, 2, 3], null] }, { a: 1, b: ["3", true, 200, [1, 2], null] })).toBeFalsy();
        expect(by().is({ a: 1, b: [], c: "Hello" }, {a: 1, b: []})).toBeFalsy();
        expect(by().is({ a: 1, b: [] }, {a: 1, b: [], c: "Hello"})).toBeFalsy();
    });
});
