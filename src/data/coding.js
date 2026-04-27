export const coding = {
  questions: [
    {
      id: 1,
      category: "Coding Patterns",
      topic: "Two Pointers",
      question: "Remove duplicates from sorted array",
      simpleAnswer: "Use two pointers: one to track unique elements position, another to scan the array. When you find a new unique element, place it at the unique pointer position.",
      explanation: "Since the array is sorted, duplicates are adjacent. Keep a slow pointer at the position where the next unique element should go, and a fast pointer that scans ahead. When fast finds a new value different from slow, copy it to slow+1 and move slow forward.",
      example: "public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int slow = 0;\n    for (int fast = 1; fast < nums.length; fast++) {\n        if (nums[fast] != nums[slow]) {\n            slow++;\n            nums[slow] = nums[fast];\n        }\n    }\n    return slow + 1;\n}",
      followUps: [
        {
          question: "What's the time complexity?",
          answer: "O(n) time, O(1) space. Single pass through the array with two pointers."
        }
      ],
      keyPoints: ["Two pointers: slow (unique position) and fast (scanner)", "Works because array is sorted", "O(n) time, O(1) space", "Modifies array in-place"]
    },
    {
      id: 2,
      category: "Coding Patterns",
      topic: "Two Pointers",
      question: "Two sum (sorted array)",
      simpleAnswer: "Use two pointers: one at start, one at end. If sum is too small, move left pointer right. If too large, move right pointer left.",
      explanation: "Since the array is sorted, we can use the two-pointer technique. Start with pointers at both ends. Calculate their sum. If it matches target, return indices. If sum is less than target, we need a larger number → move left pointer right. If sum is greater, we need a smaller number → move right pointer left.",
      example: "public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n        int sum = numbers[left] + numbers[right];\n        if (sum == target) return new int[]{left + 1, right + 1};\n        else if (sum < target) left++;\n        else right--;\n    }\n    return new int[]{-1, -1};\n}",
      followUps: [
        {
          question: "What if the array is unsorted?",
          answer: "Use a HashMap instead. Store each number and its index as you scan. For each number, check if (target - number) exists in the map."
        }
      ],
      keyPoints: ["Two pointers at start and end", "Move pointers based on sum comparison", "O(n) time, O(1) space", "Only works on sorted arrays"]
    },
    {
      id: 3,
      category: "Coding Patterns",
      topic: "Two Pointers",
      question: "Container with most water",
      simpleAnswer: "Use two pointers at both ends. Calculate area, then move the pointer pointing to the shorter line inward, because moving the taller one can't increase area.",
      explanation: "Area = min(height[left], height[right]) × (right - left). To maximize area, we need either taller lines or wider distance. Starting from the widest distance (both ends), we can only increase area by finding taller lines. Moving the shorter pointer gives us a chance to find a taller line.",
      example: "public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1;\n    int maxWater = 0;\n    while (left < right) {\n        int water = Math.min(height[left], height[right]) * (right - left);\n        maxWater = Math.max(maxWater, water);\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return maxWater;\n}",
      followUps: [
        {
          question: "Why move the shorter pointer?",
          answer: "Moving the taller pointer can only decrease area because width decreases and height can't increase (limited by the shorter line). Moving the shorter pointer at least gives a chance to find a taller line."
        }
      ],
      keyPoints: ["Two pointers at both ends", "Always move the shorter pointer inward", "O(n) time, O(1) space", "Greedy approach: maximize area at each step"]
    },
    {
      id: 4,
      category: "Coding Patterns",
      topic: "Two Pointers",
      question: "Move zeroes",
      simpleAnswer: "Use two pointers: one to track where the next non-zero should go, another to scan the array. Swap non-zero elements to the front.",
      explanation: "Similar to removing duplicates. Keep a slow pointer at the position where the next non-zero should be placed. Fast pointer scans the array. When fast finds a non-zero, swap it with the element at slow, then move slow forward. All zeros naturally end up at the end.",
      example: "public void moveZeroes(int[] nums) {\n    int slow = 0;\n    for (int fast = 0; fast < nums.length; fast++) {\n        if (nums[fast] != 0) {\n            int temp = nums[slow];\n            nums[slow] = nums[fast];\n            nums[fast] = temp;\n            slow++;\n        }\n    }\n}",
      followUps: [
        {
          question: "Can you do it without extra space?",
          answer: "Yes, the two-pointer approach modifies the array in-place with O(1) extra space."
        }
      ],
      keyPoints: ["Two pointers: slow (next non-zero position) and fast (scanner)", "Swap non-zeros to front", "O(n) time, O(1) space", "Maintains relative order of non-zero elements"]
    },
    {
      id: 5,
      category: "Coding Patterns",
      topic: "Sliding Window",
      question: "Longest substring without repeating characters",
      simpleAnswer: "Use a sliding window with a HashSet. Expand the window by adding characters. If a duplicate is found, shrink from the left until the duplicate is removed.",
      explanation: "Maintain a window [left, right] and a set of characters in the current window. Expand right pointer and add characters to the set. If you encounter a duplicate, remove characters from the left until the duplicate is gone. Track the maximum window size seen.",
      example: "public int lengthOfLongestSubstring(String s) {\n    Set<Character> set = new HashSet<>();\n    int left = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        while (set.contains(s.charAt(right))) {\n            set.remove(s.charAt(left));\n            left++;\n        }\n        set.add(s.charAt(right));\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
      followUps: [
        {
          question: "What's the time complexity?",
          answer: "O(n) time where n is the string length. Each character is visited at most twice (once by right pointer, once by left pointer). O(min(n, m)) space where m is the character set size."
        }
      ],
      keyPoints: ["Sliding window with HashSet", "Expand right, shrink left on duplicate", "O(n) time, O(min(n,m)) space", "Track max window size"]
    },
    {
      id: 6,
      category: "Coding Patterns",
      topic: "Sliding Window",
      question: "Maximum sum subarray of size k",
      simpleAnswer: "Use a fixed-size sliding window. Compute the sum of the first k elements, then slide the window by adding the next element and removing the first.",
      explanation: "This is a fixed-size window problem. First compute the sum of the first k elements. Then for each new position, add the incoming element (right side) and subtract the outgoing element (left side). This avoids recomputing the sum from scratch each time, reducing complexity from O(n*k) to O(n).",
      example: "public int maxSumSubarray(int[] arr, int k) {\n    int windowSum = 0;\n    for (int i = 0; i < k; i++) windowSum += arr[i];\n    int maxSum = windowSum;\n    for (int i = k; i < arr.length; i++) {\n        windowSum += arr[i] - arr[i - k];\n        maxSum = Math.max(maxSum, windowSum);\n    }\n    return maxSum;\n}",
      followUps: [
        { question: "What if k is larger than the array?", answer: "Return -1 or throw an exception — the window can't be formed." }
      ],
      keyPoints: ["Fixed-size window of size k", "Add right element, remove left element on each slide", "O(n) time, O(1) space", "Avoids recomputing sum from scratch"]
    },
    {
      id: 7,
      category: "Coding Patterns",
      topic: "Sliding Window",
      question: "Minimum window substring",
      simpleAnswer: "Use a variable sliding window with two frequency maps. Expand right until all required characters are covered, then shrink left to minimize the window.",
      explanation: "Keep a frequency map of required characters (from pattern t) and a window frequency map. Expand the right pointer, adding characters to the window map. Once all characters are covered (window is valid), try to shrink from the left to find the minimum valid window. Track the smallest valid window seen.",
      example: "public String minWindow(String s, String t) {\n    Map<Character, Integer> need = new HashMap<>();\n    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);\n    int left = 0, formed = 0, minLen = Integer.MAX_VALUE, start = 0;\n    Map<Character, Integer> window = new HashMap<>();\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        window.merge(c, 1, Integer::sum);\n        if (need.containsKey(c) && window.get(c).equals(need.get(c))) formed++;\n        while (formed == need.size()) {\n            if (right - left + 1 < minLen) { minLen = right - left + 1; start = left; }\n            char lc = s.charAt(left);\n            window.merge(lc, -1, Integer::sum);\n            if (need.containsKey(lc) && window.get(lc) < need.get(lc)) formed--;\n            left++;\n        }\n    }\n    return minLen == Integer.MAX_VALUE ? \"\" : s.substring(start, start + minLen);\n}",
      followUps: [
        { question: "What's the time complexity?", answer: "O(n + m) where n is length of s and m is length of t. Each character is visited at most twice by the two pointers." }
      ],
      keyPoints: ["Variable window: expand right, shrink left", "Two frequency maps: required and window", "Track 'formed' count to know when window is valid", "O(n+m) time"]
    },
    {
      id: 8,
      category: "Coding Patterns",
      topic: "Sliding Window",
      question: "Longest repeating character replacement",
      simpleAnswer: "Use a sliding window. Track the count of the most frequent character in the window. If (window size - max frequency) > k, shrink the window from the left.",
      explanation: "The key insight: in a valid window, we can replace at most k characters. So a window is valid if (window_size - count_of_most_frequent_char) <= k. Expand the right pointer, update character counts. If the window becomes invalid, move the left pointer right by 1. Track the maximum valid window size.",
      example: "public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0, maxFreq = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        count[s.charAt(right) - 'A']++;\n        maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);\n        if ((right - left + 1) - maxFreq > k) {\n            count[s.charAt(left) - 'A']--;\n            left++;\n        }\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
      followUps: [
        { question: "Why don't we decrease maxFreq when shrinking?", answer: "We don't need to. We only care about finding a window larger than our current best. If maxFreq doesn't increase, the window size won't increase either." }
      ],
      keyPoints: ["Window valid if (size - maxFreq) <= k", "Track frequency of each character in window", "Shrink when window becomes invalid", "O(n) time, O(1) space (26 letters)"]
    },
    {
      id: 9,
      category: "Coding Patterns",
      topic: "Hashing",
      question: "Two sum (unsorted)",
      simpleAnswer: "Use a HashMap. For each number, check if (target - number) already exists in the map. If yes, return both indices. If no, store the current number and its index.",
      explanation: "As we scan the array, for each element x, we need to find if (target - x) has been seen before. A HashMap gives O(1) lookup. Store each number as key and its index as value. Before storing, check if the complement (target - x) is already in the map.",
      example: "public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[]{map.get(complement), i};\n        }\n        map.put(nums[i], i);\n    }\n    return new int[]{};\n}",
      followUps: [
        { question: "What if there are duplicate numbers?", answer: "The problem guarantees exactly one solution, so duplicates won't cause issues. But if multiple solutions exist, you'd need to handle the case where a number's complement is itself (e.g., target=6, number=3)." }
      ],
      keyPoints: ["HashMap: number → index", "For each x, check if (target-x) is in map", "O(n) time, O(n) space", "One-pass solution"]
    },
    {
      id: 10,
      category: "Coding Patterns",
      topic: "Hashing",
      question: "Valid anagram",
      simpleAnswer: "Count character frequencies of both strings using a HashMap or array. If both frequency maps are equal, they are anagrams.",
      explanation: "Two strings are anagrams if they contain the same characters with the same frequencies. Build a frequency map for string s (increment counts) and for string t (decrement counts). If all counts are zero at the end, they are anagrams. Alternatively, sort both strings and compare — but that's O(n log n).",
      example: "public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    for (char c : t.toCharArray()) count[c - 'a']--;\n    for (int n : count) if (n != 0) return false;\n    return true;\n}",
      followUps: [
        { question: "What if the strings contain Unicode characters?", answer: "Use a HashMap<Character, Integer> instead of an int[26] array, since Unicode has more than 26 characters." }
      ],
      keyPoints: ["Count frequencies with int[26] or HashMap", "Increment for s, decrement for t", "All zeros at end = anagram", "O(n) time, O(1) space with fixed alphabet"]
    },
    {
      id: 11,
      category: "Coding Patterns",
      topic: "Hashing",
      question: "First non-repeating character",
      simpleAnswer: "Two-pass approach: first pass builds a frequency map, second pass finds the first character with frequency 1.",
      explanation: "In the first pass, count the frequency of every character using a HashMap. In the second pass, iterate through the string in order and return the index of the first character whose count is 1. This preserves the original order while giving O(1) lookups.",
      example: "public int firstUniqChar(String s) {\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    for (int i = 0; i < s.length(); i++) {\n        if (count[s.charAt(i) - 'a'] == 1) return i;\n    }\n    return -1;\n}",
      followUps: [
        { question: "Can you do it in one pass?", answer: "Yes, using a LinkedHashMap which preserves insertion order. But the two-pass approach is simpler and still O(n)." }
      ],
      keyPoints: ["Two-pass: build frequency map, then find first with count=1", "O(n) time, O(1) space (fixed alphabet)", "LinkedHashMap preserves insertion order for one-pass variant", "Return index, not character"]
    },
    {
      id: 12,
      category: "Coding Patterns",
      topic: "Hashing",
      question: "Subarray with given sum",
      simpleAnswer: "Use a HashMap to store prefix sums. For each index, check if (currentSum - target) exists in the map. If yes, a valid subarray ends here.",
      explanation: "The prefix sum at index i is the sum of all elements from 0 to i. If prefixSum[j] - prefixSum[i] = target, then the subarray from i+1 to j has sum equal to target. Store each prefix sum in a HashMap. For each new prefix sum, check if (prefixSum - target) was seen before.",
      example: "public int subarraySum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, 1);\n    int sum = 0, count = 0;\n    for (int num : nums) {\n        sum += num;\n        count += map.getOrDefault(sum - target, 0);\n        map.merge(sum, 1, Integer::sum);\n    }\n    return count;\n}",
      followUps: [
        { question: "What if the array has negative numbers?", answer: "The prefix sum approach still works with negative numbers, unlike the sliding window approach which only works for non-negative arrays." }
      ],
      keyPoints: ["Prefix sum + HashMap", "Check if (prefixSum - target) exists in map", "Works with negative numbers", "O(n) time, O(n) space"]
    },
    {
      id: 13,
      category: "Coding Patterns",
      topic: "Prefix Sum",
      question: "Subarray sum equals k",
      simpleAnswer: "Use a HashMap of prefix sums and their counts. For each index, count how many previous prefix sums equal (currentSum - k).",
      explanation: "This is an extension of the subarray with given sum problem. Instead of finding one subarray, we count all of them. Use a HashMap<prefixSum, count>. Initialize with {0:1} (empty subarray). For each element, update the running sum and add map.getOrDefault(sum - k, 0) to the result count.",
      example: "public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, 1);\n    int sum = 0, count = 0;\n    for (int num : nums) {\n        sum += num;\n        count += map.getOrDefault(sum - k, 0);\n        map.merge(sum, 1, Integer::sum);\n    }\n    return count;\n}",
      followUps: [
        { question: "Why initialize map with {0:1}?", answer: "To handle the case where a subarray starting from index 0 has sum equal to k. Without it, we'd miss subarrays that start from the beginning." }
      ],
      keyPoints: ["HashMap<prefixSum, count>", "Initialize with {0:1}", "Add map.get(sum-k) to result at each step", "O(n) time, O(n) space"]
    },
    {
      id: 14,
      category: "Coding Patterns",
      topic: "Prefix Sum",
      question: "Range sum query",
      simpleAnswer: "Precompute a prefix sum array. Answer each query in O(1) using: rangeSum(i,j) = prefixSum[j+1] - prefixSum[i].",
      explanation: "Build a prefix sum array where prefixSum[i] = sum of all elements from index 0 to i-1. Then any range sum query [left, right] can be answered in O(1) as prefixSum[right+1] - prefixSum[left]. The preprocessing takes O(n) but each query is O(1), making it ideal when there are many queries.",
      example: "class NumArray {\n    private int[] prefix;\n    public NumArray(int[] nums) {\n        prefix = new int[nums.length + 1];\n        for (int i = 0; i < nums.length; i++)\n            prefix[i + 1] = prefix[i] + nums[i];\n    }\n    public int sumRange(int left, int right) {\n        return prefix[right + 1] - prefix[left];\n    }\n}",
      followUps: [
        { question: "What if the array is updated frequently?", answer: "Use a Binary Indexed Tree (Fenwick Tree) or Segment Tree for O(log n) updates and O(log n) queries instead of O(n) rebuild." }
      ],
      keyPoints: ["Precompute prefix sums in O(n)", "Each query answered in O(1)", "rangeSum(i,j) = prefix[j+1] - prefix[i]", "Ideal for multiple queries on static array"]
    },
    {
      id: 15,
      category: "Coding Patterns",
      topic: "Prefix Sum",
      question: "Continuous subarray sum",
      simpleAnswer: "Use a HashMap of (prefixSum % k) → first index. If the same remainder appears again at index j, the subarray between those indices has sum divisible by k.",
      explanation: "If prefixSum[j] % k == prefixSum[i] % k, then the sum of elements from i+1 to j is divisible by k. Store the first occurrence of each remainder. If the same remainder is seen again and the subarray length is at least 2, return true. Initialize map with {0: -1} to handle subarrays starting from index 0.",
      example: "public boolean checkSubarraySum(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, -1);\n    int sum = 0;\n    for (int i = 0; i < nums.length; i++) {\n        sum = (sum + nums[i]) % k;\n        if (map.containsKey(sum)) {\n            if (i - map.get(sum) >= 2) return true;\n        } else {\n            map.put(sum, i);\n        }\n    }\n    return false;\n}",
      followUps: [
        { question: "Why store the first occurrence only?", answer: "We want the longest possible subarray. Storing the first occurrence maximizes the distance between matching remainders." }
      ],
      keyPoints: ["HashMap of (prefixSum % k) → first index", "Same remainder = subarray sum divisible by k", "Initialize {0:-1} for subarrays from index 0", "Subarray length must be at least 2"]
    },
    {
      id: 16,
      category: "Coding Patterns",
      topic: "Fast & Slow Pointers",
      question: "Detect cycle in linked list",
      simpleAnswer: "Use Floyd's cycle detection: slow pointer moves 1 step, fast pointer moves 2 steps. If they ever meet, there's a cycle.",
      explanation: "If there's no cycle, the fast pointer will reach null. If there's a cycle, the fast pointer will eventually lap the slow pointer and they'll meet inside the cycle. This works because the fast pointer gains 1 step on the slow pointer each iteration — so if they're in a cycle, they must eventually be at the same node.",
      example: "public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}",
      followUps: [
        { question: "How do you find the start of the cycle?", answer: "Once slow and fast meet, reset one pointer to head. Move both one step at a time. Where they meet again is the start of the cycle." }
      ],
      keyPoints: ["Slow moves 1 step, fast moves 2 steps", "If they meet → cycle exists", "If fast reaches null → no cycle", "O(n) time, O(1) space"]
    },
    {
      id: 17,
      category: "Coding Patterns",
      topic: "Fast & Slow Pointers",
      question: "Find middle of linked list",
      simpleAnswer: "Use slow and fast pointers. When fast reaches the end, slow is at the middle.",
      explanation: "Move slow pointer 1 step and fast pointer 2 steps at a time. When fast reaches the last node (or null), slow is exactly at the middle. For even-length lists, slow ends up at the second middle node. This avoids counting the length first.",
      example: "public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow;\n}",
      followUps: [
        { question: "When would you need the middle of a linked list?", answer: "Merge sort on linked lists requires finding the middle to split the list. Also used in palindrome checking — find middle, reverse second half, compare." }
      ],
      keyPoints: ["Slow moves 1 step, fast moves 2 steps", "When fast reaches end, slow is at middle", "O(n) time, O(1) space", "For even length, slow lands on second middle"]
    },
    {
      id: 18,
      category: "Coding Patterns",
      topic: "Stack",
      question: "Valid parentheses",
      simpleAnswer: "Use a stack. Push opening brackets. When you see a closing bracket, check if the top of the stack is the matching opening bracket. If not, invalid.",
      explanation: "Iterate through the string. For every opening bracket '(', '[', '{', push it onto the stack. For every closing bracket, check if the stack is non-empty and the top matches the expected opening bracket. If it matches, pop the stack. If it doesn't match or the stack is empty, return false. At the end, the stack must be empty.",
      example: "public boolean isValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(' || c == '[' || c == '{') {\n            stack.push(c);\n        } else {\n            if (stack.isEmpty()) return false;\n            char top = stack.pop();\n            if (c == ')' && top != '(') return false;\n            if (c == ']' && top != '[') return false;\n            if (c == '}' && top != '{') return false;\n        }\n    }\n    return stack.isEmpty();\n}",
      followUps: [
        { question: "What's the time and space complexity?", answer: "O(n) time and O(n) space in the worst case (all opening brackets)." }
      ],
      keyPoints: ["Push opening brackets onto stack", "On closing bracket, check if top matches", "Stack must be empty at end", "O(n) time, O(n) space"]
    },
    {
      id: 19,
      category: "Coding Patterns",
      topic: "Stack",
      question: "Next greater element",
      simpleAnswer: "Use a monotonic decreasing stack. For each element, pop all stack elements smaller than it — the current element is their next greater element.",
      explanation: "Maintain a stack of indices where elements are in decreasing order. For each new element, while the stack is not empty and the current element is greater than the element at the top index, pop the top and set its next greater element to the current element. Push the current index. Elements remaining in the stack at the end have no next greater element (-1).",
      example: "public int[] nextGreaterElement(int[] nums) {\n    int n = nums.length;\n    int[] result = new int[n];\n    Arrays.fill(result, -1);\n    Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n    for (int i = 0; i < n; i++) {\n        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n            result[stack.pop()] = nums[i];\n        }\n        stack.push(i);\n    }\n    return result;\n}",
      followUps: [
        { question: "What is a monotonic stack?", answer: "A stack that maintains elements in either strictly increasing or decreasing order. Elements are popped when the monotonic property would be violated by a new element." }
      ],
      keyPoints: ["Monotonic decreasing stack of indices", "Pop when current element is greater than stack top", "Popped element's NGE = current element", "O(n) time, O(n) space"]
    },
    {
      id: 20,
      category: "Coding Patterns",
      topic: "Stack",
      question: "Min stack",
      simpleAnswer: "Use two stacks: one for all values, one to track the current minimum. Push to min stack only when the new value is <= current minimum.",
      explanation: "The main stack stores all values normally. The min stack stores the minimum value at each state. When pushing a value, push to main stack always. Push to min stack only if it's empty or the value is <= the current min (top of min stack). When popping, pop from main stack always. Pop from min stack only if the popped value equals the current min.",
      example: "class MinStack {\n    private Deque<Integer> stack = new ArrayDeque<>();\n    private Deque<Integer> minStack = new ArrayDeque<>();\n\n    public void push(int val) {\n        stack.push(val);\n        if (minStack.isEmpty() || val <= minStack.peek())\n            minStack.push(val);\n    }\n    public void pop() {\n        if (stack.pop().equals(minStack.peek()))\n            minStack.pop();\n    }\n    public int top() { return stack.peek(); }\n    public int getMin() { return minStack.peek(); }\n}",
      followUps: [
        { question: "Can you do it with one stack?", answer: "Yes, store pairs (value, currentMin) in a single stack. Each entry remembers the minimum at the time it was pushed." }
      ],
      keyPoints: ["Two stacks: main and min", "Min stack tracks minimum at each state", "getMin() is O(1) — just peek min stack", "O(n) space, O(1) per operation"]
    },
    {
      id: 21,
      category: "Coding Patterns",
      topic: "Binary Search",
      question: "Binary search basic",
      simpleAnswer: "On a sorted array, compare the middle element with the target. If equal, return it. If target is smaller, search left half. If larger, search right half.",
      explanation: "Binary search eliminates half the search space at each step. Maintain left and right pointers. Calculate mid = left + (right - left) / 2 (avoids integer overflow). Compare arr[mid] with target. If equal, return mid. If target < arr[mid], search left (right = mid - 1). If target > arr[mid], search right (left = mid + 1). Repeat until left > right.",
      example: "public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}",
      followUps: [
        { question: "Why use mid = left + (right-left)/2 instead of (left+right)/2?", answer: "To prevent integer overflow. If left and right are both large integers, left+right can overflow. left + (right-left)/2 is mathematically equivalent but safe." }
      ],
      keyPoints: ["Requires sorted array", "Eliminate half the search space each step", "O(log n) time, O(1) space", "Use left + (right-left)/2 to avoid overflow"]
    },
    {
      id: 22,
      category: "Coding Patterns",
      topic: "Binary Search",
      question: "Search in rotated sorted array",
      simpleAnswer: "Use binary search but determine which half is sorted. Search the target in the sorted half, otherwise search the other half.",
      explanation: "Even after rotation, one half of the array is always sorted. Check if the left half [left..mid] is sorted (arr[left] <= arr[mid]). If yes, check if target falls in that range. If yes, search left half. Otherwise search right half. If left half is not sorted, right half must be sorted — apply the same logic.",
      example: "public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[left] <= nums[mid]) { // left half sorted\n            if (target >= nums[left] && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else { // right half sorted\n            if (target > nums[mid] && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return -1;\n}",
      followUps: [
        { question: "What if there are duplicates?", answer: "Duplicates make it impossible to determine which half is sorted when arr[left]==arr[mid]. In that case, just increment left by 1 and continue. Worst case becomes O(n)." }
      ],
      keyPoints: ["One half is always sorted after rotation", "Check which half is sorted, then check if target is in that range", "O(log n) time, O(1) space", "Duplicates degrade to O(n)"]
    },
    {
      id: 23,
      category: "Coding Patterns",
      topic: "Binary Search",
      question: "Find first and last occurrence",
      simpleAnswer: "Run binary search twice: once to find the leftmost occurrence (first), once to find the rightmost occurrence (last).",
      explanation: "For the first occurrence: when arr[mid] == target, record mid as a candidate and continue searching left (right = mid - 1). For the last occurrence: when arr[mid] == target, record mid as a candidate and continue searching right (left = mid + 1). This ensures we find the boundary positions.",
      example: "public int[] searchRange(int[] nums, int target) {\n    return new int[]{findFirst(nums, target), findLast(nums, target)};\n}\nprivate int findFirst(int[] nums, int target) {\n    int left = 0, right = nums.length - 1, result = -1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) { result = mid; right = mid - 1; }\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return result;\n}\nprivate int findLast(int[] nums, int target) {\n    int left = 0, right = nums.length - 1, result = -1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) { result = mid; left = mid + 1; }\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return result;\n}",
      followUps: [
        { question: "What if the target doesn't exist?", answer: "Return [-1, -1]. If the candidate is never set, or if arr[candidate] != target, the element doesn't exist." }
      ],
      keyPoints: ["Two binary searches: one for first, one for last", "On match, record and keep searching in same direction", "O(log n) time, O(1) space", "Return [-1,-1] if not found"]
    },
    {
      id: 24,
      category: "Coding Patterns",
      topic: "Binary Search",
      question: "Peak element",
      simpleAnswer: "Use binary search. If arr[mid] < arr[mid+1], the peak is in the right half. Otherwise it's in the left half (including mid).",
      explanation: "A peak element is greater than its neighbors. We don't need to find the global peak — any peak works. If arr[mid] < arr[mid+1], the right side is going up, so there must be a peak to the right. If arr[mid] > arr[mid+1], the left side (including mid) must contain a peak. This binary search converges to a peak.",
      example: "public int findPeakElement(int[] nums) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] < nums[mid + 1]) left = mid + 1;\n        else right = mid;\n    }\n    return left;\n}",
      followUps: [
        { question: "What if the array has multiple peaks?", answer: "The problem only asks for any one peak. Binary search will find one of them. If you need all peaks, you'd need a linear scan." }
      ],
      keyPoints: ["Any peak is acceptable", "If arr[mid] < arr[mid+1], peak is to the right", "If arr[mid] > arr[mid+1], peak is to the left (including mid)", "O(log n) time, O(1) space"]
    },
    {
      id: 25,
      category: "Coding Patterns",
      topic: "Recursion",
      question: "Fibonacci",
      simpleAnswer: "Base cases: fib(0)=0, fib(1)=1. Recursive case: fib(n) = fib(n-1) + fib(n-2). Use memoization to avoid redundant calls.",
      explanation: "The naive recursive solution has O(2^n) time because it recomputes the same subproblems. With memoization (top-down DP), store results in a map. Each value is computed only once, reducing to O(n) time. Bottom-up DP is even better — just track the last two values with O(1) space.",
      example: "public int fib(int n) {\n    if (n <= 1) return n;\n    Map<Integer, Integer> memo = new HashMap<>();\n    return helper(n, memo);\n}\nprivate int helper(int n, Map<Integer, Integer> memo) {\n    if (n <= 1) return n;\n    if (memo.containsKey(n)) return memo.get(n);\n    int result = helper(n - 1, memo) + helper(n - 2, memo);\n    memo.put(n, result);\n    return result;\n}\n// Bottom-up O(1) space:\npublic int fibOptimal(int n) {\n    if (n <= 1) return n;\n    int prev = 0, curr = 1;\n    for (int i = 2; i <= n; i++) {\n        int next = prev + curr;\n        prev = curr; curr = next;\n    }\n    return curr;\n}",
      followUps: [
        { question: "What's the most efficient way to compute Fibonacci?", answer: "Bottom-up DP with two variables: prev=0, curr=1. Loop n times: next=prev+curr, prev=curr, curr=next. O(n) time, O(1) space." }
      ],
      keyPoints: ["Base cases: fib(0)=0, fib(1)=1", "Naive recursion is O(2^n)", "Memoization reduces to O(n) time, O(n) space", "Bottom-up DP: O(n) time, O(1) space"]
    },
    {
      id: 26,
      category: "Coding Patterns",
      topic: "Recursion",
      question: "Factorial",
      simpleAnswer: "Base case: factorial(0) = 1. Recursive case: factorial(n) = n × factorial(n-1).",
      explanation: "Factorial is the classic recursion example. Each call reduces the problem by 1 until it hits the base case. The call stack builds up n frames, then unwinds multiplying values together. Important to understand the call stack behavior — this is the foundation for understanding all recursive algorithms.",
      example: "public long factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}\n// Iterative version:\npublic long factorialIterative(int n) {\n    long result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    return result;\n}",
      followUps: [
        { question: "What's the risk with large inputs?", answer: "Stack overflow for very large n due to deep recursion. Iterative solution or tail recursion (if language supports it) avoids this. Also, factorial grows extremely fast — use BigInteger in Java for large values." }
      ],
      keyPoints: ["Base case: factorial(0) = 1", "Recursive case: n × factorial(n-1)", "O(n) time, O(n) space (call stack)", "Foundation for understanding recursion and call stack"]
    },
    {
      id: 27,
      category: "Coding Patterns",
      topic: "Recursion",
      question: "Subsets",
      simpleAnswer: "For each element, you have two choices: include it or exclude it. Recurse with both choices. Base case: when you've processed all elements, add the current subset to results.",
      explanation: "This is the classic include/exclude recursion pattern. At each step, branch into two recursive calls: one that includes the current element in the subset, and one that doesn't. When you reach the end of the array, the current subset is complete. Total subsets = 2^n since each element has 2 choices.",
      example: "public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> result = new ArrayList<>();\n    backtrack(nums, 0, new ArrayList<>(), result);\n    return result;\n}\nprivate void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {\n    result.add(new ArrayList<>(current));\n    for (int i = start; i < nums.length; i++) {\n        current.add(nums[i]);\n        backtrack(nums, i + 1, current, result);\n        current.remove(current.size() - 1);\n    }\n}",
      followUps: [
        { question: "What's the time complexity?", answer: "O(2^n × n) — there are 2^n subsets and each takes O(n) to copy into the result list." }
      ],
      keyPoints: ["Include/exclude pattern at each element", "2^n total subsets", "Base case: processed all elements", "O(2^n × n) time, O(n) recursion depth"]
    },
    {
      id: 28,
      category: "Coding Patterns",
      topic: "Backtracking",
      question: "Permutations",
      simpleAnswer: "Use backtracking: at each position, try placing each unused element. After placing, recurse for the next position. After recursion, undo the choice (backtrack).",
      explanation: "Build the permutation position by position. At each position, try every element that hasn't been used yet. Mark it as used, add it to the current permutation, recurse for the next position, then unmark it and remove it (backtrack). This explores all possible orderings.",
      example: "public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> result = new ArrayList<>();\n    backtrack(nums, new boolean[nums.length], new ArrayList<>(), result);\n    return result;\n}\nprivate void backtrack(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {\n    if (current.size() == nums.length) {\n        result.add(new ArrayList<>(current));\n        return;\n    }\n    for (int i = 0; i < nums.length; i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        current.add(nums[i]);\n        backtrack(nums, used, current, result);\n        current.remove(current.size() - 1);\n        used[i] = false;\n    }\n}",
      followUps: [
        { question: "What's the time complexity?", answer: "O(n! × n) — there are n! permutations and each takes O(n) to copy. Space is O(n) for the recursion depth." }
      ],
      keyPoints: ["Try each unused element at each position", "Mark used, recurse, unmark (backtrack)", "n! total permutations", "O(n! × n) time, O(n) space"]
    },
    {
      id: 29,
      category: "Coding Patterns",
      topic: "Backtracking",
      question: "N-Queens",
      simpleAnswer: "Place queens row by row. For each row, try each column. If the position is safe (no conflicts with existing queens), place the queen and recurse to the next row. Backtrack if no valid position exists.",
      explanation: "A queen attacks in the same row, column, and both diagonals. Since we place one queen per row, row conflicts are impossible. Check column conflicts and diagonal conflicts. For diagonals: queens on the same diagonal have the same (row-col) value; on the anti-diagonal, same (row+col) value. Use sets to track occupied columns and diagonals.",
      example: "public List<List<String>> solveNQueens(int n) {\n    List<List<String>> result = new ArrayList<>();\n    Set<Integer> cols = new HashSet<>(), diag = new HashSet<>(), antiDiag = new HashSet<>();\n    char[][] board = new char[n][n];\n    for (char[] row : board) Arrays.fill(row, '.');\n    backtrack(0, n, board, cols, diag, antiDiag, result);\n    return result;\n}\nprivate void backtrack(int row, int n, char[][] board, Set<Integer> cols, Set<Integer> diag, Set<Integer> antiDiag, List<List<String>> result) {\n    if (row == n) {\n        List<String> solution = new ArrayList<>();\n        for (char[] r : board) solution.add(new String(r));\n        result.add(solution); return;\n    }\n    for (int col = 0; col < n; col++) {\n        if (cols.contains(col) || diag.contains(row - col) || antiDiag.contains(row + col)) continue;\n        cols.add(col); diag.add(row - col); antiDiag.add(row + col);\n        board[row][col] = 'Q';\n        backtrack(row + 1, n, board, cols, diag, antiDiag, result);\n        board[row][col] = '.';\n        cols.remove(col); diag.remove(row - col); antiDiag.remove(row + col);\n    }\n}",
      followUps: [
        { question: "What's the time complexity?", answer: "O(n!) in the worst case, but pruning makes it much faster in practice. Space is O(n) for the recursion stack and O(n) for the sets." }
      ],
      keyPoints: ["Place one queen per row", "Check column, diagonal, anti-diagonal conflicts", "Use sets for O(1) conflict checking", "Backtrack when no valid column in current row"]
    },
    {
      id: 30,
      category: "Coding Patterns",
      topic: "Backtracking",
      question: "Combination sum",
      simpleAnswer: "Use backtracking. At each step, try adding each candidate. If the remaining sum becomes 0, add the combination. If it goes negative, stop. Allow reuse by not advancing the start index.",
      explanation: "Since candidates can be reused, when we recurse we pass the same start index (not start+1). This allows picking the same element multiple times. We prune by stopping when the remaining sum goes below 0. Sort the candidates first so we can break early when a candidate exceeds the remaining sum.",
      example: "public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    List<List<Integer>> result = new ArrayList<>();\n    Arrays.sort(candidates);\n    backtrack(candidates, target, 0, new ArrayList<>(), result);\n    return result;\n}\nprivate void backtrack(int[] candidates, int remaining, int start, List<Integer> current, List<List<Integer>> result) {\n    if (remaining == 0) { result.add(new ArrayList<>(current)); return; }\n    for (int i = start; i < candidates.length; i++) {\n        if (candidates[i] > remaining) break;\n        current.add(candidates[i]);\n        backtrack(candidates, remaining - candidates[i], i, current, result);\n        current.remove(current.size() - 1);\n    }\n}",
      followUps: [
        { question: "What if each candidate can only be used once?", answer: "Pass start+1 instead of start when recursing. This prevents reusing the same element." }
      ],
      keyPoints: ["Pass same start index to allow reuse", "Prune when remaining sum < 0", "Sort candidates for early termination", "O(n^(target/min)) time in worst case"]
    },
    {
      id: 31,
      category: "Coding Patterns",
      topic: "Tree Traversal",
      question: "Inorder / Preorder / Postorder traversal",
      simpleAnswer: "Inorder: Left→Root→Right. Preorder: Root→Left→Right. Postorder: Left→Right→Root. All use recursion with the same structure, just different order of visiting the root.",
      explanation: "These are DFS traversals. Inorder on a BST gives sorted output. Preorder is used to copy/serialize a tree (root first). Postorder is used to delete a tree (children before parent) or evaluate expression trees. The recursive structure is identical — only the position of the 'visit root' step changes.",
      example: "// Inorder\npublic List<Integer> inorder(TreeNode root) {\n    List<Integer> result = new ArrayList<>();\n    dfs(root, result);\n    return result;\n}\nprivate void dfs(TreeNode node, List<Integer> result) {\n    if (node == null) return;\n    dfs(node.left, result);   // Left\n    result.add(node.val);     // Root\n    dfs(node.right, result);  // Right\n}\n// Preorder: visit root first\n// Postorder: visit root last",
      followUps: [
        { question: "How do you do iterative inorder traversal?", answer: "Use a stack. Push nodes going left until null. Pop, visit, then go right. Repeat." }
      ],
      keyPoints: ["Inorder: L→Root→R (BST gives sorted order)", "Preorder: Root→L→R (tree serialization)", "Postorder: L→R→Root (delete tree, expression eval)", "All O(n) time, O(h) space where h is tree height"]
    },
    {
      id: 32,
      category: "Coding Patterns",
      topic: "Tree Traversal",
      question: "Level order traversal",
      simpleAnswer: "Use a queue (BFS). Start with the root. For each node, add its value to the current level, then enqueue its children.",
      explanation: "Level order traversal visits nodes level by level (BFS). Use a queue. Enqueue the root. While the queue is not empty, process all nodes at the current level (track queue size at start of each level). For each node, add its value to the current level list and enqueue its non-null children. Add the level list to the result.",
      example: "public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> result = new ArrayList<>();\n    if (root == null) return result;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        List<Integer> level = new ArrayList<>();\n        for (int i = 0; i < size; i++) {\n            TreeNode node = queue.poll();\n            level.add(node.val);\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n        result.add(level);\n    }\n    return result;\n}",
      followUps: [
        { question: "What's the difference between BFS and DFS on trees?", answer: "BFS uses a queue and visits level by level. DFS uses a stack (or recursion) and goes deep before wide. BFS is better for finding shortest paths; DFS is better for exploring all paths." }
      ],
      keyPoints: ["Use a queue (BFS)", "Track queue size to separate levels", "Enqueue non-null children", "O(n) time, O(n) space (queue holds one level)"]
    },
    {
      id: 33,
      category: "Coding Patterns",
      topic: "Tree Traversal",
      question: "Height of binary tree",
      simpleAnswer: "Recursively compute: height = 1 + max(height(left), height(right)). Base case: null node has height 0.",
      explanation: "The height of a tree is the number of edges on the longest path from root to a leaf (or number of nodes, depending on definition). Recursively, the height of a node is 1 plus the maximum height of its two subtrees. The base case is a null node which has height 0.",
      example: "public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}",
      followUps: [
        { question: "How is height used in checking if a tree is balanced?", answer: "A balanced tree has |height(left) - height(right)| <= 1 for every node. You can check balance while computing height in a single O(n) pass." }
      ],
      keyPoints: ["height(null) = 0", "height(node) = 1 + max(height(left), height(right))", "O(n) time, O(h) space (recursion stack)", "Foundation for balanced tree checks"]
    },
    {
      id: 34,
      category: "Coding Patterns",
      topic: "Heap / Priority Queue",
      question: "K largest elements",
      simpleAnswer: "Use a min-heap of size k. For each element, add it to the heap. If heap size exceeds k, remove the minimum. At the end, the heap contains the k largest elements.",
      explanation: "A min-heap of size k always keeps the k largest elements seen so far. The root is the smallest of the k largest. When a new element comes in, if it's larger than the root (smallest of k largest), it should replace it. By maintaining heap size at k, we automatically keep the k largest. Final heap contains the answer.",
      example: "public int[] findKLargest(int[] nums, int k) {\n    PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n    for (int num : nums) {\n        minHeap.offer(num);\n        if (minHeap.size() > k) minHeap.poll();\n    }\n    return minHeap.stream().mapToInt(Integer::intValue).toArray();\n}",
      followUps: [
        { question: "What's the time complexity?", answer: "O(n log k) — for each of n elements, heap operations take O(log k). Much better than O(n log n) sorting when k << n." }
      ],
      keyPoints: ["Min-heap of size k", "If new element > heap root, replace root", "O(n log k) time, O(k) space", "Better than sorting when k is small"]
    },
    {
      id: 35,
      category: "Coding Patterns",
      topic: "Heap / Priority Queue",
      question: "Top K frequent elements",
      simpleAnswer: "Build a frequency map, then use a min-heap of size k on (frequency, element) pairs. The heap keeps the k most frequent elements.",
      explanation: "First, count frequencies using a HashMap. Then use a min-heap ordered by frequency. For each unique element, add it to the heap. If heap size exceeds k, remove the element with the lowest frequency. At the end, the heap contains the k most frequent elements.",
      example: "public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int n : nums) freq.merge(n, 1, Integer::sum);\n    PriorityQueue<Integer> minHeap = new PriorityQueue<>(Comparator.comparingInt(freq::get));\n    for (int num : freq.keySet()) {\n        minHeap.offer(num);\n        if (minHeap.size() > k) minHeap.poll();\n    }\n    return minHeap.stream().mapToInt(Integer::intValue).toArray();\n}",
      followUps: [
        { question: "Can you solve this in O(n) time?", answer: "Yes, using bucket sort. Create an array of lists where index = frequency. Fill buckets, then read from highest frequency bucket down until you have k elements." }
      ],
      keyPoints: ["Frequency map first, then min-heap by frequency", "Min-heap of size k keeps top k frequent", "O(n log k) time, O(n) space", "Bucket sort alternative gives O(n) time"]
    },
    {
      id: 36,
      category: "Coding Patterns",
      topic: "Greedy",
      question: "Activity selection",
      simpleAnswer: "Sort activities by end time. Greedily pick each activity that starts after the last selected activity ends. This maximizes the number of non-overlapping activities.",
      explanation: "The greedy choice is to always pick the activity that finishes earliest. By finishing early, we leave the most room for future activities. Sort by end time. Keep track of the last selected activity's end time. For each activity, if its start time >= last end time, select it and update last end time.",
      example: "public int activitySelection(int[][] activities) {\n    // Sort by end time\n    Arrays.sort(activities, Comparator.comparingInt(a -> a[1]));\n    int count = 1, lastEnd = activities[0][1];\n    for (int i = 1; i < activities.length; i++) {\n        if (activities[i][0] >= lastEnd) {\n            count++;\n            lastEnd = activities[i][1];\n        }\n    }\n    return count;\n}",
      followUps: [
        { question: "Why sort by end time and not start time?", answer: "Sorting by start time doesn't work — a long activity starting early could block many short activities. Sorting by end time ensures we always leave maximum room for future activities." }
      ],
      keyPoints: ["Sort by end time", "Greedily pick activity if start >= last end time", "O(n log n) time for sorting, O(n) for selection", "Maximizes number of non-overlapping activities"]
    },
    {
      id: 37,
      category: "Coding Patterns",
      topic: "Greedy",
      question: "Jump game",
      simpleAnswer: "Track the maximum index reachable. For each position, if it's within reach, update the max reach. If max reach >= last index, return true.",
      explanation: "At each index i, you can jump up to nums[i] steps. Track the farthest index reachable so far (maxReach). For each index i, if i > maxReach, you can't reach this position — return false. Otherwise, update maxReach = max(maxReach, i + nums[i]). If maxReach >= last index at any point, return true.",
      example: "public boolean canJump(int[] nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.length; i++) {\n        if (i > maxReach) return false;\n        maxReach = Math.max(maxReach, i + nums[i]);\n    }\n    return true;\n}",
      followUps: [
        { question: "What if you need the minimum number of jumps?", answer: "Use a greedy approach with two pointers tracking the current jump range and the farthest reachable in the next jump. Increment jump count each time you exhaust the current range." }
      ],
      keyPoints: ["Track maxReach = farthest reachable index", "If i > maxReach, return false (can't reach)", "Update maxReach = max(maxReach, i + nums[i])", "O(n) time, O(1) space"]
    },
    {
      id: 38,
      category: "Coding Patterns",
      topic: "Dynamic Programming",
      question: "Climbing stairs",
      simpleAnswer: "To reach step n, you came from step n-1 (1 step) or step n-2 (2 steps). So ways(n) = ways(n-1) + ways(n-2). This is exactly Fibonacci.",
      explanation: "Define dp[i] = number of ways to reach step i. Base cases: dp[1]=1, dp[2]=2. Recurrence: dp[i] = dp[i-1] + dp[i-2]. You can optimize space to O(1) by only keeping the last two values, since each step only depends on the previous two.",
      example: "public int climbStairs(int n) {\n    if (n <= 2) return n;\n    int prev = 1, curr = 2;\n    for (int i = 3; i <= n; i++) {\n        int next = prev + curr;\n        prev = curr;\n        curr = next;\n    }\n    return curr;\n}",
      followUps: [
        { question: "What if you can take 1, 2, or 3 steps?", answer: "dp[i] = dp[i-1] + dp[i-2] + dp[i-3]. Same pattern, just add one more term to the recurrence." }
      ],
      keyPoints: ["dp[i] = dp[i-1] + dp[i-2]", "Base cases: dp[1]=1, dp[2]=2", "Identical to Fibonacci sequence", "O(n) time, O(1) space with two variables"]
    },
    {
      id: 39,
      category: "Coding Patterns",
      topic: "Dynamic Programming",
      question: "House robber",
      simpleAnswer: "At each house, choose max of: rob current house + best from two houses ago, OR skip current house and take best from previous house. dp[i] = max(dp[i-2] + nums[i], dp[i-1]).",
      explanation: "You can't rob adjacent houses. For each house i, you have two choices: rob it (get nums[i] + dp[i-2]) or skip it (get dp[i-1]). Take the maximum. Optimize space by only keeping the last two dp values.",
      example: "public int rob(int[] nums) {\n    if (nums.length == 1) return nums[0];\n    int prev2 = 0, prev1 = 0;\n    for (int num : nums) {\n        int curr = Math.max(prev1, prev2 + num);\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    return prev1;\n}",
      followUps: [
        { question: "What if the houses are in a circle (House Robber II)?", answer: "Run the house robber algorithm twice: once on houses [0..n-2] and once on [1..n-1]. Return the maximum of both results." }
      ],
      keyPoints: ["dp[i] = max(dp[i-2] + nums[i], dp[i-1])", "Can't rob adjacent houses", "O(n) time, O(1) space with two variables", "Foundation for House Robber II (circular)"]
    },
    {
      id: 40,
      category: "Coding Patterns",
      topic: "Dynamic Programming",
      question: "Longest common subsequence",
      simpleAnswer: "Build a 2D dp table. If characters match: dp[i][j] = 1 + dp[i-1][j-1]. If not: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      explanation: "LCS finds the longest subsequence present in both strings (not necessarily contiguous). dp[i][j] = LCS of first i characters of s1 and first j characters of s2. If s1[i-1] == s2[j-1], they contribute to the LCS: dp[i][j] = 1 + dp[i-1][j-1]. Otherwise, take the best by excluding one character from either string.",
      example: "public int longestCommonSubsequence(String s1, String s2) {\n    int m = s1.length(), n = s2.length();\n    int[][] dp = new int[m + 1][n + 1];\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (s1.charAt(i - 1) == s2.charAt(j - 1))\n                dp[i][j] = 1 + dp[i - 1][j - 1];\n            else\n                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n        }\n    }\n    return dp[m][n];\n}",
      followUps: [
        { question: "How do you reconstruct the actual LCS string?", answer: "Backtrack through the dp table. If s1[i-1]==s2[j-1], include the character and go to dp[i-1][j-1]. Otherwise go to whichever of dp[i-1][j] or dp[i][j-1] is larger." }
      ],
      keyPoints: ["2D dp table: dp[i][j] = LCS of s1[0..i] and s2[0..j]", "Match: dp[i][j] = 1 + dp[i-1][j-1]", "No match: dp[i][j] = max(dp[i-1][j], dp[i][j-1])", "O(m×n) time and space"]
    },
    {
      id: 41,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Filter + Collect — filter even numbers from a list",
      simpleAnswer: "Use stream().filter(predicate).collect(Collectors.toList()) to filter elements matching a condition into a new list.",
      explanation: "filter() is an intermediate operation that takes a Predicate and keeps only elements that return true. collect(Collectors.toList()) is a terminal operation that gathers the stream elements into a List. The original list is not modified — a new list is returned.",
      example: "List<Integer> nums = Arrays.asList(1,2,3,4,5,6);\n\nList<Integer> evens = nums.stream()\n    .filter(x -> x % 2 == 0)\n    .collect(Collectors.toList());\n\n// Result: [2, 4, 6]",
      followUps: [
        { question: "What's the difference between filter() and map()?", answer: "filter() keeps or removes elements based on a condition — the list size may change. map() transforms each element into something else — the list size stays the same." }
      ],
      keyPoints: ["filter() takes a Predicate<T>", "collect(Collectors.toList()) gathers results", "Original list is unchanged", "O(n) time — processes each element once"]
    },
    {
      id: 42,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Map (Transformation) — square each number in a list",
      simpleAnswer: "Use stream().map(function).collect(Collectors.toList()) to transform each element into a new value.",
      explanation: "map() is an intermediate operation that applies a Function to each element and produces a new stream of transformed values. The output type can differ from the input type. For example, mapping a List<String> to a List<Integer> using String::length.",
      example: "List<Integer> nums = Arrays.asList(1,2,3,4,5);\n\nList<Integer> squares = nums.stream()\n    .map(x -> x * x)\n    .collect(Collectors.toList());\n\n// Result: [1, 4, 9, 16, 25]\n\n// Type change example:\nList<String> names = Arrays.asList(\"Alice\", \"Bob\");\nList<Integer> lengths = names.stream()\n    .map(String::length)\n    .collect(Collectors.toList());\n// Result: [5, 3]",
      followUps: [
        { question: "What is mapToInt() used for?", answer: "mapToInt() converts a Stream<T> to an IntStream, which has specialized methods like sum(), average(), min(), max() without boxing/unboxing overhead." }
      ],
      keyPoints: ["map() applies a Function<T,R> to each element", "Output type can differ from input type", "List size stays the same", "Use mapToInt/mapToLong for primitive streams"]
    },
    {
      id: 43,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Filter + Map — get names of adults from a list of Person objects",
      simpleAnswer: "Chain filter() to keep matching elements, then map() to extract the desired field, then collect().",
      explanation: "This is the most common real-world stream pattern. First filter to narrow down the elements, then map to extract or transform the relevant field. The chain reads like plain English: 'from people, keep those over 18, get their names, collect to list'.",
      example: "// Person class has getAge() and getName()\nList<Person> people = getPeople();\n\nList<String> adultNames = people.stream()\n    .filter(p -> p.getAge() >= 18)\n    .map(Person::getName)\n    .collect(Collectors.toList());\n\n// Input: [{Alice,25},{Bob,16},{Carol,30}]\n// Result: [\"Alice\", \"Carol\"]",
      followUps: [
        { question: "Does the order of filter and map matter?", answer: "Yes for performance. Always filter before map — this reduces the number of elements that need to be transformed. Filtering first is cheaper." }
      ],
      keyPoints: ["filter() then map() is the most common pattern", "Filter first to reduce elements before transformation", "Method references (Person::getName) are cleaner than lambdas", "O(n) time — single pass through the stream"]
    },
    {
      id: 44,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Count — count elements matching a condition",
      simpleAnswer: "Use stream().filter(predicate).count() to count elements satisfying a condition.",
      explanation: "count() is a terminal operation that returns a long. It's more efficient than collecting to a list and calling .size(). Combine with filter() to count elements matching a specific condition.",
      example: "List<Integer> nums = Arrays.asList(1,5,3,8,2,9,4);\n\nlong countAbove5 = nums.stream()\n    .filter(x -> x > 5)\n    .count();\n\n// Result: 3 (8, 9 are above 5... wait: 5,8,9 → 8,9 = 2 above 5)\n// Actually: 8 and 9 → count = 2\n\n// Count distinct elements:\nlong distinct = nums.stream().distinct().count(); // 7",
      followUps: [
        { question: "Is count() a short-circuit operation?", answer: "No, count() must process all elements. But if combined with limit(), the stream can short-circuit early." }
      ],
      keyPoints: ["count() returns long, not int", "More efficient than collect().size()", "Terminal operation — triggers stream processing", "Combine with filter() for conditional counting"]
    },
    {
      id: 45,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Find First / Any — find first element matching a condition",
      simpleAnswer: "Use stream().filter(predicate).findFirst() which returns an Optional<T>. Always handle the Optional — don't call .get() without checking.",
      explanation: "findFirst() returns an Optional containing the first element matching the filter, or Optional.empty() if none match. findAny() is similar but may return any matching element — it's faster in parallel streams. Always use orElse(), orElseGet(), or ifPresent() to safely handle the Optional.",
      example: "List<String> names = Arrays.asList(\"Alice\",\"Bob\",\"Anna\",\"Carol\");\n\n// Find first name starting with 'A'\nOptional<String> first = names.stream()\n    .filter(n -> n.startsWith(\"A\"))\n    .findFirst();\n\nfirst.ifPresent(System.out::println); // Alice\nString name = first.orElse(\"Unknown\"); // Alice\nString name2 = first.orElseThrow(() -> new RuntimeException(\"Not found\"));",
      followUps: [
        { question: "What's the difference between findFirst() and findAny()?", answer: "findFirst() always returns the first element in encounter order. findAny() may return any element — it's non-deterministic but faster in parallel streams since it doesn't need to maintain order." }
      ],
      keyPoints: ["Returns Optional<T> — never null", "Use orElse/orElseGet/ifPresent to handle Optional", "findFirst() respects order, findAny() is faster in parallel", "Short-circuit: stops processing after finding a match"]
    },
    {
      id: 46,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Sorting — sort a list naturally and with custom comparator",
      simpleAnswer: "Use stream().sorted() for natural order, or stream().sorted(Comparator) for custom order. Returns a new sorted stream.",
      explanation: "sorted() with no arguments uses the natural order (Comparable). sorted(Comparator) lets you define custom ordering. Comparator.comparing() is the cleanest way to sort by a field. You can chain .reversed() and .thenComparing() for multi-field sorting.",
      example: "List<Integer> nums = Arrays.asList(3,1,4,1,5,9,2);\n\n// Natural order\nList<Integer> asc = nums.stream()\n    .sorted()\n    .collect(Collectors.toList()); // [1,1,2,3,4,5,9]\n\n// Descending\nList<Integer> desc = nums.stream()\n    .sorted(Comparator.reverseOrder())\n    .collect(Collectors.toList()); // [9,5,4,3,2,1,1]\n\n// Sort Person by age then name\npeople.stream()\n    .sorted(Comparator.comparing(Person::getAge)\n        .thenComparing(Person::getName))\n    .collect(Collectors.toList());",
      followUps: [
        { question: "Is stream sorting stable?", answer: "Yes, Java stream's sorted() is stable — equal elements maintain their original relative order." }
      ],
      keyPoints: ["sorted() uses natural order (Comparable)", "sorted(Comparator) for custom order", "Comparator.comparing() for field-based sorting", "Chain .reversed() and .thenComparing() for multi-field sort"]
    },
    {
      id: 47,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Distinct — remove duplicates from a list",
      simpleAnswer: "Use stream().distinct().collect(Collectors.toList()) to remove duplicate elements based on equals() and hashCode().",
      explanation: "distinct() is a stateful intermediate operation that filters out duplicate elements. It uses equals() and hashCode() to determine equality. For custom objects, make sure you override both methods, otherwise distinct() won't work correctly.",
      example: "List<Integer> nums = Arrays.asList(1,2,2,3,3,3,4);\n\nList<Integer> unique = nums.stream()\n    .distinct()\n    .collect(Collectors.toList());\n// Result: [1, 2, 3, 4]\n\n// Combined with filter:\nList<Integer> uniqueEvens = nums.stream()\n    .filter(x -> x % 2 == 0)\n    .distinct()\n    .collect(Collectors.toList());\n// Result: [2, 4]",
      followUps: [
        { question: "What's the time complexity of distinct()?", answer: "O(n) on average using a HashSet internally. O(n) space to track seen elements." }
      ],
      keyPoints: ["Uses equals() and hashCode() for comparison", "Override both methods for custom objects", "O(n) time and space", "Stateful operation — maintains a set of seen elements"]
    },
    {
      id: 48,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Reduce — compute sum, product, or max of a list",
      simpleAnswer: "Use stream().reduce(identity, BinaryOperator) to combine all elements into a single result. Identity is the starting value.",
      explanation: "reduce() is a terminal operation that repeatedly applies a BinaryOperator to combine elements. The identity value is the starting value and also the result when the stream is empty. Without identity, reduce() returns Optional<T> since the stream might be empty.",
      example: "List<Integer> nums = Arrays.asList(1,2,3,4,5);\n\n// Sum\nint sum = nums.stream()\n    .reduce(0, Integer::sum); // 15\n\n// Product\nint product = nums.stream()\n    .reduce(1, (a, b) -> a * b); // 120\n\n// Max\nint max = nums.stream()\n    .reduce(Integer.MIN_VALUE, Integer::max); // 5\n\n// Without identity (returns Optional)\nOptional<Integer> optSum = nums.stream()\n    .reduce((a, b) -> a + b);",
      followUps: [
        { question: "When should you use reduce() vs sum()/max()?", answer: "For primitives, use mapToInt().sum() or mapToInt().max() — they're more readable and avoid boxing. Use reduce() for custom aggregation logic that doesn't have a built-in method." }
      ],
      keyPoints: ["Identity = starting value (0 for sum, 1 for product)", "Without identity → returns Optional", "BinaryOperator combines two elements into one", "For numbers, prefer mapToInt().sum() over reduce()"]
    },
    {
      id: 49,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Grouping — group a list of objects by a field",
      simpleAnswer: "Use Collectors.groupingBy(classifier) to group stream elements into a Map<K, List<V>> where K is the grouping key.",
      explanation: "groupingBy() is a downstream collector that partitions elements into groups. The classifier function determines the key for each element. The result is a Map where each key maps to a List of elements with that key. You can chain a downstream collector to further process each group.",
      example: "// Group employees by department\nMap<String, List<Employee>> byDept =\n    employees.stream()\n        .collect(Collectors.groupingBy(\n            Employee::getDepartment\n        ));\n// {\"Engineering\": [Alice, Bob], \"HR\": [Carol]}\n\n// Group and count\nMap<String, Long> countByDept =\n    employees.stream()\n        .collect(Collectors.groupingBy(\n            Employee::getDepartment,\n            Collectors.counting()\n        ));\n// {\"Engineering\": 2, \"HR\": 1}",
      followUps: [
        { question: "What if you want to group into a sorted map?", answer: "Use Collectors.groupingBy(classifier, TreeMap::new, Collectors.toList()) — the second argument is a Map factory." }
      ],
      keyPoints: ["Returns Map<K, List<V>> by default", "Classifier function determines the key", "Chain downstream collectors for further processing", "Most asked stream question in interviews"]
    },
    {
      id: 50,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Counting with Grouping — build a frequency map",
      simpleAnswer: "Use Collectors.groupingBy(x -> x, Collectors.counting()) to count occurrences of each element.",
      explanation: "Combining groupingBy() with the counting() downstream collector creates a frequency map. The classifier (x -> x) groups identical elements together, and counting() counts how many are in each group. This is the stream equivalent of a manual HashMap frequency count.",
      example: "List<String> words = Arrays.asList(\n    \"apple\",\"banana\",\"apple\",\"cherry\",\"banana\",\"apple\"\n);\n\nMap<String, Long> freq =\n    words.stream()\n        .collect(Collectors.groupingBy(\n            x -> x,\n            Collectors.counting()\n        ));\n// {\"apple\": 3, \"banana\": 2, \"cherry\": 1}\n\n// Find most frequent word:\nString mostFrequent = freq.entrySet().stream()\n    .max(Map.Entry.comparingByValue())\n    .map(Map.Entry::getKey)\n    .orElse(\"\");",
      followUps: [
        { question: "How is this different from a manual HashMap approach?", answer: "Functionally identical. The stream version is more declarative. The manual approach (map.merge(word, 1L, Long::sum)) can be slightly faster for large datasets due to less overhead." }
      ],
      keyPoints: ["groupingBy(x->x, counting()) = frequency map", "Returns Map<T, Long>", "Combine with max(Map.Entry.comparingByValue()) to find most frequent", "Equivalent to manual HashMap frequency count"]
    },
    {
      id: 51,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Partitioning — split a list into two groups by a condition",
      simpleAnswer: "Use Collectors.partitioningBy(predicate) to split elements into a Map<Boolean, List<T>> — true group and false group.",
      explanation: "partitioningBy() is a special case of groupingBy() that always produces exactly two groups: true and false. It's more efficient than groupingBy() for boolean conditions because it always creates exactly two buckets. You can also chain a downstream collector.",
      example: "List<Integer> nums = Arrays.asList(1,2,3,4,5,6,7,8);\n\nMap<Boolean, List<Integer>> evenOdd =\n    nums.stream()\n        .collect(Collectors.partitioningBy(\n            x -> x % 2 == 0\n        ));\n// {true: [2,4,6,8], false: [1,3,5,7]}\n\nList<Integer> evens = evenOdd.get(true);\nList<Integer> odds = evenOdd.get(false);\n\n// With downstream collector:\nMap<Boolean, Long> counts =\n    nums.stream()\n        .collect(Collectors.partitioningBy(\n            x -> x % 2 == 0,\n            Collectors.counting()\n        ));\n// {true: 4, false: 4}",
      followUps: [
        { question: "When to use partitioningBy vs groupingBy?", answer: "Use partitioningBy when you have a boolean condition (yes/no split). Use groupingBy when you have multiple categories (department, city, status, etc.)." }
      ],
      keyPoints: ["Always produces exactly two groups: true and false", "More efficient than groupingBy for boolean conditions", "Access groups with map.get(true) and map.get(false)", "Can chain downstream collectors"]
    },
    {
      id: 52,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "FlatMap — flatten a list of lists into a single list",
      simpleAnswer: "Use stream().flatMap(Collection::stream) to flatten nested collections. Each element is mapped to a stream, then all streams are merged into one.",
      explanation: "map() produces a Stream<Stream<T>> when the mapping function returns a collection. flatMap() flattens this into a single Stream<T>. It's essential when working with nested structures like a list of lists, or when each element maps to multiple results.",
      example: "List<List<Integer>> nested = Arrays.asList(\n    Arrays.asList(1,2,3),\n    Arrays.asList(4,5),\n    Arrays.asList(6,7,8,9)\n);\n\nList<Integer> flat = nested.stream()\n    .flatMap(List::stream)\n    .collect(Collectors.toList());\n// Result: [1,2,3,4,5,6,7,8,9]\n\n// Real-world: get all orders from all customers\nList<Order> allOrders = customers.stream()\n    .flatMap(c -> c.getOrders().stream())\n    .collect(Collectors.toList());",
      followUps: [
        { question: "What's the difference between map() and flatMap()?", answer: "map() is 1-to-1: each element maps to exactly one output. flatMap() is 1-to-many: each element maps to a stream of outputs, which are all merged into one stream." }
      ],
      keyPoints: ["map() → Stream<Stream<T>>, flatMap() → Stream<T>", "Each element maps to a stream, all streams merged", "Use for nested collections or 1-to-many mappings", "O(n) where n is total elements across all nested collections"]
    },
    {
      id: 53,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Max / Min — find the maximum or minimum element",
      simpleAnswer: "Use stream().max(Comparator) or stream().min(Comparator) which return Optional<T>. For numbers, use mapToInt().max() for a cleaner approach.",
      explanation: "max() and min() are terminal operations that return Optional<T>. They require a Comparator to determine ordering. For primitive streams (IntStream, LongStream), use the built-in max() and min() which return OptionalInt/OptionalLong without needing a Comparator.",
      example: "List<Integer> nums = Arrays.asList(3,1,4,1,5,9,2,6);\n\n// Max using Comparator\nOptional<Integer> max = nums.stream()\n    .max(Integer::compareTo); // Optional[9]\n\n// Min using Comparator\nOptional<Integer> min = nums.stream()\n    .min(Integer::compareTo); // Optional[1]\n\n// For objects: find oldest person\nOptional<Person> oldest = people.stream()\n    .max(Comparator.comparing(Person::getAge));\n\n// Primitive stream (no boxing)\nint maxVal = nums.stream()\n    .mapToInt(Integer::intValue)\n    .max()\n    .orElse(0);",
      followUps: [
        { question: "Why does max() return Optional?", answer: "Because the stream might be empty. If there are no elements, there's no maximum. Optional forces you to handle this case explicitly." }
      ],
      keyPoints: ["Returns Optional<T> — handle empty stream case", "Comparator.comparing() for object fields", "mapToInt().max() avoids boxing for numbers", "O(n) time — must check all elements"]
    },
    {
      id: 54,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Joining Strings — concatenate stream elements into a single string",
      simpleAnswer: "Use Collectors.joining() with optional delimiter, prefix, and suffix to concatenate string elements.",
      explanation: "Collectors.joining() is a terminal collector that concatenates CharSequence elements. It has three overloads: no args (simple concatenation), delimiter only, and delimiter + prefix + suffix. It's more efficient than manual string concatenation in a loop because it uses StringBuilder internally.",
      example: "List<String> names = Arrays.asList(\"Alice\",\"Bob\",\"Carol\");\n\n// Simple join\nString simple = names.stream()\n    .collect(Collectors.joining());\n// \"AliceBobCarol\"\n\n// With delimiter\nString csv = names.stream()\n    .collect(Collectors.joining(\", \"));\n// \"Alice, Bob, Carol\"\n\n// With delimiter, prefix, suffix\nString formatted = names.stream()\n    .collect(Collectors.joining(\", \", \"[\", \"]\"));\n// \"[Alice, Bob, Carol]\"\n\n// Join non-strings: convert first\nList<Integer> ids = Arrays.asList(1,2,3);\nString idStr = ids.stream()\n    .map(String::valueOf)\n    .collect(Collectors.joining(\",\"));\n// \"1,2,3\"",
      followUps: [
        { question: "Can you use joining() on non-String streams?", answer: "No, joining() only works on Stream<String> or Stream<CharSequence>. For other types, map to String first using .map(Object::toString) or .map(String::valueOf)." }
      ],
      keyPoints: ["Three overloads: no args, delimiter, delimiter+prefix+suffix", "Only works on Stream<String> or Stream<CharSequence>", "Uses StringBuilder internally — efficient", "Convert non-strings with .map(String::valueOf) first"]
    },
    {
      id: 55,
      category: "Coding Patterns",
      topic: "Java 8 Streams",
      question: "Convert List to Map — map each object to a key-value pair",
      simpleAnswer: "Use Collectors.toMap(keyMapper, valueMapper) to convert a stream into a Map. Handle duplicate keys with a merge function.",
      explanation: "toMap() takes two functions: one to extract the key and one to extract the value from each element. If duplicate keys exist, it throws IllegalStateException by default. Provide a third argument (merge function) to handle duplicates. Use LinkedHashMap::new as a fourth argument to preserve insertion order.",
      example: "// Map employee ID to name\nMap<Integer, String> idToName =\n    employees.stream()\n        .collect(Collectors.toMap(\n            Employee::getId,\n            Employee::getName\n        ));\n// {1: \"Alice\", 2: \"Bob\", 3: \"Carol\"}\n\n// Handle duplicates (keep last value)\nMap<String, Employee> deptToEmp =\n    employees.stream()\n        .collect(Collectors.toMap(\n            Employee::getDepartment,\n            e -> e,\n            (existing, replacement) -> replacement\n        ));\n\n// Preserve insertion order\nMap<Integer, String> ordered =\n    employees.stream()\n        .collect(Collectors.toMap(\n            Employee::getId,\n            Employee::getName,\n            (a, b) -> a,\n            LinkedHashMap::new\n        ));",
      followUps: [
        { question: "What happens if two elements have the same key?", answer: "toMap() throws IllegalStateException: 'Duplicate key'. Always provide a merge function (third argument) if duplicates are possible." }
      ],
      keyPoints: ["toMap(keyMapper, valueMapper)", "Throws on duplicate keys — provide merge function", "Merge function: (existing, replacement) -> which to keep", "Use LinkedHashMap::new to preserve insertion order"]
    }
  ]
};
