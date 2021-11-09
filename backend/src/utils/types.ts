export const GithubPublicUserDataType = {
  login: "BishalN",
  id: 50773789,
  node_id: "MDQ6VXNlcjUwNzczNzg5",
  avatar_url: "https://avatars.githubusercontent.com/u/50773789?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/BishalN",
  html_url: "https://github.com/BishalN",
  followers_url: "https://api.github.com/users/BishalN/followers",
  following_url: "https://api.github.com/users/BishalN/following{/other_user}",
  gists_url: "https://api.github.com/users/BishalN/gists{/gist_id}",
  starred_url: "https://api.github.com/users/BishalN/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/BishalN/subscriptions",
  organizations_url: "https://api.github.com/users/BishalN/orgs",
  repos_url: "https://api.github.com/users/BishalN/repos",
  events_url: "https://api.github.com/users/BishalN/events{/privacy}",
  received_events_url: "https://api.github.com/users/BishalN/received_events",
  type: "User",
  site_admin: false,
  name: "Bishal Neupane",
  company: null,
  blog: "https://bishaln.github.io/",
  location: null,
  email: null,
  hireable: true,
  bio: "Full Stack Developer",
  twitter_username: null,
  public_repos: 67,
  public_gists: 0,
  followers: 3,
  following: 26,
  created_at: "2019-05-18T14:15:53Z",
  updated_at: "2021-10-25T16:55:13Z",
};

export const GoogleUserDataType = {
  sub: "101308876016573725254",
  name: "Bishal Neupane",
  given_name: "Bishal",
  family_name: "Neupane",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GgkyzMhg3ICB-Fy1_DLGWYSKiXRicilSoaXqJz7Eg=s96-c",
  email: "neupanebishal07@gmail.com",
  email_verified: true,
  locale: "en",
};

export const FacebookUserDataType = {
  id: "1522580281435621",
  name: "Bishal Neupane",
  email: null,
  picture: {
    data: {
      height: 50,
      is_silhouette: false,
      url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1522580281435621&height=50&width=50&ext=1639032767&hash=AeQ_UiLVoiVgiJQNuaE",
      width: 50,
    },
  },
};

export type githubType = typeof GithubPublicUserDataType;
export type googleType = typeof GoogleUserDataType;
export type facebookType = typeof FacebookUserDataType;
