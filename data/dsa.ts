export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Problem {
  id: string;
  title: string;
  topic: string;
  difficulty: Difficulty;
  companies: string[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solution: string;
  starterCode: string;
  testCases: { input: string; expected: string }[];
  pattern: string;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
}

export const dsaTopics: Topic[] = [
  { id: 'arrays', name: 'Arrays & Strings', icon: '▦', description: 'Foundation of all DSA — indexing, traversal, manipulation', order: 1 },
  { id: 'hashmaps', name: 'HashMaps & Sets', icon: '⊞', description: 'O(1) lookup patterns, frequency counting, grouping', order: 2 },
  { id: 'two-pointers', name: 'Two Pointers', icon: '⇄', description: 'Efficient in-place operations on sorted or structured arrays', order: 3 },
  { id: 'sliding-window', name: 'Sliding Window', icon: '⧉', description: 'Subarray/substring problems with a moving range', order: 4 },
  { id: 'stack-queue', name: 'Stack & Queue', icon: '⫶', description: 'LIFO/FIFO patterns, monotonic stacks, BFS foundations', order: 5 },
  { id: 'linked-list', name: 'Linked Lists', icon: '⟲', description: 'Pointer manipulation, fast/slow pointers, reversal', order: 6 },
  { id: 'binary-search', name: 'Binary Search', icon: '⌖', description: 'Search on sorted data, answer-space binary search', order: 7 },
  { id: 'trees', name: 'Trees & BST', icon: '⊛', description: 'DFS, BFS, recursion on hierarchical data', order: 8 },
  { id: 'graphs', name: 'Graphs', icon: '⬡', description: 'BFS, DFS, topological sort, union-find, shortest paths', order: 9 },
  { id: 'heap', name: 'Heaps & Priority Queue', icon: '△', description: 'Top-K problems, scheduling, median finding', order: 10 },
  { id: 'dp', name: 'Dynamic Programming', icon: '⊕', description: 'Memoization, tabulation, optimal substructure', order: 11 },
  { id: 'recursion', name: 'Recursion & Backtracking', icon: '↺', description: 'Permutations, combinations, constraint satisfaction', order: 12 },
];

export const problems: Problem[] = [
  // ─── ARRAYS ───
  {
    id: 'two-sum',
    title: 'Two Sum',
    topic: 'arrays',
    difficulty: 'easy',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'TCS'],
    pattern: 'HashMap Lookup',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    approach: `**Pattern: HashMap for O(1) complement lookup**

1. Create an empty hashmap \`seen = {}\`
2. For each index \`i\` and value \`num\` in nums:
   - Compute \`complement = target - num\`
   - If complement is in \`seen\`, return \`[seen[complement], i]\`
   - Otherwise store \`seen[num] = i\`

**Why this works:** Instead of checking every pair (O(n²)), we ask "have I seen the number I need?" in O(1) using a hashmap.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []  # guaranteed to find answer per problem statement

# Test
print(two_sum([2, 7, 11, 15], 9))   # [0, 1]
print(two_sum([3, 2, 4], 6))         # [1, 2]
print(two_sum([3, 3], 6))            # [0, 1]`,
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    pass

print(two_sum([2, 7, 11, 15], 9))  # Expected: [0, 1]`,
    testCases: [
      { input: '[2,7,11,15], target=9', expected: '[0, 1]' },
      { input: '[3,2,4], target=6', expected: '[1, 2]' },
      { input: '[3,3], target=6', expected: '[0, 1]' },
    ],
  },
  {
    id: 'best-time-stocks',
    title: 'Best Time to Buy and Sell Stock',
    topic: 'arrays',
    difficulty: 'easy',
    companies: ['Amazon', 'Google', 'ZOHO', 'Infosys'],
    pattern: 'Greedy / Single Pass',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a stock on the \`i-th\` day.\n\nYou want to maximize your profit by choosing a single day to buy and a single day in the future to sell. Return the maximum profit. If you cannot achieve any profit, return 0.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6), profit = 5' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'Prices only decrease, no profit possible' },
    ],
    approach: `**Pattern: Track minimum so far + max profit**

1. Initialize \`min_price = infinity\`, \`max_profit = 0\`
2. For each price:
   - Update \`min_price = min(min_price, price)\`
   - Update \`max_profit = max(max_profit, price - min_price)\`
3. Return \`max_profit\`

**Key insight:** At each day, the best we can do is sell at today's price having bought at the lowest price seen so far.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `def max_profit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)

    return max_profit

print(max_profit([7, 1, 5, 3, 6, 4]))  # 5
print(max_profit([7, 6, 4, 3, 1]))      # 0`,
    starterCode: `def max_profit(prices: list[int]) -> int:
    # Your solution here
    pass

print(max_profit([7, 1, 5, 3, 6, 4]))  # Expected: 5`,
    testCases: [
      { input: '[7,1,5,3,6,4]', expected: '5' },
      { input: '[7,6,4,3,1]', expected: '0' },
      { input: '[1,2]', expected: '1' },
    ],
  },
  {
    id: 'max-subarray',
    title: "Maximum Subarray (Kadane's Algorithm)",
    topic: 'arrays',
    difficulty: 'medium',
    companies: ['Google', 'Microsoft', 'Amazon', 'Adobe'],
    pattern: "Kadane's / DP",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum = 6' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    approach: `**Kadane's Algorithm: Greedy DP in O(n)**

At each position, decide: "is it better to extend the current subarray or start fresh?"

- \`current_sum = max(num, current_sum + num)\`
- \`max_sum = max(max_sum, current_sum)\`

If \`current_sum\` goes negative, we're better off starting fresh from the next element.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `def max_subarray(nums: list[int]) -> int:
    current_sum = nums[0]
    max_sum = nums[0]

    for num in nums[1:]:
        # Either extend existing subarray or start fresh
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6
print(max_subarray([5, 4, -1, 7, 8]))                   # 23`,
    starterCode: `def max_subarray(nums: list[int]) -> int:
    # Your solution here
    pass

print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6`,
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
      { input: '[1]', expected: '1' },
      { input: '[5,4,-1,7,8]', expected: '23' },
    ],
  },
  // ─── SLIDING WINDOW ───
  {
    id: 'longest-substring-no-repeat',
    title: 'Longest Substring Without Repeating Characters',
    topic: 'sliding-window',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'ZOHO', 'Adobe'],
    pattern: 'Sliding Window + HashMap',
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '"abc" is the longest substring without repeating chars' },
      { input: 's = "bbbbb"', output: '1', explanation: '"b" is the longest' },
      { input: 's = "pwwkew"', output: '3', explanation: '"wke" is the longest' },
    ],
    approach: `**Pattern: Sliding Window with character index tracking**

- Use a hashmap \`char_index\` to store the last seen index of each character
- \`left\` pointer marks start of current window
- When we see a repeated char, jump \`left\` past its last occurrence
- Track max window size throughout`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m,n)) where m = charset size',
    solution: `def length_of_longest_substring(s: str) -> int:
    char_index = {}  # char -> last seen index
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        # If char seen and its last occurrence is within our window
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1

        char_index[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len

print(length_of_longest_substring("abcabcbb"))  # 3
print(length_of_longest_substring("bbbbb"))      # 1
print(length_of_longest_substring("pwwkew"))     # 3`,
    starterCode: `def length_of_longest_substring(s: str) -> int:
    # Your solution here
    pass

print(length_of_longest_substring("abcabcbb"))  # Expected: 3`,
    testCases: [
      { input: '"abcabcbb"', expected: '3' },
      { input: '"bbbbb"', expected: '1' },
      { input: '"pwwkew"', expected: '3' },
    ],
  },
  // ─── TWO POINTERS ───
  {
    id: 'container-with-water',
    title: 'Container With Most Water',
    topic: 'two-pointers',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Bloomberg'],
    pattern: 'Two Pointers (Greedy)',
    description: `You are given an integer array \`height\` of length n. There are n vertical lines drawn such that the two endpoints of the ith line are at (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 (h=8) and 8 (h=7), width=7, min(8,7)=7, area=49' },
    ],
    approach: `**Two Pointers: always move the shorter side inward**

- Start with left=0, right=n-1 (widest possible)
- Area = min(height[left], height[right]) * (right - left)
- Move the pointer with the smaller height inward
- Why? Moving the taller side can only decrease width without guaranteeing a taller min

This greedy choice is correct because the current area is the best we can do for the current shorter bar.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        water = min(height[left], height[right]) * width
        max_water = max(max_water, water)

        # Move the shorter bar — it's the bottleneck
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water

print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # 49`,
    starterCode: `def max_area(height: list[int]) -> int:
    # Your solution here
    pass

print(max_area([1,8,6,2,5,4,8,3,7]))  # Expected: 49`,
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expected: '49' },
      { input: '[1,1]', expected: '1' },
    ],
  },
  // ─── TREES ───
  {
    id: 'max-depth-tree',
    title: 'Maximum Depth of Binary Tree',
    topic: 'trees',
    difficulty: 'easy',
    companies: ['Amazon', 'Microsoft', 'Google', 'ZOHO'],
    pattern: 'Tree DFS (Recursion)',
    description: `Given the root of a binary tree, return its maximum depth.\n\nThe maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' },
    ],
    approach: `**Recursive DFS: depth = 1 + max(left_depth, right_depth)**

Base case: None node → depth 0
Recursive case: max depth of left and right subtrees + 1 for current node

This is the classic "trust the recursion" pattern — believe that recursive calls return correct answers.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) where h is tree height',
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root: TreeNode | None) -> int:
    if root is None:
        return 0

    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)

    return 1 + max(left_depth, right_depth)

