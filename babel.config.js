module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  /**
   * 경로설정 => src를 루트로 환경 설정
   * babel-module-resolver 사용
   */
  plugins: [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "extension" : ['.png','.js'],
        "alias": {
          "@components": "./components",
          "@screens": "./screens",
          "@assets": "./assets",
        }
      },
    ]
  ],
};
