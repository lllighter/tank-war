
# Tank War

## Part 1. 作品设计

### 作品主题
1. 对作品的主题及类型进行陈述；
2. 可对作品主题的意义/灵感来源等进行介绍。

- 作品主题为多模式、多地图的经典坦克大战；作品类型为游戏。
- 本作品灵感来源于小时候玩坦克大战一类的射击游戏。在回忆和探索其他作者的游戏时，我们发现此类游戏模式单一固定，地图风格古板，例如为双人模式进行守家闯关。因此我们想要在此基础上开发一款内容更为丰富、游戏模式多样、地图风格迥异的坦克大战游戏。我们去除了原本单一的守家玩法模式，转而开辟了积分、双人对战、双人BOSS模式，地图风格也更加多样化。经过如上的改进与更新，玩家们不仅可以在游戏中回味童年的经典，而且可以在游戏中品味到新模式下的乐趣。

### 作品设计思路
1. 对作品主题的实现思路、意图、表现手法进行说明；
2. 每一功能模块/功能点进行描述，应包括文字描述+界面设计。

- 作品主题的实现思路、意图、表现手法的说明：
  1. 本作品主题实现思路：摒弃原本的经典坦克大战中单一固化的游戏风格和模式，转而去更新一些新的游戏模式和游戏地图，让游戏整体内容显得更加丰富迥异。同时，我们并没有给出详细的玩法介绍，引导玩家自行进行探索和了解，从而体验到游戏中探索玩法的乐趣。
  2. 本作品主题意图：玩家通过探索与游玩游戏回忆童年的经典。
  3. 表现手法：游戏以像素为基础，结合“冰雪节”主题进行呈现，地图包括沙漠、冰雪等，游戏模式分为单人积分、双人对战以及双人BOSS模式。

- 每一功能模块/功能点的描述：
  1. **入场动画**：一辆小坦克将游戏进度条缓缓拖出，同时，游戏名Tank War逐渐显现，加载完成后，显示“按空格键继续”进入游戏主界面。
  2. **游戏主界面**：显示作品名“Tank War”，作者信息，三个游戏模式和游戏简介；画面中三辆小坦克在雪地里穿行，并智能绕开障碍物；在游戏背景中有大雪纷飞的效果；界面右上角有背景音乐的音效开关按钮，同时点击三个模式的按钮也会产生三种游戏进入的音效。
  3. **游戏简介**：通过点击“游戏简介”按钮查看游戏简介。
  4. **设置界面**：三种模式开始之前都需进行设置。
  5. **单人游戏**：通过点击“单人游戏”按钮进入单人积分赛，游戏音效随之淡入；界面左边为游戏操作区域，右边为信息提示区域（显示敌人数量、得分、操作指示以及返回主界面按钮）；在本模式下玩家通过“↑”“↓”“←”“→”“Space”键控制黄色坦克移动及发射子弹；绿色坦克数量恒为4，死亡后会自动复活并加强自身的能力（有上限）；当玩家方黄色坦克击毁敌方绿色坦克时也会加强自身的能力（有上限）同时得分加10；地图中有三类墙体：可击毁墙、不可击毁墙以及草（玩家方坦克可藏于其中，对敌方坦克隐身）；游戏中双方坦克被子弹击毁和碰撞时均为有爆炸特效和音效并死亡；当玩家方剩余生命值不为0时会自动在出生点复活并有一段无敌时间，生命值为0时游戏结束。
  6. **双人对战**：通过点击“双人对战”按钮进入双人对战赛，游戏音效随之淡入；界面左边为游戏操作区域，右边为信息提示区域（显示双方玩家生命值、操作指示以及返回主界面按钮）；在本模式下玩家1通过“W”“S”“A”“D”“J”键控制绿色坦克移动及发射子弹，玩家2通过“↑”“↓”“←”“→”“1”键控制黄色坦克移动及发射子弹；双方坦克初始生命值为3；地图中有三类墙体：可击毁墙、不可击毁墙以及树（双方坦克可藏于其中）；游戏中双方坦克被子弹击毁和碰撞时均为有爆炸特效和音效并死亡；在本模式下，地图上会随机产生四种道具：加血包（回复己方1点生命值）、无敌包（给己方坦克一段时间的无敌状态，但无法借此状态碰撞致死敌方）、加速包（提高己方坦克移动速度和子弹发送速度一段时间）、混乱包（使敌方进入一段时间的混乱状态——反向移动）；当玩家方剩余生命值不为0时会自动在出生点复活并有一段无敌时间，任意方生命值为0时游戏结束。
  7. **双人BOSS**：通过点击“双人BOSS”按钮进入双人BOSS赛，游戏音效随之淡入；界面左边为游戏操作区域，右边为信息提示区域（显示敌人数量、双方玩家生命值、Boss生命值、得分、操作指示以及返回主界面按钮）；在本模式下玩家1通过“W”“S”“A”“D”“J”键控制绿色坦克移动及发射子弹，玩家2通过“↑”“↓”“←”“→”“1”键控制黄色坦克移动及发射子弹；BOSS坦克拥有三个技能：子弹加速、减慢玩家移动速度、召唤小坦克；双方坦克初始生命值为3、BOSS初始生命值为10；地图中有三类墙体：可击毁墙（树）、不可击毁墙以及草（双方坦克可藏于其中）；游戏中双方坦克被子弹击毁和碰撞时均为有爆炸特效和音效并死亡；当玩家方剩余生命值不为0时会自动在出生点复活并有一段无敌时间，任意方生命值为0时游戏结束。
  8. **结束界面**：游戏结束界面分为三类：第一类为单人模式下的“Game Over”，第二类为双人对战模式下的Player1or2 Win，第三类为双人BOSS模式下的“Win“和“Game Over”；游戏结束时会产生游戏胜利或者失败音效，并可以点击返回按钮重新进行游戏。