# Build tree: [3,9,20,null,null,15,7]
root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20, TreeNode(15), TreeNode(7))
print(max_depth(root))  # 3`,
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root) -> int:
    # Your solution here
    pass`,
    testCases: [
      { input: 'Tree [3,9,20,null,null,15,7]', expected: '3' },
      { input: 'Tree [1,null,2]', expected: '2' },
    ],
  },
  {
    id: 'level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    topic: 'trees',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'TCS'],
    pattern: 'BFS with Queue',
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
    ],
    approach: `**BFS using a queue — process level by level**

1. Start with root in queue
2. At each level: record current queue size (= nodes at this level)
3. Process exactly that many nodes, adding their children to queue
4. Collect each level's values

The "snapshot queue size" trick is the key — it lets us know when one level ends.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def level_order(root) -> list[list[int]]:
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)  # snapshot: how many nodes at this level
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)

        result.append(level)

    return result

root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(level_order(root))  # [[3], [9, 20], [15, 7]]`,
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def level_order(root) -> list[list[int]]:
    # Your solution here
    pass`,
    testCases: [
      { input: 'Tree [3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' },
    ],
  },
  // ─── GRAPHS ───
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    topic: 'graphs',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'Adobe'],
    pattern: 'DFS / BFS on Grid',
    description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: '1',
      },
    ],
    approach: `**DFS "flood fill" — sink islands as we find them**

1. Iterate every cell
2. When we find '1' (land): increment island count, then DFS to mark all connected land as '0' (visited)
3. This way each island is counted exactly once

The DFS explores all 4 directions (up, down, left, right) recursively.`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n) recursion stack',
    solution: `def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        # Out of bounds or water — stop
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # sink this land (mark visited)
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)

    return count

grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
print(num_islands(grid))  # 3`,
    starterCode: `def num_islands(grid: list[list[str]]) -> int:
    # Your solution here
    pass`,
    testCases: [
      { input: '[["1","1","0"],["1","0","0"],["0","0","1"]]', expected: '2' },
    ],
  },
  // ─── DP ───
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    topic: 'dp',
    difficulty: 'easy',
    companies: ['Amazon', 'Google', 'TCS', 'ZOHO', 'Infosys'],
    pattern: 'Dynamic Programming (Fibonacci pattern)',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' },
    ],
    approach: `**This IS Fibonacci!**

To reach step n, you came from either step n-1 (took 1 step) or step n-2 (took 2 steps).
So: \`ways(n) = ways(n-1) + ways(n-2)\`

Base cases: ways(1) = 1, ways(2) = 2

We only need the last two values — O(1) space solution.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n

    prev2, prev1 = 1, 2  # ways to reach step 1, step 2

    for _ in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

for i in range(1, 7):
    print(f"n={i}: {climb_stairs(i)}")
# n=1:1, n=2:2, n=3:3, n=4:5, n=5:8, n=6:13`,
    starterCode: `def climb_stairs(n: int) -> int:
    # Your solution here
    pass

print(climb_stairs(3))  # Expected: 3`,
    testCases: [
      { input: 'n=2', expected: '2' },
      { input: 'n=3', expected: '3' },
      { input: 'n=5', expected: '8' },
    ],
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    topic: 'dp',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe'],
    pattern: '2D Dynamic Programming',
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence is a sequence derived from the string by deleting some characters without changing the relative order of the remaining characters.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'LCS is "ace"' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3' },
    ],
    approach: `**2D DP Table**

Build \`dp[i][j]\` = LCS length of \`text1[:i]\` and \`text2[:j]\`

- If chars match: \`dp[i][j] = dp[i-1][j-1] + 1\`
- If they don't: \`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`

