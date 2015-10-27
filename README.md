# Parse-API-Web-Chat
I made this project with the intention of making videos on Udemy on how to make this project. I made the videos but never got around to publishing them just because of how unprofessional they were.

# Features:
### Registration & login:
Users can actually create accounts to login with! Parse takes care of all the nasty backend work (including security). The beautiful part is that the user login is cached into the web browser. That way when the user leaves the page or closes the browser, they will still be logged in.

### Sending/Receiving messages:
This program is more of a 'chat-room' where messages are sent and than anyone currently logged in will see those messages and who sent them.

**How it works is unconventional** but it just proves that you can make a chatting program using the parse framework. I got the real-time messaging working by implementing a little hack:

1. User sends message to chatroom (parse saves the message)
2. Users connected are constantly checking if parse has recieved any messages within the past ~500ms
3. Append the messages (if any) to the text area that is supposed to be messages.
4.  
