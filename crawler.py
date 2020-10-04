import requests
from lxml import etree


data = []

html = requests.get('https://www.linuxcool.com/').text
content = etree.HTML(html)
# print(content)
urls = content.xpath("//div[contains(@class, 'column col-half')]/ul/li/a/@href")
# print(urls)


def dealSubUrl(url, it):
    it['params'] = []
    html = requests.get(url).text
    content = etree.HTML(html)
    usage = content.xpath("//p/strong[contains(text(), '语法格式')]/parent::node()/text()")
    it['usage'] = usage
    params = content.xpath("//article//table//td/text()")
    # print(usages)
    # print(params)
    for index in range(int(len(params)/2)):
        temp = {}
        temp["param"] = params[index*2].strip()
        temp["content"] = params[index*2+1].strip()
        # print(temp)
        it['params'].append(temp)

for url in urls:
    it = {}
    it['name'] = (url.split('/')[-1])
    data.append(it)
    dealSubUrl(url, it)


print(data)
# 持久化存储
import json

file_name = 'data.json'
with open(file_name, 'w', encoding="utf-8") as f:
    f.write(json.dumps(data, ensure_ascii=False))
