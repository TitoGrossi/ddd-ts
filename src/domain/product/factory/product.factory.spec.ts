import ProductFactory from "./product.factory"

describe("Product factory unit test", () => {
    it("should create a product with type Product", () => {
        const product = ProductFactory.create("Product a", 1)

        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product a")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })
})
