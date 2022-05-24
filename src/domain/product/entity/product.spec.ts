import Product from "./product"

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100)
        }).toThrowError("product: Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100)
        }).toThrowError("product: Name is required")
    })

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("123", "", -1)
        }).toThrowError("product: Name is required, product: Price must be greater than or equal to 0")
    })

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100)

        const mock = jest.spyOn(product, "validate")
        product.changeName("Product 2")

        expect(mock).toBeCalled()
        expect(product.name).toBe("Product 2")
    })

    it("should change name", () => {

        const product = new Product("123", "Product 1", 100)

        const mock = jest.spyOn(product, "validate")
        product.changePrice(150)

        expect(product.price).toBe(150)
        expect(mock).toBeCalled()
    })
})