import { QuartzTransformerPlugin } from "../types"
import { toString } from "mdast-util-to-string"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { wikilinkRegex } from "./ofm"
import { getAPI as dvAPI } from "obsidian-dataview"

export interface Options {
  dataviewJSKey: string
  inlinePrefix: string
  JSPrefix: string
}

const defaultOptions: Options = {
  dataviewJSKey: "dataviewjs",
  inlinePrefix: "=",
  JSPrefix: "$=",
}

const dataviewRegex = new RegExp(/```dataview([\s\S]*?)```/, "g")

export const Dataview: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Dataview",
    textTransform(_ctx, src) {
      // do comments at text level

      if (src instanceof Buffer) {
        src = src.toString()
      }

      let match = dataviewRegex.exec(src)
      if (match) {
        // Si la correspondance existe
        console.log(match[1] + "- found")
      } else {
        console.log("Aucune correspondance trouvée.")
      }

      return src
    },
  }
}
