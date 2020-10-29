function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
export const generateList = (arr) => {
    let head = new ListNode(arr[0]);
    let p = head;
    for(let i = 1; i < arr.length; i++) {
        const node = new ListNode(arr[i]);
        p.next = node;
        p = p.next;
    }
    return head;
}