Think of it as: at each pair of characters, either they contribute to LCS or we skip one of them.`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    solution: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    # dp[i][j] = LCS of text1[:i] and text2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

print(longest_common_subsequence("abcde", "ace"))  # 3
print(longest_common_subsequence("abc", "abc"))     # 3
print(longest_common_subsequence("abc", "def"))     # 0`,
    starterCode: `def longest_common_subsequence(text1: str, text2: str) -> int:
    # Your solution here
    pass

print(longest_common_subsequence("abcde", "ace"))  # Expected: 3`,
    testCases: [
      { input: '"abcde", "ace"', expected: '3' },
      { input: '"abc", "abc"', expected: '3' },
      { input: '"abc", "def"', expected: '0' },
    ],
  },
  // ─── HEAP ───
  {
    id: 'kth-largest',
    title: 'Kth Largest Element in an Array',
    topic: 'heap',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'],
    pattern: 'Min-Heap of size K',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.`,
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    approach: `**Min-Heap of size K**

Maintain a min-heap of the K largest elements seen so far.
- The root (minimum) of this heap is the Kth largest overall.
- If heap size > K, pop the smallest.

This is O(n log k) — better than sorting O(n log n) when k is small.`,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    solution: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    # Min-heap of size k
    heap = []

    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # remove the smallest

    return heap[0]  # smallest of k largest = kth largest

print(find_kth_largest([3, 2, 1, 5, 6, 4], 2))          # 5
print(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)) # 4`,
    starterCode: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    # Your solution here
    pass

print(find_kth_largest([3,2,1,5,6,4], 2))  # Expected: 5`,
    testCases: [
      { input: '[3,2,1,5,6,4], k=2', expected: '5' },
      { input: '[3,2,3,1,2,4,5,5,6], k=4', expected: '4' },
    ],
  },
  // ─── BACKTRACKING ───
  {
    id: 'subsets',
    title: 'Subsets (Power Set)',
    topic: 'recursion',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft'],
    pattern: 'Backtracking / Recursion',
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.`,
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
    ],
    approach: `**Backtracking: at each element, choose to include or exclude**

For each index, we make a binary choice: include this number or not.
This naturally produces all 2^n subsets.

The backtrack function explores both paths (include/exclude) and backtracks by removing the last element after exploring.`,
    timeComplexity: 'O(n × 2^n)',
    spaceComplexity: 'O(n × 2^n)',
    solution: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start: int, current: list[int]):
        result.append(current[:])  # snapshot of current subset

        for i in range(start, len(nums)):
            current.append(nums[i])    # include nums[i]
            backtrack(i + 1, current)  # explore further
            current.pop()              # backtrack: exclude nums[i]

    backtrack(0, [])
    return result

print(subsets([1, 2, 3]))
# [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`,
    starterCode: `def subsets(nums: list[int]) -> list[list[int]]:
    # Your solution here
    pass

print(subsets([1,2,3]))`,
    testCases: [
      { input: '[1,2,3]', expected: '8 subsets total' },
      { input: '[0]', expected: '[[],[0]]' },
    ],
  },

  // ─── NEW EASY PROBLEMS ───
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    topic: 'arrays',
    difficulty: 'easy',
    companies: ['Amazon', 'Microsoft', 'Google', 'TCS', 'Infosys'],
    pattern: 'HashSet Lookup',
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: '1 appears twice' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
    ],
    approach: `Use a HashSet. For each number, if it already exists in the set return true, otherwise add it. O(n) time O(n) space.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `def contains_duplicate(nums: list[int]) -> bool:
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False`,
    starterCode: `def contains_duplicate(nums: list[int]) -> bool:
    # Your solution here
    pass

print(contains_duplicate([1,2,3,1]))  # Expected: True`,
    testCases: [
      { input: '[1,2,3,1]', expected: 'True' },
      { input: '[1,2,3,4]', expected: 'False' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expected: 'True' },
    ],
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    topic: 'hashmaps',
    difficulty: 'easy',
    companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'ZOHO'],
    pattern: 'Character Frequency Count',
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    approach: `Count character frequencies using a hashmap. If lengths differ, return false immediately. Compare frequency maps.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) (fixed alphabet size)',
    solution: `from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)

print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False`,
    starterCode: `def is_anagram(s: str, t: str) -> bool:
    # Your solution here
    pass

print(is_anagram("anagram", "nagaram"))  # Expected: True`,
    testCases: [
      { input: '"anagram", "nagaram"', expected: 'True' },
      { input: '"rat", "car"', expected: 'False' },
      { input: '"a", "a"', expected: 'True' },
    ],
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    topic: 'stack-queue',
    difficulty: 'easy',
    companies: ['Google', 'Amazon', 'Microsoft', 'Bloomberg', 'Adobe'],
    pattern: 'Stack Matching',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    approach: `Use a stack. Push opening brackets. On closing bracket, check if stack top matches. If stack is empty at end, valid.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)

    return not stack

print(is_valid("()"))      # True
print(is_valid("()[]{}"))  # True
print(is_valid("(]"))      # False`,
    starterCode: `def is_valid(s: str) -> bool:
    # Your solution here
    pass

print(is_valid("()[]{}"))  # Expected: True`,
    testCases: [
      { input: '"()"', expected: 'True' },
      { input: '"()[]{}"', expected: 'True' },
      { input: '"(]"', expected: 'False' },
    ],
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    topic: 'linked-list',
    difficulty: 'easy',
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Adobe'],
    pattern: 'Iterative Pointer Reversal',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
    ],
    approach: `Use three pointers: prev=None, curr=head, next. Iterate: save next, point curr.next to prev, advance both. Return prev.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head

    while curr:
        next_node = curr.next  # save next
        curr.next = prev       # reverse pointer
        prev = curr            # advance prev
        curr = next_node       # advance curr

    return prev

# Build 1->2->3->4->5
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
result = reverse_list(head)
vals = []
while result:
    vals.append(result.val)
    result = result.next
print(vals)  # [5, 4, 3, 2, 1]`,
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # Your solution here
    pass`,
    testCases: [
      { input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: '[1,2]', expected: '[2,1]' },
      { input: '[]', expected: '[]' },
    ],
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    topic: 'binary-search',
    difficulty: 'easy',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Bloomberg'],
    pattern: 'Classic Binary Search',
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists at index 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
    approach: `Classic binary search. left=0, right=len-1. While left<=right: mid=(left+right)//2. If nums[mid]==target return mid. If less, left=mid+1. If greater, right=mid-1.`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    solution: `def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

print(search([-1, 0, 3, 5, 9, 12], 9))  # 4
print(search([-1, 0, 3, 5, 9, 12], 2))  # -1`,
    starterCode: `def search(nums: list[int], target: int) -> int:
    # Your solution here
    pass

print(search([-1,0,3,5,9,12], 9))  # Expected: 4`,
    testCases: [
      { input: '[-1,0,3,5,9,12], target=9', expected: '4' },
      { input: '[-1,0,3,5,9,12], target=2', expected: '-1' },
      { input: '[5], target=5', expected: '0' },
    ],
  },
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    topic: 'trees',
    difficulty: 'easy',
    companies: ['Google', 'Amazon', 'Apple', 'Microsoft', 'ZOHO'],
    pattern: 'Tree DFS Recursion',
    description: `Given the root of a binary tree, invert the tree, and return its root. Inverting means swapping left and right children at every node.`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
    ],
    approach: `Recursively swap left and right children at each node. Base case: null node returns null. Post-order: invert subtrees then swap.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    if root is None:
        return None

    # Swap children
    root.left, root.right = root.right, root.left

    # Recursively invert subtrees
    invert_tree(root.left)
    invert_tree(root.right)

    return root

root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7, TreeNode(6), TreeNode(9)))
invert_tree(root)
print(root.val, root.left.val, root.right.val)  # 4 7 2`,
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    # Your solution here
    pass`,
    testCases: [
      { input: 'Tree [4,2,7,1,3,6,9]', expected: '[4,7,2,9,6,3,1]' },
      { input: 'Tree [2,1,3]', expected: '[2,3,1]' },
    ],
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    topic: 'dp',
    difficulty: 'easy',
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'TCS'],
    pattern: 'Dynamic Programming (Linear)',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems connected — you cannot rob two adjacent houses. Given an integer array nums, return the maximum amount you can rob tonight without alerting the police.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (1) then house 3 (3)' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob houses 1, 3, 5: 2+9+1=12' },
    ],
    approach: `DP where dp[i] = max money robbing up to house i. dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Space-optimized to O(1).`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `def rob(nums: list[int]) -> int:
    if len(nums) == 1:
        return nums[0]

    prev2, prev1 = 0, 0

    for num in nums:
        current = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = current

    return prev1

