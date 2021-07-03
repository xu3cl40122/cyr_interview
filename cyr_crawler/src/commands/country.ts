import { Command, flags } from '@oclif/command'
import SiteCrawler from '../crawler/index'
import cli from 'cli-ux'
let crawler = new SiteCrawler()

export default class Country extends Command {
  static description = 'show site url on https://www.alexa.com/topsites/ by country'

  static examples = [
    `$ cyr_crawler country france -n 2
1 https://www.alexa.com/siteinfo/google.com
2 https://www.alexa.com/siteinfo/youtube.com
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    number: flags.integer({ char: 'n', default: 20, description: 'size of return list' }),
  }

  static args = [{ name: 'country', description: 'country to query' }]

  async run() {
    const { args, flags } = this.parse(Country)
    const { number } = flags
    cli.action.start('starting a process')
    let country: string = args.country

    let countryMap = await crawler.getCountryMap()
    let targetUrl = countryMap.get(country.toUpperCase()) ?? ''

    // country name 不在 https://www.alexa.com 上面
    if (!targetUrl) {
      cli.action.stop()
      return this.warn('input country not found')
    }

    let urls = await crawler.getSites(targetUrl)
    cli.action.stop()
    urls = urls.slice(0, number)
    urls.forEach((url, i) => {
      this.log(`${i + 1} ${url}`)
    })

  }
}
