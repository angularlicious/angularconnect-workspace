module.exports = {
  name: 'rules-engine',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/rules-engine',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js'],
};
