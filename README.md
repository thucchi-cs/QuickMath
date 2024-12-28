# Quick Math
This is a website to practice quick mental math. It is available through the web. Made by Thuc Chi Do in September 2024.

[Link to website](https://thucchi-cs.github.io/QuickMath/)

[Video Demo](https://youtu.be/lLWkyG_WBEI?si=-LoPvHMuoPFfoUxE)

## How it works

### Game:
When you click "Go" from the settings tab, you will see the screen similar to the image below. 
![image](https://github.com/user-attachments/assets/6965dd70-83c0-438f-a470-668a44204504)
In the top left corner is the settings as well as the timer if enabled. The top right corner features a restart button if you want to start over with the same settings. There is also a score count under the restart button.
Equations of the format you chose in the settings will be randomly generated. Enter your answer in the entry field below the equation. The screen will flash green if correct, red if incorrect, and orange if skipped. 

### Settings:
When the website is first opened up, the options tab will pop up. This tab can also be opened through the settings icon in the top left corner
![image](https://github.com/user-attachments/assets/ec355538-ad70-4cc2-9e75-fec84387dd4e)
This is where you can customize your practice session. 
* **Number ranges**: The numbers that will be included during your session
* **Skip**: Option to skip questions can be enabled
* **Tries**: Choose the number of tries you get per question before it is counted as wrong
* **Timer**: Enable timer up to 10 minutes of practice to compete against others or yourself
* **Whole Numbers**: If enabled, the answers of division questions would only be integers. If disabled, answers should be rounded to the nearest 10th (0.00) if necessary
* **Operators**: Choose what operations to work with during practice session

### History:
You can access your session history through the settings window or by clicking on your score count.
![image](https://github.com/user-attachments/assets/15192bb0-3ff1-495e-8adc-641a001a816a)
You can look back at your previous equations from the session, the answers you tried, and the correct answers. The equation will be in green if you were correct, red if incorrect, and orange if skipped. The history will reset at the beginning of each new session.

### End Session:
If you set a timer, at the end of your timed session, you will see the screen similar to the one below.
![image](https://github.com/user-attachments/assets/ad365f37-f996-4d53-a174-96bf7ff383a8)
On the screen, you can see the time that you played for as well as your score count. You can also access the settings and history from this screen. Or you can choose to restart with the same settings


## Purpose and Use

### Why I made this website
I am a high schooler who loves math. However, like a lot of my classmates, I struggle with mental math. Sometimes, I would come up with random equations in my head to practice this skill. However, that was not a very efficient way to pratice. So I decided to open up my computer and started creating this website that can be used to practice this skill. I have presented this website to my school's math club and classes and have noticed significant improvements in my friend's mental math skills when they frequently practice. 

### How you can use it
This website was made for anyone to use. Feel free to use it in classrooms, math clubs/organizations, or personal use. I am open to improvements and feedback. Please reach out using the email in my profile if you want to provide any.

## Code Layout
This website is entirely front-end. It was made using JavaScript, HTML, and CSS. It was mainly created from August 28th, 2024 to September 3rd, 2024. More improvements came later. 
There are three files that make up the website: index.html, script.js, and style.css.
### index.html
This file contains the layout of the website. It creates each element you see on the screen. Buttons, texts, inputs, windows.
### script.js
This file handles the logic of how the game works. It controls every button click and input when you play the game. It generates equations based on the settings, checks your answers, flash colors, and calculate scores. The file also controls the timer as well as when and how each window pops up. To put it simply, this file controls any physical changes on the website. 
### style.css
This file is the design of the website. Styling the colors, sizes, fonts, and mobile adaptations.
