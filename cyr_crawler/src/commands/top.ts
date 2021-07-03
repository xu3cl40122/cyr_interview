import { Command, flags } from '@oclif/command'
import SiteCrawler from '../crawler/index'
let crawler = new SiteCrawler()

export default class Top extends Command {
  static description = 'show top <number> site url on https://www.alexa.com/topsites/'

  static examples = [
    `$ cyr_crawler top 3  
1 https://www.alexa.com/siteinfo/google.com
2 https://www.alexa.com/siteinfo/youtube.com
3 https://www.alexa.com/siteinfo/tmall.com
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [{ name: 'number', description: 'size of return list', default: 10 }]

  async run() {
    const { args, flags } = this.parse(Top)

    const { number } = args
    let urls = await crawler.getSites('https://www.alexa.com/topsites')
    urls = urls.slice(0, number)
    urls.forEach((url, i) => {
      this.log(`${i + 1} ${url}`)
    })

  }
}
