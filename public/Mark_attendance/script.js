const showcase = document.getElementById('showcase');

const input = document.querySelector('input[type="file"]')
let file;

input.addEventListener('change', function (e) {
  let file_element = e.target
  let files = file_element.files
  let object_url = null

  if(files.length) {
    for(let index in files) {
      if(files[index] instanceof File) {
        object_url = URL.createObjectURL(files[index])
        showcase.innerHTML = `<img src="${object_url}" class="showcase_img"/>`
        showcase.style = ' transform: translateY(-90%); background-color: rgb(0, 128, 96);opacity: 1;'
        let svg = document.getElementById('svg')
        svg.classList.add('animate_svg')
        console.log(object_url)
      }
    }
  }
}, false)

// input.addEventListener('change', function (e) {
//   file = this.files[0];
//   selectFile()
// })

document.addEventListener('dragover', function (e) {
  e.preventDefault()
} , false)
document.addEventListener('drop', function (e) {
  e.preventDefault()
  file = e.dataTransfer.files[0];
  
  selectFile()
} , false)

var droppedFile = null;
function selectFile() {
  let fileType = file.type
  console.log(fileType)
  let validFiles = ['image/png', 'image/jpg', 'image/jpeg',
                    'video/mp4', 'video/mpeg', 'video/mpeg2',
                    'video/mkv']
  if(validFiles.includes(fileType)) {
    let fileReader = new FileReader()
    fileReader.onload = () => {
      let fileUrl = fileReader.result
      showcase.innerHTML = `<img src="${fileUrl}" class="showcase_img"/>`
      showcase.style = 'transform: translateY(-90%); background-color: rgb(0, 128, 96);opacity: 1;'
      let svg = document.getElementById('svg')
      svg.classList.add('animate_svg')
      console.log(fileUrl)
      droppedFile = fileUrl;
    }
    fileReader.readAsDataURL(file)
  }
  else {
    alert("Can't select this file..\n Please change the extension..")
  }
}