print(rob([1, 2, 3, 1]))    # 4
print(rob([2, 7, 9, 3, 1])) # 12`,
    starterCode: `def rob(nums: list[int]) -> int:
    # Your solution here
    pass

print(rob([1,2,3,1]))  # Expected: 4`,
    testCases: [
      { input: '[1,2,3,1]', expected: '4' },
      { input: '[2,7,9,3,1]', expected: '12' },
      { input: '[5]', expected: '5' },
    ],
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    topic: 'linked-list',
    difficulty: 'easy',
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'TCS'],
    pattern: 'Merge with Dummy Node',
    description: `You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. Return the head of the merged linked list.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
    ],
    approach: `Use a dummy head node to simplify edge cases. Compare heads of both lists, attach the smaller node, advance that pointer. Attach remaining list at end.`,
    timeComplexity: 'O(m+n)',
    spaceComplexity: 'O(1)',
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    dummy = ListNode(0)
    curr = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next

    curr.next = list1 if list1 else list2
    return dummy.next

l1 = ListNode(1, ListNode(2, ListNode(4)))
l2 = ListNode(1, ListNode(3, ListNode(4)))
result = merge_two_lists(l1, l2)
vals = []
while result:
    vals.append(result.val)
    result = result.next
print(vals)  # [1, 1, 2, 3, 4, 4]`,
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    # Your solution here
    pass`,
    testCases: [
      { input: '[1,2,4] and [1,3,4]', expected: '[1,1,2,3,4,4]' },
      { input: '[] and []', expected: '[]' },
      { input: '[] and [0]', expected: '[0]' },
    ],
  },
  {
    id: 'first-bad-version',
    title: 'First Bad Version',
    topic: 'binary-search',
    difficulty: 'easy',
    companies: ['Facebook', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    pattern: 'Binary Search on Answer Space',
    description: `You are a product manager and currently leading a team to develop a new product. The versions are labeled 1 through n. You have an API isBadVersion(version) that returns whether version is bad. Find the first bad version that causes all following ones to be bad. Minimize calls to the API.`,
    examples: [
      { input: 'n = 5, bad = 4', output: '4', explanation: 'isBadVersion(3)=false, isBadVersion(4)=true, so 4 is the first bad' },
      { input: 'n = 1, bad = 1', output: '1' },
    ],
    approach: `Binary search on the version space. If mid is bad, answer could be mid or earlier (right=mid). If mid is good, answer is after mid (left=mid+1). Loop until left==right.`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    solution: `def first_bad_version(n: int, bad: int) -> int:
    # Simulated API
    def is_bad_version(version: int) -> bool:
        return version >= bad

    left, right = 1, n

    while left < right:
        mid = (left + right) // 2
        if is_bad_version(mid):
            right = mid  # might be the first bad, search left
        else:
            left = mid + 1  # definitely not bad, search right

    return left

