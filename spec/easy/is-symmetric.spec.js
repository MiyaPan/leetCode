import {isSymmetric, isSymmetricIterate} from '../../src/easy/is-symmetric';

describe('isSymmetric', () => {
    const tree = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 3,
                left: null,
                right: null
            },
            right: {
                val: 4,
                left: null,
                right: null
            }
        },
        right: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: {
                val: 3,
                left: null,
                right: null
            }
        }
    };
    test("tree return", () => {
        expect(isSymmetric(tree)).toEqual(true);
    });

    const tree1 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: {
                val: 3,
                left: null,
                right: null
            }
        },
        right: {
            val: 2,
            left:null,
            right: {
                val: 3,
                left: null,
                right: null
            }
        }
    };
    test("tree1 return", () => {
        expect(isSymmetric(tree1)).toEqual(false);
    });
});

describe('isSymmetricIterate', () => {
    const tree = {
        val: 1,
        left: {
            val: 2,
            left:null,
            right: {
                val: 4,
                left: null,
                right: null
            }
        },
        right: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right:null
        }
    };
    test("tree return", () => {
        expect(isSymmetricIterate(tree)).toEqual(true);
    });

    const tree1 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: {
                val: 3,
                left: null,
                right: null
            }
        },
        right: {
            val: 2,
            left:null,
            right: {
                val: 3,
                left: null,
                right: null
            }
        }
    };
    // test("tree1 return", () => {
    //     expect(isSymmetricIterate(tree1)).toEqual(false);
    // });
});
