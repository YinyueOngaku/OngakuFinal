# Ongaku
## 1. Overview
Ongaku means "music". Ongaku is a social network specifically designed for Musicians around the world!\
On Ongaku, a user may manage their recent releases, live chat with other musicians, and even exchange ideas and start a new band!

![image](https://user-images.githubusercontent.com/66397999/187838935-0db3b857-2889-43aa-9ac3-19372ebdeb9d.png)



## 2. Tech Stacks
### Frontend
<div align="left">
    <img src="https://img.shields.io/badge/react-%5E18.2.0-green">
    <img src="https://img.shields.io/badge/redux-%5E4.2.0-green">
    <img src="https://img.shields.io/badge/react_redux-%5E8.0.2-green">
    <img src="https://img.shields.io/badge/redux_persist-%5E6.0.0-green"> 
    <img src="https://img.shields.io/badge/socket.io_client-%5E6.0.0-green">  
    <img src="https://img.shields.io/badge/cloundinary_react-%5E1.8.1-green">  
    <img src="https://img.shields.io/badge/axios-%5E0.27.2-green"> 
</div>  

### Backend
<div align="left">
    <img src="https://img.shields.io/badge/express-%5E4.16.1-green">  
    <img src="https://img.shields.io/badge/passport.js-%5E0.6.0-green">  
    <img src="https://img.shields.io/badge/passport_local-%5E1.0.0-green">   
    <img src="https://img.shields.io/badge/axios-%5E0.27.2-green"> 
    <img src="https://img.shields.io/badge/socket.io-%5E4.5.1-green">  
    <img src="https://img.shields.io/badge/bcryptjs-%5E2.4.3-green">      
    </div> 
    
### Database
<div align="left">
    <img src="https://img.shields.io/badge/MongoDB-green">
    <img src="https://img.shields.io/badge/mongoose-%5E6.5.2-green">
</div> 
    


## 3. Run **Ongaku**  Locally
- Clone **Ongaku** to your machine
- Run <code>npm install</code> to install dependencies
- Choose from one of the following commands; to start the server, run <code>npm run start</code>
- Have fun at **Ongaku** :)

Here are additional commands you may use:
- <i> Launch Ongaku in development mode </i>
`npm run start`
- <i> Launch Ongaku in production mode </i>
`npm run build`
- <i> Test your code with jest </i>
`npm run test`



## 4. Frontend: Intro to UI and Functionalities

### Welcome Page - User sign in and sign up
- Allow new musicians to join the community, and existing musicians to frequently check back on the updates of the community. 
- Authenticate users through <code>local strategy</code> in <code>Passport.js</code>, allowing users to login through username and password.
- Persist user login status upon refreshing page through <code>Redux-persist</code> library
- Backend APIs were coded to allow only authenticated users to access resources in the database.
<img width="1422" alt="Untitled" src="https://user-images.githubusercontent.com/90755784/187838005-ff886a3d-ed4c-4859-895f-65cfa803174f.png">


### Live Chat
- The live chat feature implemented with <code>Socket.io</code> allows our users to connect directly and instantly with each other on the platform 
- Messages can be started with any other person who is connected as a contact. A user can establish a 1 on 1 conversation or they can establish a group conversation with any number of their contacts
- Once the conversation is started by one user, all other participating contacts will get the new conversation added to their live chat automatically 
- Socket.io is used for instant send and receive messages, at the same time the messages will be sent to mongo atlas to save all data as history chats
<img width="1425" alt="Untitled (4)" src="https://user-images.githubusercontent.com/90755784/187838224-c9a9a307-bd2e-468c-b137-83293c87b0d9.png">


### Music Player
- Include an advanced music player with <code>Redux</code> state management and html <audio> properties
- Allow for rotating playlist, automatic forward/backward and auto song play. 
- Allow users to add music from other webpages to the play list shown in the Music Player page


### User Profile Page
- Serves as summary of the current logged-in user
- Allows users visualize their activity history in Ongaku community
- Allows users to manage/edit their profile info and avatar
- Allows users to version-control their music pieces through github-like repo systems
<img width="1435" alt="Untitled (1)" src="https://user-images.githubusercontent.com/90755784/187838111-097dc65b-7a8e-4554-80f4-bddb52b08041.png">
<img width="1428" alt="Untitled (2)" src="https://user-images.githubusercontent.com/90755784/187838119-6b3eb037-4ca0-404e-9025-f6e6fa0b94e0.png">

### Bands
- The user can see the band details on this page. Both the band they joined and the band they followed will be shown on the navigation bar
- The user can switch the displaying band by clicking on different bands
- The user can create a new band and invite other musicians to join this new band 

### Explore
- Random bands, users, and music will appear on this page
- Users can also search with keywords to explore more music.

<img width="1423" alt="Untitled (3)" src="https://user-images.githubusercontent.com/90755784/187838208-b0b1f61b-2ae6-485a-b11c-ba03be70972e.png">





## 5. Contributors
<table >
    <td align="center">
        <a href="https://github.com/wguab" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/90755784?v=4" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> Wenxin (Candace) Gu </span> | <span style="color: #229AEF">wguab</span></b>
            </sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/maestrokyles" style="color: white; text-decoration: none;">
            <img src="https://avatars.githubusercontent.com/u/66397999?s=400&u=030b1bfeaee0293a72a213b977877fdb37eb7ebd&v=4" width="100px;" alt=""/>
            <br />
            <sub>
                <b><span style="color: white"> Kai Sheng </span> | <span style="color: #229AEF">maestrokyles</span></b>
            </sub>
        </a>
    </td>

<table>







