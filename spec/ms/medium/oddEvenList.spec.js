import {generateList} from '../../../src/utils/list';
import { oddEvenList } from '../../../src/ms/medium/oddEvenList';

describe('oddEvenList', () => {
    let list = generateList([1,2,3,4,5]);
    let list2 = generateList([1,3,5,2,4]);
    test("701", () => {
        expect(oddEvenList(list)).toEqual(list2);
    });
});