module.exports = (obj) => {
    const filtered = {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] != null) {
            filtered[key] = obj[key];
        }
    }
    return filtered;
}   




// a funcao primeiro transforma as chaves do objeto em um array Object.keys(obj)
// apos obter todos os nomes das chaves , ele  itera sobre o array, comparando o nome da chave atual com  o valor no objeto,de mesma chave, usando isto para adicionar no array que o filter devolvera
// O reduce recebe o novo array, apenas com os nomes da chaves, onde o valor nao e nulo, e comprara com o objeto passado, adicionando apenas os nomes de propriedades presentes no array, adicionano no objeto vazio que e passado como segundo argumento do reduce
const removeNull = require('../utils/removeNullFields');

const person = {
    name: 'josh',
    age : 15,
    preferredMovie: null
};


const nums = [1,2,3,4,5];



// console.log(removeNull(person));
// console.log(filterNullKeys(person));
// console.log(Object.keys(person))

// for (let key of person){
//     console.log(key);
// }
 
// for (let value in person){
//     console.log(value);
// }