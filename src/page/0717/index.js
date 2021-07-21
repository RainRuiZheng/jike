/*
 * @Author: your name
 * @Date: 2021-07-21 22:16:09
 * @LastEditTime: 2021-07-21 23:21:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jike/src/page/0717/index.js
 */
class VNode {
    constructor(tag, attr, children, parent, childrenTemplate) {
        this.tag = tag;
        this.attr = attr;
        this.children = children;
        this.parent = parent;
        this.childrenTemplate = childrenTemplate;
        this.uuid = this.uuid();
    }

    uuid() {
        return (
            Math.random() * 10000000000 +
            Math.random() * 100000 +
            Date.now()
        ).toString(36);
    }
}


export default class Engine {
    constructor() {
        this.nodes = new Map();
    }

    render(template, data) {
        // console.log('render',template, data)
        const re1 = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm; //匹配<div class="a">XXX</div>
        const re2 = /<(\w+)\s*([^(/>)]*)\/>/gm; //匹配<img src="a"/>
        template = template.replace(/\n/gm, "");
        while (re1.test(template) || re2.test(template)) {
            //<div class="a">XXX</div>类型
            template = template.replace(re1, (s0, s1, s2, s3) => {
                let attr = this.parseAttribute(s2);
                // let children = this.parseAttribute(s3);
                let node = new VNode(s1, attr, [], null, s3);
                this.nodes.set(node.uuid, node);
                return `(${node.uuid})`;
            });
            //<img src="a"/>类型
            template = template.replace(re2, (s0, s1, s2) => {
                let attr = this.parseAttribute(s2);
                let node = new VNode(s1, attr, [], null, "");
                this.nodes.set(node.uuid, node);
                return `(${node.uuid})`;
            });
        }
        console.log("第一阶段|解析创建node>>>", this.nodes);
        let rootNode = this.parseToNode(template);
        console.log("第二阶段|构建nodeTree>>>", rootNode);
        let dom = this.parseNodeToDom(rootNode, data);
        console.log("第三阶段|nodeTree To DomTree>>>", dom);
        return dom;
    }

    parseToNode(template) {
        let re = /\((.*?)\)/g;
        let stack = [];
        let parent = new VNode("root", {}, [], null, template, null);
        stack.push(parent);
        //转成成node节点
        while (stack.length > 0) {
            let pNode = stack.pop();
            let nodestr = pNode.childrenTemplate.trim();
            re.lastIndex = 0;
            [...nodestr.matchAll(re)].forEach((item) => {
                let n = this.nodes.get(item[1]);
                let newn = new VNode(
                    n.tag,
                    n.attr,
                    [],
                    pNode,
                    n.childrenTemplate,
                    null
                );
                pNode.children.push(newn);
                stack.push(newn);
            });
        }
        return parent.children[0];
    }



    parseNodeToDom(root, data) {
        let fragment = document.createDocumentFragment();
        let stack = [[root, fragment, data]];
        //转成成node节点
        while (stack.length > 0) {
            let [pNode, pdom, scope] = stack.pop();
            console.log('待处理pNode.attr.get("if")',pNode.attr.get("if"))
            if (pNode.attr.get("if")) {
                let [key, prop] = pNode.attr.get("if").split(".");
                key = key.trim();
                prop = prop.trim();
                const isRender = scope[key][prop];
                console.log('isRender===>>>',key,prop)
                if (!isRender) {
                    continue;
                }
            } else if (pNode.attr.get("for")) {
                let [key, prop] = pNode.attr.get("for").split("in");
                key = key.trim();
                prop = prop.trim();
                for (let i = 0; i < scope[prop].length; i++) {
                    let newnode = new VNode(
                        pNode.tag,
                        pNode.attr,
                        pNode.children,
                        pNode.parent,
                        pNode.childrenTemplate
                    );
                    let newScope = {};
                    newScope[key] = scope[prop][i];
                    let html = this.scopehtmlParse(newnode, data, newScope);
                    let ele = this.createElement(newnode, html);
                    this.scopeAtrrParse(ele, newnode, data, newScope);
                    pdom.parentNode.appendChild(ele);
                    newnode.children.forEach((item) => {
                        stack.push([item, ele, newScope]);
                    });
                }
            } else {
                let html = this.scopehtmlParse(pNode, data, scope);
                let ele = this.createElement(pNode, html);
                this.scopeAtrrParse(ele, pNode, data, scope);
                pdom.appendChild(ele);

                pNode.children.forEach((item) => {
                    stack.push([item, ele, scope]);
                });
            }
        }
        return fragment;
    }

    scopehtmlParse(node, globalScope, curentScope) {
        return node.childrenTemplate.replace(/\{\{(.*?)\}\}/g, (s0, s1) => {
            let props = s1.split(".");
            let val = curentScope[props[0]] || globalScope[props[0]];
            props.slice(1).forEach((item) => {
                val = val[item];
            });
            return val;
        });
    }

    scopeAtrrParse(ele, node, globalScope, curentScope) {
        // console.log(node.attr);
        for (let [key, value] of node.attr) {
            let result = /\{\{(.*?)\}\}/.exec(value);
            if (result && result.length > 0) {
                let props = result[1].split(".");
                let val = curentScope[props[0]] || globalScope[props[0]];
                props.slice(1).forEach((item) => {
                    val = val[item];
                });
                ele.setAttribute(key, val);
            }
        }
    }

    createElement(node, html) {
        // console.log('createElement',node, html)
        let ignoreAttr = ["for", "click","if"];
        let dom = document.createElement(node.tag);
        for (let [key, val] of node.attr) {
            if (!ignoreAttr.includes(key)) {
                dom.setAttribute(key, val);
            }
        }
        if (node.children.length === 0) {
            dom.innerHTML = html;
        }
        return dom;
    }

    parseAttribute(str) {
        let attr = new Map();
        str = str.trim();
        // /(\w+)\s*=['"](.*?)['"]/gm
        // /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
        str.replace(/(\w+)\s*=['"](.*?)['"]/gm, (s0, s1, s2) => {
            // console.log('parseAttribute',s1, s2)
            attr.set(s1, s2);
            return s0;
        });
        return attr;
    }

    parseChildren(str) {
        str.replace(/\{\{(.*?)\}\}/gm, () => { });
    }
}

/* const render = (tmpl, data = {}) => {
    const engine = new Engine();
    return engine.render(tmpl, data);
};

const tmpl = `
      <div class="newslist">
          <div class="img" v-if="info.showImage">
              <img src="{{image}}" />
          </div>
          <div class="date" v-if="info.showDate">
              {{info.name}}
          </div>
          <div class="img">
              {{info.name}}
          </div>
      </div>
  `;

const data = {
    image: "some img",
    info: { showImage: true, showDate: true, name: "aaa" }
};

const dom = render(tmpl, data);
document.querySelector('#root').appendChild(dom)
console.log(dom); */
