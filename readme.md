<p align="center">
  <a href="https://letscode.com.br/">
    <img src="./assets/logo-lets-code.gif" height="100">
    <h2 align="center">Let's Code - Quadro Kanban</h2>
  </a>
</p>

## Como executar?
Essa seção tem como objetivo guiar dois tipos de execução. Fica a critério.

Para execução em modo de desenvolvimento, ou para execução de testes E2E, o usuário deve clonar o projeto em sua máquina, instalar suas dependências e executá-lo.

```sh
$ git clone <ENDEREÇO_DO_REPOSITÓRIO>

# ...

$ npm install
$ npm run build
$ npm run start
```

#### Guia de testes
- E2E: A fim de executar o projeto de uma forma mais automática, está disponível uma collection do Postman contendo o exemplo de uso completo. Os arquivos para importação estão em `./tests/acceptance/**`. O comando abaixo 
- Integração: Todas as suítes dessa categoria de testes podem ser executadas utilizando o comando:
```sh
$ npm run test:integration
```
- Unitário: Todas as suítes dessa categoria de testes podem ser executadas utilizando o comando:
```sh
$ npm run test:unit
```

#### Guia de execução em ambiente de desenvolvimento
Basta seguir o passo introdutório dessa seção. A configuração das variáveis de ambiente segue a regra abaixo:

Para `NODE_ENV` com o valor `dev` ou falso - `null`, `undefined` ou `falso` - entra em vigor o arquivo `./.env.example`. Para outros tipos de ambiente de execução, entra em vigor o arquivo (não versionado) `.env` ou o ambiente do host de execução.

## Abordagens da perspectiva de alto-nível da Engenharia de Software
- Arquitetura Hexagonal, para atender o tópico que demandava arquiteturas que separem responsabilidades.
- Skeleton Walking, a fim de modelar todo o cenário de engenharia em volta do projeto, no inínio do projeto, a fim de economizar recursos humanos não necessários nos últimos dias de desenvolvimento.
- Continuous Delivery, casando com a abordagem do Skeleton Walking, modelando um cenário confiável de *commit stage* e *acceptance stage*, removendo esforço humano desnecessário na validação de aceitação e qualidade do projeto.
  - Commit stage
    - Ao realizar um commit, todos os testes unitários relacionados aos arquivos modificados eram executados.
    - Ao realizar um push contra o repositório no GitHub, todas as suítes de testes unitários e de integração rodavam. No final, tinha-se a cobertura de testes da *codebase*.
  - Acceptance stage
    - No momento que o código entrava no ramo princípal do repositório do GitHub, uma rotina com todos os testes unitários, integração e e2e (a fim de automatizar a aceitação proposta pelo avaliador) eram executados.

## Observações importantes
#### **Não adição de um adaptador para um banco de dados real** 
  
  Pelo fato da arquitetura hexagonal deixar explícito que a adição de um adaptador para uma tecnologia especifica que respeite o protocolo da porta demanda um esforço mínimo, deixei esse tópico com prioridade baixa. Acredito que tinham coisas mais importantes (regras de aceitação) para priorizar.

#### **Payloads de inputs das rotas da API tiveram sua nomenclatura alterada para inglês**

  Exemplo: de `{ login: '', senha: '' }` para `{ username: '', senha: '' }`.
  
  Porém, todos estes detalhes podem ser observados pela collection de aceitação do Postman *(Notas de como rodar estão na seção de Guia de Testes)*.