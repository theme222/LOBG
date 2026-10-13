---
title: "The Making Of Wggcalc"
description: "A (really) detailed explanation of how wggcalc works under the hood."
pubDatetime: 2024-06-19T00:00:00.000Z
tags:
  - C++
  - Vue
  - WebAssembly
---

## A brief overview of Weird Gun Game

[Weird Gun Game](https://www.roblox.com/games/8381895747/Weird-Gun-Game) is a [Roblox](https://www.roblox.com/) shooter game made by Redscape Interactive with one main twist: 

In the game, players can mix and match different parts of a gun freely, creating a **humongous number of combinations**. Each part has its own stats, positively or negatively affecting the gun's overall performance, and it is up to the player to whip up their own gun to bring into battle.

A finished gun will consist of six parts: a **core**, **magazine**, **barrel**, **stock**, **scope**, and **grip**. Parts may be obtained from the shop or other means (leveling up, limited drops, events, etc.). 

A part may either contribute a stat directly or contain a modifier to the current stat on the gun itself. A part will also have a name and a category (AR, SMG, LMG, etc.), and these may provide other modifiers that affect the gun's final result.

This begs the question: *What combination of parts will give us the best possible gun?*
**Weird Gun Game Calculator** (**wggcalc**) is my solution to answer this question.

## A lesson in optimization

To truly understand and explain how wggcalc works, we need to first start off from the beginning and work our way through. I will show you a version of my algorithm at that time, and slowly but surely through each iteration of our algorithm, we will see what has truly gotten us here.

Basically, you (yes, *you* reading this!) will be going through the same process I did while developing wggcalc. From the first commit to now.

### A toy C++ script

When I tackle any type of personal project, I need to convince myself of three main things before I actually start working on it:

1. Is the thing I'm making actually **new** and not just the 1-trillionth to-do list app?
2. Do the languages/frameworks that were chosen **fit the task**?
3. Am I **learning anything new**?

At the time, I was a newly graduated high schooler. Wanting to do some good ole preparation for college, I wanted to freshen up on some core skills that I will need as a future Computer Engineer! The language that gets introduced is usually [Python](https://www.python.org/) or [C++](https://isocpp.org/). Since I had a hell of a lot of experience with Python (it being my first language and having built a couple of projects with it, including [HLA-SeqPredict](https://github.com/theme222/HLA-SeqPredict)), my main concern was definitely C++. I don't consider having learned a language until I have properly made *at least one project* in that language. So off I went trying to come up with ideas.

Do you know how hard it is to come up with a personal project in C++? This language is basically only used for graphics and other low-level shit. So trying to fit it into a project that really didn't need it very much violated my rule number 2.

This was until I found Weird Gun Game when trying to find a game to play ([see also](https://www.youtube.com/watch?v=J3BcdVaGlqc&t=2860s)). So naturally, the question of *"How do I make the best possible gun so I can bully these children?"* came into my mind. And, as anyone with knowledge in programming would do, I immediately went to make a script to find it.

So how does one actually find it? As anyone who has taken a [data structures and algorithms](https://en.wikipedia.org/wiki/Data_structure) course would tell you, **brute-force it**! Basically, the act of trying every possible combination and comparing the results. Surprisingly, the entire core of wggcalc, even to this day, is simply *"try every combination"*. 

And that is what I did! Booted up a repo, used a dataset that zyadak (someone from the Discord community) compiled and shared, converted that bad boy to [JSON](https://www.json.org/), and immediately imported it into a C++ script (for that extra speed boost baby). 

It basically went like this:

Initialize the basic class `Part`:

```cpp
class Part
{
public:
    std::string category;
    std::string name;

    float damage = 0;
    float fireRate = 0;
    float spread = 0;
    ...
};
```

And inherit it a bunch of times:

```cpp
class Barrel : public Part { ... };
class Magazine : public Part
{
public:
    float reloadTime = 0;
    float magazineSize = 0; 
};
class Grip : public Part { ... };
class Stock : public Part { ... };
```
    
Set up one for the core because it likes to be different:

```cpp
class Core
{
public:
    std::string category;
    std::string name;

    fpair damage = fpair(0, 0); // typedef std::pair<float, float> fpair;
    fpair dropoffStuds = fpair(0, 0);
    float fireRate = 0;
    ...
};
```

And for each component, we simply create an initializer and pass through our JSON object:

```cpp
Part(const json &jsonObject)
{
    if (jsonObject.contains("Category"))
        category = jsonObject["Category"];
    if (jsonObject.contains("Name"))
        name = jsonObject["Name"];
    ...
}
```

Let's move on to the calculation. For each part being applied onto a gun, it must consider two things:
1. **Does the part being applied have the same name as the core?** This is because `Part stats don't affect same gun core` (it practically is a meme in the Discord community because of noobs not realizing this).
2. **Does the part have a different category from the core?** If it does, only the stats that are considered a buff will get nerfed, leaving the debuffs alone.

So let's model those! First, a map containing some of the multipliers of using them:

```cpp
// A [index] part applying onto an AR core
std::map<std::string, float> ARPenalties = {
    {"AR", 1},
    {"Sniper", 0.7},
    {"SMG", 0.8},
    {"LMG", 0.75},
    {"Weird", 1},
};
```

And a map listing what it means for a stat to be a buff or debuff:

```cpp
std::map<std::string, bool> moreIsBetter = {
    {"damage", true},
    {"movementSpeed", true},
    {"health", true},
    {"fireRate", true},
    {"reloadSpeed", false},
    {"recoil", false},
    {"spread", false},
};
```