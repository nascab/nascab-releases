[中文文档](README-ZH.md) | [English Documentation](README.md)

NasCab is a software program for managing files, photos, movies, music and books. It supports remote access and can be used as an alternative to NAS (Network Attached Storage). It is implemented purely by software and does not require specific hardware support.

### This project is the NasCab official version release warehouse, deployed in git source code, and supports multiple platforms such as Win, Linux, and Mac.  
# Deployment:  

- 1.Install NodeJs running environment version 18 or above git command line tool [or other git client] on your computer  

- 2.Download this project code to your computer `git clone https://github.com/nascab/nascab-releases.git  `

- 3 Enter the project root directory and use npm to install project dependencies, `npm i`  or `yarn`

- 4.After the project dependencies are successfully installed, run the project: `npm run app` or `node ./app/main.js`  
- MacOS/Linux platform also needs to grant executable permissions to ffmpeg and ffprobe through code deployment. Enter the command in the root directory:  `chmod -R 777` , libs,Video information will not be read without granting executable permissions


- 5.About 15 seconds after starting, the console will print the port where NasCab is running:  
##### HTTP server is running: http://192.168.xx.xx:3080  
##### HTTPS server is running [HTTPS server is running]: https://192.168.xx.xx:3443  

- 6.To access NasCab, simply open the displayed url using a browser

- 7.Update version: Go to the project root directory and : `git pull`

- 8.Exit NasCab: use `Ctrl+C` to end the process.

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