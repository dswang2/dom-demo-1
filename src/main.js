
// 创建节点 div
const div001 = dom.create('<div></div>');
// 添加节点到body的第一个元素
const b = dom.find('body')[0];
dom.unshift(b,div001);
// 设置属性 id = div001 , border = '1px solid red ' , width = 100 , height = 100
dom.attr(div001,'id','div001')
dom.style(div001,"height","100px");
dom.style(div001,"width","100px");
dom.style(div001,"border","1px solid red");
dom.style(div001,{boder:"1px solid red", width:'200px',height:'300px'})
// 往该节点 写进内容 “这是JS创建的节点”
dom.text(div001,"第一个节点，点击蓝色消失1秒后变灰色");
// 读出该内容所写内容 并打印出来
console.log(dom.text(div001));
// 设置该节点的类为 blue , 增加点击事件，点击事件中，判断类是否存在，存在则删除类blue，5秒钟之后移除点击事件
dom.class.add(div001,"blue");
function fn(){
    console.log("div001被点击了");
    if(dom.class.has(div001,"blue")){
        dom.class.remove(div001,"blue");
    }
    setTimeout(()=>{
        dom.style(div001,{background: "lightgray"});
        dom.off(div001,"click",fn);
    },1000);
}
dom.on(div001,"click",fn);
// 加父节点
let p = dom.create('<div></div>');
dom.text(p,"加的父节点");
dom.style(p,{border:"1px solid red", width:'100%',height:'100vh'})
console.log(p);
dom.wrap(div001, p);
// 加子节点
p = dom.create('<div></div>');
dom.text(p,"加的子节点");
dom.style(p,{border:"1px solid red", width:'100px',height:'50px'})
dom.append(div001,p);
// 加前节点
const div000 = dom.create('<div></div>');
dom.text(div000,"加的前一个节点，点击子元素变红");
dom.style(div000,{border:"1px solid red", width:'200px',height:'200px'})
dom.before(div001,div000);
// 加后节点
const div002 = dom.create('<div></div>');
dom.text(div002,"加的后一个节点，点击则前一个的孩子绿色变没有，然后消失");
dom.style(div002,{border:"1px solid red", width:'200px',height:'200px'})
dom.after(div001,div002);
// 获取节点div001的上一个节点，设置属性 id = div000，border = '1px solid red ' , width = 100 , height = 100, 设置 class = green
dom.class.add(div000,"green");
// 往div000节点增加两个孩子节点
let pp = dom.create('<div></div>');
dom.text(pp,"前节点加的子节点");
dom.style(pp,{border:"1px solid red", width:'100px',height:'50px'})
dom.append(div000,pp);
p = dom.create('<div></div>');
dom.text(p,"前节点加的子节点");
dom.style(p,{border:"1px solid red", width:'100px',height:'50px'})
dom.append(div000,p);
// 往div000节点添加点击事件，点击后，先获取所有子节点，然后遍历子节点，3秒后，清空所有孩子节点
dom.on(div000,"click",()=>{
    console.log("点击了前一个节点");
    dom.each(dom.children(div000),(node)=>{
        dom.class.add(node,"red");
    })
});
// 获取节点div001的下一个节点，设置属性 id = div002, border = '1px solid red ' , width = 100 , height = 100, 设置 clas = green
var next = dom.next(div001);
dom.attr(next,"id","div002");
console.log(next);
dom.class.add(next,"big"); // 想同元素会被前面的 dom.style() 覆盖

// 往div002节点添加点击事件，点击后，所有class= green的节点，变为class= bule，3秒后，div002所有兄弟节点宽度为200
const d002 = dom.find("#div002")[0];
dom.on(d002,'click',()=>{
    console.log("点击了……");
    const list = dom.find("green");
    setTimeout(()=>{
        dom.empty(div000);
    },1000);
});
