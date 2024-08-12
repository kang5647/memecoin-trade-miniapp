'use client'
import React from "react";
import Script from "next/script"

export const ScriptsBlock = () => {
  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
    </>
  )
}