## REACT CHAT 

### TECHNOLOGIES

- **CREATE-REACT-APP**
- **YARN**
- **REACT HOOKS**
- **TYPESCRIPT**
- **CSS**
- **REACT-INTERSECTION-OBSERVER**
- **JEST**
- **REACT-TESTING-LIBRARY**

### DEVELOPMENT

First, I used CREATE-REACT-APP as build tool with YARN. For development, I mainly used REACT with TYPESCRIPT.

Regarding styles, I directly utilized CSS.

These are the created components:

- *App*: It handles the logic of the application by getting the data from the json file and displaying it as messages (regarding to the applied scroll by the user). Furthemore, it is in charge creating new messages, setting as read the unread messages (when they are displayed) and showing/hiding the chat by clicking on the header one (desktop feature).
- *Header*: This component shows the user name and its state (it could be either online or typing while user is typing a new message). In addition to, it displays the new messages counter (incoming and unread ones) which will be update when these messages are displayed.
- *Main*: It is in charge of showing the rendered messages by using the data props from App.
- *Message*: It displays the message data received from Main. Also, it uses the intersection observer API (with React Intersection
Observer) to notify that it has been displayed to its parent component.
- *Footer*: This one allows to the user writting and sending new messages. It includes a feature to enable / disable button regarding a new message has been typed or not.

To enhance the readability of the App code, I splitted it in several files by isolating the reducers, actionTypes and pure functions used.

Finally, I added a Helpers folder that includes two files:

- *Types*: The used types.
- *Constants*: Default values.

### PERFORMANCE

In order to improve the performance of the application, I did the following:

- Due to the huge amount messages to load (500 messages from the json file), I decided to apply a lazy load of these messages by scroll
and render a limited number of these ones (20). It was the most complicated part to develop but I considered doing this as neccesary to get a good perfomance, specially in mobile devices. 
- I made the most of the UseCallback hook to improve the performace by memoizing some values...
- Nevertheless, to deal with the displayed messages on the App component, I used the UseReducer hook because of the complexity to handle
the state related to the mentioned messages.

### TESTING

I added unit tests to Footer, Header, Main and Message components with JEST and REACT-TESTING-LIBRARY.

### DEVICES

I have successfully tested this application on Chrome and Firefox browsers (Desktop) and Chrome browser (Android).

### PRODUCTION

To deploy this application and put it online, I used NETLIFY.


