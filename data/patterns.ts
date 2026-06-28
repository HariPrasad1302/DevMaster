export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PatternCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  order: number;
}

export interface PatternProblem {
  id: string;
  title: string;
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
}

export interface DSAPattern {
  id: string;
  number: number;
  name: string;
  categoryId: string;
  identify: string;
  sampleProblem: PatternProblem;
}

export const patternCategories: PatternCategory[] = [
  { id: 'array', name: 'Array Patterns', icon: '▦', color: '#7c6af7', order: 1 },
  { id: 'string', name: 'String Patterns', icon: 'Ⓢ', color: '#5eead4', order: 2 },
  { id: 'two-pointer', name: 'Two Pointer Patterns', icon: '⇄', color: '#f59e0b', order: 3 },
  { id: 'linked-list', name: 'Linked List Patterns', icon: '⟲', color: '#10b981', order: 4 },
  { id: 'stack', name: 'Stack Patterns', icon: '⫶', color: '#ef4444', order: 5 },
  { id: 'queue', name: 'Queue Patterns', icon: '⟹', color: '#8b5cf6', order: 6 },
  { id: 'binary-search', name: 'Binary Search Patterns', icon: '⌖', color: '#06b6d4', order: 7 },
  { id: 'recursion', name: 'Recursion & Backtracking', icon: '↺', color: '#f97316', order: 8 },
  { id: 'tree', name: 'Tree Patterns', icon: '⊛', color: '#84cc16', order: 9 },
  { id: 'heap', name: 'Heap Patterns', icon: '△', color: '#ec4899', order: 10 },
  { id: 'graph', name: 'Graph Patterns', icon: '⬡', color: '#14b8a6', order: 11 },
  { id: 'dp', name: 'Dynamic Programming', icon: '⊕', color: '#a855f7', order: 12 },
];

export const dsaPatterns: DSAPattern[] = [
  {
    id: 'two-sum-pattern',
    number: 1,
    name: 'Two Sum Pattern',
    categoryId: 'array',
    identify: 'Find two numbers satisfying a condition',
    sampleProblem: {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'easy',
      companies: ['Google', 'Amazon', 'Microsoft'],
      description:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'nums[0] + nums[1] = 2 + 7 = 9',
        },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
        { input: 'nums = [3,3], target = 6', output: '[0,1]' },
      ],
      approach:
        '**Two Sum Pattern**: Use a hash map to store each number and its index as you iterate. For each number, check if (target - number) exists in the map. If yes, return both indices. If no, store the current number.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solution: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
print(two_sum([2,7,11,15], 9))   # [0, 1]
print(two_sum([3,2,4], 6))       # [1, 2]
print(two_sum([3,3], 6))         # [0, 1]`,
      starterCode: `def two_sum(nums, target):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' },
        { input: 'nums = [3,2,4], target = 6', expected: '[1,2]' },
        { input: 'nums = [3,3], target = 6', expected: '[0,1]' },
      ],
    },
  },
  {
    id: 'prefix-sum',
    number: 2,
    name: 'Prefix Sum',
    categoryId: 'array',
    identify: 'Repeated range sum queries over subarrays',
    sampleProblem: {
      id: 'subarray-sum-equals-k',
      title: 'Subarray Sum Equals K',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Facebook'],
      description:
        'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.',
      examples: [
        { input: 'nums = [1,1,1], k = 2', output: '2' },
        {
          input: 'nums = [1,2,3], k = 3',
          output: '2',
          explanation: '[1,2] and [3] both sum to 3',
        },
        { input: 'nums = [1,-1,1], k = 1', output: '3' },
      ],
      approach:
        '**Prefix Sum Pattern**: Maintain a running prefix sum and a hash map counting frequencies of each prefix sum seen. For each position, check if (prefixSum - k) exists in the map — if so, those subarrays sum to k.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solution: `def subarray_sum(nums, k):
    count = 0
    prefix_sum = 0
    freq = {0: 1}
    for num in nums:
        prefix_sum += num
        if prefix_sum - k in freq:
            count += freq[prefix_sum - k]
        freq[prefix_sum] = freq.get(prefix_sum, 0) + 1
    return count

# Test
print(subarray_sum([1,1,1], 2))    # 2
print(subarray_sum([1,2,3], 3))    # 2
print(subarray_sum([1,-1,1], 1))   # 3`,
      starterCode: `def subarray_sum(nums, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,1,1], k = 2', expected: '2' },
        { input: 'nums = [1,2,3], k = 3', expected: '2' },
        { input: 'nums = [1,-1,1], k = 1', expected: '3' },
      ],
    },
  },
  {
    id: 'kadanes-algorithm',
    number: 3,
    name: "Kadane's Algorithm",
    categoryId: 'array',
    identify: 'Maximum/minimum subarray sum problem',
    sampleProblem: {
      id: 'maximum-subarray',
      title: 'Maximum Subarray',
      difficulty: 'medium',
      companies: ['Google', 'Amazon'],
      description:
        'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: '[4,-1,2,1] has the largest sum = 6',
        },
        { input: 'nums = [1]', output: '1' },
        { input: 'nums = [5,4,-1,7,8]', output: '23' },
      ],
      approach:
        "**Kadane's Algorithm**: Track current subarray sum and global maximum. At each element, decide whether to extend current subarray or start fresh (take max of element alone vs element + current sum).",
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def max_subarray(nums):
    current_sum = nums[0]
    max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

# Test
print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # 6
print(max_subarray([1]))                        # 1
print(max_subarray([5,4,-1,7,8]))              # 23`,
      starterCode: `def max_subarray(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
        { input: 'nums = [1]', expected: '1' },
        { input: 'nums = [5,4,-1,7,8]', expected: '23' },
      ],
    },
  },
  {
    id: 'majority-element',
    number: 4,
    name: 'Majority Element (Boyer-Moore Voting)',
    categoryId: 'array',
    identify: 'Element appearing more than n/2 times',
    sampleProblem: {
      id: 'majority-element',
      title: 'Majority Element',
      difficulty: 'easy',
      companies: ['Amazon', 'Apple', 'Google'],
      description:
        'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.',
      examples: [
        { input: 'nums = [3,2,3]', output: '3' },
        { input: 'nums = [2,2,1,1,1,2,2]', output: '2' },
        { input: 'nums = [1]', output: '1' },
      ],
      approach:
        '**Boyer-Moore Voting Algorithm**: Maintain a candidate and a count. When count hits 0, choose current element as new candidate. Increment count for matching elements, decrement for non-matching. The surviving candidate is the majority element.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def majority_element(nums):
    candidate = None
    count = 0
    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1
    return candidate

# Test
print(majority_element([3,2,3]))          # 3
print(majority_element([2,2,1,1,1,2,2])) # 2
print(majority_element([1]))              # 1`,
      starterCode: `def majority_element(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [3,2,3]', expected: '3' },
        { input: 'nums = [2,2,1,1,1,2,2]', expected: '2' },
        { input: 'nums = [1]', expected: '1' },
      ],
    },
  },
  {
    id: 'dutch-national-flag',
    number: 5,
    name: 'Dutch National Flag',
    categoryId: 'array',
    identify: 'Sort three distinct values in one pass',
    sampleProblem: {
      id: 'sort-colors',
      title: 'Sort Colors',
      difficulty: 'medium',
      companies: ['Microsoft', 'Facebook'],
      description:
        "Given an array nums with n objects colored red, white, or blue, represented as 0, 1, and 2, sort them in-place so that objects of the same color are adjacent, in the order red, white, and blue. You must solve this without using the library's sort function and in one pass.",
      examples: [
        { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
        { input: 'nums = [2,0,1]', output: '[0,1,2]' },
        { input: 'nums = [0]', output: '[0]' },
      ],
      approach:
        '**Dutch National Flag**: Use three pointers — low, mid, high. Elements before low are 0s, elements after high are 2s, elements between low and mid are 1s. Swap based on value at mid pointer.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums

# Test
print(sort_colors([2,0,2,1,1,0]))  # [0,0,1,1,2,2]
print(sort_colors([2,0,1]))        # [0,1,2]
print(sort_colors([0]))            # [0]`,
      starterCode: `def sort_colors(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [2,0,2,1,1,0]', expected: '[0,0,1,1,2,2]' },
        { input: 'nums = [2,0,1]', expected: '[0,1,2]' },
        { input: 'nums = [0]', expected: '[0]' },
      ],
    },
  },
  {
    id: 'missing-number',
    number: 6,
    name: 'Missing Number (XOR/Sum)',
    categoryId: 'array',
    identify: 'One number missing from 0 to n range',
    sampleProblem: {
      id: 'missing-number',
      title: 'Missing Number',
      difficulty: 'easy',
      companies: ['Amazon', 'Google', 'Apple'],
      description:
        'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
      examples: [
        { input: 'nums = [3,0,1]', output: '2' },
        { input: 'nums = [0,1]', output: '2' },
        { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' },
      ],
      approach:
        '**XOR/Sum Pattern**: Use the formula: expected sum = n*(n+1)/2. Subtract actual sum from expected sum to get the missing number. Alternatively, XOR all indices and values — duplicate pairs cancel out, leaving the missing number.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def missing_number(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)

# Test
print(missing_number([3,0,1]))            # 2
print(missing_number([0,1]))              # 2
print(missing_number([9,6,4,2,3,5,7,0,1])) # 8`,
      starterCode: `def missing_number(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [3,0,1]', expected: '2' },
        { input: 'nums = [0,1]', expected: '2' },
        { input: 'nums = [9,6,4,2,3,5,7,0,1]', expected: '8' },
      ],
    },
  },
  {
    id: 'cyclic-sort',
    number: 7,
    name: 'Cyclic Sort',
    categoryId: 'array',
    identify: 'Numbers from 1 to n placed in wrong positions',
    sampleProblem: {
      id: 'first-missing-positive',
      title: 'First Missing Positive',
      difficulty: 'hard',
      companies: ['Amazon', 'Google'],
      description:
        'Given an unsorted integer array nums, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.',
      examples: [
        { input: 'nums = [1,2,0]', output: '3' },
        { input: 'nums = [3,4,-1,1]', output: '2' },
        { input: 'nums = [7,8,9,11,12]', output: '1' },
      ],
      approach:
        '**Cyclic Sort Pattern**: Place each number in its correct position (nums[i] at index nums[i]-1) if it\'s in range [1,n]. Then scan array — first index where nums[i] != i+1 means i+1 is missing.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def first_missing_positive(nums):
    n = len(nums)
    i = 0
    while i < n:
        j = nums[i] - 1
        if 1 <= nums[i] <= n and nums[i] != nums[j]:
            nums[i], nums[j] = nums[j], nums[i]
        else:
            i += 1
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1

# Test
print(first_missing_positive([1,2,0]))       # 3
print(first_missing_positive([3,4,-1,1]))    # 2
print(first_missing_positive([7,8,9,11,12])) # 1`,
      starterCode: `def first_missing_positive(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,2,0]', expected: '3' },
        { input: 'nums = [3,4,-1,1]', expected: '2' },
        { input: 'nums = [7,8,9,11,12]', expected: '1' },
      ],
    },
  },
  {
    id: 'fixed-sliding-window',
    number: 8,
    name: 'Sliding Window Fixed Size',
    categoryId: 'array',
    identify: 'Subarray/substring of exactly size k',
    sampleProblem: {
      id: 'max-sum-subarray-k',
      title: 'Maximum Sum Subarray of Size K',
      difficulty: 'easy',
      companies: ['Amazon', 'TCS'],
      description:
        'Given an array of integers and a number k, find the maximum sum of a subarray of size k.',
      examples: [
        {
          input: 'arr = [2,1,5,1,3,2], k = 3',
          output: '9',
          explanation: 'Subarray [5,1,3] has sum 9',
        },
        {
          input: 'arr = [2,3,4,1,5], k = 2',
          output: '7',
          explanation: '[3,4] sums to 7',
        },
        { input: 'arr = [1,2,3,4,5], k = 4', output: '14' },
      ],
      approach:
        '**Fixed Sliding Window**: Compute sum of first k elements. Slide the window by adding the next element and removing the leftmost element. Track the maximum sum seen.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def max_sum_subarray(arr, k):
    if len(arr) < k:
        return -1
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Test
print(max_sum_subarray([2,1,5,1,3,2], 3))  # 9
print(max_sum_subarray([2,3,4,1,5], 2))    # 7
print(max_sum_subarray([1,2,3,4,5], 4))    # 14`,
      starterCode: `def max_sum_subarray(arr, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'arr = [2,1,5,1,3,2], k = 3', expected: '9' },
        { input: 'arr = [2,3,4,1,5], k = 2', expected: '7' },
        { input: 'arr = [1,2,3,4,5], k = 4', expected: '14' },
      ],
    },
  },
  {
    id: 'variable-sliding-window',
    number: 9,
    name: 'Sliding Window Variable Size',
    categoryId: 'array',
    identify: 'Longest/shortest subarray satisfying a condition',
    sampleProblem: {
      id: 'min-size-subarray-sum',
      title: 'Minimum Size Subarray Sum',
      difficulty: 'medium',
      companies: ['Amazon', 'Google'],
      description:
        'Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.',
      examples: [
        {
          input: 'target = 7, nums = [2,3,1,2,4,3]',
          output: '2',
          explanation: '[4,3] has minimal length',
        },
        { input: 'target = 4, nums = [1,4,4]', output: '1' },
        { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', output: '0' },
      ],
      approach:
        '**Variable Sliding Window**: Expand right pointer adding elements to window sum. When sum >= target, record length and shrink from left. Continue until right reaches end.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def min_subarray_len(target, nums):
    left = 0
    window_sum = 0
    min_len = float('inf')
    for right in range(len(nums)):
        window_sum += nums[right]
        while window_sum >= target:
            min_len = min(min_len, right - left + 1)
            window_sum -= nums[left]
            left += 1
    return 0 if min_len == float('inf') else min_len

# Test
print(min_subarray_len(7, [2,3,1,2,4,3]))      # 2
print(min_subarray_len(4, [1,4,4]))             # 1
print(min_subarray_len(11, [1,1,1,1,1,1,1,1])) # 0`,
      starterCode: `def min_subarray_len(target, nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'target = 7, nums = [2,3,1,2,4,3]', expected: '2' },
        { input: 'target = 4, nums = [1,4,4]', expected: '1' },
        { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', expected: '0' },
      ],
    },
  },
  {
    id: 'merge-intervals',
    number: 10,
    name: 'Merge Intervals',
    categoryId: 'array',
    identify: 'Overlapping intervals, scheduling problems',
    sampleProblem: {
      id: 'merge-intervals',
      title: 'Merge Intervals',
      difficulty: 'medium',
      companies: ['Google', 'Facebook', 'Amazon'],
      description:
        'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
      examples: [
        {
          input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
          output: '[[1,6],[8,10],[15,18]]',
          explanation: '[1,3] and [2,6] overlap, merge to [1,6]',
        },
        { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' },
        { input: 'intervals = [[1,4],[2,3]]', output: '[[1,4]]' },
      ],
      approach:
        "**Merge Intervals Pattern**: Sort intervals by start time. Iterate and compare current interval's start with last merged interval's end. If overlapping, extend the end. Otherwise, add new interval.",
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      solution: `def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

# Test
print(merge_intervals([[1,3],[2,6],[8,10],[15,18]]))  # [[1,6],[8,10],[15,18]]
print(merge_intervals([[1,4],[4,5]]))                 # [[1,5]]
print(merge_intervals([[1,4],[2,3]]))                 # [[1,4]]`,
      starterCode: `def merge_intervals(intervals):
    # Your code here
    pass`,
      testCases: [
        { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
        { input: 'intervals = [[1,4],[4,5]]', expected: '[[1,5]]' },
        { input: 'intervals = [[1,4],[2,3]]', expected: '[[1,4]]' },
      ],
    },
  },
  {
    id: 'anagram-check',
    number: 11,
    name: 'Anagram Check',
    categoryId: 'string',
    identify: 'Same character frequency between two strings',
    sampleProblem: {
      id: 'valid-anagram',
      title: 'Valid Anagram',
      difficulty: 'easy',
      companies: ['Amazon', 'Google'],
      description:
        'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging all letters of another word.',
      examples: [
        { input: "s = 'anagram', t = 'nagaram'", output: 'true' },
        { input: "s = 'rat', t = 'car'", output: 'false' },
        { input: "s = 'listen', t = 'silent'", output: 'true' },
      ],
      approach:
        '**Frequency Counter Pattern**: Count character frequencies in both strings using a dictionary or Counter. Compare the frequency maps — if identical, strings are anagrams.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `from collections import Counter

def is_anagram(s, t):
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)

# Test
print(is_anagram('anagram', 'nagaram'))  # True
print(is_anagram('rat', 'car'))          # False
print(is_anagram('listen', 'silent'))    # True`,
      starterCode: `def is_anagram(s, t):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'anagram', t = 'nagaram'", expected: 'true' },
        { input: "s = 'rat', t = 'car'", expected: 'false' },
        { input: "s = 'listen', t = 'silent'", expected: 'true' },
      ],
    },
  },
  {
    id: 'frequency-counter',
    number: 12,
    name: 'Frequency Counter',
    categoryId: 'string',
    identify: 'Character counting, first/last occurrence',
    sampleProblem: {
      id: 'first-unique-character',
      title: 'First Unique Character in a String',
      difficulty: 'easy',
      companies: ['Amazon', 'Bloomberg'],
      description:
        'Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.',
      examples: [
        { input: "s = 'leetcode'", output: '0' },
        { input: "s = 'loveleetcode'", output: '2' },
        { input: "s = 'aabb'", output: '-1' },
      ],
      approach:
        '**Frequency Counter Pattern**: Build frequency map in first pass. In second pass, return index of first character with frequency 1.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `from collections import Counter

def first_uniq_char(s):
    freq = Counter(s)
    for i, ch in enumerate(s):
        if freq[ch] == 1:
            return i
    return -1

# Test
print(first_uniq_char('leetcode'))     # 0
print(first_uniq_char('loveleetcode')) # 2
print(first_uniq_char('aabb'))         # -1`,
      starterCode: `def first_uniq_char(s):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'leetcode'", expected: '0' },
        { input: "s = 'loveleetcode'", expected: '2' },
        { input: "s = 'aabb'", expected: '-1' },
      ],
    },
  },
  {
    id: 'expand-around-center',
    number: 13,
    name: 'Expand Around Center (Palindrome)',
    categoryId: 'string',
    identify: 'Longest palindromic substring',
    sampleProblem: {
      id: 'longest-palindromic-substring',
      title: 'Longest Palindromic Substring',
      difficulty: 'medium',
      companies: ['Amazon', 'Microsoft', 'Google'],
      description: 'Given a string s, return the longest palindromic substring in s.',
      examples: [
        {
          input: "s = 'babad'",
          output: "'bab'",
          explanation: "'aba' is also valid",
        },
        { input: "s = 'cbbd'", output: "'bb'" },
        { input: "s = 'a'", output: "'a'" },
      ],
      approach:
        '**Expand Around Center**: For each character (and each pair), expand outward as long as characters match. Track the longest palindrome found. Handle both odd and even length palindromes.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)',
      solution: `def longest_palindrome(s):
    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]

    result = ''
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i + 1)
        if len(odd) > len(result):
            result = odd
        if len(even) > len(result):
            result = even
    return result

