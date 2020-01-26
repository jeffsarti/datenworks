import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import ChampionsDPS from './championsDPS';
configure({adapter: new Adapter()});

// Os mocks são um sample de como os dados devem entrar em cada função 
const mocks = {
    csvEntrada: "NOME,ATTACK_SPEED,ARMOR\nDraven,1.0,60",
    champDataEntrada: [
        [
            ["NOME","ATTACK_SPEED","ARMOR"],
            ["Draven","0.679","60"]
        ], 
        [
            ["NOME","ATTACK_DAMAGE","MAGIC_RESIST"],
            ["Draven","60","60"]
        ]
    ],
    champDPSEntrada: {Draven: {ATTACK_SPEED: 0.679, ATTACK_DAMAGE: 60.00}},
}

// Os expectedResults são um sample de como os returns de cada função deveriam ser
const expectedResults = {
    csvSaida: [
        ["NOME","ATTACK_SPEED","ARMOR"],
        ["Draven","1.0","60"]
    ],
    champDataSaida: {Draven: {ATTACK_SPEED: 0.679, ATTACK_DAMAGE: 60}},
    champDPSSaida: [['Draven', 40.74]]
}

// Grupo de testes 
describe('Verifica se, dado determinado input, a função devolve o output esperado.', () => {
    const wrapper = shallow(<ChampionsDPS />);
    test(`Função csvDataToArray ->\nEntrada: ${mocks.csvEntrada} \nSaída esperada: ${expectedResults.csvSaida}`, () => {
        expect(wrapper.instance().csvDataToArray(mocks.csvEntrada)).toEqual(expectedResults.csvSaida);
    });
    test(`Função getChampionsData ->\nEntrada: ${mocks.champDataEntrada} \nSaída esperada: ${expectedResults.champDataSaida}`, () => {
        expect(wrapper.instance().getChampionsData(mocks.champDataEntrada)).toEqual(expectedResults.champDataSaida);
    });
    test(`Função getChampionsDPS ->\nEntrada: ${mocks.champDPSEntrada} \nSaída esperada: ${expectedResults.champDPSSaida}`, () => {
        expect(wrapper.instance().getChampionsDPS(mocks.champDPSEntrada)).toEqual(expectedResults.champDPSSaida);
    });
})