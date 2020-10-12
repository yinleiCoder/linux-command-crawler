# Linux命令行手册[爬虫]:clown_face:
- 数据来源：https://www.linuxcool.com/

- 数据存储：mongodb：https://www.mongodb.com/cloud

- 后台：Servless服务[腾讯云服务]
- python: 爬虫(xpath语法)
- 前端：微信小程序

### chrome爬取【正则】：

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





### 在线的Mongodb云环境：

https://cloud.mongodb.com/v2/5f842185268d972bc579cbe8#metrics/replicaSet/5f842367b9ff202e2033833f/explorer/test/linux-cmd/find

新建项目-》新建集群-》将最开始爬取下的数据保存到json文件里的数据拷贝并粘贴插入到在线Mongodb云环境的Document里即可。

准备好后，按照它的示例代码连接云mongodb环境。



## 腾讯云函数搭建后台服务：

Node环境[还可以使用其他语言环境]，并将本地的代码上传到腾讯云函数上。代码见mongodb-server文件夹.

搭建成功访问：

1. https://service-osrdenkx-1301156794.cd.apigw.tencentcs.com/release/linux-cmd?type=byName&name=linux的命令

e.g: https://service-osrdenkx-1301156794.cd.apigw.tencentcs.com/release/linux-cmd?type=byName&name=ls

2. https://service-osrdenkx-1301156794.cd.apigw.tencentcs.com/release/linux-cmd?type=getAllName



