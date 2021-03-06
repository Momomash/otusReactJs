import {sin, cos, tan, squ, exp, fac, mul, div, add, minus} from "./mathOperators";

describe("mathOperators test cases", () => {



    it("add 4 + 2 to equal 6", () => {
        expect(add(4, 2)).toBe(6);
    });

    it("minus 4 - 2 to equal 2", () => {
        expect(minus(4, 2)).toBe(2);
    });
    it("mul 2 * 2 to equal 4", () => {
        expect(mul(2, 2)).toBe(4);
    });

    it("div 4 / 2 to equal 2", () => {
        expect(div(4, 2)).toBe(2);
    });
    //new test
    it("tan 0 to equal 0", () => {
        expect(tan(0)).toBe(0);
    });
    it("sin 0 to equal 0", () => {
        expect(sin(0)).toBe(0);
    });
    it("cos 0 to equal 1", () => {
        expect(cos(0)).toBe(1);
    });
    it("squ 3 ** to equal 9", () => {
        expect(squ(3)).toBe(9);
    });
    it("exp 2 * 4 to equal 16", () => {
    expect(exp(2, 4)).toBe(16);
  });
    it("fac 4 ! to equal 24", () => {
        expect(fac(4)).toBe(24);
    });
//end new test
});
