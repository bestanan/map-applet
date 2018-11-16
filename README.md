# wechat-map-applet-angie
微信小程序开发实例


**实现的功能点：**  
调用微信内置api获取当前经纬度坐标；  
通过经纬度坐标，使用讯位置服务逆解析成详细地址；  
地图marker标注；  
marker多点定位；  
仿滴滴可拖动marker点；  
搜索列表、搜索历史记录、搜索地点定位；  
定位移动复位到当前位置；  
实时显示定位详细地址信息；  
登录、登出功能；  
打卡功能；  
个人中心；  
...继续更新中...


**开发步骤**  
1.利用微信内置地图api获取并显示当前位置经纬度坐标；  
2.通过坐标，使用第三方地图api--腾讯位置服务逆解析成详细地址；  
3.搜索框，可搜索地点、公交、地铁等；  
4.搜索列表的展示；  
5.搜索目标定位；  
6.左下角悬浮标，点击可使定位移动到当前位置（悬浮按钮：当地图中心点偏离当前位置的时候，可以设置按钮，使当前位置为地图中心点）；  
7.多点定位（多个marker点标记）；  
8.打卡功能
9.更新中...


**示意图（页面样式全部更新）**  
*图0：地图定位首页（参考了摩拜单车、滴滴打车、小黄车等小程序及高德地图、腾讯地图等app）*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example0.png)  


*图1：搜索页缺省页面*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example1.png)
  
  
*图2：地图搜索列表页（参考了车来了小程序的搜索页，个人很喜欢车来了的整体风格~）*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example2.png)


*图3：搜索历史记录列表页*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example3.png)


*图4：打卡和个人中心都会提示先登录（账号密码暂时可以随便填；如果登陆不上请打开右上角小圆点打开调试）*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example4.png)


*图5：登录页面（目前还有点丑，之后会优化）*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example5.png)


*图6：个人中心页面，可以注销登录*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example6.png)


*图7：无搜索记录缺省页*  

![image](https://github.com/vedaAngie/wechat-map-applet-angie/blob/master/images/example7.png)


