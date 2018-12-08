// loop over each section, get the image and replace with a canvas

const sections = document.querySelectorAll("section")

sections.forEach(section => {

    const originalImage = section.querySelector("img")
    const originalImageSource = originalImage.getAttribute("src")

    section.innerHTML = ""

    // set up a pixi application

    const app = new PIXI.Application({
        width: 1100,
        height: 800,
        transparent: true
    })

    // add the pixi application to the section tag
    section.appendChild(app.view)

    // make a new image 
    let image = null

    // make a new loader
    const loader = new PIXI.loaders.Loader()

    // load in our image
    loader.add("image", originalImageSource)
    loader.load((loader, resources) => {
        // once the image has loaded, now do things
        image = new PIXI.Sprite(resources.image.texture)

        image.x = 100
        image.y = 100
        image.width = 900
        image.height = 600
        image.interactive = true

    // add the image to the app
    app.stage.addChild(image)
    })

})