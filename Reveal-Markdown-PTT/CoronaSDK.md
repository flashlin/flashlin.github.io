<!-- .slide: data-background="#000000" -->
# Corona SDK
### Flash Master

------
<!-- .slide: data-background="#000000" -->
### Create Image
```
local player = display.newImageRect("images/player.png", 
    480, 36)
```

------
<!-- .slide: data-background="#000000" -->
### Set Image Position
```
player.x = 100
player.y = 200
```

------
<!-- .slide: data-background="#000000" -->
### Move Image
```
transition.to(player, { 
    time=1000, x=300, 
    onComplete = function()
        display.remove( player )
    end
})
```

------
<!-- .slide: data-background="#000000" -->
### Create function
```
local count = 0
local function Test()
    print(" " .. tostring(count))
end
```

-----
<!-- .slide: data-background="#000000" -->
### Animation -- Set Option
```
local sheetOptions = {
    width = 192,
    height = 192,
    numFrames = 4,
    --sheetContentWidth = 225,
    --sheetContentHeight = 62
}
```

------
<!-- .slide: data-background="#000000" -->
### Animation - Create Sprite
```
local playerSheet = graphics.newImageSheet("sheet.png", 
    sheetOptions)
local playerSprite = {
    {
        name = "running",
        start = 1,
        count = 4,
        time = 300,
        loopCount = 0,
        loopDirection = "forward"
    }, 
    { name="shoot", start=4, count=1, time=500, loopCount=1 }
}
```

------
<!-- .slide: data-background="#000000" -->
### Animation - Play Sprite
```
local player = display.newSprite(playerSheet, playerSprite)
player:setSequence("running")
player:play()
```

------
<!-- .slide: data-background="#000000" -->
### Set Gravity
```
local physics = require("physics")
physics.start()
physics.setGravity(0, 20)
```


------
<!-- .slide: data-background="#000000" -->
### Set player affected by Gravity
```
physics.addBody(player, "dynamic", { bounce=0 })
```

------
<!-- .slide: data-background="#000000" -->
### Set ground to resist Gravity
```
physics.addBody(ground, "static", { bounce=0 })
```
                