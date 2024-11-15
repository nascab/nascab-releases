#### 此项目为NasCab官方版本发布仓库,git源代码方式部署,支持Win,Linux,Mac等多个平台和架构,源代码部署方式资源占用少,效率高,支持设备广泛,推荐低配置系统使用此方式部署
#### NasCab官方网站:https://www.nascab.cn
## 部署方式:
- 1.在您的电脑上安装NodeJs运行环境 版本18或以上 git命令行工具[或者其他git客户端]  

- 2.将此项目代码下载到您的电脑上,使用命令行工具进入到您想保存NasCab的目录,运行命令: git clone https://github.com/nascab/nascab-releases.git  或者[Gitee] git clone https://gitee.com/nascab/nascab-releases-gitee

- 3.进入到项目根目录cd nascab-releases,使用npm安装项目依赖, npm i  

- 4.项目依赖安装成功后,运行项目: npm run app 或者 node ./app/main.js   

- 5.启动大约15秒后,控制台会打印NasCab运行的端口:  
##### HTTP 服务正在运行[HTTP server is running] :http://192.168.xx.xx:3080  
##### HTTPS 服务正在运行[HTTPS server is running] : https://192.168.xx.xx:3443   

- 6.使用浏览器打开显示的网址即可访问NasCab  

- 7.更新版本:进入到项目根目录,git pull  
 
- 8.退出NasCab,在运行NasCab的命令行窗口使用Ctrl+C结束进程  

- 9.如果您在Windows平台下使用git代码方式部署,由于ffmpeg.exe超过github的100mb文件体积限制,windows平台所需的ffmpeg.exe文件托管在git lfs上,您还需要安装git lfs,然后在项目根目录执行: git lfs pull


# 常见问题:  

- 1.由于中国大陆网络原因,npm安装依赖可能失败,项目已经内置了.npmrc文件配置了中国源,如果您不在中国,可自行删除.npmrc文件   
  
- 2.ffmpeg问题,目前已经内置的ffmpeg可执行文件支持的平台如下:   
Win平台:x64,ia32   
Mac平台:x64,arm64   
Linux平台:x64,arm64    
如果您在其他架构下安装,请自行在libs目录下补充ffmpeg和ffprobe可执行文件   

- 3.NasCab启动后打印的网址无法访问?   
一些情况下,由于用户硬件环境复杂,NasCab打印的ip地址并非实际主机ip,尝试使用您主机网卡的真实局域网ip加NasCab打印的端口进行访问   

- 4.NasCab默认端口   
Linux平台下,NasCab使用3080作为http协议的默认端口,3443作为https协议的默认端口  
其他平台下,NasCab默认使用80和443作为启动端口  

- 5.NasCab默认端口被其他软件占用,我该如何启动?   
默认情况下,如果端口被占用,NasCab会自动将端口顺延,如果因为端口问题无法启动,您可以在项目根目录下创建一个名为httpport.txt的文件,文件内容为临时启动端口,比如:8888,NasCab检测到此文件后会使用文件内容中指定的端口作为启动端口,NasCab成功启动后,您可以进入到配置中心修改http端口为其他端口,然后删除掉httpport.txt文件  



### This project is the NasCab official version release warehouse, deployed in git source code, and supports multiple platforms such as Win, Linux, and Mac.  
# Deployment:  

- 1.Install NodeJs running environment version 18 or above git command line tool [or other git client] on your computer  

- 2.Download this project code to your computer git clone https://github.com/nascab/nascab-releases.git  

- 3 Enter the project root directory and use npm to install project dependencies, npm i  

- 4.After the project dependencies are successfully installed, run the project: npm run app or node ./app/main.js  

- 5.About 15 seconds after starting, the console will print the port where NasCab is running:  
##### HTTP server is running: http://192.168.xx.xx:3080  
##### HTTPS server is running [HTTPS server is running]: https://192.168.xx.xx:3443  

- 6.To access NasCab, simply open the displayed url using a browser

- 7.Update version: Go to the project root directory and : git pull

- 8.Exit NasCab: use Ctrl+C to end the process.

- 9.If you use git code to deploy under the Windows platform, since ffmpeg.exe exceeds the 100mb file size limit of Github, the ffmpeg.exe file required for the Windows platform is hosted on git lfs. You also need to install git lfs, and then Execute "git lfs pull" in the project root directory

### QA:
##### 1. Due to the network in Chinese Mainland, the npm installation dependency may fail. The project has built in the. npmrc file and configured the Chinese source. If you are not in China, you can delete the. npmrc file by yourself

##### 2. Regarding the ffmpeg issue, the platforms supported by the built-in ffmpeg executable files are as follows:
##### Win platform: x64, ia32
##### Mac platform: x64, arm64
##### Linux platform: x64, arm64
If you install under other architectures, please supplement the ffmpeg and ffprobe executable files in the libs directory by yourself

##### 3. The website printed after NasCab startup cannot be accessed?
In some cases, due to the complex hardware environment of the user, the IP address printed by NasCab is not the actual host IP. Try using the real LAN IP of your host network card and the port printed by NasCab to access it

##### 4. NasCab default port
On the Linux platform, NasCab uses 3080 as the default port for the HTTP protocol and 3443 as the default port for the HTTPS protocol
On other platforms, NasCab defaults to using 80 and 443 as startup ports

##### 5. How can I start NasCab if its default port is occupied by other software?
By default, if a port is occupied, NasCab will automatically extend the port. If the port cannot be started due to port issues, you can create a file named httpport.exe in the project root directory, which contains a temporary boot port, such as 8888. After NasCab detects this file, it will use the specified port in the file content as the boot port. After NasCab successfully starts, you can go to the configuration center to modify the http port to another port, and then delete the httpport.exe file