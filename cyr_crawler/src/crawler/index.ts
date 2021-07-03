const Crawler = require("crawler")


export default class SiteCrawler {
  constructor() { }

  getSites(targetUrl: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let c = new Crawler({
        maxConnections: 10,
        callback: function (error: any, res: any, done: any) {
          if (error) {
            reject(error)
          }
          else {
            let $ = res.$
            let output: string[] = []
            $(".listings.table .DescriptionCell a").each((index: number, el: any) => {
              let { hostname, protocol } = res.request.uri
              output.push(`${protocol}//${hostname}${el.attribs.href}`)
            })
            resolve(output)
          }
          done();
        }
      });

      c.queue(targetUrl)
    })
  }

  getCountryMap(prefix = 'topsites'): Promise<Map<string, string>> {
    return new Promise((resolve, reject) => {
      let c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error: any, res: any, done: any) {
          if (error) {
            reject(error)
          }
          else {
            let $ = res.$
            let output = new Map()
            $(".AlexaTable.LightWeightTable li a").each((index: number, el: any) => {
              let { hostname, protocol, } = res.request.uri
              let url = `${protocol}//${hostname}/${prefix}/${el.attribs.href}`
              let countryName: string = el.children[0].data
              countryName = countryName.toUpperCase()
              output.set(countryName, url)
            })
            resolve(output)
          }
          done();
        }
      });

      c.queue('https://www.alexa.com/topsites/countries')
    })
  }


}
