/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var name = document.getElementById("aqi-city-input").value.trim();
	var index = document.getElementById("aqi-value-input").value.trim();
	var zs = /^[0-9]*[1-9][0-9]*$/;                         //正则表达式，正整数
	var ce = /^[\u4e00-\u9fa5a-z]+$/gi;               //正则表达式，汉字和英文
	if (!ce.test(name)) {
		alert("请输入中英文字符!");
		document.getElementById("aqi-city-input").value = "";
		document.getElementById("aqi-city-input").focus();
	}
	else if (!zs.test(index)) {
		alert("请输入正整数！");
		document.getElementById("aqi-value-input").value = "";
		document.getElementById("aqi-value-input").focus();
	}
	
	else aqiData[name] = index;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTable = document.getElementById("aqi-table");
	var tableContent = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var  prop in aqiData){
		var tr = "<tr><td>" + prop +"</td>" + "<td>" + aqiData[prop] +"</td>" + "<td><button>删除</button></td></tr>";
		tableContent = tableContent + tr;
 	}
 	aqiTable.innerHTML = tableContent;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  var city = e.target.parentNode.parentNode.childNodes[0].innerHTML;
  delete aqiData[city];

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById("add-btn");
  addBtn.onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById("aqi-table");
	table.addEventListener("click",delBtnHandle);

}

window.onload = function() {
	init();
};