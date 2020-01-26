# DATENWORKS CODE CHALLENGE - SUMMONER

## Sobre a aplicação

A aplicação foi desenvolvida utilizando Javascript, HTML, CSS e bibliotecas como React, axios, enzyme e outras.
Para que a aplicação funcione de maneira adequada, lembre-se de ter conexão com a internet. Escolhi fazer dessa maneira pois, na vida real, precisamos fazer consultas à banco de dados, serviços externos (como a API do Github utilizada nessa aplicação) e trazer os arquivos junto com a aplicação não proporcionaria a mesma dificuldade/desafio que eu gostaria de enfrentar ao desenvolver esse código.

## Documentação

Toda a documentação das funções está descrita no próprio código de forma que ao chamar a função, o popup em algumas IDEs como o Visual Studio Code e outros formarão uma descrição organizada da mesma.

### Como executar o código

Para executar o código, será necessário instalar o Node.Js (https://nodejs.org/en/download/), que por sua vez instalará o npm, que será necesário para instalar as dependencias do repositório e executar a aplicação. Com ele instalado, clone este repositório em sua máquina utilizando o comando $ git clone https://github.com/jeffsarti/datenworks.git
Lembrando que para clonar um repositório utilizando o comando 'git clone', é necessário ter instalado o git bash em sua máquina. Outra alternativa é fazer o download do repositório em .zip.

Caso algum dos softwares acima tenha sido instalado e algum dos comandos no terminal falhe, reinicie a máquina e tente novamente. Caso isso não resolva, entrem em contato com jeffersonsarti@gmail.com.

Agora, no terminal de sua preferencia, mude o diretório para onde está a pasta com os arquivos do repositório e execute o comando:
$ npm install

Após o término da instalação dos módulos da aplicação, execute o comando:
$ npm start 

Esse comando iniciará nossa aplicação e abrirá uma página da web com o seu conteúdo em http://localhost:3000/.

Nota: É necessário estar conectado à internet para a boa execução do aplicativo, visto que a consulta aos arquivos .csv estão sendo feitas via API do github utilizando a biblioteca axios.

## Testes

O arquivo de testes está localizado na pasta src/components/championsDPS.test.js.
Para executar os testes já montados por mim, basta executar o código: 
$ npm test

## Notas gerais

Gostaria, primeiramente, de agradecer a oportunidade e o desafio. Foi muito divertido codar essa aplicação e eu aprendi tecnologias com esse desafio que até então eu desconhecia, como os próprios testes unitários (sim, até o momento de codar essa aplicação, eu não fazia ideia do que eram ou como fazê-los!). Foi muito importante para meu aprendizado e eu espero que vocês gostem do resultado também!

Gostaria também de agradecer ao Richard Lopes, que me incentivou a enviar meu curriculum para a Datenworks e ao Gustavo, que foi super atencioso e prestativo ao conversar comigo e me aprensentar à primeira fase do processo de recrutamento e seleção.

----------------------------------------------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
