# Divisao legal de ser feita:

<pre>
Domain -> Complexidade de negócio
    - Entity
        - custumer.ts (regra de negócio)
Infra -> Detalhe (complexidade acidental)
    - Entity/Models
        - customer.ts (getters e setters do modelo)
</pre>

# Para o mental:
No domain a gente não tem escolha do que fazer, o uso é ditado pelos clientes

Na infra a gente (dev) escolhe que tecnologia utilizar (framework, orm, forma de comunicação, etc.)

# Sobre o typescript
<pre>
npx "nome da lib" --init -> inicializa config da lib. Funciona para typescript (tsc --init), jest (jest --init), etc.
npx tsc builda os arquivos js
swc é um compilador escrito em rust que permite que os testes rodem bem mais rápidos
jest tem test coverage (ele pergunta se queremos utlizar quenaod damos o npx jest --init)
</pre>

<pre>node_modules/.bin/tsc --noEmit faz só as verificaçõe de tipagem, sem buildar arquivos</pre>
<pre>Pra isso, renomear nos scripts do package.json o "tsc": "tsc" faz pegar o tsc que roda no binario dos node_modules</pre>
<pre>No vscode, utilizando a extensao de js, basta alterar o comando jest para npm test</pre>
