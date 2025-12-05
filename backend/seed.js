import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dummyProblems = [
  {
    title: "Two Sum",
    difficulty: "easy",
    category: "Arrays",
    description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
    constraints: "2 <= nums.length <= 104, -109 <= nums[i] <= 109, -109 <= target <= 109",
    examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] == 9, so we return [0, 1].",
    accepted: 42
  },
  {
    title: "Reverse String",
    difficulty: "easy",
    category: "Strings",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    constraints: "1 <= s.length <= 105, s[i] is a printable ascii character.",
    examples: "Input: s = ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']",
    accepted: 38
  },
  {
    title: "Palindrome Number",
    difficulty: "easy",
    category: "Math",
    description: "Given an integer x, return true if x is palindrome integer.",
    constraints: "-231 <= x <= 231 - 1",
    examples: "Input: x = 121\nOutput: true",
    accepted: 45
  },
  {
    title: "Valid Parentheses",
    difficulty: "easy",
    category: "Stacks",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    constraints: "1 <= s.length <= 104, s consists of parentheses only '()[]{}}'",
    examples: "Input: s = '()[]{}'\nOutput: true",
    accepted: 52
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    category: "Linked Lists",
    description: "Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the two lists.",
    constraints: "The number of nodes in both lists is in the range [0, 50]",
    examples: "Input: l1 = [1,2,4], l2 = [1,3,4]\nOutput: [1,1,2,3,4]",
    accepted: 39
  },
  {
    title: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    category: "Dynamic Programming",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell that stock.",
    constraints: "1 <= prices.length <= 105, 0 <= prices[i] <= 104",
    examples: "Input: prices = [7,1,5,3,6,4]\nOutput: 5",
    accepted: 48
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    category: "Strings",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    constraints: "0 <= s.length <= 5 * 104, s consists of English letters, digits, symbols and spaces.",
    examples: "Input: s = 'abcabcbb'\nOutput: 3",
    accepted: 31
  },
  {
    title: "Container With Most Water",
    difficulty: "medium",
    category: "Arrays",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
    constraints: "n == height.length, 2 <= n <= 105, 0 <= height[i] <= 104",
    examples: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    accepted: 28
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    category: "Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    constraints: "nums1.length == m, nums2.length == n, 0 <= m <= 1000, 0 <= n <= 1000",
    examples: "Input: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000",
    accepted: 15
  },
  {
    title: "Regular Expression Matching",
    difficulty: "hard",
    category: "Dynamic Programming",
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    constraints: "1 <= s.length <= 20, 1 <= p.length <= 30",
    examples: "Input: s = 'aa', p = 'a'\nOutput: false",
    accepted: 12
  },
  {
    title: "Merge k Sorted Lists",
    difficulty: "hard",
    category: "Linked Lists",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    constraints: "k == lists.length, 0 <= k <= 10^4, 0 <= lists[i].length <= 500",
    examples: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
    accepted: 18
  },
  {
    title: "Word Search II",
    difficulty: "hard",
    category: "Backtracking",
    description: "Given an m x n board of characters and a list of strings words, return all words on the board.",
    constraints: "m == board.length, n == board[i].length, 1 <= m, n <= 12",
    examples: "Input: board = [['o','a','a','n'],['e','t','a','e'],...], words = ['oath','pea','eat','rain']\nOutput: ['eat','oath']",
    accepted: 8
  },
  {
    title: "Add Two Numbers",
    difficulty: "medium",
    category: "Linked Lists",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order.",
    constraints: "The number of nodes in each linked list is in the range [1, 100]",
    examples: "Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]",
    accepted: 34
  },
  {
    title: "Trapping Rain Water",
    difficulty: "hard",
    category: "Arrays",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: "n == height.length, 1 <= n <= 2 * 10^4, 0 <= height[i] <= 10^5",
    examples: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    accepted: 11
  },
  {
    title: "LRU Cache",
    difficulty: "medium",
    category: "Design",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    constraints: "1 <= capacity <= 3000, 1 <= Node.val <= 3000",
    examples: "LRUCache(2)\nput(1, 1); put(2, 2); get(1) -> 1; put(3, 3); get(2) -> -1",
    accepted: 22
  },
  {
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    category: "Strings",
    description: "Given a string s, return the longest palindromic substring in s.",
    constraints: "1 <= s.length <= 1000, s consist of only digits and English letters.",
    examples: "Input: s = 'babad'\nOutput: 'bab' or 'aba'",
    accepted: 27
  },
  {
    title: "ZigZag Conversion",
    difficulty: "medium",
    category: "Strings",
    description: "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows like this.",
    constraints: "1 <= s.length <= 1000, 1 <= numRows <= 1000",
    examples: "Input: s = 'PAYPALISHIRING', numRows = 3\nOutput: 'PAHNAPLSIIGYIR'",
    accepted: 25
  },
  {
    title: "Rotate Matrix",
    difficulty: "medium",
    category: "Arrays",
    description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).",
    constraints: "n == matrix.length == matrix[i].length, 1 <= n <= 20, -1000 <= matrix[i][j] <= 1000",
    examples: "Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]",
    accepted: 24
  },
  {
    title: "N-Queens",
    difficulty: "hard",
    category: "Backtracking",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.",
    constraints: "1 <= n <= 9",
    examples: "Input: n = 4\nOutput: [['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]",
    accepted: 14
  },
  {
    title: "Coin Change",
    difficulty: "medium",
    category: "Dynamic Programming",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.",
    constraints: "1 <= coins.length <= 12, 1 <= coins[i] <= 2^31 - 1, 0 <= amount <= 10^4",
    examples: "Input: coins = [1,2,5], amount = 5\nOutput: 3",
    accepted: 29
  },
  {
    title: "Word Ladder",
    difficulty: "hard",
    category: "Graph",
    description: "Given two words, beginWord and endWord, and a dictionary wordList, return the shortest number of words in one such sequence of transformation, or 0 if no such sequence exists.",
    constraints: "1 <= beginWord.length <= 10, endWord.length == beginWord.length",
    examples: "Input: beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']\nOutput: 5",
    accepted: 13
  },
]

async function main() {
  try {
    // Clear existing problems
    await prisma.problem.deleteMany({})
    console.log("✓ Cleared existing problems")

    // Seed new problems
    const createdProblems = await prisma.problem.createMany({
      data: dummyProblems,
      skipDuplicates: true,
    })

    console.log(`✓ Seeded ${createdProblems.count} problems`)
    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
