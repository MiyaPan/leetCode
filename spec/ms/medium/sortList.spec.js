import { sortList } from '../../../src/ms/medium/sortList';

describe('sortList', () => {
    let l = {
        val: 4,
        next: {
            val: 2,
            next: {
                val: 1,
                next: {
                    val: 3,
                    next: null
                }
            }
        }
    }
    let l2 = {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 3,
                next: {
                    val: 4,
                    next: null
                }
            }
        }
    }
    test("701", () => {
        expect(sortList(l)).toEqual(l2);
    });
});