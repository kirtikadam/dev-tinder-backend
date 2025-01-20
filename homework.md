- Create a repo
- init project
- find what is node_modules, package.json, package-lock.json, 
- install express
- create a server
- listen to port 4000
- write request handlers for /dashboard
- install nodemon and update scripts in package.json file
- what are dependencies
- what is use of -g while npm install
- difference between ^ & ~


- init git
- gitignore
- create a remote repo on github
- push all code to remote
- route and route extensions /test /test/2 /
- ORDER OF THE ROUTES MATTER A LOT
- Install postman and make workspace, collection > test api call
- write logic to handle GET, POST, PATCH, DELETE API calls and test on postman
- Explore routing and use of ?, +, (), * in routes
- Use of regex in routes /a/, /.fly$/
- Reading the query params 
- Reading the dynamic routes
- Express documentation for more info on the routes


- try multiple route handlers ---> aka middlewares
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3], rH4, rH5)
NOTE  -  API call goes through a chain of middlewares until res is send by the route handler
      - Main job of express js is to get request from client and send response as soon as possible
- What is middleware? why do we need it?
- How express JS handles request behind the scenes
- difference between app.use vs app.all
- write dummy auth middleware for admin
- write dummy auth middleware for all user routes except /login
- error handling using app.use('/', (err, req, res, next)=>{})