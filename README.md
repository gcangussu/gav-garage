# gav-garage

Para instalar, clone o repositório
```
git clone https://github.com/gcangussu/gav-garage.git
cd gav-garage
```

Comece instalando o servidor 
```
cd server
yarn install
```

Já existe uma configuração pronta com um cluster público, mas se necessário configure com o seu cluster no arquivo `.env`

Inicie o servidor com
```
yarn start
```

Agora instale o projeto para fazer o bundle do web app
```
cd ..
yarn install
yarn start
```

O app estará disponível em `http://localhost:3000`