## Part 2. 代码设计

1. 根据上个模块的作品设计思路，整理实现思路，对作品的代码实现进行功能分解，列出关键模块及其子模块；
2. 设计关键功能模块/功能点的流程，设计成果可以是流程图、步骤表述或伪代码形式，并列出所需的素材文件（如果有：图片、音频、视频等）。
3. 给出作品主要模块的调用逻辑；
4. 规划代码所属文件，规划整个作品结构，给出每个文件放置的模块内容以及作品目录结构。

### 1. 关键模块及其子模块
- **初始化模块**：初始化所有的音效图片地图等。
- **加载模块**：入场动画模块、游戏界面模块。
- **运动模块**：子弹移动模块、坦克移动模块，坦克碰撞模块。
- **背景模块**：下雪特效模块，地图墙体模块，信息栏模块、道具模块、游戏结束模块。
- **音效模块**：爆炸、背景音乐、子弹射击、道具产生、游戏载入、道具拾取等。

### 2. 关键功能模块/功能点的步骤表述
1. **初始化模块**：初始化所有的音效图片地图等。
2. **加载模块**：以32*32像素块填充地图及作者信息，在地图中央小坦克拖着进度条加载并在合适位置逐渐淡入作品标题，最后加载结束通过空格进入游戏主界面。
3. **运动模块**：首先，坦克和子弹通过键盘控制，其次坦克通过障碍物判定进行移动，若前方有障碍物则无法继续前进，若前方有坦克，则触发碰撞，坦克返回原点；最后，坦克射出的子弹也需要进行判定，子弹以坦克的方向进行飞出，若子弹碰到可击毁墙，则将墙击毁并消失，若子弹碰到敌方坦克，则击毁敌方坦克并消失，若碰到不可击毁墙则消失。
4. **背景模块**：下雪特效部分首先需随机每个雪花的大小产生的位置，然后以固定的速度进行下落，最后下落到地面时则消失并重新产生；地图墙体部分通过图片的加载，然后以二维数组循环进行填充绘制；信息栏部分首先与地图墙体一起绘制，其次当游戏进行过程中数据改变时要实时进行更新，最后左下角的返还按钮点击可以回到游戏主界面；道具部分首先以随机数进行四种道具和位置的产生，与地图一起进行绘制，其次，当玩家碰到道具时，为玩家提供应有特效，最后并在二维数组中赋值为地面数值并消失；游戏结束部分，当玩家胜利或者失败时，首先将原有地图进行破碎动画，其次在根据相应要求显现相应的胜利或失败图片。
5. **音效模块**：首先等待音效加载完毕后，可以进行相应的操作（如在游戏主界面有音效开关的按钮），其次在触发相应事件后，将音效激活，最后，播放完后停止音效。

**所需的素材文件**：

### 3. 主要调用逻辑
1. requestanimation循环调用关于坦克各项数据的更新函数，如果游戏结束，则触发游戏结束动画，否则持续调用。
2. 在坦克更新函数中首先调用绘制地图函数（地图函数中可能包括道具的绘制和产生）和下雪特效函数。
3. 其次通过玩家的按键进行上下左右移动的判定，判定结束后，调整相应的角度以及移动的距离，如果碰到了墙体则不能进行前进，如果碰到了树木之类的则会进行隐身，最后进行坦克的绘制。
4. 在上下左右移动判定结束后立马关于进行子弹的判定，如果玩家按下了发射子弹的按钮则开始进行关于子弹函数的调用。
5. 子弹函数调用中首先进行子弹各项参数的设定（方向、速度等），然后进行子弹方向的判定，判定完毕后，子弹前进相应的距离。如果子弹的位置与可击毁墙体产生了碰撞，则立马调用毁墙函数，最后进行子弹的绘制。
6. 子弹碰墙函数中，若碰到不可击毁墙则使子弹直接消失不再调用子弹更新函数，若碰到可击毁墙，则将二维数组中墙体的值置为地面的值并消失不再调用子弹更新函数。
7. 敌方坦克主要调用逻辑与上述情况相似，但是地方坦克在移动时会以随机数调用自动转向函数进行方向的转向，子弹发射函数也会以随机数进行调用，当敌方坦克碰到墙体后，会调用碰墙转向函数，以此实现坦克移动的智能化。
8. 当敌方坦克与我方坦克相撞时，首先检测我方坦克是否还有剩余生命值，若还有剩余生命值，则无敌一段时间，并在出生点进行复活，同时在原来位置产生爆炸特效，扣除相应生命值，敌方坦克相应数据进行提升并复活；若没有剩余生命值，则结束游戏。
9. 当敌方坦克子弹击中我方坦克时，首先检测我方坦克是否还有剩余生命值，若还有剩余生命值，则无敌一段时间，并在出生点进行复活，同时在原来位置产生爆炸特效，扣除相应生命值；若没有剩余生命值，则结束游戏。
10. 当我方坦克子弹击中敌方坦克时，首先我方坦克各项能力进行相应的提升，并获得相应的得分，其次在敌方坦克死亡位置产生爆炸特效，同时敌方坦克相应数据进行提升并复活。