print(first_bad_version(5, 4))  # 4
print(first_bad_version(1, 1))  # 1`,
    starterCode: `def first_bad_version(n: int) -> int:
    # isBadVersion(version) -> bool is available as API
    # Your solution here
    pass

print(first_bad_version(5))  # Expected: 4 (assuming bad=4)`,
    testCases: [
      { input: 'n=5, bad=4', expected: '4' },
      { input: 'n=1, bad=1', expected: '1' },
      { input: 'n=10, bad=7', expected: '7' },
    ],
  },
  {
    id: 'flood-fill',
    title: 'Flood Fill',
    topic: 'graphs',
    difficulty: 'easy',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Apple'],
    pattern: 'DFS on Grid',
    description: `You are given an image represented by an m x n integer grid where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. Perform a flood fill starting from the pixel image[sr][sc]: change that pixel and all connected pixels of the same original color to color.`,
    examples: [
      { input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2', output: '[[2,2,2],[2,2,0],[2,0,1]]' },
      { input: 'image = [[0,0,0],[0,0,0]], sr=0, sc=0, color=0', output: '[[0,0,0],[0,0,0]]' },
    ],
    approach: `DFS from (sr,sc). Record original color. If already target color, return. Recursively fill all 4-directional neighbors with same original color.`,
    timeComplexity: 'O(m*n)',
    spaceComplexity: 'O(m*n)',
    solution: `def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
    original_color = image[sr][sc]

    if original_color == color:
        return image

    rows, cols = len(image), len(image[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if image[r][c] != original_color:
            return
        image[r][c] = color
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)

    dfs(sr, sc)
    return image

print(flood_fill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2))
# [[2,2,2],[2,2,0],[2,0,1]]`,
    starterCode: `def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
    # Your solution here
    pass

print(flood_fill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2))`,
    testCases: [
      { input: '[[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2', expected: '[[2,2,2],[2,2,0],[2,0,1]]' },
      { input: '[[0,0,0],[0,0,0]], sr=0, sc=0, color=0', expected: '[[0,0,0],[0,0,0]]' },
    ],
  },

  // ─── NEW MEDIUM PROBLEMS ───
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    topic: 'hashmaps',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Adobe'],
    pattern: 'HashMap with Sorted Key',
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
    ],
    approach: `Use sorted string as HashMap key. All anagrams sort to the same key. Group strings by their sorted version.`,
    timeComplexity: 'O(n * k log k) where k is max string length',
    spaceComplexity: 'O(n*k)',
    solution: `from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)

    for s in strs:
        key = ''.join(sorted(s))  # sorted string as key
        groups[key].append(s)

    return list(groups.values())

print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))`,
    starterCode: `def group_anagrams(strs: list[str]) -> list[list[str]]:
    # Your solution here
    pass

print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))`,
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: '3 groups' },
      { input: '[""]', expected: '[[""]]' },
      { input: '["a"]', expected: '[["a"]]' },
    ],
  },
  {
    id: 'three-sum',
    title: '3Sum',
    topic: 'two-pointers',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Bloomberg'],
    pattern: 'Sort + Two Pointers',
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.`,
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    approach: `Sort array. Fix first element, use two pointers for remaining pair. Skip duplicates at each level. If sum < 0, left++. If sum > 0, right--. If ==0, record and skip duplicates.`,
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    solution: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # skip duplicate first elements

        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result

print(three_sum([-1, 0, 1, 2, -1, -4]))  # [[-1,-1,2],[-1,0,1]]`,
    starterCode: `def three_sum(nums: list[int]) -> list[list[int]]:
    # Your solution here
    pass

print(three_sum([-1,0,1,2,-1,-4]))`,
    testCases: [
      { input: '[-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
      { input: '[0,0,0]', expected: '[[0,0,0]]' },
      { input: '[0,1,1]', expected: '[]' },
    ],
  },
  {
    id: 'min-stack',
    title: 'Min Stack',
    topic: 'stack-queue',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft', 'Adobe'],
    pattern: 'Auxiliary Stack',
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class with push(val), pop(), top(), and getMin() all in O(1).`,
    examples: [
      { input: 'MinStack ops: push(-2),push(0),push(-3),getMin(),pop(),top(),getMin()', output: '-3, 0, -2' },
    ],
    approach: `Maintain two stacks: main stack and min_stack. min_stack tracks the minimum at each state. Push to both; min_stack pushes current min. Pop both simultaneously.`,
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(n)',
    solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # tracks min at each state

    def push(self, val: int) -> None:
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def get_min(self) -> int:
        return self.min_stack[-1]

ms = MinStack()
ms.push(-2); ms.push(0); ms.push(-3)
print(ms.get_min())  # -3
ms.pop()
print(ms.top())      # 0
print(ms.get_min())  # -2`,
    starterCode: `class MinStack:
    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def get_min(self) -> int:
        pass`,
    testCases: [
      { input: 'push(-2),push(0),push(-3),getMin()', expected: '-3' },
      { input: 'push(-2),push(0),push(-3),getMin(),pop(),top()', expected: '-3 then 0' },
      { input: 'push(1),push(2),getMin()', expected: '1' },
    ],
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    topic: 'binary-search',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Apple'],
    pattern: 'Modified Binary Search',
    description: `There is an integer array nums sorted in ascending order (with distinct values) that has been rotated at some pivot. Given nums and a target, return the index of target or -1 if not found.`,
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
    ],
    approach: `Modified binary search. Determine which half is sorted by comparing nums[mid] to nums[left]. If target is in the sorted half, search there. Otherwise search the other half.`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    solution: `def search_rotated(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

print(search_rotated([4,5,6,7,0,1,2], 0))  # 4
print(search_rotated([4,5,6,7,0,1,2], 3))  # -1`,
    starterCode: `def search_rotated(nums: list[int], target: int) -> int:
    # Your solution here
    pass

print(search_rotated([4,5,6,7,0,1,2], 0))  # Expected: 4`,
    testCases: [
      { input: '[4,5,6,7,0,1,2], target=0', expected: '4' },
      { input: '[4,5,6,7,0,1,2], target=3', expected: '-1' },
      { input: '[1], target=0', expected: '-1' },
    ],
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    topic: 'graphs',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
    pattern: 'Topological Sort / Cycle Detection',
    description: `There are numCourses labeled 0 to numCourses-1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates you must take course bi first to take ai. Return true if you can finish all courses.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Cycle detected' },
    ],
    approach: `Build adjacency list. DFS cycle detection with 3 states: 0=unvisited, 1=visiting (in current path), 2=visited. If we visit a node with state 1, cycle exists.`,
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V+E)',
    solution: `def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    graph = [[] for _ in range(num_courses)]
    for course, prereq in prerequisites:
        graph[course].append(prereq)

    # 0=unvisited, 1=visiting, 2=done
    state = [0] * num_courses

    def has_cycle(node):
        if state[node] == 1:
            return True   # cycle!
        if state[node] == 2:
            return False  # already processed

        state[node] = 1  # mark as visiting
        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True
        state[node] = 2  # mark as done
        return False

    return not any(has_cycle(c) for c in range(num_courses))

print(can_finish(2, [[1,0]]))        # True
print(can_finish(2, [[1,0],[0,1]]))  # False`,
    starterCode: `def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    # Your solution here
    pass

print(can_finish(2, [[1,0]]))  # Expected: True`,
    testCases: [
      { input: 'numCourses=2, [[1,0]]', expected: 'True' },
      { input: 'numCourses=2, [[1,0],[0,1]]', expected: 'False' },
      { input: 'numCourses=1, []', expected: 'True' },
    ],
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    topic: 'heap',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft', 'Bloomberg'],
    pattern: 'HashMap + Min-Heap',
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    approach: `Count frequencies with Counter. Use a min-heap of size k. Push (freq, num) pairs. Heap maintains top-k frequent. Or use bucket sort for O(n).`,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(n)',
    solution: `import heapq
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)

    # Min-heap: keep k largest frequencies
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for freq, num in heap]

print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]
print(top_k_frequent([1], 1))             # [1]`,
    starterCode: `def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Your solution here
    pass

print(top_k_frequent([1,1,1,2,2,3], 2))  # Expected: [1, 2]`,
    testCases: [
      { input: '[1,1,1,2,2,3], k=2', expected: '[1,2]' },
      { input: '[1], k=1', expected: '[1]' },
      { input: '[1,2], k=2', expected: '[1,2]' },
    ],
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    topic: 'dp',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'TCS'],
    pattern: 'Unbounded Knapsack DP',
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins needed to make up that amount. If not possible, return -1.`,
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5+5+1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
    ],
    approach: `DP where dp[i] = min coins to make amount i. Initialize dp[0]=0, rest=infinity. For each amount, try every coin: dp[i] = min(dp[i], dp[i-coin]+1).`,
    timeComplexity: 'O(amount * n)',
    spaceComplexity: 'O(amount)',
    solution: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 0 coins for amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 2, 5], 11))  # 3
print(coin_change([2], 3))          # -1
print(coin_change([1], 0))          # 0`,
    starterCode: `def coin_change(coins: list[int], amount: int) -> int:
    # Your solution here
    pass

print(coin_change([1,2,5], 11))  # Expected: 3`,
    testCases: [
      { input: '[1,2,5], amount=11', expected: '3' },
      { input: '[2], amount=3', expected: '-1' },
      { input: '[1], amount=0', expected: '0' },
    ],
  },
  {
    id: 'combination-sum',
    title: 'Combination Sum',
    topic: 'recursion',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    pattern: 'Backtracking with Repetition',
    description: `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may use the same number unlimited times.`,
    examples: [
      { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
      { input: 'candidates = [2,3], target = 6', output: '[[2,2,2],[3,3]]' },
    ],
    approach: `Backtracking. At each step, try including current candidate (can reuse), recurse, then backtrack. Sort candidates to allow early termination.`,
    timeComplexity: 'O(n^(t/m)) where t=target m=min candidate',
    spaceComplexity: 'O(t/m)',
    solution: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    result = []
    candidates.sort()

    def backtrack(start: int, current: list[int], remaining: int):
        if remaining == 0:
            result.append(current[:])
            return

        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break  # sorted, no point continuing
            current.append(candidates[i])
            backtrack(i, current, remaining - candidates[i])  # reuse same index
            current.pop()

    backtrack(0, [], target)
    return result

print(combination_sum([2,3,6,7], 7))  # [[2,2,3],[7]]`,
    starterCode: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    # Your solution here
    pass

print(combination_sum([2,3,6,7], 7))`,
    testCases: [
      { input: '[2,3,6,7], target=7', expected: '[[2,2,3],[7]]' },
      { input: '[2,3], target=6', expected: '[[2,2,2],[3,3]]' },
      { input: '[2], target=1', expected: '[]' },
    ],
  },
  {
    id: 'max-product-subarray',
    title: 'Maximum Product Subarray',
    topic: 'arrays',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Apple'],
    pattern: "Kadane's Variant",
    description: `Given an integer array nums, find a subarray that has the largest product, and return the product. The test cases are generated so that the answer will fit in a 32-bit integer.`,
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6', explanation: '[2,3] has largest product 6' },
      { input: 'nums = [-2,0,-1]', output: '0' },
    ],
    approach: `Track both max and min products ending at current position (negative * negative = positive). At each step: max_prod = max(num, max_prod*num, min_prod*num), similarly for min.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `def max_product(nums: list[int]) -> int:
    max_prod = min_prod = result = nums[0]

    for num in nums[1:]:
        candidates = (num, max_prod * num, min_prod * num)
        max_prod = max(candidates)
        min_prod = min(candidates)
        result = max(result, max_prod)

    return result

print(max_product([2, 3, -2, 4]))   # 6
print(max_product([-2, 0, -1]))      # 0
print(max_product([-2, 3, -4]))      # 24`,
    starterCode: `def max_product(nums: list[int]) -> int:
    # Your solution here
    pass

print(max_product([2,3,-2,4]))  # Expected: 6`,
    testCases: [
      { input: '[2,3,-2,4]', expected: '6' },
      { input: '[-2,0,-1]', expected: '0' },
      { input: '[-2,3,-4]', expected: '24' },
    ],
  },
  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    topic: 'trees',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Bloomberg'],
    pattern: 'DFS with Range Bounds',
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST has every node's left subtree containing only nodes with values less than the node's value, and right subtree only greater values.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Root is 5 but right child is 4 which is less' },
    ],
    approach: `DFS passing valid range [min_val, max_val] for each node. Root can be any value. Left child must be < current node, right child must be > current node. Propagate bounds downward.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root) -> bool:
    def validate(node, min_val, max_val):
        if node is None:
            return True
        if not (min_val < node.val < max_val):
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))

root1 = TreeNode(2, TreeNode(1), TreeNode(3))
print(is_valid_bst(root1))  # True

root2 = TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))
print(is_valid_bst(root2))  # False`,
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root) -> bool:
    # Your solution here
    pass`,
    testCases: [
      { input: 'Tree [2,1,3]', expected: 'True' },
      { input: 'Tree [5,1,4,null,null,3,6]', expected: 'False' },
      { input: 'Tree [1]', expected: 'True' },
    ],
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    topic: 'linked-list',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
    pattern: "Floyd's Cycle Detection",
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it. Return true if there is a cycle, false otherwise.`,
    examples: [
      { input: 'head = [3,2,0,-4], pos=1 (tail connects to node at index 1)', output: 'true' },
      { input: 'head = [1,2], pos=0', output: 'true' },
      { input: 'head = [1], pos=-1', output: 'false' },
    ],
    approach: `Floyd's tortoise and hare algorithm. slow pointer moves 1 step, fast pointer moves 2 steps. If they meet, there's a cycle. If fast reaches null, no cycle.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head) -> bool:
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True

    return False

# Test: no cycle
n1 = ListNode(3); n2 = ListNode(2); n3 = ListNode(0); n4 = ListNode(-4)
n1.next = n2; n2.next = n3; n3.next = n4
print(has_cycle(n1))  # False

# Test: cycle
n4.next = n2  # creates cycle
print(has_cycle(n1))  # True`,
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head) -> bool:
    # Your solution here
    pass`,
    testCases: [
      { input: '[3,2,0,-4] with cycle at pos 1', expected: 'True' },
      { input: '[1,2] with cycle at pos 0', expected: 'True' },
      { input: '[1] no cycle', expected: 'False' },
    ],
  },

  // ─── NEW HARD PROBLEMS ───
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    topic: 'two-pointers',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
    pattern: 'Two Pointers',
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    approach: `Two pointers from both ends. Track max_left and max_right. Water at position i = min(max_left, max_right) - height[i]. Move the pointer with smaller max inward.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    solution: `def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_left = max_right = 0
    water = 0

    while left < right:
        if height[left] <= height[right]:
            if height[left] >= max_left:
                max_left = height[left]
            else:
                water += max_left - height[left]
            left += 1
        else:
            if height[right] >= max_right:
                max_right = height[right]
            else:
                water += max_right - height[right]
            right -= 1

    return water

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6
print(trap([4,2,0,3,2,5]))               # 9`,
    starterCode: `def trap(height: list[int]) -> int:
    # Your solution here
    pass

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # Expected: 6`,
    testCases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
      { input: '[4,2,0,3,2,5]', expected: '9' },
      { input: '[3,0,2,0,4]', expected: '7' },
    ],
  },
  {
    id: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    topic: 'sliding-window',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Uber', 'Microsoft', 'Bloomberg'],
    pattern: 'Monotonic Deque',
    description: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. Return the max sliding window — the maximum values in each window position.`,
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    approach: `Monotonic deque stores indices in decreasing order of values. Remove indices outside window from front. Remove smaller elements from back (they can never be max). Front is always current max.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    solution: `from collections import deque

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq = deque()  # stores indices, decreasing values
    result = []

    for i, num in enumerate(nums):
        # Remove indices outside current window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove indices with smaller values (they can't be max)
        while dq and nums[dq[-1]] < num:
            dq.pop()

        dq.append(i)

        # Start recording results after first full window
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))  # [3,3,5,5,6,7]`,
    starterCode: `def max_sliding_window(nums: list[int], k: int) -> list[int]:
    # Your solution here
    pass

print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))  # Expected: [3,3,5,5,6,7]`,
    testCases: [
      { input: '[1,3,-1,-3,5,3,6,7], k=3', expected: '[3,3,5,5,6,7]' },
      { input: '[1], k=1', expected: '[1]' },
      { input: '[1,-1], k=1', expected: '[1,-1]' },
    ],
  },
  {
    id: 'largest-rectangle-histogram',
    title: 'Largest Rectangle in Histogram',
    topic: 'stack-queue',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    pattern: 'Monotonic Stack',
    description: `Given an array of integers heights representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.`,
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10', explanation: 'Rectangle of height 5, width 2 starting at index 2' },
      { input: 'heights = [2,4]', output: '4' },
    ],
    approach: `Monotonic increasing stack stores indices. When current bar is shorter than stack top, pop and calculate area with popped height as the shortest bar. Width = current_index - stack_top - 1 (or current_index if stack empty).`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `def largest_rectangle_area(heights: list[int]) -> int:
    stack = []  # monotonic increasing stack of indices
    max_area = 0
    heights.append(0)  # sentinel to flush remaining stack

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    heights.pop()  # restore original
    return max_area

print(largest_rectangle_area([2,1,5,6,2,3]))  # 10
print(largest_rectangle_area([2,4]))            # 4`,
    starterCode: `def largest_rectangle_area(heights: list[int]) -> int:
    # Your solution here
    pass

print(largest_rectangle_area([2,1,5,6,2,3]))  # Expected: 10`,
    testCases: [
      { input: '[2,1,5,6,2,3]', expected: '10' },
      { input: '[2,4]', expected: '4' },
      { input: '[1,1]', expected: '2' },
    ],
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge K Sorted Lists',
    topic: 'heap',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Bloomberg'],
    pattern: 'Min-Heap Merge',
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
    ],
    approach: `Use a min-heap to always extract the smallest element across all lists. Push (value, list_index, node) tuples. Pop min, add to result, push next node from same list.`,
    timeComplexity: 'O(n log k) where n=total nodes k=lists',
    spaceComplexity: 'O(k)',
    solution: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists):
    heap = []

    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode(0)
    curr = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next

