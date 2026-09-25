"use server"

import { serverFetch, serverMutation } from "../core/server"

export const getNotificationsAPI = async () => {
  const res = await serverFetch("notifications")
  return res || { notifications: [], unreadCount: 0 }
}

export const markNotificationsAsReadAPI = async () => {
  const res = await serverMutation("notifications/mark-as-read", "PATCH", {})
  return res || { message: "Notifications marked as read" }
}