### 4. Loading.js文件中主要为加载模块，游戏入场动画。
- Init.js文件中主要为游戏主界面模块。
- Share.js文件中主要为初始化模板和下雪特效模块以及音效模块。
- Single_game.js文件中主要为单人模式中的运动模块、地图墙体模块，信息栏模块、道具模块、游戏结束模块。
- Double_game.js文件中主要为双人BOSS模式中的运动模块、地图墙体模块，信息栏模块、道具模块、游戏结束模块。
- Double_battle.js文件中主要为双人对战模式中的运动模块、地图墙体模块，信息栏模块、道具模块、游戏结束模块。
- Tank War.html 文件中主要为整个canvas的初始化以及按钮的初始化。

## Part 3. 完成总结

### 1. 对课程设计作品的效果、特色、技术重难点等给出总结
此次课程设计作品我们的作品效果基本已经完成了当时设定的要求——多模式、多地图，结合冰雪主题。游戏玩法可以说相比之前更加多样化，界面的设计、入场动画、结束动画等也有了很大的创新，给人一种全新的感觉。不仅能回忆起童年的经典，还能享受探索新玩法的乐趣。但是我们在效果上也有一定的问题，在坦克移动的判定上有一点小瑕疵，比如速度超过某一阈值的时候，将出现坦克无法移动穿过墙体的问题；当道具产生在坦克所处位置时不能够自动捡取。本作品特色有在原本童年经典玩法的基础上加入了更多的模式，更多的地图色彩，单人积分模式，双人对战模式以及双人BOSS模式，尤其是在双人对战中引入了道具，在单人积分中使得坦克拥有进化能力，在双人BOSS中给予了BOSS一定的技能，这些使得玩法变得更加多样且有趣。本作品技术重难点为坦克移动的判定，因为我们的地图是以二维数组所建立，这就使得判定的要求更为严格，一旦坦克移动速度过快则会超过瞬时判定的界限，就会产生小bug。

### 2. 对作品的完成情况给出总结，并自评完成程度
此次课程设计作品完成情况基本达到了规划预期——多模式多地图的完成以及各类音效、动画的引入。但是还有许多地方可以进行优化和改进，比如设置界面的建立。

### 3. 对完成过程中遇到的问题、解决方法、待改进的内容等进行讨论
在此次课程设计作品中我们也遇到了很多问题并进行了讨论解决。
1. 关于坦克移动的判定。前期我们使用的是基于坦克左上角位置的判定，这就导致了一些位置无法通过，不管怎么进行修复都会产生一定的bug，于是我们在经过思考之后，采取了基于速度的预判定，基本解决了这个问题。
2. 关于地方坦克移动智能化的问题。前期我们使用的是撞墙和自动转向同时进行判定和执行，这就导致了有时坦克会原地打转并且可能穿模，于是我们经过思考之后，采取了优先判定撞墙再判定是否能自动转向，完美地解决了这个问题。
3. 关于游戏闪屏的问题。前期我们全部使用setinterval函数进行所有动画，在后面绘制量一大之后，出现了严重的闪屏问题，难以修复。经过审慎思考和老师的建议，我们采用了requsetanimaiton函数进行动画，虽然逻辑的判定我们想了很久，但是最终我们还是完美的解决了这个问题。
4. 关于按钮的背景图片填充问题。前期在CSS上修改样式会导致图片变成白色，经过多次尝试依旧失败，后来寻求了老师的建议，采取在JS代码里修改样式并使用“\\”加载图片路径解决了问题。

**待改进的内容**：当坦克移动速度过快时，关于墙体的判定会产生一定的问题需进行改进；整个游戏进程并没有基于电脑的fps运行，这就导致了不同电脑的游戏体验会有一定的差距；关于BOSS的技能可以更加多样化且有趣；关于地图的设定和敌人的数量可以自己设置即创建设置界面。