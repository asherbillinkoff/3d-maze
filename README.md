
# 3D Maze
[![Author](https://img.shields.io/badge/Author-Asher%20Billinkoff-green)](https://www.linkedin.com/in/asherbillinkoff/)

## Project Description

A 3D maze is a maze where the player is enclosed inside a box. The player can move forward, backward, right, left, up or down. In this project I developed algorithms for generating and solving 3D mazes. The project also includes a web site where the user can play the maze game interactively with the keyboard. The intent of this project was to learn about OOP, search algorithms, UI's and debugging.

<p align="center">
<img width="300" alt="maze-visual" src="https://user-images.githubusercontent.com/109813330/217209671-804cf7eb-4f2d-435f-be20-0a3b26a2a114.png">
</p>
<p align="center"><strong>Figure 1: 3D Dollhouse view of Maze</strong></p>

## Motivation

Upon finishing our search problems unit our class was tasked with the assignment of generating and solving 3D mazes using various searching algorithms, such as Breadth-First Search, Depth-First Search and A-Star Search. This unit also covered topics such as Iterative Deepening, Uniform Cost Search, Heuristics, Greedy Search and Dependency Injection. You can generate a maze with rows, columns and levels which you can toggle through as you search for the final cell (denoted with a 'G' for goal. You can also choose an algorithm for maze generation as well as an algorithm for solving the maze (BFS, DFS or A-Star). For my UI I decided to make it themed like the movie Tron with color schemes and font.

## Instructions

Before the maze is generated the user can choose to select the size of their game board along with the different algorithms they would like to utilize. They can choose to select:
* Number of Rows
* Number of Columns
* Number of Levels
* Algorithm for generating the maze
* Algorithm for solving the maze

The player (motorcycle avatar) can be directed using the keyboard arrows and if a multi-level board has been generated, they can use the "PageUp" and "PageDown" keys where available (fn-up and fn-down on Mac). If the user has selected a maze with more than one level then they will see something similar to the figure below.

<p align="center">
<img width="400" alt="figure-2" src="https://user-images.githubusercontent.com/109813330/217246631-edb78fc5-7ca0-4297-a4b2-b1dfd3ff8b33.png">
</p>
<p align="center"><strong>Figure 2: Multi-level maze game view after board initialization</strong></p>

For the GUI I chose to make the arrows different colors to provide strong visual cues to the user signalling where they could change levels. I believe this allows for a more straightforward game experience. The user will always start at the "S" cell representing the start, and they will be seeking the "G" cell representing the goal. Upon navigating to the goal window will display the gif below.

<p align="center">
<img width="691" alt="figure-3" src="https://user-images.githubusercontent.com/109813330/217248210-ded3adee-9b41-4b03-94cb-52a2b4cdf2fa.png"></p>
<p align="center"><strong>Figure 2: Multi-level maze game view after board initialization</strong></p>

<p>Please game responsibly! :grinning:<p> 


