const { add, addElements, parsingSummation, arrayToObject, result, main } = require('./addFunction.js');

const testObjects = {
    test1: {
        elem1: '2*x^2 + 3',
        elem2: '3*x^3 + x^2',
        expectedAddResult: '2*x^2 + 3 + 3*x^3 + x^2',
        expectedArray: ['2*x^2', '3', '3*x^3', 'x^2'],
        expectedObject: { '0':3, '2':3, '3':3 },
        finalStatement: '3x^3 + 3x^2 + 3'
    },
    test2: {
        elem1: '2.2*x^2.2 + 3.2 + x^-3.2',
        elem2: '3.2*x^3.2 + x^2.2 -3.2*x^2.2 + 4.2*x^3.2',
        expectedAddResult: '2.2*x^2.2 + 3.2 + x^-3.2 + 3.2*x^3.2 + x^2.2 -3.2*x^2.2 + 4.2*x^3.2',
        expectedArray: ['2.2*x^2.2', '3.2', 'x^-3.2', '3.2*x^3.2', 'x^2.2', '-3.2*x^2.2', '4.2*x^3.2'],
        expectedObject: { '0':3.2, '2.2':0, '3.2':7.4, '-3.2':1},
        finalStatement: 'x^-3.2 + 7.4x^3.2 + 3.2'
    },
    test3: {
        elem1: '-2*x^-2 - 3',
        elem2: '-3*x^-3 - x^-2',
        expectedAddResult: '-2*x^-2 - 3 + -3*x^-3 - x^-2',
        expectedArray: ['-2*x^-2','-3', '-3*x^-3', '-x^-2'],
        expectedObject: { '0':-3, '-2':-3, '-3':-3 },
        finalStatement: '-3x^-3 -3x^-2 -3'
    },
    test4: {
        elem1: '-2*x^-2 - 3',
        elem2: '',
        expectedAddResult: '-2*x^-2 - 3',
        expectedArray: ['-2*x^-2', '-3'],
        expectedObject: { '0':-3, '-2':-2 },
        finalStatement: '-2x^-2 -3'
    },
    test5: {
        elem1: ' ',
        elem2: '-3*x^-3 - x^-2',
        expectedAddResult: '-3*x^-3 - x^-2',
        expectedArray: ['-3*x^-3', '-x^-2'],
        expectedObject: { '-2':-1, '-3':-3 },
        finalStatement: '-3x^-3 -x^-2'
    },
    test6: {
        elem1: ' ',
        elem2: ' ',
        expectedAddResult: 'Nothing to do. Empty all elements.'
    }
}

describe('Add function element', () => {
    test('it should add two integer elements, recruitment example', () => {
        expect(addElements(testObjects.test1.elem1, testObjects.test1.elem2)).toBe(testObjects.test1.expectedAddResult)
    });
    test('it should add two float elements', () => {
        expect(addElements(testObjects.test2.elem1, testObjects.test2.elem2)).toBe(testObjects.test2.expectedAddResult)
    });
    test('it should add two negative elements', () => {
        expect(addElements(testObjects.test3.elem1, testObjects.test3.elem2)).toBe(testObjects.test3.expectedAddResult)
    });
    test('it should add two elements, one empty', () => {
        expect(addElements(testObjects.test4.elem1, testObjects.test4.elem2)).toBe(testObjects.test4.expectedAddResult)
    });
    test('it should add two elements, one empty', () => {
        expect(addElements(testObjects.test5.elem1, testObjects.test5.elem2)).toBe(testObjects.test5.expectedAddResult)
    });
    test('it should add two empty elements', () => {
        expect(addElements.bind(this, testObjects.test6.elem1, testObjects.test6.elem2)).toThrow(new Error(testObjects.test6.expectedAddResult));
    });
});

describe('Parsing summation tests', () => {
    test('parsing two integer elements, recruitment example', () => {
        expect(parsingSummation(testObjects.test1.expectedAddResult)).toEqual(expect.arrayContaining(testObjects.test1.expectedArray))
    });
    test('parsing two float elements', () => {
        expect(parsingSummation(testObjects.test2.expectedAddResult)).toEqual(expect.arrayContaining(testObjects.test2.expectedArray))
    });
    test('parsing two negative elements', () => {
        expect(parsingSummation(testObjects.test3.expectedAddResult)).toEqual(expect.arrayContaining(testObjects.test3.expectedArray))
    });
    test('parsing two elements, one emptys', () => {
        expect(parsingSummation(testObjects.test4.expectedAddResult)).toEqual(expect.arrayContaining(testObjects.test4.expectedArray))
    });
    test('parsing two elements, one empty', () => {
        expect(parsingSummation(testObjects.test5.expectedAddResult)).toEqual(expect.arrayContaining(testObjects.test5.expectedArray))
    });
});

describe('Parsing array to object', () => {
    test('parsing array to object two integer elements, recruitment example', () => {
        expect(arrayToObject(testObjects.test1.expectedArray)).toEqual(expect.objectContaining(testObjects.test1.expectedObject))
    });
    test('parsing array to object two float elements', () => {
        expect(arrayToObject(testObjects.test2.expectedArray)).toEqual(expect.objectContaining(testObjects.test2.expectedObject))
    });
    test('parsing array to object two negative elements', () => {
        expect(arrayToObject(testObjects.test3.expectedArray)).toEqual(expect.objectContaining(testObjects.test3.expectedObject))
    });
    test('parsing array to object two elements, one emptys', () => {
        expect(arrayToObject(testObjects.test4.expectedArray)).toEqual(expect.objectContaining(testObjects.test4.expectedObject))
    });
    test('parsing array to object two elements, one empty', () => {
        expect(arrayToObject(testObjects.test5.expectedArray)).toEqual(expect.objectContaining(testObjects.test5.expectedObject))
    });
});

describe('Final statement', () => {
    test('final adding two integer elements, recruitment example', () => {
        expect(result(testObjects.test1.expectedObject)).toBe(testObjects.test1.finalStatement);
    });
    test('final adding two float elements', () => {
        expect(result(testObjects.test2.expectedObject)).toBe(testObjects.test2.finalStatement);
    });
    test('final adding two negative elements', () => {
        expect(result(testObjects.test3.expectedObject)).toBe(testObjects.test3.finalStatement);
    });
    test('final adding two elements, one emptys', () => {
        expect(result(testObjects.test4.expectedObject)).toBe(testObjects.test4.finalStatement);
    });
    test('final adding two elements, one empty', () => {
        expect(result(testObjects.test5.expectedObject)).toBe(testObjects.test5.finalStatement);
    });
});

describe('Main function', () => {
    test('final adding two integer elements, recruitment example', () => {
        expect(main(result(arrayToObject(parsingSummation(addElements(testObjects.test1.elem1, testObjects.test1.elem2))))))
        .toBe(testObjects.test1.finalStatement);
    });

});
