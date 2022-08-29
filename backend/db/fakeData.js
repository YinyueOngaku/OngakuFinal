const fakeAuths = [
	{
		"username": "Lawrence",
		"email": "lawrence@website.com",
		"password": "12$adwda3456" },
{
		"username": "Candace",
		"email": "candace@website.com",
		"password": "1234"
},
{
		"username": "Kai",
		"email": "Kai@website.com",
		"password": "12$asfse456"
},
{
		"username": "Dua Lipa",
		"email": "dualipa@website.com",
		"password": "12$asfse456"
},
];



const fakeUsers = [
	{
		"username": "Lawrence",
		"bio": "I am a singer from Italy, Please enjoy my music!",
		"avatar": "https://picsum.photos/id/1/200/200",
		"category": ["pop","r&b" ],
		"following": ["Dua Lipa", "Candace"],
		"followedby": ["Kai"],
		"memberof": ["Butterflies", "Ice ages"],
    "chatroom":["LawrenceCandace","BandButterflies"],
		"uploads": [
      {
        "musicName": "I like HR",
        "version_history": [
        {
        "version_name": "Original version",
        "description": "this is a song I wrote for one of my memorable experience",
        "url": "http://aweaewawe/wasd.com/weaa12343",
        "likes": 12,
        "createdAt": "Fri Aug 12 2022 11:21:26",
        },
        {
        "version_name": "Remix 1",
        "description": "this is a song I wrote for one of my memorable experience",
        "url": "http://aweaewawe/wasd.com/weaa12343",
        "likes": 12,
        "createdAt": "Fri Aug 18 2022 11:21:26",
        }]
      },

      {
        "musicName": "Javascript is another jazz",
        "version_history": [
        {
        "version_name": "Official instrumental",
        "description": "I got the inspiration from my FEC project experience",
        "url": "http://aweaewawe/wasd.com/weaa12343",
        "likes": 15,
        "createdAt": "Thu Jul 11 2022 11:21:26",
        },
        {
        "version_name": "Remix",
        "description": "this is a song I wrote for one of my memorable experience",
        "url": "http://aweaewawe/wasd.com/weaa12343",
        "likes": 12,
        "createdAt": "Fri Aug 18 2022 11:21:26"}]
      }],
		"timeline": [
			{"date": "Fri Aug 05 2020 11:21:26", "action": "Joined in the community", "involvedName": null},
      {"date": "Fri Aug 03 2021 11:21:26", "action": "Published a new song", "involvedName": "Javascript is another jazz"},
      {"date": "Fri Aug 05 2021 11:21:26", "action": "Joined band",  "involvedName": "Ice ages"},
      {"date": "Fri Nov 12 2021 11:21:26", "action": "Published a new song", "involvedName": "I like HR"},
      {"date": "Fri Jul 12 2021 11:21:26", "action": "Joined band", "involvedName": "butterfly"}
    ]},

{
  "username": "Candace",
  "bio": "I am a singer from China, Please enjoy my music!!",
  "avatar": "https://picsum.photos/id/1019/200/200",
  "category": ["Jazz","K-Pop", "old school" ],
  "following": ["Dua Lipa", "Fire", "Ice ages"],
  "followedby": ["Lawrence", "Kai"],
  "memberof": ["Butterflies"],
  "chatroom": ["LawrenceCandace","BandButterflies"],
  "uploads": [
    {
      "musicName": "Dynamite",
      "version_history": [
        {
        "version_name": "official soundtrack",
            "description": "the feeling, the mood, the dynamite!",
          "url": "http://aweaewawe/wasd.com/weaa22343",
          "likes": 100,
          "createdAt": "Fri Aug 10 2022 11:21:26"
        }]
    },
    {
      "musicName": "Life live living",
      "version_history": [
      {	"version_name": "Soundtrack 0",
      "description": "I wrote this for the ET i met last week.",
      "url": "http://aweaewawe/wasd.com/weaa22344",
      "likes": 7,
      "createdAt": "Mon Jul 11 2022 11:21:26"
      }]
    }],
  "timeline": [
    {"date": "Fri Jul 12 2020 11:21:26", "action": "Joined in the community", "involvedName": null},
    {"date": "Fri Dec 12 2020 11:21:26", "action": "Published a new song", "involvedName": "dynamite"},
    {"date": "Fri Jul 12 2021 11:21:26", "action": "Published a new song", "involvedName": "Life live living"},
    {"date": "Fri Jul 12 2021 11:21:26", "action": "Joined band", "involvedName": "butterfly"}]

},

{
  "username": "Kai",
  "bio": "I don\’t care, I don\’t mind, I am myself!",
  "avatar": "https://picsum.photos/id/1022/200/200",
  "category": ["old school", "pop music"],
  "following": ["Dua Lipa", "Lawrence", "Candace"],
  "followedby": ["Lawrence", "Kai"],
  "memberof": ["Ice ages"],
  "chatroom": [],
  "uploads": [{
    "musicName": "randomSong",
    "description": "whatever!",
    "url": "http://aweaewawe/wasd.com/weaa25343",
    "likes": 30,
    "createdAt": "Fri Aug 10 2022 10:21:26"}],
  "timeline": [
    {"date": "Fri Aug 10 2020 10:21:26", "action": "Joined in the community", "involvedName": null},
    {"date": "Fri Aug 10 2022 10:21:26", "action": "Published a new song", "involvedName": "randomSong"},
    {"date": "Fri Aug 05 2021 11:21:26", "action": "Joined band",  "involvedName": "Ice ages"}]

},
{
  "username": "Monica",
  "bio": "Welcome to my channel!",
  "avatar": "https://picsum.photos/id/5/200/200",
  "category": ["pop music"],
  "following": ["Dua Lipa", "Lawrence", "Candace"],
  "followedby": ["Lawrence", "Kai"],
  "memberof": [],
  "chatroom": [],
  "uploads": [{
    "musicName": "randomSong",
    "description": "whatever!",
    "url": "http://aweaewawe/wasd.com/weaa25343",
    "likes": 30,
    "createdAt": "Fri Aug 10 2022 10:21:26"}],
  "timeline": [
    {"date": "Fri Aug 10 2020 10:21:26", "action": "Joined in the community", "involvedName": null},
    {"date": "Fri Aug 10 2022 10:21:26", "action": "Published a new song", "involvedName": "randomSong"},
    {"date": "Fri Aug 05 2021 11:21:26", "action": "Joined band",  "involvedName": "Ice ages"}]

}
]

