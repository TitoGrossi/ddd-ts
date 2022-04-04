import Product from "../entity/product";

export default class ProductService {
    // Isso é um service porque aplica uma operação em vários products de uma só vez.
    // No entanto, nao faz muito sentido trazer coisas do banco para a memoria so pra fazer essa operação.
    // Por isso, esse método está aqui somente por didática.
    // Às vezes vale a pena definir isso, mas receber um datasource pra dar loop
    // Nota sobre isso: puritanismo de DDD não é bom
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product =>
            product.changePrice(product.price * (1 + (percentage / 100)))
        )
    }
}
