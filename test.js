


function undercoreAndUppFromSpace(paymentMethod) {

    const textArr = paymentMethod.split(' ');

    const textUpper = textArr.map((word) => word.toUpperCase());

    return  textUpper.join('_');
}


const text = undercoreAndUppFromSpace('cartao de credito');

console.log(text);
// let paymentMethod = 'Credit card';

const obj = {
    name : 'jair',
    lastname : 'messias'
}

console.log(obj.length);