# Test
l1 = ListNode(1, ListNode(4, ListNode(5)))
l2 = ListNode(1, ListNode(3, ListNode(4)))
l3 = ListNode(2, ListNode(6))
result = merge_k_lists([l1, l2, l3])
vals = []
while result:
    vals.append(result.val)
    result = result.next
print(vals)  # [1, 1, 2, 3, 4, 4, 5, 6]`,
    starterCode: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists):
    # Your solution here
    pass`,
    testCases: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' },
      { input: '[]', expected: '[]' },
      { input: '[[]]', expected: '[]' },
    ],
  },
  {
    id: 'median-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    topic: 'binary-search',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    pattern: 'Binary Search on Partition',
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).`,
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0', explanation: 'Merged = [1,2,3], median is 2' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5' },
    ],
    approach: `Binary search on the smaller array to find the partition point. Ensure left halves of both arrays combined equal the right halves. Check partition validity with cross comparisons.`,
    timeComplexity: 'O(log(min(m,n)))',
    spaceComplexity: 'O(1)',
    solution: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    # Ensure nums1 is shorter
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    half = (m + n) // 2

    left, right = 0, m

    while left <= right:
        i = (left + right) // 2  # partition in nums1
        j = half - i              # partition in nums2

        max_left1 = float('-inf') if i == 0 else nums1[i-1]
        min_right1 = float('inf') if i == m else nums1[i]
        max_left2 = float('-inf') if j == 0 else nums2[j-1]
        min_right2 = float('inf') if j == n else nums2[j]

        if max_left1 <= min_right2 and max_left2 <= min_right1:
            if (m + n) % 2 == 1:
                return float(min(min_right1, min_right2))
            return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
        elif max_left1 > min_right2:
            right = i - 1
        else:
            left = i + 1

    return 0.0

