import { reorderList } from '../../../src/ms/medium/reorderList';

describe('reorderList', () => {
    function ListNode(val, next) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

    function generateList(arr) {
        let l = new ListNode();
        let p = l;
        for(let i = 0; i < arr.length; i++) {
            p.next = new ListNode(arr[i]);
            p = p.next;
        }
        return l.next;
    }
    test("701", () => {
        let l = generateList([1,2,3,4]);
        expect(reorderList(l)).toEqual(1);
    });
});