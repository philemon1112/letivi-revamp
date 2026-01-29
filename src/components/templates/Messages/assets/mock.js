import Profile from "./profile.jpeg";
import Profile2 from "./p1.jpeg";
import Profile3 from "./p3.jpeg";
import chatImg from "./chatImg.jpeg";
import chatImg2 from "./chatImg2.jpeg";

export const fireStoreMessages = [
  {
    id: 6,
    chatId: 13,
    timeStamp: "132242424",
    type: "text",
    content: "hello world",
    sender: 1,
  },
  {
    id: 2,
    chatId: 13,
    timeStamp: "132242424",
    type: "image",
    images: [
      "https://images.unsplash.com/photo-1675066097559-f8cae0f4e60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    ],
    sender: 2,
  },
  // {
  //   id : 3,
  //   chatId :  12 ,
  //   timeStamp : '132242424' ,
  //   type : 'image' ,
  //   images : ['https://images.unsplash.com/photo-1675066097559-f8cae0f4e60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'],
  //   sender : 2 ,
  // },
  // {
  //   id : 4,
  //   chatId :  12 ,
  //   timeStamp : '132242424' ,
  //   type : 'text' ,
  //   content : 'Thank you' ,
  //   sender : 1 ,
  // },
  // {
  //   id : 5,
  //   chatId :  13 ,
  //   timeStamp : '132242424' ,
  //   type : 'text' ,
  //   content : 'Hello man' ,
  //   sender : 3 ,
  // },
];
export const firebaseChatMock = [
  {
    id: 12,
    participant1: {
      id: 1,
      name: "Jonathan Bonzali",
      profileUrl:
        "https://images.unsplash.com/photo-1675066097559-f8cae0f4e60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    },
    participant2: {
      id: 2,
      name: "Francis Jovanie",
      profileUrl:
        "https://images.unsplash.com/photo-1675066097559-f8cae0f4e60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    },
    lastMessage: "Hello Jonathan",
  },
  {
    id: 13,
    participant1: {
      id: 1,
      name: "Jonathan Bonzali",
      profileUrl:
        "https://images.unsplash.com/photo-1675066097559-f8cae0f4e60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    },
    participant2: {
      id: 3,
      name: "Devos Mukoko",
      profileUrl:
        "https://images.unsplash.com/photo-1674809867836-c82107fb4879?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
    },
    lastMessage: "Hello Jonathan",
  },
];
export const mockChatMessages = [
  {
    id: 1,
    img: Profile,
    name: "Jojo Kojo Thompson",
    time: "5min ago",
    numberOfMessage: "4",
    typing: true,
    message: "",
    status: "online",
    active: true,
  },
  {
    id: 2,
    img: Profile3,
    name: "Kojo Thompson",
    time: "8:35 PM",
    numberOfMessage: "",
    typing: "",
    message: "You are read !!",
    status: "",
    active: "",
  },
  {
    id: 3,
    img: Profile3,
    name: "Kojo Thompson",
    time: "8:35 PM",
    numberOfMessage: "",
    typing: "",
    message: "You are read !!",
    status: "",
    active: "",
  },
  {
    id: 4,
    img: Profile,
    name: "Jojo Kojo",
    time: "",
    numberOfMessage: "",
    typing: "",
    message: "I need company logo",
    status: "",
    active: "",
  },
  {
    id: 5,
    img: Profile,
    name: "Jojo Kojo Thompson",
    time: "5min ago",
    numberOfMessage: "4",
    typing: "",
    message: "",
    status: "online",
    active: false,
  },
  {
    img: Profile3,
    id: 6,
    name: "Kojo Thompson",
    time: "8:35 PM",
    numberOfMessage: "",
    typing: "",
    message: "You are read !!",
    status: "",
    active: "",
  },
];

export const ChatsMock = [
  [],
  [
    {
      id: 1,
      content: "Hi, How are things with our illustration builder?",
      type: "text",
      isCurrentUser: false,
      profile_image: Profile,
      time: "80:29",
    },
    {
      id: 1,
      content: `I found out that Lesya has completed her part of the work and is waiting for your review.
      I found out that Lesya has completed her part of the work and is waiting for your review.`,
      type: "text",
      isCurrentUser: false,
      profile_image: Profile,
      time: "80:30",
    },
    {
      id: 1,
      content: [chatImg, chatImg2],
      type: "img",
      isCurrentUser: false,
      profile_image: Profile,
      time: "80:30",
    },
    {
      id: 2,
      content: "Hi, How are things with our illustration builder?",
      type: "text",
      isCurrentUser: true,
      profile_image: Profile2,
      time: "80:30",
    },
  ],
  [
    {
      id: 1,
      content: `I found out that Lesya has completed her part of the work and is waiting for your review.
      I found out that Lesya has completed her part of the work and is waiting for your review.`,
      type: "text",
      isCurrentUser: false,
      profile_image: Profile,
      time: "80:30",
    },
    {
      id: 1,
      content: "Hi, How are things with our illustration builder?",
      type: "text",
      isCurrentUser: false,
      profile_image: Profile,
      time: "80:29",
    },
    {
      id: 1,
      content: [chatImg, chatImg2],
      type: "img",
      isCurrentUser: false,
      profile_image: Profile,
      time: "80:30",
    },
    {
      id: 2,
      content: "Hi, How are things with our illustration builder?",
      type: "text",
      isCurrentUser: true,
      profile_image: Profile2,
      time: "80:30",
    },
  ],
  [
    {
      id: 2,
      content: "Hi, How are things with our illustration builder?",
      type: "text",
      isCurrentUser: true,
      profile_image: Profile2,
      time: "80:30",
    },
  ],
];
