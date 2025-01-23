import { Amplify } from "aws-amplify";
import { signIn, signUp } from "aws-amplify/auth";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "",
      userPoolId: "",
      loginWith: {
        oauth: {
          domain:
            "",
          scopes: ["openid email profile aws.cognito.signin.user.admin "],
          redirectSignIn: ["http://localhost:3000/", "https://example.com/"],
          redirectSignOut: ["http://localhost:3000/", "https://example.com/"],
          responseType: "code",
        },
        username: "false",
        email: "true",
        phone: "false",
      },
    },
  },
});

async function signUpUtil(email, password) {
  return await signUp({
    username: email,
    password,
  });
}

async function signInUtil(email, password) {
  return await signIn({
    username: email,
    password,
  });
}

export { signUpUtil, signInUtil };
