import User from "./models/user";

(async function() {
    const firstUser = await User.records().one()
    console.log(firstUser)
})()













