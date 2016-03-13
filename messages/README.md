#README.md
1. To my knowledge, everything was implemented correctly.
2. I did not collaborate or discuss this assignment with anyone
3. I spent about 1.5 hours on this assignment

Is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) or from your local machine (from file:///) from using XMLHttpRequest? Why or why not?

	It is not possible to request data from a different origin b/c the data and the file with the javascript must be from the same origin (due to the same origin policy). It is possible to request the data from your local machine using XMLHttpRequest since both the data and the file with the javascript are from the same orgin, but only if you are also using a server. If you just use file:/// (without a server) it will not work because files are always restricted.