### Install Docker on Linux Mint 18

為了使您的系統始終可以使用最新版本的Docker，最好啟用官方Docker存儲庫。要完成此操作，請運行以下命令：
```
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 \
      --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'

sudo apt update
```

To install and successfully run Docker containers on Linux Mint 18 and 18.1, even after kernel upgrades, use the following command to install a few required packages:
```
sudo apt install linux-image-generic linux-image-extra-virtual
# Reboot the system so it would be running on the newly installed kernel image
sudo reboot
```

Install Docker
```
sudo apt install docker-engine
```
