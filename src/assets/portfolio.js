import getHtml from './getHtml'

export class Work {
    constructor(title, subtitle, date, url, features, tags, imgs, imgsFolder) {
        this.title = title
        this.subtitle = subtitle
        this.date = date 
        this.url = url
        this.features = features
        this.tags = tags
        this.imgs = imgs
        this.imgsFolder = imgsFolder
    }

    getHtml(field) {
        return getHtml(this[field])
    }
    getImgSrc(i = 0) {
        return `/imgs/portfolio/${this.imgsFolder}/${this.imgs[i]}`;
    }
}
export function makeEmptyWork() {
    return new Work('','','',null,[],[],[], '');
}
export default [
    new Work('Nabuco Magazine', null, '11/2017', new URL('http://www.revistanabuco.com.br'), [
        'Government funded blog and magazine',
        'Self managed content, with advanced layout tools',
        'Multiple authors and columns',
        'Fully customized theme and functionalities'
    ],[
        'wordpress', 'blog', 'magazine', 'self-managed'
    ],[ 'cover-full.jpg' ], 'nabuco'),
    new Work('Reato', 'Occupational Therapy', '01/2019', new URL('https://www.toreato.com.br'), [
        'Static corporate website',
        'Prerendered single page, for improved SEO',
        'Full of simple animations'
    ],[
        'static', 'single-page', 'pre-render', 'animation', 'vuejs'
    ],[ 'landing.jpg' ], 'toreato'),
    new Work('BitJa', 'Cryptocurrency Market', '01/2018', new URL('https://www.bitja.com.br'), [
        'Brazilian cryptocurrency market application',
        'Google Material Design',
        'Multiple custom UI elements'
    ],[
        'single-page', 'vuejs', 'application', 'corporate'
    ],[ 'home.jpg' ], 'bitja'),
    new Work('The Mint Gallery', null, '01/2019', new URL('http://themintgallery.com'), [
        'Self managed art gallery website',
        'Multiple artists and art works',
        'Custom wordpress theme',
        'Full of simple animations'
    ],[
        'woordpress', 'single-page', 'corporate', 'animation', 'vuejs', 'self-managed'
    ],[ 'landing.jpg' ], 'themintgallery'),
    new Work('Keepup', 'Time Diary', 'Ongoing/2018', new URL('https://www.toreato.com.br/diario'), [
        'Ongoing application for tracking patients routine activities',
        "Stores patients' activities data",
        'Processes data and converts in advanced interactive visualizations',
        'Advanced animations',
        'Restful Api built with Laravel'
    ],[
        'application', 'animation', 'single-page', 'data-visualization', 'restful-api', 'laravel', 'animation'
    ],[ 'data-visualization-hover.jpg' ], 'keepup'),
]

