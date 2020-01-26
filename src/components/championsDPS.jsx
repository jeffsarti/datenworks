import React, {Component} from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Table = styled.table` 
  padding: 0px;
  margin: 0px auto;
  th {
    font-size: 1.4rem;
    border: 1px solid #7adaf5;
  }
  td {
    font-size: 1.0rem;
    border: 1px solid #397788;
  }
`;

const ErrorMessage = styled.div`
    width: 100vw;
    background-color: red;
    color: #000;
    font-size: 2.0rem;
`;

export default class ChampionsDPS extends Component {
    /* Montamos o estado da Classe para armazenarmos o resultado das requisições */
    state = {
        content: [],
        err: null
    }

    /* Assim que o componente DPS for montado, chamamos o método loadFiles para carregar os arquivos */
    componentDidMount() {
        this.mountFiles();
    }

    /**
     * O método mountFiles() buscará ambos arquivos .csv no repositório do Github da
     * Datenworks (repos/Datenworks/developer-code-challenge/contents/summoner_challenge/files/),
     * decodificará em base 64 o conteúdo de ambos, tratará tais conteúdos e os armazenará no state
     * da Classe ChampionsDPS.
     * @async
     * @function mountFiles
     * @example 
     *   mountFiles(); 
     * @throws Lançará um erro caso haja algum problema ao se conectar com a API do Github ou se outros métodos dentro de seu escopo lançarem um erro.
     * @throws {NetworkError} Será lançado caso houver problemas de conexão com a Internet.
     * @throws {404 - Not Found} Será lançado caso a url da API do Github esteja errada.
    */
    mountFiles = async () => {
        // Criando uma constante do tipo array com os nomes dos arquivos, 
        // podemos criar um mecanismo para percorrer esse array e guardar os resultados
        // num outro array, assim garantimos que sempre que precisarmos adicionar ou remover um arquivo,
        // alterarmos apenas uma parte do código.
        const files = ['dataset_1.csv', 'dataset_2.csv'];
        var responses = [], dataArray = [];
        try {
            for (let file in files) {
                let response = await api.get(`repos/Datenworks/developer-code-challenge/contents/summoner_challenge/files/${files[file]}`);
                responses.push(response);
            }
            
            /* 
                A função atob(string) é responsável por decodificar uma string codificada em base64, equanto
                a função csvDataToArray é responsável por montar um array com o texto decodificado pela função atob.
            */ 
            dataArray.push(responses.map((dataset) => this.csvDataToArray(atob(dataset.data.content))));

            // Gambiarra :)
            dataArray = dataArray[0];

            /* 
                Terminamos de montar nossa base de dados, agora precisamos juntar ambas as partes num unico objeto.
            */
            const championsData = this.getChampionsData(dataArray);
            /*
                Agora que temos nosso objeto com os nomes dos campeões e seus respectivos
                atributos (attack_damage e attack_speed), montaremos um array com o DPS de cada campeão;
            */
            const championsDPSArray = this.getChampionsDPS(championsData);

            this.setState({content: championsDPSArray});
        } catch (err) {
            this.setState({err});
            console.log(err);
        }
    }

    /**
     * O método csvDataToArray(text) é responsável por transformar o texto (raw) de um arquivo .csv
     * em um array de arrays de strings. Primeiro, ele quebrará o texto em arrays de um único índice,
     * utilizando o método Array.prototype.split("\n"), dividindo assim todas as linhas do texto. Em seguida,
     * gera um novo array do primeiro, utilizando os métodos Array.prototype.map e Array.prototype.split(",")
     * para separar a string de cada elemento do primeiro array, pelo separador 'vírgula', em um novo array.
     * @function csvDataToArray
     * @param {String} text - O texto decodificado de um arquivo scv.
     * @example 
     *   csvDataToArray('um, dois, três'); // [['um', 'dois', 'três']]
     * @returns string[][]
    */
    csvDataToArray = (text = '') => {
        /*
            Primeiro dividimos o texto pelas quebras de linha, assim mantemos sempre o index 0 do array como header e
            as demais linhas como os dados que iremos tratar
        */
        var primeiroFiltro = text.split("\n");
        /*
            Em seguida, realizamos a segunda quebra, para dividir cada elemento do array anterior em outro array,
            utilizando o separador 'vírgula'.
        */
        var segundoFiltro = primeiroFiltro.map((index) => index.split(','));
        /*
            Agora, retornamos o array de arrays gerado, cujos valores são do tipo string.
        */
        return segundoFiltro;
    }

