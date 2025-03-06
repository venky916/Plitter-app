"use client"
import Header from '@/components/Header'
import NotificationsFeed from '@/components/NotificationsFeed'
import React from 'react'

const Notifications = () => {
  return (
    <>
    <Header label='Notifications' showBackArrow/>
    <NotificationsFeed />
    </>
  )
}

export default Notifications
