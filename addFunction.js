function addElements(firstElement, secondElement) {
  let summation;
  if((firstElement && secondElement) === ('' || /\s/g)){
    return console.error("Nothing to do. Empty all elements.");
  }else if(firstElement === ('' || /\s/g)){
    summation = secondElement;
  } else if(secondElement === ('' || /\s/g)){
    summation = firstElement;
  } else {
    summation = firstElement + ' + ' + secondElement;
  }
  return summation;
}

function parsingSummation(summation) {
  summation = summation.replace(/\s/g,'');
  summation = summation.replace(/(?<!\^)-/g,'+-');

  const arrayElements = summation.split('+');
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
    let finalResult = "";

    for (const prop in objectElements){
      if(prop === "0"){
        finalResult += objectElements[prop]
      } else if (prop === "1") {
        finalResult = objectElements[prop] + 'x' + " + " + finalResult
      } else if (objectElements[prop] === 0){
        null;
      } else if (objectElements[prop] === 1){
        finalResult = 'x^' + prop + " + " + finalResult
      } else {
        finalResult = objectElements[prop] + 'x^' + prop + " + " + finalResult
      }

    }

    return finalResult
}

function main(){
  let x; //unknown
  let firstElement = "2*x^2 + 3 + x^-3"
  let secondElement = "3*x^3.2 + x^2 -3*x^2 + 4*x^3"

  const summation = addElements(firstElement, secondElement)
  const arrayElements = parsingSummation(summation) 
  const objectElements =arrayToObject(arrayElements)
  const finalResult = result(objectElements)

  return finalResult;
}

console.log(main())
