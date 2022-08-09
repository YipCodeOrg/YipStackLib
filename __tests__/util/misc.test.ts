import { sortByKeyFunction } from "../../util/misc"

describe("sortByKeyFunction", () => {
    describe.each([
        {
            d: [{id: 1, data: "One"}, {id: 2, data: "Two"}, {id: 3, data: "Three"}],
            k: [1, 2, 3],
            f: function(data: {id: number, data: string}){return data.id},
            desc: "Same elements and order",
            expected: [{id: 1, data: "One"}, {id: 2, data: "Two"}, {id: 3, data: "Three"}],
        },
        {
            d: [{id: 1, data: "One"}, {id: 2, data: "Two"}, {id: 3, data: "Three"}],
            k: [1, 3, 2],
            f: function(data: {id: number, data: string}){return data.id},
            desc: "Same elements, different order",
            expected: [{id: 1, data: "One"}, {id: 3, data: "Three"}, {id: 2, data: "Two"}],
        },
        {
            d: [{id: 1, data: "One"}, {id: 2, data: "Two"}, {id: 3, data: "Three"}],
            k: [2, 4, 3],
            f: function(data: {id: number, data: string}){return data.id},
            desc: "Different elements, different order",
            expected: [{id: 2, data: "Two"}, {id: 3, data: "Three"}, {id: 1, data: "One"}],
        },
    ])(
        "$desc", ({k, d, f, expected}) => {

            it("equals expected", () => {
                //Act
                const actual = sortByKeyFunction(k, d, f)

                //Assert
                expect(actual).toEqual(expected)
            })
    })
})