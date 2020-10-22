#API SKY

API desenvolvida para o teste técnico da empresa Accenture. 

Baseada em Express, ela usa JWT para autenticação e MongoDB como banco de dados. 

### Endpoints 


| endpoint | função | método|
|---|---|---|
|`/api/user/register`| Registro do usuário| POST |
|`/api/user/login`| Login do usuário | POST |
|`/api/user` | Busca do usuário com o `id` passado na URL| GET |


### Configuração
A configuração é feita através de um arquivo `.env`, com as chaves descritas no arquivo `.env.example`

### Execução
A execução pode ser feita de duas formas.
É possível executar a API dentro do Docker, usando o `docker-compose`. 

Esse método inicia também um container com o MongoDB rodando na porta local `27017`, e para conectar-se a ela, basta setar no `.env` a variável `DB_CONNECT_URI` para o mesmo valor que está no `.env.example`.
A execução é iniciada com o comando:
```bash
docker-compose up
```

Para iniciar a execução localmente, sem o Docker, bastam os comandos:
```bash
npm install
npm run start
```
