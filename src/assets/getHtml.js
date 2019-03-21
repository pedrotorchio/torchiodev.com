export default function getHtml(text) {
    return text
        .replace(/^\s+|\s+$/gm, '') //trim newline from edges
        .replace(/\n/g, '</br>') // replace newline with br
}