# Technology Used
- React 
- Typscript 
- Styled Components 
- Context API (State mnagement)
- Moment.js


# Features Implemented 
### [x] Implemented search and sort of students
### Branch ![implement-search-and-sort-of-students](https://github.com/manchandajayant/orah-engineering-test/tree/implement-search-and-sort-of-students)
![App tool bar](../screenshots/02_toolbar.png)

### 2. Displaying a roll summary
Clicking on "Start Roll" will enter the roll mode which would display a roll state icon for each student in the list. You can click on the icon to switch between "Present", "Late", "Absent" state. In this mode, you will also see a dark blue overlay shown at the bottom of the page which displays the summary of different roll states and the number of students. They all show `0` at the moment as it hasn't been implemented. Please update it to show the correct number.

![Roll mode](../screenshots/03_roll_mode.png)

### 3. Filter students based on roll state
When clicking on each roll state icon, it should filter the list of students to only the ones with the matching roll state. Please implement a way to filter students based on roll state. You may update how we store the list of students if you haven't done so in previous steps (you can continue with using states in React, or use [Context](https://reactjs.org/docs/context.html), or use whichever state management library you are most familiar with).

### 4. (BONUS) Save the current roll and display it in activity page