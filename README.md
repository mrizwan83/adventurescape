Background:

I want to design a rpg game where the player starts off with a weapon of some sort and 
can move throughout the map fighting npcs until they reach the boss and once they defeat
the boss they can move on to the next round. The next round will consist of a different boss.
I want to incorpare two different types of scenes, like the first scene will be the original main
map where the player can move left right up or down and walk up to npc and challenge them, and 
once they challenge them the other scene will be initiated where the player can only move
left or right, or block an attack (maybe a shield or  jump or duck), as well as the boss; 
they should have lives like 3 attempts on the boss or npc scene and if they lose all 3 attempts
bring them back to the main map and still have the boss or npc as "not-defeated" status.


Functionality & MVPs:

In { adventurescape }, users will be able to:

-{ start the game and pause the game}
-{ to move freely in the map }
-{ to interact with npcs and challenge them  }
-{ initate fight scenes and gameplay to fight npc }
-{ once defeating all npcs in a level they can challenge the boss }
-{ once defeating the boss they can continue to next level }
-{ turn music on or off }

In addition, this project will include:

-{ An About modal describing the background and rules of the game }
-{ A production README }
-{ Nav links}


Wireframes:

![Hot Nets Home Page](wireframes/wireframes.png)

-{ Nav links include links to this project's Github repo, my LinkedIn and the About info}
-{ Controls will include Start, Pause Game and will have game instructions}
-{ Game instructions will be like < to move left, > to move right; etc.}

Technologies, Libraries, APIs:

This project will be implemented with the following technologies:
-{Canvas API to render the game screen}
-{Webpack to bundle and transpile the source JavaScript code}
-{Vanilla DOM to handle user input events}

Implementation Timeline:

Friday Afternoon & Weekend: Setup project, including getting webpack up and running. 
Get canvas to show up on the screen, and spend time getting comfortable with the Canvas API. 
Create Game, Player, NPC, and Boss classes. 

Monday: Dedicate this day toward implementing the underlying logic of AdventureScape.
Have blocks showing up as "characters" and have the functionality to move them on the screen.

Tuesday: If I didn't get to it already, get the player, npc, and boss to render, as well as the map.

Wednesday: Finish implementing user controls, and focus on styling, as well as implementing the different fight scenes and nav links. If time, start on bonuses.

Thursday Morning: Deploy to GitHub pages. If time, rewrite this proposal as a production README.