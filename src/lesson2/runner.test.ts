import {runner} from "./runner";

describe("Runner simple cases", () => {
//new test
    it("3 ^ 3", () => {
        expect(runner("3 ^ 3")).toEqual(27);
    });
    it("4 !", () => {
        expect(runner("4 !")).toEqual(24);
    });
    it("3 ^ 3", () => {
        expect(runner("3 ^ 3")).toEqual(27);
    });
    it("2 + ( 5 - 2 )", () => {
        expect(runner("2 + ( 5 - 2 )")).toEqual(5);
    });
    it("2 + ( 5 - 2 + ( 1 + 3 ) - ( 2 + 2 ) )", () => {
        expect(runner("2 + ( 5 - 2 + ( 1 + 3 ) - ( 2 + 2 ) )")).toEqual(5);
    });
    it("2 + ( 3 ! - ( 3 ** ) + ( 10 ^ 2 ) )", () => {
        expect(runner("2 + ( 3 ! - ( 3 ** ) + ( 10 ^ 2 ) )")).toEqual(99);
    });
//end new test
    it("1 * 32", () => {
        expect(runner("1 * 32")).toEqual(32);
    });

    it("2 * 32", () => {
        expect(runner("2 * 32")).toEqual(64);
    });

    it("2 + 32", () => {
        expect(runner("2 + 32")).toEqual(34);
    });
});

describe("Runner tripled/mixed cases", () => {
//new test
    it("3 ^ 3 - 5", () => {
        expect(runner("3 ^ 3 - 5")).toEqual(22);
    });
//end new test

    it("2 * 2 * 3", () => {
        expect(runner("2 * 2 * 3")).toEqual(12);
    });

    it("2 * 2 + 3", () => {
        expect(runner("2 * 2 + 3")).toEqual(7);
    });

    it("2 + 2 * 3", () => {
        expect(runner("2 + 2 * 3")).toEqual(8);
    });

});

describe("Runner long cases", () => {
//new test
    it("3 ** - 10 ^ 2 / 5 - 3 !", () => {
        expect(runner("3 ** - 10 ^ 2 / 5 - 3 !")).toEqual(-17);
    });
//end new test
    it("20 + 1 * 10 - 5 * 3", () => {
        expect(runner("20 + 1 * 10 - 5 * 3")).toEqual(15);
    });

    it("20 - 10 * 10 / 5 - 3", () => {
        expect(runner("20 - 10 * 10 / 5 - 3")).toEqual(-3);
    });

});
