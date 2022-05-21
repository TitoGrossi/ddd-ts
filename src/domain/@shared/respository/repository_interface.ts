export default interface RepositoryInterface<T> {
    create(entity: T): Promise<void> // Não é comum retonar o objeto sendo criado se já estamos passando o objeto
    update(entity: T): Promise<void>
    find(id: string): Promise<T>
    // Junto com o findAll, pode ser retornado um objeto meta com outros dados (count, paginação, next_page, ...).
    // Da mesma forma, esses argumentos podem ser passados para o método (offset, limit, ...).
    // É raro puxar todos os dados do banco (obviamente).
    // Um padrão de desenvovimento que pode ajudar é o specification.
    findAll(): Promise<T[]>
}