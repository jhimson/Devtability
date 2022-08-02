# DEVtability - Developer accountability web application


## Premise:
Devtability is an accountability app for Developers. This app will help developers in maintaining daily coding commitment. It was programmed to check the users if they haven't been coding each day. The app is scheduled to check the database every 8:00 am in the morning using a nodejs CRON-job, if they are users found that did not post their standup from yesterday. The app will automatically send an email to each users' accountability partner, saying that the user did not post a standup from the previous day.

[Live Preview - DEVtability](httpsss://devtability.netlify.app)

## User Story

- AAU, I should be able to sign up and login.
- AAU, I should be able to receive an verification email whenever I signup, and can only login when the email has been verified.
- AAU, I should be able to Read, Update and delete my own profile info.
- AAU, I should be able to Create, Read, Update and Delete posts.
- AAU, I should be able to Create, Read, Update and Delete comments on a post.
- AAU, I should be able to Create, Read, Update and Delete a reply from a comment.
- AAU, I should be able to Like/Unlike posts, comments and comment replies.
- AAU, I should be able to View other users profile and posts.
- AAU, I should be able to Search users from the list of users.
- AAU, I should be able to Add/Remove a contact from my contacts list.
- AAU, I should be able to Set my accountability partner.
- AAU, I should be able to Send/Receive messages from my contacts list in realtime.
- AAU, I should be able to See all online/offline users in the messenger.
- AAU, my accountability partner should receive an notification email whenever I did not post from the previous day.


## TRELLO
[Trello Link](https://trello.com/b/IOtefDEB/project-planning)

## Wireframes:

### Signup Page:
![Signup](https://user-images.githubusercontent.com/42398487/182246971-f96a1f55-5cda-4544-96ef-3751881db26a.png)

### Login Page:
![Login](https://user-images.githubusercontent.com/42398487/182246981-15bbe03c-6ccd-4fad-863f-e1b9f66e82be.png)


<br/>
<br/>
<br/>

## Entity Relationship Diagram (ERD):
![ERD](https://user-images.githubusercontent.com/42398487/182300248-65b17a02-fd62-482e-93e6-7a5d2b5bcfb6.png)








<br/>
<br/>
<br/>

## Technologies Used
<img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React">
<img src="[https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg](https://user-images.githubusercontent.com/42398487/182379150-5bb322d1-eebe-4765-aafa-cb73c970d999.svg)" width="36" height="36" alt="Node">


- React
- React ContextAPI
- Node.js
- Express
- MongoDB/Mongoose Database (Atlas)
- Nodemailer (For sending emails)
- Socket.io (Web sockets)
- Tailwindcss
- Insomnia (API Testing)
- Heroku
- Netlify




<br/>
<br/>

## MVP Requirements:

- [X] CRUD functionality for POSTS
- [X] CRUD functionality for COMMENTS
- [X] CRUD functionality for COMMENT REPLIES
- [X] Update functionality for User Profile
- [X] Send email to accountability partner
- [X] Realtime chatapp


## Stretch goals / ICE BOX:

- [ ] Responsive design
- [X] Realtime chat app using Socket.io (Web sockets)
- [ ] Pair programming (Video call and Sharescreen using Web RTC)
