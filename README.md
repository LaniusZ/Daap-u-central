# Dapp Programa

## Configuración y primer inicio
Mantener el orden de los proyectos para la configuración y primer inicio

### blockchain
```bash
yarn install
yarn localnode
```
Con este último comando nos entregara la dirección del nodo local de la blockchain y su puerto, adicionalmente necesitaremos un private key, estos deben ser añadidos al .env de este proyecto el parámetro tesnet_url en el .env es opcional

En otra consola / terminal mientras el comando localnode siga en ejecución
```bash
yarn deploy:local
```
Más adelante necesitaremos la dirección de los comandos aquí expuestos

### api
En el .env
```env
LOCAL_URL=
PORT=
HELLO_WORLD_CONTRACT_ADDRESS=
TOKEN_CONTRACT_ADDRESS=
DI_CONTRACT_ADDRESS=
PRIVATE_KEY=
```

el parámetro local_url y private es el mismo que en blockchain.

el parámetro port es el puerto que quedara escuchando la api, se recomienda 4000

y para los demas parametros rellenar con el comando yarn deploy:local que se utilizó en el proyecto anterior

luego de tener el .env configurado y guardado ejecutar los siguientes comandos
```bash
yarn install
yarn build
yarn start
```
y dejar en ejecución

### app
Configurar el .env, el port es el puerto que quedará en escucha, el api_url es la dirección que entrega el comando yarn start del proyecto api

luego de tener el .env configurado y guardado ejecutar los siguientes comandos
```bash
yarn install
yarn build
yarn start
```

## Ejecución
Se debe ejecutar en el mismo orden y en terminales distintas (mantener ejecución)

### blockchain
```bash
yarn localnode
```

### api
```bash
yarn start
```

### app
```bash
yarn start
```
