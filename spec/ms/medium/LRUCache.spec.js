import { LRUCache } from '../../../src/ms/medium/LRUCache';

describe('LRUCache', () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);       // 返回  1
    // cache.put(3, 3);    // 该操作会使得关键字 2 作废
    // cache.get(2);       // 返回 -1 (未找到)
    // cache.put(4, 4);    // 该操作会使得关键字 1 作废
    // cache.get(1);       // 返回 -1 (未找到)
    // cache.get(3);       // 返回  3
    // cache.get(4);       // 返回  4

    test("701", () => {
        expect(cache.put(3, 3)).toEqual(null);
    });
});