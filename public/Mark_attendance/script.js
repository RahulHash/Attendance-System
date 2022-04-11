const showcase = document.getElementById('showcase');

const input = document.querySelector('input[type="file"]')
let file;
var droppedFile = null;

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
        droppedFile = object_url
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


document.getElementById("btn_submit").addEventListener("click",async ()=>{
  console.log("Clicked")

  let form = document.querySelector(".form")

  let formData = new FormData(form);    
  if(droppedFile === null){
    droppedFile = input.files[0];
  }
  // formData.append("droppedvideo", droppedFile);
  formData.set("video", droppedFile);
  formData.append("dummyAttr", {dummyObj: "dummy value"})
  // console.log({DroppedFile: droppedFile})
  // console.log(formData)
  for([key, value] of formData.entries()) {
    console.log(`${key} : ${value}`)
  }
  let res = await fetch('/video', {
    method: "POST", 
    body: formData
  })

  form.reset()
  droppedFile = null;
})