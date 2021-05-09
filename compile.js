const { compile } = require('nexe')

compile({
  input: './index.js',
  output:"vaxfind",
  build: true, 
  clean: false,
  vcBuild:['release','nosign'],
  rc:{
    CompanyName: "Tejasav Dutt",
    PRODUCTVERSION: "1,0,0,0",
    FILEVERSION: "1"
  }
}).then(() => {
  console.log('success')
})