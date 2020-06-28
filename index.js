#!/usr/bin/env node

const exec = require("child_process").exec
const fs = require("fs")
const prettier = require("prettier")
const [node, script, read_file, write_file] = process.argv

if (!read_file) {
  console.log("请输入读文件名字")
  return
}

const [filename] = read_file.split(".").slice(-1)
const formatHash = new Map()
  .set("ts", "babel")
  .set("vue", "vue")
  .set("js", "babel")

const format = formatHash.get(filename)
if (!format) {
  console.log("无法读取该格式文件")
  return
}

const data = fs.readFileSync(read_file, "UTF-8")
const _data = prettier.format(data, {
  semi: true,
  parser: format,
  singleQuote: true,
})

fs.writeFileSync(`${read_file}mm`, _data, "utf8")

exec(`perl ${__dirname}/go.pl ${read_file}mm`, (err, stdout, stderr) => {
  if (err) {
    console.log(err)
    return
  }
  if (stderr) {
    console.log(`Error: ${stderr}`)
  }
  //   console.log(stdout)
  let res = prettier.format(stdout, {
    semi: false,
    parser: format,
    singleQuote: true,
  })

  fs.writeFile(`${write_file}`, res, (err) => {
    if (err) throw err
    console.log("文件写入成功!")
    fs.unlinkSync(`${read_file}mm`)
  })
})
