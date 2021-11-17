# Simple Planner

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Hi, its is a simple planner which has been written in 2 days.

Here we can...

1) Add a new note:
  ![image](https://user-images.githubusercontent.com/78899681/142024213-54a372bf-1b9a-4fe8-8e97-500a14152ad0.png)
    The user can type its name and create todos up to 5. However, he cannot leave fields empty - the validator will refuse to add the note unless every requirement is fulfilled
2) After adding the user can change note's name and its todos' text
   ![image](https://user-images.githubusercontent.com/78899681/142025027-8489dc9f-8b05-48d3-aa19-ff4d9be08d0c.png)
3) If the user has successfully done a todo, he can mark it as completed!
   [image](https://user-images.githubusercontent.com/78899681/142025278-d42e70e4-96f0-4224-9011-8b0f21f42720.png)
4) Only after all related todos are done, the user can mark the NOTE as fully fulfilled and send it to archive by clicking on a checkbox and pressing "SUBMIT" on a modal window
  ![image](https://user-images.githubusercontent.com/78899681/142025787-976e9355-feb1-46fc-a503-c177e95b11f5.png)
  ![image](https://user-images.githubusercontent.com/78899681/142025826-831a797d-1564-4a35-b122-39bb231ac48f.png)
  ![image](https://user-images.githubusercontent.com/78899681/142025860-29e1bdf9-9f76-46b5-aea0-0f2bad8867e2.png)
  
5) Deleting notes is also possible
6) Every time the site's page loades, a random background is applied
7) If there are no notes, the user sees the following
   :![image](https://user-images.githubusercontent.com/78899681/142026734-8bb989bf-634a-4e51-9a03-adec6ca4134a.png)
8) Otherwise, the button moves to the left top
   ![image](https://user-images.githubusercontent.com/78899681/142026890-b59b8d0b-0b36-4468-8eb9-b0dac6082856.png)

Google lighthouse
![image](https://user-images.githubusercontent.com/78899681/142026393-b92124f0-a548-4d5e-9eab-3e1bc7b7674e.png)