const fakeBands = [
	{
		"bandname": "Butterflies",
		"bio": "We are a band based in the Central Prairie",
		"category": ["pop"],
		"avatar": "https://picsum.photos/id/407/200/200",
		"followedby": ["Dua Lipa"],
		"memberof": ["Candace", "Lawrence"],
		"uploads": [
      {
        "musicName": "wE arE buttErfliEs",
        "version_history": [
          {
            "version_name": "Original",
            "description": "Debut",
            "url": "http://aweaewawe/wasd.com/weaa12343",
            "likes": 12,
            "createdAt": "Fri Aug 12 2022 11:21:26"
          },
          {
            "version_name": "Remix1",
            "description": "Debut",
            "url": "http://aweaewawe/wasd.com/weaa12343",
            "likes": 12,
            "createdAt": "Fri Aug 12 2022 11:21:26"
          },
          {
            "version_name": "Remix2",
            "description": "Debut",
            "url": "http://aweaewawe/wasd.com/weaa12343",
            "likes": 12,
            "createdAt": "Fri Aug 12 2022 11:21:26"
          }
        ]
      },
      {
        "musicName": "I will fly away",
        "version_history": [
          {
            "version_name": "Original",
            "description": "Fly away and feel the breath",
            "url": "http://aweaewawe/wasd.com/weaa12343",
            "likes": 10,
            "createdAt": "Fri Aug 14 2022 11:11:11"
          }
        ]
      }
    ],
		"timeline": [
			{
        "date": "Fri Jul 12 2021 11:21:26",
        "action": "Started the new band ",
        "involvedName": "Butterflies"
      },
      {
        "date": "Fri Aug 12 2022 11:21:26",
        "action": "Published a new song",
        "involvedName": "wE arE buttErfliEs"
      },
      {
        "date": "Fri Aug 14 2022 11:11:11",
        "action": "Published a new song",
        "involvedName": "I will fly away"
      }]
    },

	{
		"bandname": "Ice ages",
		"bio": "cold cold cold!",
		"category": ["old school"],
		"avatar": "https://picsum.photos/id/1011/200/200",
		"followedby": ["Dua Lipa", "Candace"],
		"memberof": ["Kai", "Lawrence"],
		"uploads": [
      {
        "musicName": "stay cool, stay cold",
        "version_history": [
        {
          "version_name": "Original",
          "description": "freeze!",
          "url": "http://aweaewawe/wasd.com/weaa12353",
          "likes": 12,
          "createdAt": "Fri Aug 12 2021 11:21:26",
        },
        {
          "version_name": "Remix1",
          "description": "freeze!",
          "url": "http://aweaewawe/wasd.com/weaa12353",
          "likes": 12,
          "createdAt": "Fri Aug 12 2021 11:21:26",
        },
        {
          "version_name": "Remix2",
          "description": "freeze!",
          "url": "http://aweaewawe/wasd.com/weaa12353",
          "likes": 12,
          "createdAt": "Fri Aug 12 2021 11:21:26",
        }]
      }
    ],
		"timeline": [
			{
        "date":"Fri Aug 05 2021 11:21:26",
        "action": "Started the new band ",
        "involvedName": "Butterflies"
      },
      {
        "date": "Fri Aug 12 2021 11:21:26",
        "action": "Published a new song",
        "involvedName": "stay cool, stay cold"
      }
    ]
    },
    {
      "bandname": "Fire",
      "bio": "hot hot hot",
      "category": ["old school"],
      "avatar": "https://picsum.photos/id/1047/200/200",
      "followedby": ["Dua Lipa", "Candace"],
      "memberof": ["Kai", "Lawrence"],
      "uploads": [
        {
          "musicName": "stay hot stay hot",
          "version_history": [
          {
            "version_name": "Original",
            "description": "burn",
            "url": "http://aweaewawe/wasd.com/weaa12353",
            "likes": 12,
            "createdAt": "Fri Aug 12 2021 11:21:26"
          },
          {
            "version_name": "Remix1",
            "description": "burn",
            "url": "http://aweaewawe/wasd.com/weaa12353",
            "likes": 12,
            "createdAt": "Fri Aug 12 2021 11:21:26"
          },
          {
            "version_name": "Remix2",
            "description": "burn!",
            "url": "http://aweaewawe/wasd.com/weaa12353",
            "likes": 12,
            "createdAt": "Fri Aug 12 2021 11:21:26"
          }]
        }
      ],
      "timeline": [
        {
          "date":"Fri Aug 05 2021 11:21:26",
          "action": "Started the new band ",
          "involvedName": "Butterflies"
        },
        {
          "date": "Fri Aug 12 2021 11:21:26",
          "action": "Published a new song",
          "involvedName": "stay cool, stay cold"
        }]
      }
]

