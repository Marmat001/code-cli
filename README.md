# NoterJS Code CLI

An interactive browser-based coding environment, similar to a Jupyter Notebook, but for javascript. You can write Javascript, see it being executed, and write comprehensive documentation using the markdown editor. 

## About The Build

Building this application was a great opportunity to familiarise myself with the essential concepts of: <br /> 
- Typescript and how to use React / Redux with Typescript <br />
- Simplifying state updates within Redux with the Immer library <br /> 
- Managing a project using a package-based architecture <br /> 
- Understanding the challenges of in-browser code transpiling and processing <br />
- How to safely handle and execute user-provided code directly in the browser <br />
- Automate deployment with the Lerna CLI

<br />
Some of the features provided in this application are:
<br /><br />

- Click cells to edit <br />
- The code in each editor window is all merged together into one file. If you define a variable in cell #1, you can refer to it in any of the following cells <br />
- You can display any React component, like numbers, strings or anything else by calling the "show" function. "Show" is a built in function that can be called multiple times to show multiple values <br />
- Move or delete cells using the top right navigation <br />
- Add new cells by hovering on the divider between each cell <br />
- Resize the different code windows by dragging either the vertical or horizontal size handles <br />
- Persistent code using offline storage called localForage <br />
- In-browser code transpiling and processing <br />
- Leveraging Web Assembly to run code bundler directly in browser at fast speeds <br />
- Code editor directly in the browser, the same editor used by VSCode <br />
- Deployment to NPM registry for others to easily access the CLI <br />

