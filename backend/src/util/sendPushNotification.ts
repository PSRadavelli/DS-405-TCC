import axios from "axios";

export const sendPushNotification = async (message: string, userId: string) => {
  const response = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
    subID: String(userId),
    appId: 4976,
    appToken: 'cB3EX57tZ8TXuCgDiyx07U',
    title: 'SmartBox',
    message: message
  }).catch((error: Error) => {
    console.log(error)
    throw new Error(error.message)
  })

  return
}