print(find_median_sorted_arrays([1,3], [2]))    # 2.0
print(find_median_sorted_arrays([1,2], [3,4]))  # 2.5`,
    starterCode: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    # Your solution here
    pass

print(find_median_sorted_arrays([1,3], [2]))  # Expected: 2.0`,
    testCases: [
      { input: '[1,3] and [2]', expected: '2.0' },
      { input: '[1,2] and [3,4]', expected: '2.5' },
      { input: '[0,0] and [0,0]', expected: '0.0' },
    ],
  },
  {
    id: 'binary-tree-max-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    topic: 'trees',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
    pattern: 'DFS with Global Maximum',
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path does not need to pass through the root. Given the root of a binary tree, return the maximum path sum of any non-empty path.`,
    examples: [
      { input: 'root = [1,2,3]', output: '6', explanation: 'Path: 2->1->3' },
      { input: 'root = [-3]', output: '-3' },
    ],
    approach: `DFS returning max gain from each node (only going one direction). At each node, consider path through node = left_gain + node.val + right_gain. Update global max. Return node.val + max(left, right) gain.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_path_sum(root) -> int:
    max_sum = [float('-inf')]

    def dfs(node):
        if node is None:
            return 0

        # Only take positive gains
        left_gain = max(dfs(node.left), 0)
        right_gain = max(dfs(node.right), 0)

        # Path through this node
        path_sum = node.val + left_gain + right_gain
        max_sum[0] = max(max_sum[0], path_sum)

        # Return max single-side gain for parent
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return max_sum[0]

root = TreeNode(1, TreeNode(2), TreeNode(3))
print(max_path_sum(root))  # 6`,
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_path_sum(root) -> int:
    # Your solution here
    pass`,
    testCases: [
      { input: 'Tree [1,2,3]', expected: '6' },
      { input: 'Tree [-10,9,20,null,null,15,7]', expected: '42' },
      { input: 'Tree [-3]', expected: '-3' },
    ],
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    topic: 'graphs',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
    pattern: 'BFS on Implicit Graph',
    description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is: beginWord -> w1 -> w2 -> ... -> endWord, where adjacent words differ by exactly one letter. Return the number of words in the shortest transformation sequence, or 0 if no sequence exists.`,
    examples: [
      { input: 'beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'hit->hot->dot->dog->cog' },
      { input: 'beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log"]', output: '0' },
    ],
    approach: `BFS on word graph. At each step, try changing each character to every letter a-z. If new word is in wordList, add to queue. Track visited. Level = transformation count.`,
    timeComplexity: 'O(M^2 * N) where M=word length N=words',
    spaceComplexity: 'O(M^2 * N)',
    solution: `from collections import deque

def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    word_set = set(word_list)
    if end_word not in word_set:
        return 0

    queue = deque([(begin_word, 1)])
    visited = {begin_word}

    while queue:
        word, length = queue.popleft()

        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                new_word = word[:i] + c + word[i+1:]

                if new_word == end_word:
                    return length + 1

                if new_word in word_set and new_word not in visited:
                    visited.add(new_word)
                    queue.append((new_word, length + 1))

    return 0

print(ladder_length("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # 5`,
    starterCode: `def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    # Your solution here
    pass

print(ladder_length("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 5`,
    testCases: [
      { input: 'beginWord="hit", endWord="cog", ["hot","dot","dog","lot","log","cog"]', expected: '5' },
      { input: 'beginWord="hit", endWord="cog", ["hot","dot","dog","lot","log"]', expected: '0' },
    ],
  },
  {
    id: 'find-median-data-stream',
    title: 'Find Median from Data Stream',
    topic: 'heap',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Apple'],
    pattern: 'Two Heaps',
    description: `Design a data structure that supports adding integers from a data stream and finding the median of the current stream. Implement MedianFinder with addNum(num) and findMedian() -> float.`,
    examples: [
      { input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()', output: '1.5, 2.0' },
    ],
    approach: `Two heaps: max-heap for lower half, min-heap for upper half. Balance sizes so they differ by at most 1. Median = top of larger heap, or average of both tops if equal size.`,
    timeComplexity: 'O(log n) add O(1) find',
    spaceComplexity: 'O(n)',
    solution: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negate values)
        self.large = []  # min-heap

    def add_num(self, num: int) -> None:
        heapq.heappush(self.small, -num)

        # Balance: ensure small max <= large min
        if self.small and self.large and (-self.small[0] > self.large[0]):
            heapq.heappush(self.large, -heapq.heappop(self.small))

        # Balance sizes
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        elif len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def find_median(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0

mf = MedianFinder()
mf.add_num(1); mf.add_num(2)
print(mf.find_median())  # 1.5
mf.add_num(3)
print(mf.find_median())  # 2.0`,
    starterCode: `import heapq

class MedianFinder:
    def __init__(self):
        pass

    def add_num(self, num: int) -> None:
        pass

    def find_median(self) -> float:
        pass`,
    testCases: [
      { input: 'addNum(1),addNum(2),findMedian()', expected: '1.5' },
      { input: 'addNum(1),addNum(2),addNum(3),findMedian()', expected: '2.0' },
      { input: 'addNum(1),findMedian()', expected: '1.0' },
    ],
  },
  {
    id: 'regular-expression-matching',
    title: 'Regular Expression Matching',
    topic: 'dp',
    difficulty: 'hard',
    companies: ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Apple'],
    pattern: '2D Dynamic Programming',
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'. '.' matches any single character, '*' matches zero or more of the preceding element. The matching must cover the entire input string.`,
    examples: [
      { input: 's = "aa", p = "a*"', output: 'true' },
      { input: 's = "ab", p = ".*"', output: 'true' },
      { input: 's = "aa", p = "a"', output: 'false' },
    ],
    approach: `2D DP. dp[i][j] = does s[:i] match p[:j]? Base: dp[0][0]=True. For '*' pattern: dp[i][j] = dp[i][j-2] (zero occurrences) OR (match single + dp[i-1][j]).`,
    timeComplexity: 'O(m*n)',
    spaceComplexity: 'O(m*n)',
    solution: `def is_match(s: str, p: str) -> bool:
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True

    # Initialize: patterns like a*, a*b*, a*b*c* can match empty string
    for j in range(2, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-2]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                # Zero occurrences of preceding char
                dp[i][j] = dp[i][j-2]
                # One or more: preceding char matches s[i-1]
                if p[j-2] == '.' or p[j-2] == s[i-1]:
                    dp[i][j] = dp[i][j] or dp[i-1][j]
            elif p[j-1] == '.' or p[j-1] == s[i-1]:
                dp[i][j] = dp[i-1][j-1]

    return dp[m][n]

print(is_match("aa", "a*"))   # True
print(is_match("ab", ".*"))   # True
print(is_match("aa", "a"))    # False`,
    starterCode: `def is_match(s: str, p: str) -> bool:
    # Your solution here
    pass

print(is_match("aa", "a*"))  # Expected: True`,
    testCases: [
      { input: '"aa", "a*"', expected: 'True' },
      { input: '"ab", ".*"', expected: 'True' },
      { input: '"aa", "a"', expected: 'False' },
    ],
  },
  {
    id: 'n-queens',
    title: 'N-Queens',
    topic: 'recursion',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    pattern: 'Backtracking with Constraint Sets',
    description: `The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given n, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration of the n-queens placement, where 'Q' indicates a queen and '.' indicates an empty space.`,
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: 'n = 1', output: '[["Q"]]' },
    ],
    approach: `Backtrack row by row. Track occupied columns, diagonals (row-col), and anti-diagonals (row+col) using sets. Try each column, skip if any set contains current position. Add queen, recurse, remove queen.`,
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    solution: `def solve_n_queens(n: int) -> list[list[str]]:
    result = []
    queens = []  # col positions for each row
    cols = set()
    diag1 = set()  # row - col
    diag2 = set()  # row + col

    def backtrack(row):
        if row == n:
            board = ['.' * q + 'Q' + '.' * (n - q - 1) for q in queens]
            result.append(board)
            return

        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue

            queens.append(col)
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            backtrack(row + 1)
            queens.pop()
            cols.remove(col); diag1.remove(row-col); diag2.remove(row+col)

    backtrack(0)
    return result

solutions = solve_n_queens(4)
print(len(solutions))  # 2
for sol in solutions:
    print(sol)`,
    starterCode: `def solve_n_queens(n: int) -> list[list[str]]:
    # Your solution here
    pass

print(len(solve_n_queens(4)))  # Expected: 2`,
    testCases: [
      { input: 'n=4', expected: '2 solutions' },
      { input: 'n=1', expected: '[["Q"]]' },
      { input: 'n=8', expected: '92 solutions' },
    ],
  },
  {
    id: 'serialize-deserialize-tree',
    title: 'Serialize and Deserialize Binary Tree',
    topic: 'trees',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Facebook', 'Microsoft', 'Bloomberg'],
    pattern: 'BFS Serialization',
    description: `Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a tree to a string, deserialization converts the string back to the tree structure. There is no restriction on your algorithm — just ensure encode(decode(data)) == data.`,
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', explanation: 'Serialize then deserialize returns same tree' },
    ],
    approach: `BFS (level-order) serialization. Use a queue; serialize null nodes as "null". For deserialization, split by comma, use queue to reconstruct level by level.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def serialize(root) -> str:
    if not root:
        return "null"
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node:
            result.append(str(node.val))
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append("null")
    return ",".join(result)

def deserialize(data: str):
    if data == "null":
        return None
    vals = data.split(",")
    root = TreeNode(int(vals[0]))
    queue = deque([root])
    i = 1
    while queue and i < len(vals):
        node = queue.popleft()
        if vals[i] != "null":
            node.left = TreeNode(int(vals[i]))
            queue.append(node.left)
        i += 1
        if i < len(vals) and vals[i] != "null":
            node.right = TreeNode(int(vals[i]))
            queue.append(node.right)
        i += 1
    return root

root = TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4), TreeNode(5)))
serialized = serialize(root)
print(serialized)
restored = deserialize(serialized)
print(serialize(restored))  # same as original`,
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def serialize(root) -> str:
    # Your solution here
    pass

