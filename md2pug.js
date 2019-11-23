const Markdown2Pug = require('markdown-to-pug')
const fs = require('fs')
const glob = require('glob')

let m2p = new Markdown2Pug({linkify: false});

function postPugFix(str){
  // fix image links for file-loader
  str = str.replace(/img\(src=(\".+"),alt=(.+)\)/g, "img(src=require($1),alt=$2)")

  return str
}

glob(".singlePage/*.md", {}, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    for (const file of files){
        const data = fs.readFileSync(file, "utf8")
        const pugData = m2p.render(data)
        fs.writeFileSync(`${file}.pug`, pugData, "utf8")
    }
})

const data = fs.readFileSync("index.md", "utf8")
const pugData = m2p.render(data)
fs.writeFileSync("index.pug", postPugFix(pugData), "utf8")




