import React from "react"
import IconAppStore from "./appstore"
import IconCodepen from "./codepen"
import IconExternal from "./external"
import IconFolder from "./folder"
import IconFork from "./fork"
import IconGitHub from "./github"
import IconInstagram from "./instagram"
import IconLinkedin from "./linkedin"
import IconLoader from "./loader"
import IconLocation from "./location"
import IconLogo from "./logo"
import IconPlayStore from "./playstore"
import IconStar from "./star"
import IconTwitter from "./twitter"
import IconZap from "./zap"

const Icon = ({ name }) => {
  switch (name) {
    case "AppStore":
      return <IconAppStore />
    case "Codepen":
      return <IconCodepen />
    case "External":
      return <IconExternal />
    case "Folder":
      return <IconFolder />
    case "Fork":
      return <IconFork />
    case "GitHub":
      return <IconGitHub />
    case "Instagram":
      return <IconInstagram />
    case "Linkedin":
      return <IconLinkedin />
    case "Loader":
      return <IconLoader />
    case "Location":
      return <IconLocation />
    case "Logo":
      return <IconLogo />
    case "PlayStore":
      return <IconPlayStore />
    case "Star":
      return <IconStar />
    case "Twitter":
      return <IconTwitter />
    case "Zap":
      return <IconZap />
    default:
      return <IconExternal />
  }
}

export default Icon