def deserialize(data: str):
    # Your solution here
    pass`,
    testCases: [
      { input: 'Tree [1,2,3,null,null,4,5]', expected: 'Serialize then deserialize returns same tree' },
      { input: 'Tree []', expected: 'null' },
      { input: 'Tree [1]', expected: '1' },
    ],
  },
  {
    id: 'reverse-nodes-k-group',
    title: 'Reverse Nodes in k-Group',
    topic: 'linked-list',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple'],
    pattern: 'Iterative Group Reversal',
    description: `Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes at the end should remain as is.`,
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
      { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' },
    ],
    approach: `Check if k nodes exist. If yes, reverse those k nodes, connect to result of recursive call on remaining. If less than k nodes remain, return head as-is.`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n/k) recursion stack',
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_k_group(head, k: int):
    # Check if k nodes exist
    count, node = 0, head
    while node and count < k:
        node = node.next
        count += 1

    if count < k:
        return head  # not enough nodes, return as-is

    # Reverse k nodes
    prev, curr = None, head
    for _ in range(k):
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node

    # head is now tail of reversed group
    # Recursively reverse next group and connect
    head.next = reverse_k_group(curr, k)

    return prev  # prev is new head

# Test: [1,2,3,4,5], k=2 -> [2,1,4,3,5]
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
result = reverse_k_group(head, 2)
vals = []
while result:
    vals.append(result.val)
    result = result.next
print(vals)  # [2, 1, 4, 3, 5]`,
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_k_group(head, k: int):
    # Your solution here
    pass`,
    testCases: [
      { input: '[1,2,3,4,5], k=2', expected: '[2,1,4,3,5]' },
      { input: '[1,2,3,4,5], k=3', expected: '[3,2,1,4,5]' },
      { input: '[1,2,3,4,5], k=1', expected: '[1,2,3,4,5]' },
    ],
  },
];