    /**
     * O método getChampionsData(string[[[]]]) é responsável por comparar os valores passados dentro dos arrays 
     * passados como argumento para ele e retornar o Objeto championsObj, onde as keys são os nomes de cada campeão,
     * e o atributo de cada key é um Objeto, com as keys ATTACK_DAMAGE e ATTACK_SPEED (caso haja tal valor para o 
     * campeão tratado)
     * @function getChampionsData
     * @param {Array} dataArray - O Array com um ou mais arrays criados pelo método csvDataToArray(text)
     * @example 
     *   getChampionsData([[['NOME', 'ATTACK_SPEED', 'ARMADURA'],['Draven', '1.0', '100']]])
     *   => {'Draven': {'ATTACK_SPEED': 1.0}}
     * @returns Object
    */
    getChampionsData = (dataArray = [[['']]]) => {
        var championsObj = {};
        // Primeiro geramos o objeto
        for(var i = 0; i<dataArray.length; i++) {
            // fieldName recebe o valor do header do arquivo que contenha a palavra 'ATTACK'.
            // sabemos que ambos os arquivos possuem o header attack_damage e attack_speed
            // na segunda coluna, mas na vida real, muitas vezes as colunas podem estar em posições separadas
            // e por isso o ideal é procurar o header de acordo com uma string padrão. 
            var fieldName = dataArray[i][0].find(element => element.search('ATTACK') > -1);
            var fieldIndex = dataArray[i][0].indexOf(fieldName);
            for (var k = 1; k<dataArray[i].length; k++) {
                // Precisamos da comparação dataArray[i][k][0] !== "" pois como dividimos anteriormente as linhas
                // com o split("\n"), o último elemento do array pode conter o valor "" devido a quebra de linha.
                if (dataArray[i][k][0] !== "") {
                    let objField = {[fieldName]: Number(dataArray[i][k][fieldIndex])};
                    // Aqui usamos o spread operator (...) para que todos os elementos de ambos os objetos sejam mantidos
                    // ao realizarmos a concatenação deles, caso contrário, sobrescreveremos os valores antigos e nossos
                    // objetos terão apenas uma chave/valor.
                    championsObj[dataArray[i][k][0]] = {...championsObj[dataArray[i][k][0]], ...objField};
                }
            }
        }
        
        
        return championsObj;
    }

    /**
     * O método getChampionsDPS(Object) é responsável por coletar os dados de ATTACK_DAMAGE e ATTACK_SPEED de cada
     * campeão (caso houverem ambos os atributos) e retornar um array de arrays com o nome e DPS de cada campeão, em
     * ordem decrescente por DPS.
     * Caso o campeão não tenha ambos os atributos ATTACK_DAMAGE e ATTACK_SPEED, tal campeão será ignorado.
     * @function getChampionsDPS
     * @param {Object} championsData - O objeto gerado pelo método getChampionsData(Array)
     * @example 
     *   getChampionsDPS({Draven: {ATTACK_SPEED: 1.0, ATTACK_DAMAGE: 100}})
     *   => [['Draven', 100]]
     * @returns [...[string, Number]]
    */
    getChampionsDPS = (championsData = {}) => {
        var dpsArray = [];
        for (let champion in championsData) {
            if (championsData[champion].hasOwnProperty('ATTACK_DAMAGE') && championsData[champion].hasOwnProperty('ATTACK_SPEED')) {
                let dps = Number(championsData[champion]['ATTACK_DAMAGE'] * championsData[champion]['ATTACK_SPEED']).toFixed(2);
                dpsArray.push([champion, Number(dps)]);
            }
        }
        // O sort é responsável por ordenar o DPS de forma decrescente (b[1] - a[1]). Caso queiramos
        // ordenar por ordem crescente, basta inverter o b pelo a (a[1] - b[1])
        dpsArray.sort((a, b) => b[1] - a[1]);
        return dpsArray;
    }

    render() {
        const { content, err } = this.state;
        return (
            !err ? (
            <Table>
                <tbody>
                    <tr>
                        <th>Nome do Campeão</th>
                        <th>DPS</th>
                    </tr>
                    { content.map((champion) => (
                        <tr key={Math.random()}>
                            <td>{champion[0]}</td>
                            <td>{champion[1]}</td>
                        </tr>
                    )) }
                </tbody>
            </Table>
            ) : (
            <>
                <ErrorMessage>Não foi possível exibir os dados: {err.message + ' '}</ErrorMessage>
                <p>
                    Ops... Parece que houve um erro que não permitiu o carregamento correto do código...
                    <br/>
                    Por favor, verifique a documentação para rever o passo a passo de como executar o programa.
                    <br/>
                    Desculpe-me pelo imprevisto!
                </p>
            </>
            )
        );
    }
}