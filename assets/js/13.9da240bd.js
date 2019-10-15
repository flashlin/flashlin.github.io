(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{398:function(e,t,a){"use strict";a.r(t);var n=a(0),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h3",{attrs:{id:"install-docker-on-linux-mint-18"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-docker-on-linux-mint-18","aria-hidden":"true"}},[e._v("#")]),e._v(" Install Docker on Linux Mint 18")]),e._v(" "),a("p",[e._v("為了使您的系統始終可以使用最新版本的Docker，最好啟用官方Docker存儲庫。要完成此操作，請運行以下命令：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 \\\n      --recv-keys 58118E89F3A912897C070ADBF76221572C52609D\n\nsudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'\n\nsudo apt update\n")])])]),a("p",[e._v("To install and successfully run Docker containers on Linux Mint 18 and 18.1, even after kernel upgrades, use the following command to install a few required packages:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("sudo apt install linux-image-generic linux-image-extra-virtual\n# Reboot the system so it would be running on the newly installed kernel image\nsudo reboot\n")])])]),a("p",[e._v("Install Docker")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("sudo apt install docker-engine\n")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);