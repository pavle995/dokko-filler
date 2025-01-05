import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "eu-south-1_yoyOzx3GV",
    ClientId: "3pmtgdme8qj9ulpcc92q7jf7un"
}

export default new CognitoUserPool(poolData)