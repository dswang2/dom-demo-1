window.dom = {
    // 创建节点
    create(str) {
        let container = document.createElement('template');
        container.innerHTML = str.trim();
        return container.content.firstChild;
    },
    // 往后加节点
    after(node, newChild) {
        node.parentNode.insertBefore(newChild,node.nextSibling)
    },
    // 往前加节点
    before(node, newChild){
        node.parentNode.insertBefore(newChild,node);
    },
    // 把子节点加到最前面
    unshift(parent,node){
        const p0 = dom.children(parent)[0];
        parent.insertBefore(node,p0);
    },
    // 加子节点
    append(parent, node){
        parent.appendChild(node);
    },
    // 加父节点
    wrap(node, parent){
        // 这种方法虽然可以加父节点，但是会导致父节点位置不对
        // node.parentNode.appendChild(parent);
        // parent.appendChild(node);
        dom.before(node,parent);
        parent.appendChild(node);
    },
    // 删除本节点并返回删除的节点
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    // 清空子节点并返回清空的节点
    empty(node){
        const arr = [];
        let x = node.firstChild;
        while (x){
            arr.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
    },
    // 设置属性
    attr(node, name, value){ // 重载
        if(arguments.length === 3){
            node.setAttribute(name, value);
        }else if(arguments.length === 2){
            node.getAttribute(name);
        }
    },
    // 读写内容
    text(node, string){ // 适配
        if(arguments.length === 2){
            if('innerText' in node){
               node.innerText = string;
            }else {
                node.textContent = string;
            }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText;
            }else {
                return node.textContent;
            }
        }
    },
    //
    html(node, string){
        if(arguments.length === 2){
            node.innerHTML = string
        }else if(arguments.length === 1){
            return node.innerHTML
        }
    },
    // 设置样式
    style(node, name, value){
        if(arguments.length === 3){
            node.style[name] = value;
        }else if(arguments.length === 2){
            if(typeof name === "string"){
                return node.style[name];
            }else if(name instanceof Object){
                for(let key in name){
                    node.style[key] = name[key];
                }
            }
        }
    },
    class: {
        // 增加类
        add(node, className){
            node.classList.add(className);
        },
        // 删除类
        remove(node, className){
            node.classList.remove(className);
        },
        // 判断类存在
        has(node, className){
            return node.classList.contains(className);
        }
    },
    // 增加事件
    on(node, eventName, fn){
        node.addEventListener(eventName,fn)
    },
    // 删除事件
    off(node, eventName, fn){
        node.removeEventListener(eventName,fn)
    },
    // 查找指定元素
    find(selector, scope){
        return (scope || document).querySelectorAll(selector);
    },
    // 获取父元素
    parent(node){
        return node.parentNode;
    },
    // 获取子元素
    children(node){
        return node.children;
    },
    // 获取兄弟元素
    siblings(node){
        return Array.from(node.parentNode.children).filter(n => n!== node);
    },
    // 获取下一个元素
    next(node){
        let x = node.nextSibling;
        while (x && x.nodeType === 3){
            x = x.nextSibling;
        }
        return x;
    },
    // 获取上一个元素
    previous(node){
        let x = node.previousSibling;
        while (x && x.nodeType === 3){
            x = x.previousSibling;
        }
        return x;
    },
    // 遍历元素
    each(nodeList, fn){
        for(let i=0; i<nodeList.length; i++){
            fn.call(null,nodeList[i]);
        }
    },
    // 元素排行
    index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i;
    }
};