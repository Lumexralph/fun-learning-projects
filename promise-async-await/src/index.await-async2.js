// CONVERTING index.promoises2.js TO ASYN/AWAIT ES7
let resultA, resultB, resultC;

async function addAsync(num1, num2) {
    return Promise.resolve(num1 + num2);
}

async function doAsyncSum() {
  try {
    resultA = await addAsync(1, 2);
    resultB = await addAsync(resultA, 3);
    resultC = await addAsync(resultB, 4);
    let total = resultA + resultB + resultC;
    
     console.log('total: ' + total);
     console.log(resultA, resultB, resultC);
    
  }
  catch(error) {
    console.log(error);    
  }
}
 // start the whole process

(async () => {
  await doAsyncSum();
})();