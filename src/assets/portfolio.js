import getHtml from './getHtml'

export class Work {
    constructor(title, subtitle, date, url, features, tags, imgs) {
        this.title = title
        this.subtitle = subtitle
        this.date = date 
        this.url = url
        this.features = features
        this.tags = tags
        this.imgs = imgs
    }

    getHtml(field) {
        return getHtml(this[field])
    }
}
export default [
    new Work('Nabuco Magazine', null, '11/2017', new Url('http://www.revistanabuco.com.br'), [
        'Government funded blog and magazine',
        'Self managed Wordpress content, with advanced layout tools',
        'Multiple authors and columns',
        'Fully customized theme and functionalities',
        'Progressively enhanced content (no scripting required)'
    ],[
        'wordpress', 'blog', 'magazine', 'pregressive-enhancement', 'self-managed'
    ]),
    new Work('Reato', 'Occupational Therapy', '01/2019', new Url('https://www.toreato.com.br'), [
        'Static corporate website',
        'Prerendered single page, for better SEO',
        'Full of simple animations'
    ],[
        'static', 'single-page', 'pre-render', 'animation', 'vuejs'
    ]),
    new Work('BitJa', 'Cryptocurrency Market', '01/2018', new Url('https://www.bitja.com.br'), [
        'Brazilian cryptocurrency market application',
        'Google Material Design',
        'Multiple custom UI elements'
    ],[
        'single-page', 'vuejs', 'application', 'corporate'
    ]),
    new Work('The Mint Gallery', null, '01/2019', new Url('http://themintgallery.com'), [
        'Self managed art gallery website',
        'Multiple artists and art works',
        'Custom wordpress theme',
        'Full of simple animations'
    ],[
        'woordpress', 'single-page', 'corporate', 'animation', 'vuejs', 'self-managed'
    ]),
    new Work('Keepup', 'Time Diary', 'Ongoing/2018', new Url('https://www.toreato.com.br/diario'), [
        'Ongoing application for tracking patients routine activities',
        "Stores patients' activities data",
        'Processes data and converts in advanced interactive visualizations',
        'Restful Api built with Laravel'
    ],[
        'application', 'animation', 'single-page', 'data-visualization', 'restful-api', 'laravel'
    ]),
]

