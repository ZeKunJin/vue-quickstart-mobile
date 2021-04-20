module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    indentation: 2,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'layer',
          'apply',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ]
  }
}
