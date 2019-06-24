
* Open OneDrive Folder
```
git init --bare
```

* Open Local Folder
```
git clone file:///C:/OneDrive/MyProject
```


```
git add 1.txt
git commit -m "description"
git push origin master
```

Create your public and private key
```
ssh-keygen -t rsa -C "youremail@emailhost"
```

Enter github website -> profile page -> select left SSH Keys and click "add SSH Key"
open "C:\Users\yourname\.ssh\idrsa.pub" file content and copy paste into

copy "C:\Users\yourname\.ssh" Folder into "C:\Program File\Git\.ssh" 
