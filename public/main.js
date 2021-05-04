const dataHtml = document.getElementById('child-container')
const dataMd = document.getElementById('md-data')
const selectBox = document.getElementById('mySelect')

function convert() {
    const dataMd = document.getElementById('md-data').value
    var data = JSON.stringify({ "data": `${dataMd}`, "theme": `${document.getElementById('mySelect').value}` });
    const html = axios({
        method: 'post',
        url: '/md',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }).then((html) => {
        dataHtml.innerHTML = html.data
        document.querySelectorAll('#child-container code').forEach(x => x.classList.add('hljs'))
    })
    .catch(err => console.log(err))
}
convert();
dataMd.addEventListener('input', convert);
selectBox.addEventListener('change', convert);

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

    const name = document.forms[0].elements[0].value;

    const data = `<head> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity = "sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin = "anonymous" >
    </head>`+ dataHtml.innerHTML
    var config = {
        method: 'post',
        url: '/pdf',
        headers: {
            'Content-Type': 'text/html'
        },
        data: data
    };

    axios(config).then(res => download(`/page.pdf`, name)).catch(err => console.log(err))
})
function download(url, filename) {
    let a = document.createElement('a')
    a.href = url
    a.setAttribute('download', filename)
    a.click()
}