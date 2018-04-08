## 天天益彩后台管理系统
### 2017/12/17
* 增加了实时获取新的故障信息通知功能;
* 优化了多个功能函数;
* 在销售查询中增加了总票数和总金额的功能;
* 封装了彩票类型匹配函数
* 项目提交上线
### 13:06 2017/12/18
##### 更新文件
1. 增加文件: Administration-pc\ttycadm\src\tpls\ckerror.html
2. 更改文件: Administration-pc\ttycadm\src\tpls\trouble.html
3. 更改文件: Administration-pc\ttycadm\src\js\common.js
4. 更改文件: Administration-pc\ttycadm\src\js\trouble\troubleInfo.js
##### 更新内容
* 增加了故障模块的指定设备查询功能;
* 优化故障模块部分冗余代码;
### 2018/1/9
#### 更新内容
1. 更改了登录页面样式,优化了登录错误提示代码;
2. 在设备信息模块的详细信息中补充的更改设备运行模式的功能;
3. 修复了销售情况模块点击的显示出错或者无反应的问题,优化了该模块部分冗余代码;
4. 增加了彩票机管理模块,完成了该模块添加彩票机的功能;
### 2018/1/17
#### 更新文件
1. 更改文件: Administration-pc\ttycadm\src\tpls\salesSituation.html
2. 更改文件: src\js\situation\information.js
#### 更新内容
1. 在sales和salecount接口中region参数;
2. 销售查询增加了地区编码输入框;
### 2018/3/5
#### 更新文件
1. 更改文件 src\assets\pickerDateRange\dateRange.js
2. 更改文件 src/css/index.css
3. 更改文件 src/tpls/salesSituation.html
4. 更改文件 src/js/situation/information.js
#### 更新内容
1. 时间日期查询增加了小时和分钟选择
### 2018/03/26 12:03
#### 更新文件
1. 新增文件 ./user-index.html
2. 更改文件 ./src/js/equipment/list.js
3. 更改文件 ./src/css/index.css
#### 更新内容
1. 增加普通用户登录类型;
2. 修复了获取不到设备信息时无法正确渲染页面错误;
### 2018/03/31 17:58
#### 更新文件
1. 修改文件 src\css\index.css
2. 增加文件 src\js\userManagement\userManagement.js
3. 修改文件 src\tpls\userManagement.html
4. 增加文件 src\tpls\userManagementList.html
5. 增加文件 agent-index.html
6. 修改文件 user-index.html
7. 修改文件 index.html
#### 更新内容
1. 更改增加用户登录类型,管理员,代理商,终端用户
2. 增加了用户管理模块,实现增,删,改用户功能
### 2018/04/03 17:07
#### 更新文件
1. 修改文件 src\css\index.css
2. 修改文件 src\js\userManagement\userManagement.js
3. 修改文件 src\tpls\userManagement.html
4. 修改文件 src\tpls\userManagementList.html
#### 更新内容
1. 增加删除,添加,修改用户时二次确认功能,提升用户体验
2. 增加修改用户信息功能
3. 优化了用户管理页面显示样式
4. 修复页面缩放部分文字掉落问题
5. 列表信息添加了密码文本