# Test
print(longest_palindrome('babad'))  # bab
print(longest_palindrome('cbbd'))   # bb
print(longest_palindrome('a'))      # a`,
      starterCode: `def longest_palindrome(s):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'babad'", expected: "'bab'" },
        { input: "s = 'cbbd'", expected: "'bb'" },
        { input: "s = 'a'", expected: "'a'" },
      ],
    },
  },
  {
    id: 'kmp-pattern',
    number: 14,
    name: 'KMP Pattern Matching',
    categoryId: 'string',
    identify: 'Efficient substring search, pattern matching',
    sampleProblem: {
      id: 'strstr',
      title: 'Find the Index of the First Occurrence in a String',
      difficulty: 'medium',
      companies: ['Google', 'Facebook'],
      description:
        'Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
      examples: [
        { input: "haystack = 'sadbutsad', needle = 'sad'", output: '0' },
        { input: "haystack = 'leetcode', needle = 'leeto'", output: '-1' },
        { input: "haystack = 'hello', needle = 'll'", output: '2' },
      ],
      approach:
        '**KMP Algorithm**: Build a failure function (LPS array) for the pattern. Use it to skip unnecessary comparisons during search, achieving O(n+m) time complexity.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m)',
      solution: `def str_str(haystack, needle):
    if not needle:
        return 0
    # Build LPS (Longest Proper Prefix which is also Suffix) array
    lps = [0] * len(needle)
    length = 0
    i = 1
    while i < len(needle):
        if needle[i] == needle[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    # KMP search
    i = j = 0
    while i < len(haystack):
        if haystack[i] == needle[j]:
            i += 1
            j += 1
        if j == len(needle):
            return i - j
        elif i < len(haystack) and haystack[i] != needle[j]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    return -1

# Test
print(str_str('sadbutsad', 'sad'))   # 0
print(str_str('leetcode', 'leeto')) # -1
print(str_str('hello', 'll'))       # 2`,
      starterCode: `def str_str(haystack, needle):
    # Your code here
    pass`,
      testCases: [
        { input: "haystack = 'sadbutsad', needle = 'sad'", expected: '0' },
        { input: "haystack = 'leetcode', needle = 'leeto'", expected: '-1' },
        { input: "haystack = 'hello', needle = 'll'", expected: '2' },
      ],
    },
  },
  {
    id: 'string-compression',
    number: 15,
    name: 'String Compression',
    categoryId: 'string',
    identify: 'Compress repeated characters, run-length encoding',
    sampleProblem: {
      id: 'string-compression',
      title: 'String Compression',
      difficulty: 'medium',
      companies: ['Amazon', 'Microsoft'],
      description:
        "Given an array of characters chars, compress it using the following algorithm: begin with an empty string s. For each group of consecutive repeating characters in chars, if the group's length is 1, append the character to s. Otherwise, append the character followed by the group's length. The compressed string s should not be returned separately, but instead, be stored in the input character array chars.",
      examples: [
        {
          input: "chars = ['a','a','b','b','c','c','c']",
          output: "6, chars = ['a','2','b','2','c','3']",
        },
        { input: "chars = ['a']", output: "1, chars = ['a']" },
        {
          input: "chars = ['a','b','b','b','b','b','b','b','b','b','b','b','b']",
          output: '4',
        },
      ],
      approach:
        '**String Compression**: Use two pointers — read pointer scans input, write pointer tracks where to write output. Count consecutive identical characters and write char + count (if > 1) to write position.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def compress(chars):
    write = 0
    i = 0
    while i < len(chars):
        char = chars[i]
        count = 0
        while i < len(chars) and chars[i] == char:
            i += 1
            count += 1
        chars[write] = char
        write += 1
        if count > 1:
            for c in str(count):
                chars[write] = c
                write += 1
    return write

# Test
chars1 = ['a','a','b','b','c','c','c']
print(compress(chars1), chars1[:6])  # 6 ['a','2','b','2','c','3']
chars2 = ['a']
print(compress(chars2))              # 1
chars3 = ['a'] + ['b'] * 12
print(compress(chars3))              # 4`,
      starterCode: `def compress(chars):
    # Your code here
    pass`,
      testCases: [
        { input: "chars = ['a','a','b','b','c','c','c']", expected: '6' },
        { input: "chars = ['a']", expected: '1' },
        { input: "chars = ['a','b','b','b','b','b','b','b','b','b','b','b','b']", expected: '4' },
      ],
    },
  },
  {
    id: 'min-window-substring',
    number: 16,
    name: 'Minimum Window Substring',
    categoryId: 'string',
    identify: 'Smallest window containing all target characters',
    sampleProblem: {
      id: 'minimum-window-substring',
      title: 'Minimum Window Substring',
      difficulty: 'hard',
      companies: ['Facebook', 'Google', 'Amazon'],
      description:
        'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string.',
      examples: [
        { input: "s = 'ADOBECODEBANC', t = 'ABC'", output: "'BANC'" },
        { input: "s = 'a', t = 'a'", output: "'a'" },
        { input: "s = 'a', t = 'aa'", output: "''" },
      ],
      approach:
        '**Sliding Window with Frequency Map**: Expand right pointer until window contains all chars of t. Then contract left pointer to minimize window while maintaining validity. Track minimum window throughout.',
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(m + n)',
      solution: `from collections import Counter

def min_window(s, t):
    if not t or not s:
        return ''
    need = Counter(t)
    missing = len(t)
    start = 0
    best = ''
    j = 0
    for i, ch in enumerate(s):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        if missing == 0:
            while need[s[j]] < 0:
                need[s[j]] += 1
                j += 1
            window = s[j:i + 1]
            if not best or len(window) < len(best):
                best = window
            need[s[j]] += 1
            missing += 1
            j += 1
    return best

# Test
print(min_window('ADOBECODEBANC', 'ABC'))  # BANC
print(min_window('a', 'a'))               # a
print(min_window('a', 'aa'))              # ''`,
      starterCode: `def min_window(s, t):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'ADOBECODEBANC', t = 'ABC'", expected: "'BANC'" },
        { input: "s = 'a', t = 'a'", expected: "'a'" },
        { input: "s = 'a', t = 'aa'", expected: "''" },
      ],
    },
  },
  {
    id: 'valid-palindrome-tp',
    number: 17,
    name: 'Two Pointer Palindrome',
    categoryId: 'string',
    identify: 'Check if string is palindrome, skip non-alphanumeric',
    sampleProblem: {
      id: 'valid-palindrome',
      title: 'Valid Palindrome',
      difficulty: 'easy',
      companies: ['Facebook', 'Microsoft'],
      description:
        'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
      examples: [
        { input: "s = 'A man, a plan, a canal: Panama'", output: 'true' },
        { input: "s = 'race a car'", output: 'false' },
        { input: "s = ' '", output: 'true' },
      ],
      approach:
        '**Two Pointer Palindrome**: Use left and right pointers. Skip non-alphanumeric characters. Compare lowercase versions of characters at both pointers. Move inward until pointers meet.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

# Test
print(is_palindrome('A man, a plan, a canal: Panama'))  # True
print(is_palindrome('race a car'))                      # False
print(is_palindrome(' '))                               # True`,
      starterCode: `def is_palindrome(s):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'A man, a plan, a canal: Panama'", expected: 'true' },
        { input: "s = 'race a car'", expected: 'false' },
        { input: "s = ' '", expected: 'true' },
      ],
    },
  },
  {
    id: 'group-anagrams-pattern',
    number: 18,
    name: 'Group Anagrams',
    categoryId: 'string',
    identify: 'Group strings with same sorted characters',
    sampleProblem: {
      id: 'group-anagrams',
      title: 'Group Anagrams',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Facebook'],
      description:
        'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
      examples: [
        {
          input: "strs = ['eat','tea','tan','ate','nat','bat']",
          output: "[['bat'],['nat','tan'],['ate','eat','tea']]",
        },
        { input: "strs = ['']", output: "[['']]" },
        { input: "strs = ['a']", output: "[['a']]" },
      ],
      approach:
        '**Group Anagrams Pattern**: Sort each string to get its canonical form. Use sorted string as hash map key. Group all original strings with same sorted key together.',
      timeComplexity: 'O(n * k log k)',
      spaceComplexity: 'O(n * k)',
      solution: `from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())

# Test
print(group_anagrams(['eat','tea','tan','ate','nat','bat']))
# [['eat','tea','ate'],['tan','nat'],['bat']]
print(group_anagrams(['']))   # [['']]
print(group_anagrams(['a']))  # [['a']]`,
      starterCode: `def group_anagrams(strs):
    # Your code here
    pass`,
      testCases: [
        {
          input: "strs = ['eat','tea','tan','ate','nat','bat']",
          expected: "[['bat'],['nat','tan'],['ate','eat','tea']]",
        },
        { input: "strs = ['']", expected: "[['']]" },
        { input: "strs = ['a']", expected: "[['a']]" },
      ],
    },
  },
  {
    id: 'opposite-two-pointers',
    number: 19,
    name: 'Opposite Direction Two Pointers',
    categoryId: 'two-pointer',
    identify: 'Sorted array, find pair satisfying condition',
    sampleProblem: {
      id: 'two-sum-ii',
      title: 'Two Sum II - Input Array Is Sorted',
      difficulty: 'medium',
      companies: ['Amazon', 'Google'],
      description:
        'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.',
      examples: [
        { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' },
        { input: 'numbers = [2,3,4], target = 6', output: '[1,3]' },
        { input: 'numbers = [-1,0], target = -1', output: '[1,2]' },
      ],
      approach:
        '**Opposite Direction Two Pointers**: Start with left at index 0 and right at last index. If sum equals target, return indices. If sum < target, move left right. If sum > target, move right left.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def two_sum_ii(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []

# Test
print(two_sum_ii([2,7,11,15], 9))   # [1, 2]
print(two_sum_ii([2,3,4], 6))       # [1, 3]
print(two_sum_ii([-1,0], -1))       # [1, 2]`,
      starterCode: `def two_sum_ii(numbers, target):
    # Your code here
    pass`,
      testCases: [
        { input: 'numbers = [2,7,11,15], target = 9', expected: '[1,2]' },
        { input: 'numbers = [2,3,4], target = 6', expected: '[1,3]' },
        { input: 'numbers = [-1,0], target = -1', expected: '[1,2]' },
      ],
    },
  },
  {
    id: 'fast-slow-pointers',
    number: 20,
    name: 'Fast & Slow Pointers',
    categoryId: 'two-pointer',
    identify: 'Remove duplicates from sorted array, detect position',
    sampleProblem: {
      id: 'remove-duplicates-sorted-array',
      title: 'Remove Duplicates from Sorted Array',
      difficulty: 'easy',
      companies: ['Facebook', 'Microsoft'],
      description:
        'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Return k after placing the final result in the first k slots of nums.',
      examples: [
        { input: 'nums = [1,1,2]', output: '2, nums = [1,2,_]' },
        {
          input: 'nums = [0,0,1,1,1,2,2,3,3,4]',
          output: '5, nums = [0,1,2,3,4,_,_,_,_,_]',
        },
        { input: 'nums = [1,2,3]', output: '3' },
      ],
      approach:
        "**Fast & Slow Pointers**: Slow pointer tracks position for next unique element. Fast pointer scans array. When fast finds element different from slow's element, move slow forward and copy fast's value there.",
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1

# Test
nums1 = [1,1,2]
print(remove_duplicates(nums1), nums1)  # 2 [1, 2, 2]
nums2 = [0,0,1,1,1,2,2,3,3,4]
print(remove_duplicates(nums2), nums2)  # 5 [0,1,2,3,4,...]
nums3 = [1,2,3]
print(remove_duplicates(nums3))         # 3`,
      starterCode: `def remove_duplicates(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,1,2]', expected: '2' },
        { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expected: '5' },
        { input: 'nums = [1,2,3]', expected: '3' },
      ],
    },
  },
  {
    id: 'floyds-cycle',
    number: 21,
    name: "Floyd's Cycle Detection",
    categoryId: 'two-pointer',
    identify: 'Detect cycle in linked list, find entry point',
    sampleProblem: {
      id: 'linked-list-cycle',
      title: 'Linked List Cycle',
      difficulty: 'easy',
      companies: ['Amazon', 'Google', 'Bloomberg'],
      description:
        'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.',
      examples: [
        {
          input: 'head = [3,2,0,-4], pos = 1',
          output: 'true',
          explanation: 'tail connects to node at index 1',
        },
        { input: 'head = [1,2], pos = 0', output: 'true' },
        { input: 'head = [1], pos = -1', output: 'false' },
      ],
      approach:
        "**Floyd's Cycle Detection**: Use fast and slow pointers. Slow moves one step, fast moves two steps. If they meet, there's a cycle. If fast reaches null, no cycle.",
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Test helpers
def make_list_with_cycle(values, pos):
    if not values:
        return None
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0:
        nodes[-1].next = nodes[pos]
    return nodes[0]

print(has_cycle(make_list_with_cycle([3,2,0,-4], 1)))  # True
print(has_cycle(make_list_with_cycle([1,2], 0)))        # True
print(has_cycle(make_list_with_cycle([1], -1)))         # False`,
      starterCode: `def has_cycle(head):
    # Your code here
    pass`,
      testCases: [
        { input: 'head = [3,2,0,-4], pos = 1', expected: 'true' },
        { input: 'head = [1,2], pos = 0', expected: 'true' },
        { input: 'head = [1], pos = -1', expected: 'false' },
      ],
    },
  },
  {
    id: 'trapping-rain-pattern',
    number: 22,
    name: 'Trapping Rain Water',
    categoryId: 'two-pointer',
    identify: 'Water accumulation, bounded by walls on both sides',
    sampleProblem: {
      id: 'trapping-rain-water',
      title: 'Trapping Rain Water',
      difficulty: 'hard',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      examples: [
        { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
        { input: 'height = [4,2,0,3,2,5]', output: '9' },
        { input: 'height = [3,0,2,0,4]', output: '7' },
      ],
      approach:
        '**Two Pointer Rain Water**: Use left and right pointers with max heights. Water at each position is min(maxLeft, maxRight) - height[i]. Move pointer with smaller max height inward.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def trap(height):
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

# Test
print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6
print(trap([4,2,0,3,2,5]))               # 9
print(trap([3,0,2,0,4]))                 # 7`,
      starterCode: `def trap(height):
    # Your code here
    pass`,
      testCases: [
        { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
        { input: 'height = [4,2,0,3,2,5]', expected: '9' },
        { input: 'height = [3,0,2,0,4]', expected: '7' },
      ],
    },
  },
  {
    id: 'container-water-pattern',
    number: 23,
    name: 'Container With Most Water',
    categoryId: 'two-pointer',
    identify: 'Maximize area between two elements',
    sampleProblem: {
      id: 'container-with-most-water',
      title: 'Container With Most Water',
      difficulty: 'medium',
      companies: ['Amazon', 'Google'],
      description:
        'You are given an integer array height of length n. There are n vertical lines drawn. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
      examples: [
        { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
        { input: 'height = [1,1]', output: '1' },
        { input: 'height = [4,3,2,1,4]', output: '16' },
      ],
      approach:
        '**Two Pointer Container**: Start with widest container (left=0, right=n-1). Area = min(height[l], height[r]) * (r-l). Move the pointer with smaller height inward to potentially find taller walls.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        if height[left] <= height[right]:
            left += 1
        else:
            right -= 1
    return max_water

# Test
print(max_area([1,8,6,2,5,4,8,3,7]))  # 49
print(max_area([1,1]))                 # 1
print(max_area([4,3,2,1,4]))           # 16`,
      starterCode: `def max_area(height):
    # Your code here
    pass`,
      testCases: [
        { input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49' },
        { input: 'height = [1,1]', expected: '1' },
        { input: 'height = [4,3,2,1,4]', expected: '16' },
      ],
    },
  },
  {
    id: 'reverse-ll',
    number: 24,
    name: 'Reverse Linked List',
    categoryId: 'linked-list',
    identify: 'Reverse order of nodes in linked list',
    sampleProblem: {
      id: 'reverse-linked-list',
      title: 'Reverse Linked List',
      difficulty: 'easy',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      examples: [
        { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
        { input: 'head = [1,2]', output: '[2,1]' },
        { input: 'head = []', output: '[]' },
      ],
      approach:
        '**Reverse Linked List**: Use three pointers — prev (None), curr (head), next. At each step: save next, point curr to prev, advance prev to curr, advance curr to next. Return prev when done.',
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
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev

def to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

def make_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    curr = head
    for v in values[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

print(to_list(reverse_list(make_list([1,2,3,4,5]))))  # [5,4,3,2,1]
print(to_list(reverse_list(make_list([1,2]))))         # [2,1]
print(to_list(reverse_list(make_list([]))))            # []`,
      starterCode: `def reverse_list(head):
    # Your code here
    pass`,
      testCases: [
        { input: 'head = [1,2,3,4,5]', expected: '[5,4,3,2,1]' },
        { input: 'head = [1,2]', expected: '[2,1]' },
        { input: 'head = []', expected: '[]' },
      ],
    },
  },
  {
    id: 'reverse-k-groups',
    number: 25,
    name: 'Reverse in K Groups',
    categoryId: 'linked-list',
    identify: 'Reverse linked list in groups of k',
    sampleProblem: {
      id: 'reverse-nodes-in-k-group',
      title: 'Reverse Nodes in k-Group',
      difficulty: 'hard',
      companies: ['Amazon', 'Microsoft'],
      description:
        'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes at the end should remain as is.',
      examples: [
        { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
        { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' },
        { input: 'head = [1,2,3], k = 1', output: '[1,2,3]' },
      ],
      approach:
        '**Reverse K Groups**: Check if k nodes exist ahead. If yes, reverse k nodes using standard reversal. Connect reversed group with previously processed part and recurse/iterate for remaining nodes.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_k_group(head, k):
    def get_kth(curr, k):
        while curr and k > 0:
            curr = curr.next
            k -= 1
        return curr

    dummy = ListNode(0)
    dummy.next = head
    group_prev = dummy

    while True:
        kth = get_kth(group_prev, k)
        if not kth:
            break
        group_next = kth.next
        prev, curr = group_next, group_prev.next
        while curr != group_next:
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
        tmp = group_prev.next
        group_prev.next = kth
        group_prev = tmp
    return dummy.next

def to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

def make_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    curr = head
    for v in values[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

print(to_list(reverse_k_group(make_list([1,2,3,4,5]), 2)))  # [2,1,4,3,5]
print(to_list(reverse_k_group(make_list([1,2,3,4,5]), 3)))  # [3,2,1,4,5]
print(to_list(reverse_k_group(make_list([1,2,3]), 1)))       # [1,2,3]`,
      starterCode: `def reverse_k_group(head, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'head = [1,2,3,4,5], k = 2', expected: '[2,1,4,3,5]' },
        { input: 'head = [1,2,3,4,5], k = 3', expected: '[3,2,1,4,5]' },
        { input: 'head = [1,2,3], k = 1', expected: '[1,2,3]' },
      ],
    },
  },
  {
    id: 'detect-remove-cycle',
    number: 26,
    name: 'Detect and Remove Cycle',
    categoryId: 'linked-list',
    identify: "Find where cycle starts (Floyd's algorithm phase 2)",
    sampleProblem: {
      id: 'linked-list-cycle-ii',
      title: 'Linked List Cycle II',
      difficulty: 'medium',
      companies: ['Amazon', 'Google'],
      description:
        'Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.',
      examples: [
        {
          input: 'head = [3,2,0,-4], pos = 1',
          output: 'node at index 1 (value 2)',
          explanation: 'The cycle begins at node with value 2',
        },
        { input: 'head = [1,2], pos = 0', output: 'node at index 0 (value 1)' },
        { input: 'head = [1], pos = -1', output: 'null' },
      ],
      approach:
        "**Floyd's Phase 2**: After slow and fast meet in cycle, reset slow to head. Move both one step at a time — they meet at cycle start. This works because of the mathematical relationship between distances.",
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow
    return None

def make_list_with_cycle(values, pos):
    if not values:
        return None
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0:
        nodes[-1].next = nodes[pos]
    return nodes[0]

result = detect_cycle(make_list_with_cycle([3,2,0,-4], 1))
print(result.val if result else None)  # 2

result = detect_cycle(make_list_with_cycle([1,2], 0))
print(result.val if result else None)  # 1

result = detect_cycle(make_list_with_cycle([1], -1))
print(result.val if result else None)  # None`,
      starterCode: `def detect_cycle(head):
    # Your code here
    pass`,
      testCases: [
        { input: 'head = [3,2,0,-4], pos = 1', expected: 'node at index 1 (value 2)' },
        { input: 'head = [1,2], pos = 0', expected: 'node at index 0 (value 1)' },
        { input: 'head = [1], pos = -1', expected: 'null' },
      ],
    },
  },
  {
    id: 'find-middle-node',
    number: 27,
    name: 'Find Middle Node',
    categoryId: 'linked-list',
    identify: 'Find middle of linked list using fast/slow',
    sampleProblem: {
      id: 'middle-of-linked-list',
      title: 'Middle of the Linked List',
      difficulty: 'easy',
      companies: ['Amazon', 'Google'],
      description:
        'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.',
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: 'Node 3',
          explanation: 'The middle node is 3',
        },
        {
          input: 'head = [1,2,3,4,5,6]',
          output: 'Node 4',
          explanation: 'Two middles exist, return second',
        },
        { input: 'head = [1]', output: 'Node 1' },
      ],
      approach:
        '**Fast & Slow Pointer**: Slow moves one step, fast moves two steps. When fast reaches end, slow is at middle. For even-length lists, slow ends at second middle.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

def make_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    curr = head
    for v in values[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

print(middle_node(make_list([1,2,3,4,5])).val)    # 3
print(middle_node(make_list([1,2,3,4,5,6])).val)  # 4
print(middle_node(make_list([1])).val)             # 1`,
      starterCode: `def middle_node(head):
    # Your code here
    pass`,
      testCases: [
        { input: 'head = [1,2,3,4,5]', expected: 'Node 3' },
        { input: 'head = [1,2,3,4,5,6]', expected: 'Node 4' },
        { input: 'head = [1]', expected: 'Node 1' },
      ],
    },
  },
  {
    id: 'merge-sorted-lists',
    number: 28,
    name: 'Merge Sorted Lists',
    categoryId: 'linked-list',
    identify: 'Merge two or more sorted linked lists',
    sampleProblem: {
      id: 'merge-two-sorted-lists',
      title: 'Merge Two Sorted Lists',
      difficulty: 'easy',
      companies: ['Amazon', 'Microsoft'],
      description:
        'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
      examples: [
        { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
        { input: 'list1 = [], list2 = []', output: '[]' },
        { input: 'list1 = [], list2 = [0]', output: '[0]' },
      ],
      approach:
        '**Merge with Dummy Head**: Use a dummy node to simplify edge cases. Compare heads of both lists, attach smaller node to result, advance that list\'s pointer. Attach remaining list when one is exhausted.',
      timeComplexity: 'O(n + m)',
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
    curr.next = list1 or list2
    return dummy.next

def to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

def make_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    curr = head
    for v in values[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

print(to_list(merge_two_lists(make_list([1,2,4]), make_list([1,3,4]))))  # [1,1,2,3,4,4]
print(to_list(merge_two_lists(make_list([]), make_list([]))))            # []
print(to_list(merge_two_lists(make_list([]), make_list([0]))))           # [0]`,
      starterCode: `def merge_two_lists(list1, list2):
    # Your code here
    pass`,
      testCases: [
        { input: 'list1 = [1,2,4], list2 = [1,3,4]', expected: '[1,1,2,3,4,4]' },
        { input: 'list1 = [], list2 = []', expected: '[]' },
        { input: 'list1 = [], list2 = [0]', expected: '[0]' },
      ],
    },
  },
  {
    id: 'lru-cache',
    number: 29,
    name: 'LRU Cache',
    categoryId: 'linked-list',
    identify: 'Design cache with O(1) get/put using HashMap + Doubly Linked List',
    sampleProblem: {
      id: 'lru-cache',
      title: 'LRU Cache',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Facebook'],
      description:
        'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(int capacity) initializes the LRU cache with positive size capacity. int get(int key) returns the value of the key if it exists, otherwise returns -1. void put(int key, int value) updates or inserts the key. If the key exists, update. Otherwise add. When cache reaches capacity, evict the LRU item.',
      examples: [
        {
          input: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); put(4,4); get(1); get(3); get(4)',
          output: '-1 after eviction of 2; 1; 3; 4',
          explanation: 'Cache operations trace',
        },
      ],
      approach:
        '**HashMap + Doubly Linked List**: HashMap for O(1) lookup, doubly linked list for O(1) insertion/deletion. MRU at front, LRU at back. On get/put, move node to front. On capacity overflow, remove from back.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(capacity)',
      solution: `class DLinkedNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {}
        self.head = DLinkedNode()  # dummy head (MRU side)
        self.tail = DLinkedNode()  # dummy tail (LRU side)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._insert_front(node)
            return node.val
        return -1

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = DLinkedNode(key, value)
        self.cache[key] = node
        self._insert_front(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]

# Test 1
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))   # 1
cache.put(3, 3)
print(cache.get(2))   # -1 (evicted)
cache.put(4, 4)
print(cache.get(1))   # -1 (evicted)
print(cache.get(3))   # 3
print(cache.get(4))   # 4

# Test 2
cache2 = LRUCache(1)
cache2.put(1, 1)
cache2.put(2, 2)
print(cache2.get(1))  # -1 (evicted)
print(cache2.get(2))  # 2`,
      starterCode: `class LRUCache:
    def __init__(self, capacity):
        # Your code here
        pass

    def get(self, key):
        # Your code here
        pass

    def put(self, key, value):
        # Your code here
        pass`,
      testCases: [
        {
          input: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)',
          expected: '1 then -1',
        },
        {
          input: 'LRUCache(1); put(1,1); put(2,2); get(1); get(2)',
          expected: '-1 then 2',
        },
      ],
    },
  },
  {
    id: 'add-two-numbers-ll',
    number: 30,
    name: 'Add Two Numbers',
    categoryId: 'linked-list',
    identify: 'Arithmetic on numbers stored as linked lists',
    sampleProblem: {
      id: 'add-two-numbers',
      title: 'Add Two Numbers',
      difficulty: 'medium',
      companies: ['Amazon', 'Microsoft', 'Apple'],
      description:
        'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
      examples: [
        {
          input: 'l1 = [2,4,3], l2 = [5,6,4]',
          output: '[7,0,8]',
          explanation: '342 + 465 = 807',
        },
        { input: 'l1 = [0], l2 = [0]', output: '[0]' },
        { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]' },
      ],
      approach:
        '**Linked List Addition**: Traverse both lists simultaneously, adding digits with carry. Create new nodes for result. Handle carry after both lists are exhausted.',
      timeComplexity: 'O(max(m, n))',
      spaceComplexity: 'O(max(m, n))',
      solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def add_two_numbers(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        total = v1 + v2 + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next
        if l1: l1 = l1.next
        if l2: l2 = l2.next
    return dummy.next

def to_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

def make_list(values):
    if not values:
        return None
    head = ListNode(values[0])
    curr = head
    for v in values[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

print(to_list(add_two_numbers(make_list([2,4,3]), make_list([5,6,4]))))          # [7,0,8]
print(to_list(add_two_numbers(make_list([0]), make_list([0]))))                  # [0]
print(to_list(add_two_numbers(make_list([9,9,9,9,9,9,9]), make_list([9,9,9,9]))))# [8,9,9,9,0,0,0,1]`,
      starterCode: `def add_two_numbers(l1, l2):
    # Your code here
    pass`,
      testCases: [
        { input: 'l1 = [2,4,3], l2 = [5,6,4]', expected: '[7,0,8]' },
        { input: 'l1 = [0], l2 = [0]', expected: '[0]' },
        { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', expected: '[8,9,9,9,0,0,0,1]' },
      ],
    },
  },
  {
    id: 'next-greater-element',
    number: 31,
    name: 'Next Greater Element',
    categoryId: 'stack',
    identify: 'Find next larger value for each element',
    sampleProblem: {
      id: 'next-greater-element-i',
      title: 'Next Greater Element I',
      difficulty: 'easy',
      companies: ['Amazon', 'Google'],
      description:
        'The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. Given two distinct 0-indexed integer arrays nums1 and nums2, nums1 is a subset of nums2. For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, the answer is -1.',
      examples: [
        { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' },
        { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]' },
        { input: 'nums1 = [1,3,5,2,4], nums2 = [6,5,4,3,1,2,7]', output: '[2,7,7,7,-1]' },
      ],
      approach:
        '**Monotonic Stack**: Process nums2 right-to-left with a decreasing stack. For each element, pop elements smaller than current (they can\'t be next greater). Store next greater in hash map. Look up answers for nums1.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n)',
      solution: `def next_greater_element(nums1, nums2):
    stack = []
    next_greater = {}
    for num in reversed(nums2):
        while stack and stack[-1] <= num:
            stack.pop()
        next_greater[num] = stack[-1] if stack else -1
        stack.append(num)
    return [next_greater[n] for n in nums1]

# Test
print(next_greater_element([4,1,2], [1,3,4,2]))          # [-1, 3, -1]
print(next_greater_element([2,4], [1,2,3,4]))             # [3, -1]
print(next_greater_element([1,3,5,2,4], [6,5,4,3,1,2,7]))# [2, 7, 7, 7, -1]`,
      starterCode: `def next_greater_element(nums1, nums2):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', expected: '[-1,3,-1]' },
        { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', expected: '[3,-1]' },
        { input: 'nums1 = [1,3,5,2,4], nums2 = [6,5,4,3,1,2,7]', expected: '[2,7,7,7,-1]' },
      ],
    },
  },
  {
    id: 'monotonic-stack',
    number: 32,
    name: 'Monotonic Stack',
    categoryId: 'stack',
    identify: 'Maintain increasing/decreasing order in stack for range queries',
    sampleProblem: {
      id: 'daily-temperatures',
      title: 'Daily Temperatures',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Facebook'],
      description:
        'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.',
      examples: [
        { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
        { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
        { input: 'temperatures = [30,60,90]', output: '[1,1,0]' },
      ],
      approach:
        '**Monotonic Decreasing Stack**: Maintain stack of indices with decreasing temperatures. For each day, pop all indices with temperature less than current. The difference in indices is days to wait.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solution: `def daily_temperatures(temperatures):
    n = len(temperatures)
    answer = [0] * n
    stack = []  # stack of indices
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            idx = stack.pop()
            answer[idx] = i - idx
        stack.append(i)
    return answer

# Test
print(daily_temperatures([73,74,75,71,69,72,76,73]))  # [1,1,4,2,1,1,0,0]
print(daily_temperatures([30,40,50,60]))               # [1,1,1,0]
print(daily_temperatures([30,60,90]))                  # [1,1,0]`,
      starterCode: `def daily_temperatures(temperatures):
    # Your code here
    pass`,
      testCases: [
        { input: 'temperatures = [73,74,75,71,69,72,76,73]', expected: '[1,1,4,2,1,1,0,0]' },
        { input: 'temperatures = [30,40,50,60]', expected: '[1,1,1,0]' },
        { input: 'temperatures = [30,60,90]', expected: '[1,1,0]' },
      ],
    },
  },
  {
    id: 'histogram-rectangle',
    number: 33,
    name: 'Largest Rectangle in Histogram',
    categoryId: 'stack',
    identify: 'Maximum area rectangle in bar chart',
    sampleProblem: {
      id: 'largest-rectangle-in-histogram',
      title: 'Largest Rectangle in Histogram',
      difficulty: 'hard',
      companies: ['Amazon', 'Google'],
      description:
        "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
      examples: [
        {
          input: 'heights = [2,1,5,6,2,3]',
          output: '10',
          explanation: 'Rectangle with height 5 spanning bars 2-3',
        },
        { input: 'heights = [2,4]', output: '4' },
        { input: 'heights = [6,2,5,4,5,1,6]', output: '12' },
      ],
      approach:
        '**Monotonic Stack for Histogram**: Maintain increasing stack. When current bar is shorter, pop taller bars. Area = popped height * (current_index - stack_top - 1). Add sentinel bars of height 0 at both ends.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solution: `def largest_rectangle_area(heights):
    heights = [0] + heights + [0]
    stack = [0]
    max_area = 0
    for i in range(1, len(heights)):
        while heights[i] < heights[stack[-1]]:
            h = heights[stack.pop()]
            w = i - stack[-1] - 1
            max_area = max(max_area, h * w)
        stack.append(i)
    return max_area

# Test
print(largest_rectangle_area([2,1,5,6,2,3]))   # 10
print(largest_rectangle_area([2,4]))            # 4
print(largest_rectangle_area([6,2,5,4,5,1,6])) # 12`,
      starterCode: `def largest_rectangle_area(heights):
    # Your code here
    pass`,
      testCases: [
        { input: 'heights = [2,1,5,6,2,3]', expected: '10' },
        { input: 'heights = [2,4]', expected: '4' },
        { input: 'heights = [6,2,5,4,5,1,6]', expected: '12' },
      ],
    },
  },
  {
    id: 'stock-span',
    number: 34,
    name: 'Stock Span Problem',
    categoryId: 'stack',
    identify: 'Count consecutive days with price <= current',
    sampleProblem: {
      id: 'online-stock-span',
      title: 'Online Stock Span',
      difficulty: 'medium',
      companies: ['Google', 'Amazon'],
      description:
        "Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day. The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going to the left) for which the stock price was less than or equal to the price of that day.",
      examples: [
        { input: '[100, 80, 60, 70, 60, 75, 85]', output: '[1, 1, 1, 2, 1, 4, 6]' },
        { input: '[100]', output: '[1]' },
        { input: '[3, 1, 2, 1, 3]', output: '[1, 1, 2, 1, 4]' },
      ],
      approach:
        '**Stock Span Stack**: Maintain stack of (price, span) pairs. When current price >= stack top price, pop and accumulate spans. Push current price with accumulated span.',
      timeComplexity: 'O(n) amortized',
      spaceComplexity: 'O(n)',
      solution: `class StockSpanner:
    def __init__(self):
        self.stack = []  # (price, span)

    def next(self, price):
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span

# Test 1
spanner = StockSpanner()
prices1 = [100, 80, 60, 70, 60, 75, 85]
print([spanner.next(p) for p in prices1])  # [1, 1, 1, 2, 1, 4, 6]

# Test 2
spanner2 = StockSpanner()
print([spanner2.next(p) for p in [100]])   # [1]

# Test 3
spanner3 = StockSpanner()
print([spanner3.next(p) for p in [3,1,2,1,3]])  # [1, 1, 2, 1, 4]`,
      starterCode: `class StockSpanner:
    def __init__(self):
        # Your code here
        pass

    def next(self, price):
        # Your code here
        pass`,
      testCases: [
        { input: '[100, 80, 60, 70, 60, 75, 85]', expected: '[1, 1, 1, 2, 1, 4, 6]' },
        { input: '[100]', expected: '[1]' },
        { input: '[3, 1, 2, 1, 3]', expected: '[1, 1, 2, 1, 4]' },
      ],
    },
  },
  {
    id: 'min-stack-pattern',
    number: 35,
    name: 'Min Stack',
    categoryId: 'stack',
    identify: 'Stack with O(1) getMin operation',
    sampleProblem: {
      id: 'min-stack',
      title: 'Min Stack',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Bloomberg'],
      description:
        'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class with push(val), pop(), top(), and getMin() methods.',
      examples: [
        {
          input: 'MinStack(); push(-2); push(0); push(-3); getMin(); pop(); top(); getMin()',
          output: '-3; 0; -2',
        },
      ],
      approach:
        '**Min Stack Pattern**: Use two stacks — main stack and min stack. When pushing, always push to main stack. Push to min stack only if value <= current min. Pop from both when main stack pops.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n)',
      solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self):
        top = self.stack.pop()
        if top == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]

# Test 1
ms = MinStack()
ms.push(-2)
ms.push(0)
ms.push(-3)
print(ms.getMin())  # -3
ms.pop()
print(ms.top())     # 0
print(ms.getMin())  # -2

# Test 2
ms2 = MinStack()
ms2.push(1)
ms2.push(2)
print(ms2.getMin())  # 1
ms2.pop()
print(ms2.getMin())  # 1`,
      starterCode: `class MinStack:
    def __init__(self):
        # Your code here
        pass

    def push(self, val):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def getMin(self):
        pass`,
      testCases: [
        {
          input: 'MinStack(); push(-2); push(0); push(-3); getMin(); pop(); top(); getMin()',
          expected: '-3; 0; -2',
        },
        {
          input: 'MinStack(); push(1); push(2); getMin(); pop(); getMin()',
          expected: '1; 1',
        },
      ],
    },
  },
  {
    id: 'sliding-window-max',
    number: 36,
    name: 'Sliding Window Maximum',
    categoryId: 'queue',
    identify: 'Maximum in every sliding window of size k',
    sampleProblem: {
      id: 'sliding-window-maximum',
      title: 'Sliding Window Maximum',
      difficulty: 'hard',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Return the max sliding window.',
      examples: [
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
        { input: 'nums = [1], k = 1', output: '[1]' },
        { input: 'nums = [9,11], k = 2', output: '[11]' },
      ],
      approach:
        '**Monotonic Deque**: Maintain deque of indices in decreasing order of values. Remove indices outside window from front. Remove smaller elements from back. Front always has maximum.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      solution: `from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # stores indices, decreasing order of values
    result = []
    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove smaller elements from back
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        # Start recording once we have a full window
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result

# Test
print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))  # [3,3,5,5,6,7]
print(max_sliding_window([1], 1))                   # [1]
print(max_sliding_window([9,11], 2))                # [11]`,
      starterCode: `def max_sliding_window(nums, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', expected: '[3,3,5,5,6,7]' },
        { input: 'nums = [1], k = 1', expected: '[1]' },
        { input: 'nums = [9,11], k = 2', expected: '[11]' },
      ],
    },
  },
  {
    id: 'rotten-oranges',
    number: 37,
    name: 'Rotten Oranges (Multi-source BFS)',
    categoryId: 'queue',
    identify: 'Spread from multiple sources simultaneously',
    sampleProblem: {
      id: 'rotting-oranges',
      title: 'Rotting Oranges',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'DoorDash'],
      description:
        'You are given an m x n grid where each cell can have one of three values: 0 (empty), 1 (fresh orange), 2 (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.',
      examples: [
        { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4' },
        { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: '-1' },
        { input: 'grid = [[0,2]]', output: '0' },
      ],
      approach:
        '**Multi-Source BFS**: Start BFS from all rotten oranges simultaneously. Each level of BFS represents one minute. Track fresh orange count; decrement when they rot. Return minutes if all fresh rot, else -1.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      solution: `from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    if fresh == 0:
        return 0
    minutes = 0
    directions = [(0,1),(0,-1),(1,0),(-1,0)]
    while queue:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
        minutes += 1
    return minutes - 1 if fresh == 0 else -1

# Test
print(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]))  # 4
print(oranges_rotting([[2,1,1],[0,1,1],[1,0,1]]))  # -1
print(oranges_rotting([[0,2]]))                    # 0`,
      starterCode: `def oranges_rotting(grid):
    # Your code here
    pass`,
      testCases: [
        { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', expected: '4' },
        { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', expected: '-1' },
        { input: 'grid = [[0,2]]', expected: '0' },
      ],
    },
  },
  {
    id: 'bfs-queue',
    number: 38,
    name: 'BFS using Queue',
    categoryId: 'queue',
    identify: 'Level-by-level traversal, shortest path in unweighted graph',
    sampleProblem: {
      id: 'binary-tree-level-order',
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'medium',
      companies: ['Amazon', 'Google'],
      description:
        'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
      examples: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
        { input: 'root = [1]', output: '[[1]]' },
        { input: 'root = []', output: '[]' },
      ],
      approach:
        '**BFS Queue**: Use a queue initialized with root. Process level by level: for each level, record its size, process exactly that many nodes, enqueue their children. Collect values per level.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result

# Build tree: [3,9,20,null,null,15,7]
root1 = TreeNode(3)
root1.left = TreeNode(9)
root1.right = TreeNode(20)
root1.right.left = TreeNode(15)
root1.right.right = TreeNode(7)
print(level_order(root1))   # [[3],[9,20],[15,7]]

root2 = TreeNode(1)
print(level_order(root2))   # [[1]]

print(level_order(None))    # []`,
      starterCode: `def level_order(root):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' },
        { input: 'root = [1]', expected: '[[1]]' },
        { input: 'root = []', expected: '[]' },
      ],
    },
  },
  {
    id: 'classic-bs',
    number: 39,
    name: 'Classic Binary Search',
    categoryId: 'binary-search',
    identify: 'Search in sorted array in O(log n)',
    sampleProblem: {
      id: 'binary-search',
      title: 'Binary Search',
      difficulty: 'easy',
      companies: ['Google', 'Amazon', 'TCS'],
      description:
        'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.',
      examples: [
        { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
        { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
        { input: 'nums = [5], target = 5', output: '0' },
      ],
      approach:
        '**Classic Binary Search**: Maintain left and right pointers. Calculate mid = left + (right - left) // 2. If target == nums[mid], return mid. If target < nums[mid], search left half. Else search right half.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      solution: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Test
print(binary_search([-1,0,3,5,9,12], 9))   # 4
print(binary_search([-1,0,3,5,9,12], 2))   # -1
print(binary_search([5], 5))               # 0`,
      starterCode: `def binary_search(nums, target):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4' },
        { input: 'nums = [-1,0,3,5,9,12], target = 2', expected: '-1' },
        { input: 'nums = [5], target = 5', expected: '0' },
      ],
    },
  },
  {
    id: 'lower-upper-bound',
    number: 40,
    name: 'Lower/Upper Bound',
    categoryId: 'binary-search',
    identify: 'First/last position of element in sorted array',
    sampleProblem: {
      id: 'find-first-last-position',
      title: 'Find First and Last Position of Element in Sorted Array',
      difficulty: 'medium',
      companies: ['Google', 'Microsoft'],
      description:
        'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1].',
      examples: [
        { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' },
        { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]' },
        { input: 'nums = [], target = 0', output: '[-1,-1]' },
      ],
      approach:
        '**Binary Search Bounds**: Run binary search twice — once for first occurrence (move right when found, to find earlier), once for last occurrence (move left when found, to find later).',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      solution: `def search_range(nums, target):
    def find_bound(find_first):
        left, right = 0, len(nums) - 1
        bound = -1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                bound = mid
                if find_first:
                    right = mid - 1  # keep searching left
                else:
                    left = mid + 1   # keep searching right
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return bound

    return [find_bound(True), find_bound(False)]

# Test
print(search_range([5,7,7,8,8,10], 8))  # [3, 4]
print(search_range([5,7,7,8,8,10], 6))  # [-1, -1]
print(search_range([], 0))              # [-1, -1]`,
      starterCode: `def search_range(nums, target):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [5,7,7,8,8,10], target = 8', expected: '[3,4]' },
        { input: 'nums = [5,7,7,8,8,10], target = 6', expected: '[-1,-1]' },
        { input: 'nums = [], target = 0', expected: '[-1,-1]' },
      ],
    },
  },
  {
    id: 'rotated-sorted',
    number: 41,
    name: 'Search in Rotated Sorted Array',
    categoryId: 'binary-search',
    identify: 'Array sorted but rotated at unknown pivot',
    sampleProblem: {
      id: 'search-rotated-sorted-array',
      title: 'Search in Rotated Sorted Array',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
      examples: [
        { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
        { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
        { input: 'nums = [1], target = 0', output: '-1' },
      ],
      approach:
        '**Rotated Binary Search**: In each step, one half is always sorted. Check which half is sorted using mid comparison. If target is in the sorted half\'s range, search there. Otherwise search other half.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      solution: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
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

# Test
print(search([4,5,6,7,0,1,2], 0))  # 4
print(search([4,5,6,7,0,1,2], 3))  # -1
print(search([1], 0))              # -1`,
      starterCode: `def search(nums, target):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [4,5,6,7,0,1,2], target = 0', expected: '4' },
        { input: 'nums = [4,5,6,7,0,1,2], target = 3', expected: '-1' },
        { input: 'nums = [1], target = 0', expected: '-1' },
      ],
    },
  },
  {
    id: 'find-peak',
    number: 42,
    name: 'Find Peak Element',
    categoryId: 'binary-search',
    identify: 'Find local maximum in unsorted array',
    sampleProblem: {
      id: 'find-peak-element',
      title: 'Find Peak Element',
      difficulty: 'medium',
      companies: ['Google', 'Facebook', 'Microsoft'],
      description:
        'A peak element is an element that is strictly greater than its neighbors. Given an integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peak elements.',
      examples: [
        { input: 'nums = [1,2,3,1]', output: '2' },
        { input: 'nums = [1,2,1,3,5,6,4]', output: '5' },
        { input: 'nums = [1]', output: '0' },
      ],
      approach:
        '**Binary Search for Peak**: If nums[mid] < nums[mid+1], peak is in right half. If nums[mid] > nums[mid+1], peak is in left half (including mid). This always converges to a peak.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      solution: `def find_peak_element(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] < nums[mid + 1]:
            left = mid + 1
        else:
            right = mid
    return left

# Test
print(find_peak_element([1,2,3,1]))      # 2
print(find_peak_element([1,2,1,3,5,6,4]))  # 5
print(find_peak_element([1]))            # 0`,
      starterCode: `def find_peak_element(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,2,3,1]', expected: '2' },
        { input: 'nums = [1,2,1,3,5,6,4]', expected: '5' },
        { input: 'nums = [1]', expected: '0' },
      ],
    },
  },
  {
    id: 'bs-on-answer',
    number: 43,
    name: 'Binary Search on Answer',
    categoryId: 'binary-search',
    identify: 'Minimize maximum / maximize minimum, optimization',
    sampleProblem: {
      id: 'koko-eating-bananas',
      title: 'Koko Eating Bananas',
      difficulty: 'medium',
      companies: ['Google', 'Amazon', 'Facebook'],
      description:
        'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. Koko can decide her bananas-per-hour eating speed of k. She wants to finish eating all the bananas before the guards come back. Return the minimum integer k such that she can eat all the bananas within h hours.',
      examples: [
        { input: 'piles = [3,6,7,11], h = 8', output: '4' },
        { input: 'piles = [30,11,23,4,20], h = 5', output: '30' },
        { input: 'piles = [30,11,23,4,20], h = 6', output: '23' },
      ],
      approach:
        '**Binary Search on Answer**: Search the answer space [1, max(piles)]. For each speed k, compute total hours needed. If hours <= h, k might work — try lower. If hours > h, k is too slow — try higher.',
      timeComplexity: 'O(n log m) where m = max pile size',
      spaceComplexity: 'O(1)',
      solution: `import math

def min_eating_speed(piles, h):
    left, right = 1, max(piles)
    result = right
    while left <= right:
        mid = left + (right - left) // 2
        hours = sum(math.ceil(p / mid) for p in piles)
        if hours <= h:
            result = mid
            right = mid - 1
        else:
            left = mid + 1
    return result

# Test
print(min_eating_speed([3,6,7,11], 8))       # 4
print(min_eating_speed([30,11,23,4,20], 5))  # 30
print(min_eating_speed([30,11,23,4,20], 6))  # 23`,
      starterCode: `def min_eating_speed(piles, h):
    # Your code here
    pass`,
      testCases: [
        { input: 'piles = [3,6,7,11], h = 8', expected: '4' },
        { input: 'piles = [30,11,23,4,20], h = 5', expected: '30' },
        { input: 'piles = [30,11,23,4,20], h = 6', expected: '23' },
      ],
    },
  },
  {
    id: 'subsets-pattern',
    number: 44,
    name: 'Subsets (Power Set)',
    categoryId: 'recursion',
    identify: 'Generate all possible subsets of array',
    sampleProblem: {
      id: 'subsets',
      title: 'Subsets',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
      examples: [
        { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
        { input: 'nums = [0]', output: '[[],[0]]' },
        { input: 'nums = [1,2]', output: '[[],[1],[2],[1,2]]' },
      ],
      approach:
        '**Backtracking Subsets**: At each index, choose to include or exclude the element. Recurse for both choices. When index reaches end, add current subset to results. Or iteratively: for each new element, add it to all existing subsets.',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(n * 2^n)',
      solution: `def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(list(current))
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return result

# Test
print(subsets([1,2,3]))  # [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
print(subsets([0]))      # [[], [0]]
print(subsets([1,2]))    # [[], [1], [1,2], [2]]`,
      starterCode: `def subsets(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,2,3]', expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
        { input: 'nums = [0]', expected: '[[],[0]]' },
        { input: 'nums = [1,2]', expected: '[[],[1],[2],[1,2]]' },
      ],
    },
  },
  {
    id: 'permutations-pattern',
    number: 45,
    name: 'Permutations',
    categoryId: 'recursion',
    identify: 'All possible orderings of elements',
    sampleProblem: {
      id: 'permutations',
      title: 'Permutations',
      difficulty: 'medium',
      companies: ['Microsoft', 'Amazon', 'Google'],
      description:
        'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
      examples: [
        { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
        { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
        { input: 'nums = [1]', output: '[[1]]' },
      ],
      approach:
        '**Backtracking Permutations**: Use a visited array or swap-based approach. At each position, try each unused element. After placing, recurse for next position. Backtrack by unmarking/swapping back.',
      timeComplexity: 'O(n! * n)',
      spaceComplexity: 'O(n)',
      solution: `def permute(nums):
    result = []
    used = [False] * len(nums)
    def backtrack(current):
        if len(current) == len(nums):
            result.append(list(current))
            return
        for i in range(len(nums)):
            if not used[i]:
                used[i] = True
                current.append(nums[i])
                backtrack(current)
                current.pop()
                used[i] = False
    backtrack([])
    return result

# Test
print(permute([1,2,3]))  # [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
print(permute([0,1]))    # [[0,1],[1,0]]
print(permute([1]))      # [[1]]`,
      starterCode: `def permute(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,2,3]', expected: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
        { input: 'nums = [0,1]', expected: '[[0,1],[1,0]]' },
        { input: 'nums = [1]', expected: '[[1]]' },
      ],
    },
  },
  {
    id: 'combination-sum-pattern',
    number: 46,
    name: 'Combination Sum',
    categoryId: 'recursion',
    identify: 'Find all combinations that sum to target',
    sampleProblem: {
      id: 'combination-sum',
      title: 'Combination Sum',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Adobe'],
      description:
        'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.',
      examples: [
        { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
        { input: 'candidates = [2,3,4,6,7], target = 7', output: '[[2,2,3],[3,4],[7]]' },
        { input: 'candidates = [2], target = 1', output: '[]' },
      ],
      approach:
        '**Backtracking with Reuse**: At each step, try each candidate starting from current index (allow reuse). Add to current combination. If sum equals target, save. If sum exceeds target, backtrack. Move to next candidate to avoid duplicates.',
      timeComplexity: 'O(n^(t/m)) where t=target, m=min candidate',
      spaceComplexity: 'O(t/m)',
      solution: `def combination_sum(candidates, target):
    result = []
    def backtrack(start, current, remaining):
        if remaining == 0:
            result.append(list(current))
            return
        for i in range(start, len(candidates)):
            if candidates[i] <= remaining:
                current.append(candidates[i])
                backtrack(i, current, remaining - candidates[i])
                current.pop()
    backtrack(0, [], target)
    return result

# Test
print(combination_sum([2,3,6,7], 7))      # [[2,2,3],[7]]
print(combination_sum([2,3,4,6,7], 7))    # [[2,2,3],[3,4],[7]]
print(combination_sum([2], 1))            # []`,
      starterCode: `def combination_sum(candidates, target):
    # Your code here
    pass`,
      testCases: [
        { input: 'candidates = [2,3,6,7], target = 7', expected: '[[2,2,3],[7]]' },
        { input: 'candidates = [2,3,4,6,7], target = 7', expected: '[[2,2,3],[3,4],[7]]' },
        { input: 'candidates = [2], target = 1', expected: '[]' },
      ],
    },
  },
  {
    id: 'n-queens-pattern',
    number: 47,
    name: 'N-Queens',
    categoryId: 'recursion',
    identify: 'Place N queens on N×N board with no attacks',
    sampleProblem: {
      id: 'n-queens',
      title: 'N-Queens',
      difficulty: 'hard',
      companies: ['Google', 'Amazon', 'Microsoft'],
      description:
        'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration, where \'Q\' indicates a queen and \'.\' indicates an empty space.',
      examples: [
        { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
        { input: 'n = 1', output: '[["Q"]]' },
        { input: 'n = 2', output: '[]' },
      ],
      approach:
        '**N-Queens Backtracking**: Place queens row by row. Use sets to track occupied columns, diagonals (row-col), and anti-diagonals (row+col). For each row, try each column — if safe, place queen and recurse to next row.',
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
      solution: `def solve_n_queens(n):
    result = []
    cols = set()
    diag = set()     # row - col
    anti_diag = set()  # row + col
    board = [['.' ] * n for _ in range(n)]

    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row - col) in diag or (row + col) in anti_diag:
                continue
            cols.add(col)
            diag.add(row - col)
            anti_diag.add(row + col)
            board[row][col] = 'Q'
            backtrack(row + 1)
            board[row][col] = '.'
            cols.remove(col)
            diag.remove(row - col)
            anti_diag.remove(row + col)

    backtrack(0)
    return result

# Test
print(len(solve_n_queens(4)))  # 2
print(len(solve_n_queens(1)))  # 1`,
      starterCode: `def solve_n_queens(n):
    # Your code here
    pass`,
      testCases: [
        { input: 'n = 4', expected: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
        { input: 'n = 1', expected: '[["Q"]]' },
      ],
    },
  },
  {
    id: 'sudoku-solver',
    number: 48,
    name: 'Sudoku Solver',
    categoryId: 'recursion',
    identify: 'Fill grid satisfying row/col/box constraints',
    sampleProblem: {
      id: 'sudoku-solver',
      title: 'Sudoku Solver',
      difficulty: 'hard',
      companies: ['Google', 'Microsoft', 'Amazon'],
      description:
        'Write a program to solve a Sudoku puzzle by filling the empty cells. A Sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row, column, and each of the nine 3x3 sub-boxes.',
      examples: [
        {
          input: "board = [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]",
          output: 'Solved board',
        },
      ],
      approach:
        '**Sudoku Backtracking**: Find next empty cell. Try digits 1-9. For each digit, check if valid in row, column, and 3x3 box. If valid, place and recurse. If recursion succeeds, done. Else backtrack and try next digit.',
      timeComplexity: 'O(9^m) where m = number of empty cells',
      spaceComplexity: 'O(m)',
      solution: `def solve_sudoku(board):
    def is_valid(board, row, col, num):
        # Check row
        if num in board[row]:
            return False
        # Check column
        if num in [board[r][col] for r in range(9)]:
            return False
        # Check 3x3 box
        box_r, box_c = 3 * (row // 3), 3 * (col // 3)
        for r in range(box_r, box_r + 3):
            for c in range(box_c, box_c + 3):
                if board[r][c] == num:
                    return False
        return True

    def solve(board):
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    for num in '123456789':
                        if is_valid(board, r, c, num):
                            board[r][c] = num
                            if solve(board):
                                return True
                            board[r][c] = '.'
                    return False
        return True

    solve(board)

# Test
board = [
    ['5','3','.','.','7','.','.','.','.'],
    ['6','.','.','1','9','5','.','.','.'],
    ['.','9','8','.','.','.','.','6','.'],
    ['8','.','.','.','6','.','.','.','3'],
    ['4','.','.','8','.','3','.','.','1'],
    ['7','.','.','.','2','.','.','.','6'],
    ['.','6','.','.','.','.','2','8','.'],
    ['.','.','.','4','1','9','.','.','5'],
    ['.','.','.','.','8','.','.','7','9']
]
solve_sudoku(board)
print(board[0])  # ['5', '3', '4', '6', '7', '8', '9', '1', '2']`,
      starterCode: `def solve_sudoku(board):
    # Your code here
    pass`,
      testCases: [
        {
          input: "board = [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]",
          expected: 'Solved board',
        },
      ],
    },
  },
  {
    id: 'palindrome-partitioning',
    number: 49,
    name: 'Palindrome Partitioning',
    categoryId: 'recursion',
    identify: 'Partition string so every part is palindrome',
    sampleProblem: {
      id: 'palindrome-partitioning',
      title: 'Palindrome Partitioning',
      difficulty: 'medium',
      companies: ['Google', 'Amazon'],
      description:
        'Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.',
      examples: [
        { input: "s = 'aab'", output: "[['a','a','b'],['aa','b']]" },
        { input: "s = 'a'", output: "[['a']]" },
        { input: "s = 'aba'", output: "[['a','b','a'],['aba']]" },
      ],
      approach:
        '**Backtracking + Palindrome Check**: For each starting position, try all possible substrings. If substring is palindrome, add to current partition and recurse for remainder. When start reaches end, save current partition.',
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(n)',
      solution: `def partition(s):
    result = []
    def is_palindrome(sub):
        return sub == sub[::-1]
    def backtrack(start, current):
        if start == len(s):
            result.append(list(current))
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if is_palindrome(sub):
                current.append(sub)
                backtrack(end, current)
                current.pop()
    backtrack(0, [])
    return result

# Test
print(partition('aab'))  # [['a', 'a', 'b'], ['aa', 'b']]
print(partition('a'))    # [['a']]
print(partition('aba'))  # [['a', 'b', 'a'], ['aba']]`,
      starterCode: `def partition(s):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'aab'", expected: "[['a','a','b'],['aa','b']]" },
        { input: "s = 'a'", expected: "[['a']]" },
        { input: "s = 'aba'", expected: "[['a','b','a'],['aba']]" },
      ],
    },
  },
  {
    id: 'tree-dfs',
    number: 50,
    name: 'DFS Traversals (Pre/In/Post)',
    categoryId: 'tree',
    identify: 'Visit all nodes in specific order',
    sampleProblem: {
      id: 'binary-tree-inorder-traversal',
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'easy',
      companies: ['Microsoft', 'Amazon'],
      description:
        'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
      examples: [
        { input: 'root = [1,null,2,3]', output: '[1,3,2]' },
        { input: 'root = []', output: '[]' },
        { input: 'root = [1]', output: '[1]' },
      ],
      approach:
        '**DFS Inorder Traversal**: For inorder (left-root-right): recursively traverse left subtree, visit root, recursively traverse right subtree. Iterative approach uses explicit stack.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is height',
      solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Recursive
def inorder_recursive(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result

# Iterative
def inorder_iterative(root):
    result = []
    stack = []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    return result

# Test
root = TreeNode(1)
root.right = TreeNode(2)
root.right.left = TreeNode(3)
print(inorder_recursive(root))  # [1, 3, 2]
print(inorder_iterative(root))  # [1, 3, 2]
print(inorder_recursive(None))  # []`,
      starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [1,null,2,3]', expected: '[1,3,2]' },
        { input: 'root = []', expected: '[]' },
        { input: 'root = [1]', expected: '[1]' },
      ],
    },
  },
  {
    id: 'tree-bfs',
    number: 51,
    name: 'BFS Level Order',
    categoryId: 'tree',
    identify: 'Process tree level by level',
    sampleProblem: {
      id: 'binary-tree-level-order-traversal',
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'medium',
      companies: ['Amazon', 'Google'],
      description:
        'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
      examples: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
        { input: 'root = [1]', output: '[[1]]' },
        { input: 'root = []', output: '[]' },
      ],
      approach:
        '**BFS with Queue**: Initialize queue with root. For each level, determine level size (current queue length). Process that many nodes, collecting values, and enqueue their children.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result

# Test
root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20)
root.right.left = TreeNode(15)
root.right.right = TreeNode(7)
print(level_order(root))   # [[3], [9, 20], [15, 7]]
print(level_order(TreeNode(1)))  # [[1]]
print(level_order(None))   # []`,
      starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' },
        { input: 'root = [1]', expected: '[[1]]' },
        { input: 'root = []', expected: '[]' },
      ],
    },
  },
  {
    id: 'tree-diameter',
    number: 52,
    name: 'Height / Diameter of Tree',
    categoryId: 'tree',
    identify: 'Longest path in tree, height computation',
    sampleProblem: {
      id: 'diameter-of-binary-tree',
      title: 'Diameter of Binary Tree',
      difficulty: 'easy',
      companies: ['Facebook', 'Google', 'Amazon'],
      description:
        'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.',
      examples: [
        { input: 'root = [1,2,3,4,5]', output: '3', explanation: 'Longest path is [4,2,1,3] or [5,2,1,3]' },
        { input: 'root = [1,2]', output: '1' },
        { input: 'root = [1]', output: '0' },
      ],
      approach:
        '**Post-order DFS**: For each node, compute left and right heights recursively. Diameter through this node = leftHeight + rightHeight. Update global maximum. Return height = 1 + max(left, right) to parent.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameter_of_binary_tree(root):
    max_diameter = [0]
    def height(node):
        if not node:
            return 0
        left_h = height(node.left)
        right_h = height(node.right)
        max_diameter[0] = max(max_diameter[0], left_h + right_h)
        return 1 + max(left_h, right_h)
    height(root)
    return max_diameter[0]

# Test
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
print(diameter_of_binary_tree(root))   # 3
root2 = TreeNode(1)
root2.left = TreeNode(2)
print(diameter_of_binary_tree(root2))  # 1
print(diameter_of_binary_tree(TreeNode(1)))  # 0`,
      starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameter_of_binary_tree(root):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [1,2,3,4,5]', expected: '3' },
        { input: 'root = [1,2]', expected: '1' },
        { input: 'root = [1]', expected: '0' },
      ],
    },
  },
  {
    id: 'lca',
    number: 53,
    name: 'Lowest Common Ancestor',
    categoryId: 'tree',
    identify: 'Find deepest common ancestor of two nodes',
    sampleProblem: {
      id: 'lowest-common-ancestor-binary-tree',
      title: 'Lowest Common Ancestor of a Binary Tree',
      difficulty: 'medium',
      companies: ['Facebook', 'Amazon', 'Google'],
      description:
        'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q. The LCA is defined as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).',
      examples: [
        { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3' },
        { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5' },
        { input: 'root = [1,2], p = 1, q = 2', output: '1' },
      ],
      approach:
        '**Recursive LCA**: If root is null, p, or q, return root. Recursively find LCA in left and right subtrees. If both return non-null, current node is LCA. Otherwise return the non-null result.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right:
        return root
    return left if left else right

# Test
root = TreeNode(3)
root.left = TreeNode(5)
root.right = TreeNode(1)
root.left.left = TreeNode(6)
root.left.right = TreeNode(2)
root.right.left = TreeNode(0)
root.right.right = TreeNode(8)
p, q = root.left, root.right
print(lowest_common_ancestor(root, p, q).val)  # 3
p2, q2 = root.left, root.left.right
print(lowest_common_ancestor(root, p2, q2).val)  # 5`,
      starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root, p, q):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', expected: '3' },
        { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', expected: '5' },
        { input: 'root = [1,2], p = 1, q = 2', expected: '1' },
      ],
    },
  },
  {
    id: 'validate-bst-pattern',
    number: 54,
    name: 'Validate BST',
    categoryId: 'tree',
    identify: 'Verify binary search tree property with bounds',
    sampleProblem: {
      id: 'validate-binary-search-tree',
      title: 'Validate Binary Search Tree',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST has: left subtree nodes with keys strictly less than root, right subtree nodes with keys strictly greater than root, both subtrees are also BSTs.',
      examples: [
        { input: 'root = [2,1,3]', output: 'true' },
        { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: "Root node's value is 5 but right child's value is 4" },
        { input: 'root = [1,1]', output: 'false' },
      ],
      approach:
        '**BST Validation with Bounds**: Pass valid range (min_val, max_val) to each node. Root has range (-inf, +inf). Left child must be in (min_val, node.val). Right child must be in (node.val, max_val).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    return validate(root, float('-inf'), float('inf'))

# Test
root1 = TreeNode(2)
root1.left = TreeNode(1)
root1.right = TreeNode(3)
print(is_valid_bst(root1))  # True

root2 = TreeNode(5)
root2.left = TreeNode(1)
root2.right = TreeNode(4)
root2.right.left = TreeNode(3)
root2.right.right = TreeNode(6)
print(is_valid_bst(root2))  # False

root3 = TreeNode(1)
root3.left = TreeNode(1)
print(is_valid_bst(root3))  # False`,
      starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [2,1,3]', expected: 'true' },
        { input: 'root = [5,1,4,null,null,3,6]', expected: 'false' },
        { input: 'root = [1,1]', expected: 'false' },
      ],
    },
  },
  {
    id: 'kth-smallest-bst',
    number: 55,
    name: 'Kth Smallest in BST',
    categoryId: 'tree',
    identify: 'Find kth element using inorder traversal property',
    sampleProblem: {
      id: 'kth-smallest-element-in-bst',
      title: 'Kth Smallest Element in a BST',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Bloomberg'],
      description:
        'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
      examples: [
        { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
        { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' },
        { input: 'root = [1], k = 1', output: '1' },
      ],
      approach:
        '**Inorder Traversal**: BST\'s inorder traversal gives sorted order. Do iterative inorder traversal, decrement k at each node. When k reaches 0, that node\'s value is the answer.',
      timeComplexity: 'O(H + k) where H is tree height',
      spaceComplexity: 'O(H)',
      solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root, k):
    stack = []
    curr = root
    count = 0
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        count += 1
        if count == k:
            return curr.val
        curr = curr.right
    return -1

# Test
root = TreeNode(3)
root.left = TreeNode(1)
root.right = TreeNode(4)
root.left.right = TreeNode(2)
print(kth_smallest(root, 1))  # 1

root2 = TreeNode(5)
root2.left = TreeNode(3)
root2.right = TreeNode(6)
root2.left.left = TreeNode(2)
root2.left.right = TreeNode(4)
root2.left.left.left = TreeNode(1)
print(kth_smallest(root2, 3))  # 3`,
      starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [3,1,4,null,2], k = 1', expected: '1' },
        { input: 'root = [5,3,6,2,4,null,null,1], k = 3', expected: '3' },
        { input: 'root = [1], k = 1', expected: '1' },
      ],
    },
  },
  {
    id: 'serialize-tree',
    number: 56,
    name: 'Serialize/Deserialize Tree',
    categoryId: 'tree',
    identify: 'Convert tree to string and back',
    sampleProblem: {
      id: 'serialize-deserialize-binary-tree',
      title: 'Serialize and Deserialize Binary Tree',
      difficulty: 'hard',
      companies: ['Google', 'Amazon', 'Facebook'],
      description:
        'Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or transmitted. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.',
      examples: [
        { input: 'root = [1,2,3,null,null,4,5]', output: 'serialize then deserialize gives same tree' },
        { input: 'root = []', output: 'empty tree' },
      ],
      approach:
        '**BFS Serialization**: Serialize with level-order (BFS), marking null children as \'null\'. Deserialize by reading tokens and rebuilding tree level by level using a queue.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root):
        if not root:
            return ''
        result = []
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if node:
                result.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                result.append('null')
        return ','.join(result)

    def deserialize(self, data):
        if not data:
            return None
        tokens = data.split(',')
        root = TreeNode(int(tokens[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(tokens):
            node = queue.popleft()
            if i < len(tokens) and tokens[i] != 'null':
                node.left = TreeNode(int(tokens[i]))
                queue.append(node.left)
            i += 1
            if i < len(tokens) and tokens[i] != 'null':
                node.right = TreeNode(int(tokens[i]))
                queue.append(node.right)
            i += 1
        return root

# Test
codec = Codec()
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.right.left = TreeNode(4)
root.right.right = TreeNode(5)
serialized = codec.serialize(root)
print(serialized)  # 1,2,3,null,null,4,5
deserialized = codec.deserialize(serialized)
print(codec.serialize(deserialized))  # 1,2,3,null,null,4,5
print(codec.serialize(codec.deserialize('')))  # ''`,
      starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root):
        # Your code here
        pass

    def deserialize(self, data):
        # Your code here
        pass`,
      testCases: [
        { input: 'root = [1,2,3,null,null,4,5]', expected: 'serialize then deserialize gives same tree' },
        { input: 'root = []', expected: 'empty tree' },
      ],
    },
  },
  {
    id: 'path-sum',
    number: 57,
    name: 'Path Sum Problems',
    categoryId: 'tree',
    identify: 'Sum along root-to-leaf paths, max path sum',
    sampleProblem: {
      id: 'path-sum',
      title: 'Path Sum',
      difficulty: 'easy',
      companies: ['Amazon', 'Microsoft', 'Google'],
      description:
        'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
      examples: [
        { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true' },
        { input: 'root = [1,2,3], targetSum = 5', output: 'false' },
        { input: 'root = [], targetSum = 0', output: 'false' },
      ],
      approach:
        '**DFS Path Sum**: Subtract node value from target as you go deeper. At leaf node, check if remaining target is 0. Recursively check left and right subtrees.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_path_sum(root, target_sum):
    if not root:
        return False
    # Leaf node
    if not root.left and not root.right:
        return root.val == target_sum
    remaining = target_sum - root.val
    return has_path_sum(root.left, remaining) or has_path_sum(root.right, remaining)

# Test
root = TreeNode(5)
root.left = TreeNode(4)
root.right = TreeNode(8)
root.left.left = TreeNode(11)
root.left.left.left = TreeNode(7)
root.left.left.right = TreeNode(2)
root.right.left = TreeNode(13)
root.right.right = TreeNode(4)
root.right.right.right = TreeNode(1)
print(has_path_sum(root, 22))  # True

root2 = TreeNode(1)
root2.left = TreeNode(2)
root2.right = TreeNode(3)
print(has_path_sum(root2, 5))  # False
print(has_path_sum(None, 0))   # False`,
      starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_path_sum(root, target_sum):
    # Your code here
    pass`,
      testCases: [
        { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', expected: 'true' },
        { input: 'root = [1,2,3], targetSum = 5', expected: 'false' },
        { input: 'root = [], targetSum = 0', expected: 'false' },
      ],
    },
  },
  {
    id: 'top-k-elements',
    number: 58,
    name: 'Top K Elements',
    categoryId: 'heap',
    identify: 'Find K largest/smallest/frequent elements',
    sampleProblem: {
      id: 'top-k-frequent-elements',
      title: 'Top K Frequent Elements',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Facebook'],
      description:
        'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
      examples: [
        { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
        { input: 'nums = [1], k = 1', output: '[1]' },
        { input: 'nums = [1,2,2,3,3,3], k = 2', output: '[2,3]' },
      ],
      approach:
        '**Min Heap of Size K**: Count frequencies with Counter. Use min-heap of size k. For each element, push (freq, element). If heap size exceeds k, pop minimum. Final heap contains top k frequent elements.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(n)',
      solution: `import heapq
from collections import Counter

def top_k_frequent(nums, k):
    count = Counter(nums)
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return [num for freq, num in heap]

# Test
print(top_k_frequent([1,1,1,2,2,3], 2))    # [2, 1] or [1, 2]
print(top_k_frequent([1], 1))              # [1]
print(top_k_frequent([1,2,2,3,3,3], 2))   # [2, 3] or [3, 2]`,
      starterCode: `import heapq
from collections import Counter

def top_k_frequent(nums, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,1,1,2,2,3], k = 2', expected: '[1,2]' },
        { input: 'nums = [1], k = 1', expected: '[1]' },
        { input: 'nums = [1,2,2,3,3,3], k = 2', expected: '[2,3]' },
      ],
    },
  },
  {
    id: 'kth-largest-pattern',
    number: 59,
    name: 'Kth Largest Element',
    categoryId: 'heap',
    identify: 'Find kth largest in stream or array',
    sampleProblem: {
      id: 'kth-largest-element-in-array',
      title: 'Kth Largest Element in an Array',
      difficulty: 'medium',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
      examples: [
        { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
        { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
        { input: 'nums = [1], k = 1', output: '1' },
      ],
      approach:
        '**Min Heap**: Maintain a min-heap of size k. Iterate through array: push each element, if heap size > k, pop the minimum. After processing all elements, heap top is kth largest.',
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      solution: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

# Test
print(find_kth_largest([3,2,1,5,6,4], 2))        # 5
print(find_kth_largest([3,2,3,1,2,4,5,5,6], 4))  # 4
print(find_kth_largest([1], 1))                  # 1`,
      starterCode: `import heapq

def find_kth_largest(nums, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [3,2,1,5,6,4], k = 2', expected: '5' },
        { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', expected: '4' },
        { input: 'nums = [1], k = 1', expected: '1' },
      ],
    },
  },
  {
    id: 'merge-k-sorted',
    number: 60,
    name: 'Merge K Sorted Lists',
    categoryId: 'heap',
    identify: 'Merge multiple sorted sequences efficiently',
    sampleProblem: {
      id: 'merge-k-sorted-lists',
      title: 'Merge k Sorted Lists',
      difficulty: 'hard',
      companies: ['Amazon', 'Google', 'Microsoft'],
      description:
        'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
      examples: [
        { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
        { input: 'lists = []', output: '[]' },
        { input: 'lists = [[]]', output: '[]' },
      ],
      approach:
        '**Min Heap Merge**: Add head of each list to min heap. Repeatedly pop minimum node, add to result, and push its next node (if exists). This ensures always picking smallest available node.',
      timeComplexity: 'O(n log k) where n = total nodes, k = number of lists',
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

def list_to_array(node):
    result = []
    while node:
        result.append(node.val)
        node = node.next
    return result

def array_to_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

# Test
lists = [array_to_list([1,4,5]), array_to_list([1,3,4]), array_to_list([2,6])]
print(list_to_array(merge_k_lists(lists)))  # [1, 1, 2, 3, 4, 4, 5, 6]
print(list_to_array(merge_k_lists([])))     # []
print(list_to_array(merge_k_lists([None]))) # []`,
      starterCode: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists):
    # Your code here
    pass`,
      testCases: [
        { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' },
        { input: 'lists = []', expected: '[]' },
        { input: 'lists = [[]]', expected: '[]' },
      ],
    },
  },
  {
    id: 'median-stream',
    number: 61,
    name: 'Median of Data Stream',
    categoryId: 'heap',
    identify: 'Find median dynamically as numbers added',
    sampleProblem: {
      id: 'find-median-from-data-stream',
      title: 'Find Median from Data Stream',
      difficulty: 'hard' as const,
      companies: ['Google', 'Amazon', 'Microsoft'],
      description: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class: addNum(int num) adds an integer num from the data stream to the data structure. double findMedian() returns the median of current data elements.',
      examples: [
        { input: 'MedianFinder(); addNum(1); addNum(2); findMedian(); addNum(3); findMedian()', output: '1.5; 2.0' },
        { input: 'addNum(6); addNum(10); findMedian(); addNum(7); findMedian()', output: '8.0; 7.0' },
      ],
      approach: '**Two Heaps**: Maintain max-heap for lower half and min-heap for upper half. Balance sizes: lower half can have at most 1 more element. Median is top of larger heap or average of both tops.',
      timeComplexity: 'O(log n) per addNum, O(1) findMedian',
      spaceComplexity: 'O(n)',
      solution: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negated)
        self.large = []  # min-heap

    def addNum(self, num):
        heapq.heappush(self.small, -num)
        # Balance: move largest of small to large
        heapq.heappush(self.large, -heapq.heappop(self.small))
        # Ensure small has >= elements as large
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2.0

# Test
mf = MedianFinder()
mf.addNum(1)
mf.addNum(2)
print(mf.findMedian())  # 1.5
mf.addNum(3)
print(mf.findMedian())  # 2.0`,
      starterCode: `import heapq

class MedianFinder:
    def __init__(self):
        # Your code here
        pass

    def addNum(self, num):
        # Your code here
        pass

    def findMedian(self):
        # Your code here
        pass`,
      testCases: [
        { input: 'MedianFinder(); addNum(1); addNum(2); findMedian()', expected: '1.5' },
        { input: 'addNum(3); findMedian()', expected: '2.0' },
      ],
    },
  },
  {
    id: 'dfs-graph',
    number: 62,
    name: 'DFS Traversal',
    categoryId: 'graph',
    identify: 'Explore all paths depth-first, connected components',
    sampleProblem: {
      id: 'number-of-islands',
      title: 'Number of Islands',
      difficulty: 'medium' as const,
      companies: ['Amazon', 'Google', 'Bloomberg'],
      description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
      examples: [
        { input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", output: '1' },
        { input: "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", output: '3' },
        { input: "grid = [['1','0','0'],['0','1','0'],['0','0','1']]", output: '3' },
      ],
      approach: "**DFS Flood Fill**: When encountering '1', increment counter and DFS to mark all connected land cells as '0' (visited). Count how many times we start a new DFS.",
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) recursion stack',
      solution: `def numIslands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count

print(numIslands([['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]))  # 1
print(numIslands([['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]))  # 3
print(numIslands([['1','0','0'],['0','1','0'],['0','0','1']]))  # 3`,
      starterCode: `def numIslands(grid):
    # Your code here
    pass`,
      testCases: [
        { input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", expected: '1' },
        { input: "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", expected: '3' },
        { input: "grid = [['1','0','0'],['0','1','0'],['0','0','1']]", expected: '3' },
      ],
    },
  },
  {
    id: 'bfs-graph',
    number: 63,
    name: 'BFS Traversal',
    categoryId: 'graph',
    identify: 'Shortest path in unweighted graph, level spread',
    sampleProblem: {
      id: 'word-ladder',
      title: 'Word Ladder',
      difficulty: 'hard' as const,
      companies: ['Amazon', 'Google', 'Microsoft'],
      description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by exactly one character and every si is in wordList. Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.',
      examples: [
        { input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']", output: '5' },
        { input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log']", output: '0' },
        { input: "beginWord = 'a', endWord = 'c', wordList = ['a','b','c']", output: '2' },
      ],
      approach: '**BFS Word Transformation**: Use BFS where each level represents one transformation. For current word, try changing each character to a-z. If resulting word is in wordList and not visited, enqueue it. Return level count when endWord found.',
      timeComplexity: 'O(M^2 * N) where M = word length, N = dict size',
      spaceComplexity: 'O(M^2 * N)',
      solution: `from collections import deque

def ladderLength(beginWord, endWord, wordList):
    wordSet = set(wordList)
    if endWord not in wordSet:
        return 0
    queue = deque([(beginWord, 1)])
    visited = {beginWord}
    while queue:
        word, length = queue.popleft()
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                newWord = word[:i] + c + word[i+1:]
                if newWord == endWord:
                    return length + 1
                if newWord in wordSet and newWord not in visited:
                    visited.add(newWord)
                    queue.append((newWord, length + 1))
    return 0

print(ladderLength('hit', 'cog', ['hot','dot','dog','lot','log','cog']))  # 5
print(ladderLength('hit', 'cog', ['hot','dot','dog','lot','log']))  # 0
print(ladderLength('a', 'c', ['a','b','c']))  # 2`,
      starterCode: `from collections import deque

def ladderLength(beginWord, endWord, wordList):
    # Your code here
    pass`,
      testCases: [
        { input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']", expected: '5' },
        { input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log']", expected: '0' },
        { input: "beginWord = 'a', endWord = 'c', wordList = ['a','b','c']", expected: '2' },
      ],
    },
  },
  {
    id: 'cycle-detection',
    number: 64,
    name: 'Cycle Detection',
    categoryId: 'graph',
    identify: 'Detect cycle in directed/undirected graph',
    sampleProblem: {
      id: 'course-schedule',
      title: 'Course Schedule',
      difficulty: 'medium' as const,
      companies: ['Amazon', 'Google', 'Facebook'],
      description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.',
      examples: [
        { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
        { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false' },
        { input: 'numCourses = 3, prerequisites = [[0,1],[1,2]]', output: 'true' },
      ],
      approach: "**DFS Cycle Detection (Directed Graph)**: Use three states: 0=unvisited, 1=visiting, 2=visited. For each unvisited node, DFS. If we encounter a node in 'visiting' state, cycle exists. Mark as 'visited' after exploring all neighbors.",
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solution: `def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        graph[b].append(a)
    # 0=unvisited, 1=visiting, 2=visited
    state = [0] * numCourses

    def dfs(node):
        if state[node] == 1:
            return False  # cycle
        if state[node] == 2:
            return True
        state[node] = 1
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        state[node] = 2
        return True

    for i in range(numCourses):
        if not dfs(i):
            return False
    return True

print(canFinish(2, [[1,0]]))         # True
print(canFinish(2, [[1,0],[0,1]]))   # False
print(canFinish(3, [[0,1],[1,2]]))   # True`,
      starterCode: `def canFinish(numCourses, prerequisites):
    # Your code here
    pass`,
      testCases: [
        { input: 'numCourses = 2, prerequisites = [[1,0]]', expected: 'true' },
        { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expected: 'false' },
        { input: 'numCourses = 3, prerequisites = [[0,1],[1,2]]', expected: 'true' },
      ],
    },
  },
  {
    id: 'topological-sort',
    number: 65,
    name: 'Topological Sort',
    categoryId: 'graph',
    identify: 'Linear ordering of nodes with dependencies',
    sampleProblem: {
      id: 'course-schedule-ii',
      title: 'Course Schedule II',
      difficulty: 'medium' as const,
      companies: ['Amazon', 'Google', 'Facebook'],
      description: 'Given numCourses courses and prerequisites list, return the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return an empty array.',
      examples: [
        { input: 'numCourses = 2, prerequisites = [[1,0]]', output: '[0,1]' },
        { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,2,1,3]' },
        { input: 'numCourses = 1, prerequisites = []', output: '[0]' },
      ],
      approach: "**Kahn's Algorithm (BFS Topological Sort)**: Compute in-degree for each node. Enqueue all nodes with in-degree 0. Process queue: for each node, append to result, decrement neighbors' in-degrees. If neighbor's in-degree becomes 0, enqueue it.",
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      solution: `from collections import deque

def findOrder(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses
    for a, b in prerequisites:
        graph[b].append(a)
        in_degree[a] += 1
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    result = []
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return result if len(result) == numCourses else []

print(findOrder(2, [[1,0]]))                            # [0,1]
print(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))          # [0,1,2,3] or valid order
print(findOrder(1, []))                                  # [0]`,
      starterCode: `from collections import deque

def findOrder(numCourses, prerequisites):
    # Your code here
    pass`,
      testCases: [
        { input: 'numCourses = 2, prerequisites = [[1,0]]', expected: '[0,1]' },
        { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', expected: '[0,2,1,3]' },
        { input: 'numCourses = 1, prerequisites = []', expected: '[0]' },
      ],
    },
  },
  {
    id: 'dijkstra',
    number: 66,
    name: "Dijkstra's Algorithm",
    categoryId: 'graph',
    identify: 'Shortest path in weighted graph with non-negative weights',
    sampleProblem: {
      id: 'network-delay-time',
      title: 'Network Delay Time',
      difficulty: 'medium' as const,
      companies: ['Google', 'Amazon', 'Microsoft'],
      description: 'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.',
      examples: [
        { input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', output: '2' },
        { input: 'times = [[1,2,1]], n = 2, k = 1', output: '1' },
        { input: 'times = [[1,2,1]], n = 2, k = 2', output: '-1' },
      ],
      approach: '**Dijkstra with Min Heap**: Initialize distances to infinity, source to 0. Use min heap (dist, node). Pop minimum distance node, relax neighbors. If shorter path found, push to heap. Return max of all distances.',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V + E)',
      solution: `import heapq

def networkDelayTime(times, n, k):
    graph = {}
    for u, v, w in times:
        if u not in graph:
            graph[u] = []
        graph[u].append((v, w))
    dist = {i: float('inf') for i in range(1, n+1)}
    dist[k] = 0
    heap = [(0, k)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist[node]:
            continue
        for neighbor, weight in graph.get(node, []):
            newDist = d + weight
            if newDist < dist[neighbor]:
                dist[neighbor] = newDist
                heapq.heappush(heap, (newDist, neighbor))
    maxDist = max(dist.values())
    return maxDist if maxDist < float('inf') else -1

print(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # 2
print(networkDelayTime([[1,2,1]], 2, 1))                   # 1
print(networkDelayTime([[1,2,1]], 2, 2))                   # -1`,
      starterCode: `import heapq

def networkDelayTime(times, n, k):
    # Your code here
    pass`,
      testCases: [
        { input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', expected: '2' },
        { input: 'times = [[1,2,1]], n = 2, k = 1', expected: '1' },
        { input: 'times = [[1,2,1]], n = 2, k = 2', expected: '-1' },
      ],
    },
  },
  {
    id: 'union-find',
    number: 67,
    name: 'Union Find (Disjoint Set)',
    categoryId: 'graph',
    identify: 'Dynamic connectivity, grouping connected components',
    sampleProblem: {
      id: 'number-of-connected-components',
      title: 'Number of Connected Components',
      difficulty: 'medium' as const,
      companies: ['LinkedIn', 'Amazon', 'Google'],
      description: 'You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.',
      examples: [
        { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2' },
        { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' },
        { input: 'n = 3, edges = []', output: '3' },
      ],
      approach: '**Union Find**: Initialize parent array where parent[i] = i. For each edge, find roots of both nodes (with path compression). If different roots, union them (attach one root to other) and decrement component count.',
      timeComplexity: 'O(E * alpha(N)) nearly O(E)',
      spaceComplexity: 'O(N)',
      solution: `def countComponents(n, edges):
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    components = n
    for a, b in edges:
        if union(a, b):
            components -= 1
    return components

print(countComponents(5, [[0,1],[1,2],[3,4]]))         # 2
print(countComponents(5, [[0,1],[1,2],[2,3],[3,4]]))   # 1
print(countComponents(3, []))                           # 3`,
      starterCode: `def countComponents(n, edges):
    # Your code here
    pass`,
      testCases: [
        { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', expected: '2' },
        { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', expected: '1' },
        { input: 'n = 3, edges = []', expected: '3' },
      ],
    },
  },
  {
    id: 'bipartite',
    number: 68,
    name: 'Bipartite Graph Check',
    categoryId: 'graph',
    identify: 'Color graph with 2 colors, no adjacent same color',
    sampleProblem: {
      id: 'is-graph-bipartite',
      title: 'Is Graph Bipartite?',
      difficulty: 'medium' as const,
      companies: ['Google', 'Facebook'],
      description: 'There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. Return true if and only if it is bipartite. A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.',
      examples: [
        { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', output: 'false' },
        { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', output: 'true' },
        { input: 'graph = [[],[2,4,6],[1,4,8],[7,8],[1,2,8,9],[6,9],[0,5],[3],[2,3,4],[4,5]]', output: 'false' },
      ],
      approach: '**BFS Coloring**: Color each node with 0 or 1 alternately. Start BFS from each uncolored node. When exploring neighbor, assign opposite color. If neighbor already has same color, graph is not bipartite.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      solution: `from collections import deque

def isBipartite(graph):
    n = len(graph)
    color = [-1] * n
    for start in range(n):
        if color[start] != -1:
            continue
        queue = deque([start])
        color[start] = 0
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False
    return True

print(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]]))    # False
print(isBipartite([[1,3],[0,2],[1,3],[0,2]]))          # True
print(isBipartite([[],[2,4,6],[1,4,8],[7,8],[1,2,8,9],[6,9],[0,5],[3],[2,3,4],[4,5]]))  # False`,
      starterCode: `from collections import deque

def isBipartite(graph):
    # Your code here
    pass`,
      testCases: [
        { input: 'graph = [[1,2,3],[0,2],[0,1,3],[0,2]]', expected: 'false' },
        { input: 'graph = [[1,3],[0,2],[1,3],[0,2]]', expected: 'true' },
        { input: 'graph = [[],[2,4,6],[1,4,8],[7,8],[1,2,8,9],[6,9],[0,5],[3],[2,3,4],[4,5]]', expected: 'false' },
      ],
    },
  },
  {
    id: 'knapsack-01',
    number: 69,
    name: '0/1 Knapsack',
    categoryId: 'dp',
    identify: 'Include/exclude each item, maximize value within weight',
    sampleProblem: {
      id: 'partition-equal-subset-sum',
      title: 'Partition Equal Subset Sum',
      difficulty: 'medium' as const,
      companies: ['Amazon', 'Google', 'Facebook'],
      description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.',
      examples: [
        { input: 'nums = [1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11]' },
        { input: 'nums = [1,2,3,5]', output: 'false' },
        { input: 'nums = [2,2,1,1]', output: 'true' },
      ],
      approach: '**0/1 Knapsack DP**: Target = total_sum / 2. If total is odd, return false. Use 1D boolean DP array where dp[j] = True means sum j is achievable. For each number, update dp right-to-left (to avoid reuse).',
      timeComplexity: 'O(n * sum)',
      spaceComplexity: 'O(sum)',
      solution: `def canPartition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]
    return dp[target]

print(canPartition([1,5,11,5]))   # True
print(canPartition([1,2,3,5]))    # False
print(canPartition([2,2,1,1]))    # True`,
      starterCode: `def canPartition(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,5,11,5]', expected: 'true' },
        { input: 'nums = [1,2,3,5]', expected: 'false' },
        { input: 'nums = [2,2,1,1]', expected: 'true' },
      ],
    },
  },
  {
    id: 'lis',
    number: 70,
    name: 'Longest Increasing Subsequence',
    categoryId: 'dp',
    identify: 'Find longest strictly increasing subsequence',
    sampleProblem: {
      id: 'longest-increasing-subsequence',
      title: 'Longest Increasing Subsequence',
      difficulty: 'medium' as const,
      companies: ['Microsoft', 'Google', 'Amazon'],
      description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
      examples: [
        { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101]' },
        { input: 'nums = [0,1,0,3,2,3]', output: '4' },
        { input: 'nums = [7,7,7,7,7,7,7]', output: '1' },
      ],
      approach: '**DP LIS**: dp[i] = length of LIS ending at index i. For each i, check all j < i where nums[j] < nums[i]: dp[i] = max(dp[i], dp[j] + 1). O(n^2) solution. O(n log n) with binary search using patience sorting.',
      timeComplexity: 'O(n log n) with binary search',
      spaceComplexity: 'O(n)',
      solution: `import bisect

def lengthOfLIS(nums):
    # O(n^2) DP approach
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

def lengthOfLIS_nlogn(nums):
    # O(n log n) patience sorting
    tails = []
    for num in nums:
        idx = bisect.bisect_left(tails, num)
        if idx == len(tails):
            tails.append(num)
        else:
            tails[idx] = num
    return len(tails)

print(lengthOfLIS([10,9,2,5,3,7,101,18]))   # 4
print(lengthOfLIS([0,1,0,3,2,3]))             # 4
print(lengthOfLIS([7,7,7,7,7,7,7]))           # 1
print(lengthOfLIS_nlogn([10,9,2,5,3,7,101,18]))  # 4`,
      starterCode: `def lengthOfLIS(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [10,9,2,5,3,7,101,18]', expected: '4' },
        { input: 'nums = [0,1,0,3,2,3]', expected: '4' },
        { input: 'nums = [7,7,7,7,7,7,7]', expected: '1' },
      ],
    },
  },
  {
    id: 'lcs-pattern',
    number: 71,
    name: 'Longest Common Subsequence',
    categoryId: 'dp',
    identify: 'Longest common subsequence between two strings',
    sampleProblem: {
      id: 'longest-common-subsequence',
      title: 'Longest Common Subsequence',
      difficulty: 'medium' as const,
      companies: ['Google', 'Amazon', 'Microsoft'],
      description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence is a sequence derived from a string by deleting some characters (possibly none) without changing the order of the remaining characters.",
      examples: [
        { input: "text1 = 'abcde', text2 = 'ace'", output: '3', explanation: "LCS is 'ace'" },
        { input: "text1 = 'abc', text2 = 'abc'", output: '3' },
        { input: "text1 = 'abc', text2 = 'def'", output: '0' },
      ],
      approach: '**2D DP Table**: dp[i][j] = LCS of text1[:i] and text2[:j]. If characters match, dp[i][j] = dp[i-1][j-1] + 1. Else, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      solution: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

print(longestCommonSubsequence('abcde', 'ace'))   # 3
print(longestCommonSubsequence('abc', 'abc'))      # 3
print(longestCommonSubsequence('abc', 'def'))      # 0`,
      starterCode: `def longestCommonSubsequence(text1, text2):
    # Your code here
    pass`,
      testCases: [
        { input: "text1 = 'abcde', text2 = 'ace'", expected: '3' },
        { input: "text1 = 'abc', text2 = 'abc'", expected: '3' },
        { input: "text1 = 'abc', text2 = 'def'", expected: '0' },
      ],
    },
  },
  {
    id: 'coin-change-pattern',
    number: 72,
    name: 'Coin Change',
    categoryId: 'dp',
    identify: 'Minimum coins to make amount (unbounded knapsack)',
    sampleProblem: {
      id: 'coin-change',
      title: 'Coin Change',
      difficulty: 'medium' as const,
      companies: ['Google', 'Amazon', 'Bloomberg'],
      description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
      examples: [
        { input: 'coins = [1,5,11], amount = 11', output: '1' },
        { input: 'coins = [2], amount = 3', output: '-1' },
        { input: 'coins = [1,2,5], amount = 11', output: '3' },
      ],
      approach: '**Unbounded Knapsack DP**: dp[i] = min coins to make amount i. Initialize dp[0] = 0, rest = infinity. For each amount from 1 to target, try each coin: dp[i] = min(dp[i], dp[i - coin] + 1).',
      timeComplexity: 'O(amount * coins)',
      spaceComplexity: 'O(amount)',
      solution: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

print(coinChange([1,5,11], 11))   # 1
print(coinChange([2], 3))          # -1
print(coinChange([1,2,5], 11))    # 3`,
      starterCode: `def coinChange(coins, amount):
    # Your code here
    pass`,
      testCases: [
        { input: 'coins = [1,5,11], amount = 11', expected: '1' },
        { input: 'coins = [2], amount = 3', expected: '-1' },
        { input: 'coins = [1,2,5], amount = 11', expected: '3' },
      ],
    },
  },
  {
    id: 'matrix-dp',
    number: 73,
    name: 'Matrix DP (Grid Problems)',
    categoryId: 'dp',
    identify: 'DP on 2D grid, paths from top-left to bottom-right',
    sampleProblem: {
      id: 'unique-paths',
      title: 'Unique Paths',
      difficulty: 'medium' as const,
      companies: ['Google', 'Amazon', 'Microsoft'],
      description: 'There is a robot on an m x n grid. The robot is initially located at the top-left corner (grid[0][0]). The robot tries to move to the bottom-right corner (grid[m-1][n-1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.',
      examples: [
        { input: 'm = 3, n = 7', output: '28' },
        { input: 'm = 3, n = 2', output: '3' },
        { input: 'm = 1, n = 1', output: '1' },
      ],
      approach: '**2D DP Grid**: dp[i][j] = number of paths to cell (i,j). First row and column all = 1 (only one way to reach them). For other cells: dp[i][j] = dp[i-1][j] + dp[i][j-1].',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      solution: `def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]

print(uniquePaths(3, 7))   # 28
print(uniquePaths(3, 2))   # 3
print(uniquePaths(1, 1))   # 1`,
      starterCode: `def uniquePaths(m, n):
    # Your code here
    pass`,
      testCases: [
        { input: 'm = 3, n = 7', expected: '28' },
        { input: 'm = 3, n = 2', expected: '3' },
        { input: 'm = 1, n = 1', expected: '1' },
      ],
    },
  },
  {
    id: 'word-break',
    number: 74,
    name: 'Word Break DP',
    categoryId: 'dp',
    identify: 'Check if string can be segmented using dictionary',
    sampleProblem: {
      id: 'word-break',
      title: 'Word Break',
      difficulty: 'medium' as const,
      companies: ['Google', 'Amazon', 'Facebook'],
      description: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.',
      examples: [
        { input: "s = 'leetcode', wordDict = ['leet','code']", output: 'true' },
        { input: "s = 'applepenapple', wordDict = ['apple','pen']", output: 'true' },
        { input: "s = 'catsandog', wordDict = ['cats','dog','sand','and','cat']", output: 'false' },
      ],
      approach: '**DP Word Break**: dp[i] = True if s[:i] can be segmented. dp[0] = True (empty string). For each position i, check all j < i: if dp[j] is True and s[j:i] is in wordDict, set dp[i] = True.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(n)',
      solution: `def wordBreak(s, wordDict):
    wordSet = set(wordDict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in wordSet:
                dp[i] = True
                break
    return dp[n]

print(wordBreak('leetcode', ['leet','code']))                         # True
print(wordBreak('applepenapple', ['apple','pen']))                    # True
print(wordBreak('catsandog', ['cats','dog','sand','and','cat']))      # False`,
      starterCode: `def wordBreak(s, wordDict):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'leetcode', wordDict = ['leet','code']", expected: 'true' },
        { input: "s = 'applepenapple', wordDict = ['apple','pen']", expected: 'true' },
        { input: "s = 'catsandog', wordDict = ['cats','dog','sand','and','cat']", expected: 'false' },
      ],
    },
  },
  {
    id: 'edit-distance',
    number: 75,
    name: 'Edit Distance',
    categoryId: 'dp',
    identify: 'Minimum operations to transform one string to another',
    sampleProblem: {
      id: 'edit-distance',
      title: 'Edit Distance',
      difficulty: 'hard' as const,
      companies: ['Google', 'Amazon', 'Microsoft'],
      description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations: insert a character, delete a character, replace a character.',
      examples: [
        { input: "word1 = 'horse', word2 = 'ros'", output: '3' },
        { input: "word1 = 'intention', word2 = 'execution'", output: '5' },
        { input: "word1 = '', word2 = 'a'", output: '1' },
      ],
      approach: '**2D DP Edit Distance**: dp[i][j] = min ops to convert word1[:i] to word2[:j]. If chars match, dp[i][j] = dp[i-1][j-1]. Else min(insert=dp[i][j-1], delete=dp[i-1][j], replace=dp[i-1][j-1]) + 1.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      solution: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])
    return dp[m][n]

print(minDistance('horse', 'ros'))          # 3
print(minDistance('intention', 'execution')) # 5
print(minDistance('', 'a'))                  # 1`,
      starterCode: `def minDistance(word1, word2):
    # Your code here
    pass`,
      testCases: [
        { input: "word1 = 'horse', word2 = 'ros'", expected: '3' },
        { input: "word1 = 'intention', word2 = 'execution'", expected: '5' },
        { input: "word1 = '', word2 = 'a'", expected: '1' },
      ],
    },
  },
  {
    id: 'house-robber-pattern',
    number: 76,
    name: 'House Robber DP',
    categoryId: 'dp',
    identify: 'Max value without picking adjacent elements',
    sampleProblem: {
      id: 'house-robber',
      title: 'House Robber',
      difficulty: 'medium' as const,
      companies: ['Amazon', 'Google', 'Airbnb'],
      description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. You cannot rob two adjacent houses. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
      examples: [
        { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (1) + house 3 (3) = 4' },
        { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob houses 1,3,5 = 2+9+1=12' },
        { input: 'nums = [1,2]', output: '2' },
      ],
      approach: '**House Robber DP**: At each house, choose max(rob current + max 2 houses ago, skip current = max 1 house ago). Use two variables: prev2 (max 2 back) and prev1 (max 1 back). Update: curr = max(prev1, prev2 + nums[i]).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def rob(nums):
    if not nums:
        return 0
    prev2 = 0
    prev1 = 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    return prev1

print(rob([1,2,3,1]))     # 4
print(rob([2,7,9,3,1]))   # 12
print(rob([1,2]))          # 2`,
      starterCode: `def rob(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [1,2,3,1]', expected: '4' },
        { input: 'nums = [2,7,9,3,1]', expected: '12' },
        { input: 'nums = [1,2]', expected: '2' },
      ],
    },
  },
  {
    id: 'stock-dp',
    number: 77,
    name: 'Stock Trading DP',
    categoryId: 'dp',
    identify: 'Buy/sell stock with various constraints',
    sampleProblem: {
      id: 'best-time-to-buy-and-sell-stock-ii',
      title: 'Best Time to Buy and Sell Stock II',
      difficulty: 'medium' as const,
      companies: ['Amazon', 'Google'],
      description: 'You are given an integer array prices where prices[i] is the price of a given stock on the ith day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day. Find and return the maximum profit you can achieve.',
      examples: [
        { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy day 2, sell day 3 (profit 4). Buy day 4, sell day 5 (profit 3)' },
        { input: 'prices = [1,2,3,4,5]', output: '4' },
        { input: 'prices = [7,6,4,3,1]', output: '0' },
      ],
      approach: '**Greedy Stock Trading**: Accumulate all upward price movements. If next day price > current day price, add the difference to profit (simulates buying and selling at every local peak).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      solution: `def maxProfit(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]
    return profit

print(maxProfit([7,1,5,3,6,4]))   # 7
print(maxProfit([1,2,3,4,5]))      # 4
print(maxProfit([7,6,4,3,1]))      # 0`,
      starterCode: `def maxProfit(prices):
    # Your code here
    pass`,
      testCases: [
        { input: 'prices = [7,1,5,3,6,4]', expected: '7' },
        { input: 'prices = [1,2,3,4,5]', expected: '4' },
        { input: 'prices = [7,6,4,3,1]', expected: '0' },
      ],
    },
  },
  {
    id: 'palindrome-dp',
    number: 78,
    name: 'Palindrome DP',
    categoryId: 'dp',
    identify: 'Longest palindromic subsequence/substring',
    sampleProblem: {
      id: 'longest-palindromic-subsequence',
      title: 'Longest Palindromic Subsequence',
      difficulty: 'medium' as const,
      companies: ['Amazon', 'Google'],
      description: "Given a string s, find the longest palindromic subsequence's length in s. A subsequence is a sequence derived from the original sequence by deleting some elements (possibly none) without changing the relative order of the remaining elements.",
      examples: [
        { input: "s = 'bbbab'", output: '4', explanation: "One possible LPS is 'bbbb'" },
        { input: "s = 'cbbd'", output: '2', explanation: "One possible LPS is 'bb'" },
        { input: "s = 'a'", output: '1' },
      ],
      approach: "**LPS DP**: LPS(s) = LCS(s, reverse(s)). Or use 2D DP: dp[i][j] = LPS of s[i..j]. If s[i]==s[j], dp[i][j] = dp[i+1][j-1] + 2. Else dp[i][j] = max(dp[i+1][j], dp[i][j-1]).",
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(n^2)',
      solution: `def longestPalindromeSubseq(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = 1
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    return dp[0][n-1]

print(longestPalindromeSubseq('bbbab'))   # 4
print(longestPalindromeSubseq('cbbd'))    # 2
print(longestPalindromeSubseq('a'))       # 1`,
      starterCode: `def longestPalindromeSubseq(s):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'bbbab'", expected: '4' },
        { input: "s = 'cbbd'", expected: '2' },
        { input: "s = 'a'", expected: '1' },
      ],
    },
  },
  {
    id: 'partition-dp',
    number: 79,
    name: 'Partition DP',
    categoryId: 'dp',
    identify: 'Split array/string to minimize cost or balance halves',
    sampleProblem: {
      id: 'burst-balloons',
      title: 'Burst Balloons',
      difficulty: 'hard' as const,
      companies: ['Google', 'Amazon'],
      description: 'You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. Return the maximum coins you can collect by bursting the balloons wisely.',
      examples: [
        { input: 'nums = [3,1,5,8]', output: '167', explanation: 'Burst 1, 5, 3, 8. Max coins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167' },
        { input: 'nums = [1,5]', output: '10' },
        { input: 'nums = [0,0,0]', output: '0' },
      ],
      approach: '**Interval DP**: Add 1 to both ends. dp[i][j] = max coins from bursting all balloons between i and j (exclusive). Try each k as the LAST balloon to burst in range: dp[i][j] = max(dp[i][k] + nums[i]*nums[k]*nums[j] + dp[k][j]).',
      timeComplexity: 'O(n^3)',
      spaceComplexity: 'O(n^2)',
      solution: `def maxCoins(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(0, n - length):
            right = left + length
            for k in range(left + 1, right):
                dp[left][right] = max(
                    dp[left][right],
                    dp[left][k] + nums[left] * nums[k] * nums[right] + dp[k][right]
                )
    return dp[0][n-1]

print(maxCoins([3,1,5,8]))   # 167
print(maxCoins([1,5]))        # 10
print(maxCoins([0,0,0]))      # 0`,
      starterCode: `def maxCoins(nums):
    # Your code here
    pass`,
      testCases: [
        { input: 'nums = [3,1,5,8]', expected: '167' },
        { input: 'nums = [1,5]', expected: '10' },
      ],
    },
  },
  {
    id: 'regex-dp',
    number: 80,
    name: 'Regex / Wildcard DP',
    categoryId: 'dp',
    identify: 'Match string against pattern with wildcards or regex',
    sampleProblem: {
      id: 'wildcard-matching',
      title: 'Wildcard Matching',
      difficulty: 'hard' as const,
      companies: ['Google', 'Facebook', 'Amazon'],
      description: "Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*' where '?' matches any single character and '*' matches any sequence of characters (including the empty sequence). The matching should cover the entire input string.",
      examples: [
        { input: "s = 'aa', p = 'a'", output: 'false' },
        { input: "s = 'aa', p = '*'", output: 'true' },
        { input: "s = 'cb', p = '?a'", output: 'false' },
      ],
      approach: "**2D DP Wildcard**: dp[i][j] = True if s[:i] matches p[:j]. Base cases: dp[0][0]=True, dp[0][j]=True if p[:j] all '*'. Transitions: if p[j-1]=='?' or chars match: dp[i][j]=dp[i-1][j-1]. If p[j-1]=='*': dp[i][j]=dp[i-1][j] or dp[i][j-1].",
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      solution: `def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-1]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i-1][j] or dp[i][j-1]
            elif p[j-1] == '?' or s[i-1] == p[j-1]:
                dp[i][j] = dp[i-1][j-1]
    return dp[m][n]

print(isMatch('aa', 'a'))    # False
print(isMatch('aa', '*'))    # True
print(isMatch('cb', '?a'))   # False`,
      starterCode: `def isMatch(s, p):
    # Your code here
    pass`,
      testCases: [
        { input: "s = 'aa', p = 'a'", expected: 'false' },
        { input: "s = 'aa', p = '*'", expected: 'true' },
        { input: "s = 'cb', p = '?a'", expected: 'false' },
      ],
    },
  },
];