const { initializeApp, applicationDefault, cert } = require("firebase-admin/app")
const { getFirestore, Timestamp, FieldValue, Filter } = require("firebase-admin/firestore")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//firebase SDK
const admin = require("firebase-admin")

const serviceAccount = require("./key.json")
const data = require("./today.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const addData = async () => {
  if (data && data.messages) {
    for (let index = 0; index < data.messages.length; index++) {
      const element = data.messages[index]

      if (element.content.split("\n")[1]) {
        let colName = element.content.split("\n")[0].replace("Coffee Golf - ", "").replace(" ", "-") + "-" + new Date().getFullYear()
        console.log(colName)
        const docRef = db.collection(colName).doc(element.author.name)
        let obj = {
          timestamp: new Date(element.timestamp),
          strokes: element.content.split("\n")[1].split(" ")[0],
          name: element.author.name,
          nickname: element.author.nickname,
          avatarUrl: element.author.avatarUrl,
        }

        await docRef.set(obj)
      }
    }
  }
}

addData()
