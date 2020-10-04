# Linux命令行手册[爬虫]:clown_face:
- 数据来源：https://www.linuxcool.com/

- 数据存储：mongodb

- 后台：Servless服务
- python: 爬虫
- 前端：小程序

### chrome爬取：

```javascript
let data = []
document.querySelectorAll('section ul a').forEach((item)=>{
    let it = {"name":item.href.split('/')[item.href.split('/').length-1]}
    data.push(it)
    dealSub(item.href, it)
})

function dealSub(url, it){
    it.params=[];
    fetch(url).then(res=>res.text()).then(txt=>{
        it.usage=txt.match(/语法格式(.*<\/p>)/gm)[0].match(/<\/strong>(.*)<\/p>/)[1]
        let tb = txt.match(/<tbody>(.*)<\/tbody>/gm)[0]
        let td = tb.match(/<td>(((?!<\/?td>).)*)<\/td>/g)
        for(let i=0;i>td.length;i=i+2){
            let param = td[i].match(/<td>(.*)<\/td>/)[1].trim()
            let content = td[i+1].match(/<td>(.*)<\/td>/)[1].trim()
  			it.params.push({param,content})
        }
    })
}

//js下载文本
let dataStr = JSON.stringify(data)
let filename='data.json'
let a = document.createElement('a')
let blob = new Blob([dataStr])
a.download=filename
a.href=URL.createObjectURL(blob)
a.click()
URL.revokeObjectURL(blob)
```