const fakeChats = [
	{
		"chat_id": "LawrenceCandace",
"members": ["Lawrence", "Candace"],
"chats": [
{"time": "Fri Aug 12 2022 11:21:26",
 "user": "Lawrence",
 "comment": "Hi, Candace. How are you doing today?"},
{"time": "Fri Aug 12 2022 11:21:29",
 "user": "Candace",
 "comment": "Hi, Lawrence. Thanks for reaching out."},
{"time": "Fri Aug 12 2022 11:21:31",
 "user": "Lawrence",
 "comment": "Your music is impressive. Let us start a band."},
{"time": "Fri Aug 12 2022 11:21:31",
 "user": "Lawrence",
 "comment": "Your music is impressive. Let us start a band."}
]


},

	{
		"chat_id": "BandButterflies",
"members": ["Lawrence", "Candace"],
"chats": [
{"time": "Fri Aug 12 2022 13:21:26",
 "user": "Lawrence",
 "comment": "Hi, we are a band now!"},
{"time": "Fri Aug 12 2022 13:24:29",
 "user": "Candace",
 "comment": "Perfect! Let's create some music together!"},
{"time": "Fri Aug 12 2022 13:27:31",
 "user": "Lawrence",
 "comment": "Why not!"},
]


},


]



module.exports = {fakeAuths, fakeBands, fakeChats, fakeUsers}