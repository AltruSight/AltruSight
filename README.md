# AltruSight #

## Project Goals ##
AltruSight’s goal is to implement a proof-of concept website to serve as a beacon of transparency when it comes to donating money to nonprofits. There are several main goals for our project. First, we want to provide a centralized system where donors can track how their donations are being used. We also wish to add a social aspect of donation in the form of a Venmo-esque payment feed, as well as the ability to favorite, share, like, etc. for any nonprofit supported on the website. We also wish to ultimately provide a comprehensive analytics platform detailing how each nonprofit spends their money, as well as details on an individual level detailing personal goals and donations.   Ultimately, our objective is to create a system that makes it easier to hold nonprofits accountable and makes it easier for donors to see how their donations are being put to use, as well as providing relevant information on the legitimacy of nonprofits supported on the website. We want to be a central hub of information for all things nonprofit.

# Dev Guide #
## Recommended IDEs/ Text Editor ##
* VSCode is the recommended editor. A number of plugins can be installed into Angular to make development easier, such as:
  * tabnine autocomplete
  * angular language service
  * angular snippets
  * tslint
  * typescript tools
  * vscode-flow-ide

## Getting Started ##
1. Make sure that you have Angular installed properly. (Install Angular CLI and install npm). Also ensure that you have git installed in your computer.
2. Open your terminal and run the command ```git clone https://github.com/AltruSight/AltruSight.git```. This will create a folder in your home directory called "altrusight".
3. Check if remote repository already exists using ```git remote -v```. It sould output something like:
```
  origin  https://github.com/AltruSight/AltruSight (fetch)
  origin  https://github.com/AltruSight/AltruSight (push)
```

4. If your remote repository is not set up, navigate to your terminal and set your remote repository (so that changes can be pushed and pulled into branches on this main repository) using the command ```git remote add origin https://github.com/AltruSight/AltruSight```. 
5. Run ```npm install --save``` to install dependencies.
6. Run ```ng serve --open``` to open the project in your default browser.

## Making Changes ##
* DO NOT directly make changes on the master branch (the default branch whenever opening the project or cloning it.
* Instead, open a new branch for your task with the command ```git checkout -b TASK_NAME_HERE```
* Add changes to git using ```git add .```
* Commit your changes to git using ```git commit -m "YOUR COMMIT CHANGES SUMMARY HERE"````
* Push your changes to your branch using ```git push```
  * You may first have to set up your remote upstream branch (so changes are reflected in your branch on GitHub) using ```git push --set-upstream origin BRANCH_NAME_HERE```
* Once your development on a branch is complete, perform a pull request (can be done through GitHub website).

