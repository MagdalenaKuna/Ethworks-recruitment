function addElements(firstElement, secondElement) {
  let summation;
  const re = new RegExp('^\\s*$');
  
  if((!firstElement || re.test(firstElement)) && (!secondElement || re.test(secondElement))){
    throw new Error('Nothing to do. Empty all elements.');
  } else if (!firstElement || re.test(firstElement)){
    summation = secondElement;
  } else if (!secondElement || re.test(secondElement)){
    summation = firstElement;
  } else {
    summation = firstElement + ' + ' + secondElement;
  }

  return summation;
}

function parsingSummation(summation) {
  summation = summation.replace(/\s/g,'');
  summation = summation.replace(/(?<=.+)(?<!\^)-/g,'+-');

  const arrayElements = summation.split('+').filter(e => !!e);

  return arrayElements
}

function arrayToObject(arrayElements){
    let objectElements = {}

    for (item of arrayElements) {

      if(item.includes('x')){
        item = item.replace(/x/g, '1')
        
        let phrases = item.split('^')
        
        for (const prop in objectElements){
          if(prop === phrases[1]){
            phrases[0] = parseFloat(objectElements[prop]) + parseFloat(phrases[0])
          }
        }
        objectElements = {...objectElements, [phrases[1]]: parseFloat(phrases[0])}
      } else {
        objectElements = {...objectElements, 0: parseFloat(item)}
      }
    }
    return objectElements; 
}

function result(objectElements){
    let finalResult = '';

    for (const prop in objectElements){
      if(prop === '0'){
        finalResult += objectElements[prop]
      } else if (prop === '1') {
        finalResult = objectElements[prop] + 'x' + ' + ' + finalResult
      } else if (objectElements[prop] === 0){
        null;
      } else if (objectElements[prop] === 1){
        finalResult = 'x^' + prop + ' + ' + finalResult
      } else if (objectElements[prop] === -1){
        finalResult = '-x^' + prop + ' + ' + finalResult
      } else {
        finalResult = objectElements[prop] + 'x^' + prop + ' + ' + finalResult
      }
    }

    finalResult = finalResult.replace(/\s*\+\s*$/g,'');
    finalResult = finalResult.replace(/\+\s*-/g,'-');

    return finalResult
}

function main(){
  let x; //unknown
  let firstElement = '2*x^2 + 3'
  let secondElement = '3*x^3 + x^2'

  const summation = addElements(firstElement, secondElement)
  const arrayElements = parsingSummation(summation) 
  const objectElements =arrayToObject(arrayElements)
  const finalResult = result(objectElements)

  return finalResult;
}

(function() {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    addElements,
    parsingSummation,
    arrayToObject,
    result,
    main,
  };
  } else {
    window.main = main();
  }
})();