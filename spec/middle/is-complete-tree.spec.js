import {isCompleteTree, isCompleteTree2} from '../../src/middle/is-complete-tree';

describe('isCompleteTree', () => {
    const tree = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: {
                val: 5,
                left: null,
                right: null
            }
        },
        right: {
            val: 3,
            left: {
                val: 6,
                left: null,
                right: null
            },
            right: null
        }
    };
    test("tree return", () => {
        expect(isCompleteTree(tree)).toEqual(true);
    });

    const tree2 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: {
                val: 5,
                left: null,
                right: null
            }
        },
        right: {
            val: 3,
            left: null,
            right: {
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree2 return", () => {
        expect(isCompleteTree(tree2)).toEqual(false);
    });

    const tree3 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right: {
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree3 return", () => {
        expect(isCompleteTree(tree3)).toEqual(false);
    });

    const tree4 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: 3,
            left: null,
            right:null,
        }
    };
    test("tree4 return", () => {
        expect(isCompleteTree(tree4)).toEqual(true);
    });

    const tree5 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right:{
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree5 return", () => {
        expect(isCompleteTree(tree5)).toEqual(false);
    });

    const tree6 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right:{
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree6 return", () => {
        expect(isCompleteTree(tree6)).toEqual(false);
    });

    const tree7 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: {
                    val: 6,
                    left: null,
                    right: null
                },
                right: null
            },
            right:{
                val: 5,
                left: null,
                right: null
            },
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    };
    test("tree7 return", () => {
        expect(isCompleteTree(tree7)).toEqual(false);
    });
});

describe('isCompleteTree2', () => {
    const tree = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: {
                val: 5,
                left: null,
                right: null
            }
        },
        right: {
            val: 3,
            left: {
                val: 6,
                left: null,
                right: null
            },
            right: null
        }
    };
    test("tree return", () => {
        expect(isCompleteTree2(tree)).toEqual(true);
    });

    const tree2 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: {
                val: 5,
                left: null,
                right: null
            }
        },
        right: {
            val: 3,
            left: null,
            right: {
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree2 return", () => {
        expect(isCompleteTree2(tree2)).toEqual(false);
    });

    const tree3 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right: {
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree3 return", () => {
        expect(isCompleteTree2(tree3)).toEqual(false);
    });

    const tree4 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: 3,
            left: null,
            right:null,
        }
    };
    test("tree4 return", () => {
        expect(isCompleteTree2(tree4)).toEqual(true);
    });

    const tree5 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right:{
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree5 return", () => {
        expect(isCompleteTree2(tree5)).toEqual(false);
    });

    const tree6 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right:{
                val: 6,
                left: null,
                right: null
            },
        }
    };
    test("tree6 return", () => {
        expect(isCompleteTree2(tree6)).toEqual(false);
    });

    const tree7 = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: {
                    val: 6,
                    left: null,
                    right: null
                },
                right: null
            },
            right:{
                val: 5,
                left: null,
                right: null
            },
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    };
    test("tree7 return", () => {
        expect(isCompleteTree2(tree7)).toEqual(false);
    });
});