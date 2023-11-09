module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'standard'],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [
          'type',
          ['builtin', 'external'],
          'internal',
          ['sibling', 'parent'],
          'index',
          'unknown'
        ],
        'newlines-between': 'always'
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false
      }
    ]
  }
}
