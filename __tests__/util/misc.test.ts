import { inverseIndexMap, sortByKeyFunction } from "../../util/misc"

describe("sortByKeyFunction", () => {    
    function f(data: {id: number, name: string}){return data.id}
    describe.each([
        {
            d: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
            k: [1, 2, 3],
            desc: "Same elements and order",
            expected: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
        },
        {
            d: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
            k: [1, 3, 2],
            desc: "Same elements, different order",
            expected: [{id: 1, name: "One"}, {id: 3, name: "Three"}, {id: 2, name: "Two"}],
        },
        {
            d: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}, {id: 4, name: "Four"}],
            k: [3, 500, 2],
            desc: "Different elements, different order",
            expected: [{id: 3, name: "Three"}, {id: 2, name: "Two"}, {id: 1, name: "One"}, {id: 4, name: "Four"}],
        },
    ])(
        "$desc", ({k, d, expected}) => {

            it("equals expected", () => {
                //Act
                const actual = sortByKeyFunction(k, d, f)

                //Assert
                expect(actual).toEqual(expected)
            })
    })
})

describe("inverseIndexMap", () => {
    function f(data: {id: number, name: string}){return data.name}
    
    type TestInput = {
        a: {id: number, name: string}[]
        desc: string,
        expected: [string, number][]
    }
    
    describe("happy", () => {
        describe.each<TestInput>([
            {
                a: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "Three"}],
                desc: "Multiple values",
                expected: [["One", 0], ["Two", 1], ["Three", 2]],
            },
            {
                a: [{id: 1, name: "One"}],
                desc: "Single value",
                expected: [["One", 0]],
            },
            {
                a: [],
                desc: "Empty",
                expected: [],
            }
        ])(
            "$desc", ({a, expected}) => {

                it("has expected mappings", () => {
                    //Arrange
                    const expectedMap = new Map<string, number>(expected)
                    
                    //Act
                    const actual = inverseIndexMap(a, f)

                    //Assert
                    expect(actual).toEqual(expectedMap)
                })
        })
    })
    
    describe("failure", () => {
        describe.each([
            {
                a: [{id: 1, name: "One"}, {id: 2, name: "Two"}, {id: 3, name: "One"}],
                desc: "Duplicate keys"
            }
        ])(
            "$desc", ({a}) => {

                it("throws error", () => {                    
                    expect(() => inverseIndexMap(a, f)).toThrow(Error)
                })
        })
    })
})