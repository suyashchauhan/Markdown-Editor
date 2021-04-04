showdown.setFlavor('github')
const converter = new showdown.Converter();
const dataHtml = document.getElementById('child-container')
const dataMd = document.getElementById('md-data')

function convert() {
    const dataMd = document.getElementById('md-data').value
    const html = converter.makeHtml(dataMd);
    dataHtml.innerHTML = html;
}
convert();
dataMd.addEventListener('input', convert);

document.addEventListener('scroll', handleScroll)
const buttonTop = document.getElementById('gotop')
function handleScroll(e) {

    if (document.documentElement.scrollTop > 300) {
        buttonTop.classList.add('show');

    }
    else {
        buttonTop.classList.remove('show')
    }
}

const saveToPdfButton = document.getElementById('save-button')
saveToPdfButton.addEventListener('click', () => {
    const batteryElement = document.getElementsByClassName('bar-child')[0]
    const filename = document.getElementsByClassName('filename')[0]
    console.log(filename)
    if (batteryElement.classList.contains('animate')) {
        batteryElement.classList.remove('animate')
        filename.classList.remove('show');
    }
    else {
        filename.classList.add('show')
        batteryElement.classList.add('animate')
    }
})

const downloadButton = document.getElementById('download')
downloadButton.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(dataHtml.innerHTML)
    axios.post({
        method:"post",
        url:"/html",
        data:{
            html:dataHtml.innerHTML
        }
    })
    // setTimeout(() => document.forms[0].submit(), 100)
})