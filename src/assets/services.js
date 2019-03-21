import getHtml from './getHtml'

export class Service {

    constructor(title, subtitle, description) {
        this.title = title
        this.subtitle = subtitle
        this.description = description
    }
        
    getHtml(field) {
        return getHtml(this[field])
    }
}

export default [
    new Service('Self Managed Website', 
        `Change the content yourself,
        no skills required`,
        `Ideal for small companies.
        It’s much cheaper to be able to update all the information in the website without hiring someone to do it.`
    ),
    new Service('Blog', 
        `Share your thoughts,
        make money.`,
        `Promote your services and your ideas.
        Engage your audience and monetize their attention.`
    ),
    new Service('E-commerce', 
        `The cheapest possible display.`,
        `Sell your products at anytime and only worry about delivering.`
    ),
    new Service('Web Applications', 
        `Automate tiresome tasks.
        Visualize complex data.`,
        `Don't waste valuable time with unnecessary work and have a better understanding of your data in any device, anywhere.`
    ),
]