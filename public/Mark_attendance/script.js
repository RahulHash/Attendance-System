const showcase = document.getElementById('showcase');

const input = document.querySelector('input[type="file"]')
let file;
var droppedFile = null;

let validFiles = ['video/mp4', 'video/mpeg', 'video/mkv']

input.addEventListener('change', function (e) {
  let file_element = e.target
  let files = file_element.files
  let object_url = null

  if(files.length) {
    for(let index in files) {
      if(files[index] instanceof File) {
        object_url = URL.createObjectURL(files[index])
        showcase.innerHTML = `<video id="video" class="showcase_img" controls>
                              <source src="${object_url}" type="video/mp4">
                              <source src="${object_url}" type="video/mpeg">
                              <source src="${object_url}" type="video/mkv">
                              Your browser does not support the video tag.
                              </video>`
        let video = document.getElementById("video")
        showcase.style = ' transform: translateY(-90%); background-color: rgb(0, 128, 96);opacity: 1;'
        let svg = document.getElementById('svg')
        svg.classList.add('animate_svg')
        droppedFile = object_url
        console.log(object_url)
      }
    }
  }
}, false)

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
  if(validFiles.includes(fileType)) {
    let fileReader = new FileReader()
    fileReader.onload = () => {
      let fileUrl = fileReader.result
      showcase.innerHTML = `<video id="video" class="showcase_img" controls>
                            <source src="${fileUrl}" type="video/mp4">
                            <source src="${fileUrl}" type="video/mpeg">
                            <source src="${fileUrl}" type="video/mkv">
                            Your browser does not support the video tag.
                            </video>`
      showcase.style = 'transform: translateY(-90%); background-color: rgb(0, 128, 96);opacity: 1;'
      let svg = document.getElementById('svg')
      svg.classList.add('animate_svg')
      console.log(fileUrl)
      droppedFile = fileUrl;
    }
    fileReader.readAsDataURL(file)
  }
  else {
    alert("Can't select this file..\n Please change the file type..")
  }
}


document.getElementById("btn_submit").addEventListener("click",async ()=>{
  console.log("Clicked")

  let form = document.querySelector(".form")

  let formData = new FormData();    
  if(droppedFile === null){
    droppedFile = input.files[0];
  }
  formData.append("video", {droppedFile});
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