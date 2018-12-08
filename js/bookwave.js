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

    // initialize/make a new image 
    let image = null
    let displacementImage = null

    // make a new loader
    const loader = new PIXI.loaders.Loader()

    // load in our image
    loader.add("image", originalImageSource)
    loader.add("displacement", "displacement1.jpg")
    loader.load((loader, resources) => {
        // once the image has loaded, now do things
        image = new PIXI.Sprite(resources.image.texture)
        displacementImage = new PIXI.Sprite(resources.displacement.texture)

        image.x = 100 + 450
        image.y = 100 + 300
        image.width = 900
        image.height = 600
        image.interactive = true

        image.anchor.x = 0.5;
        image.anchor.y = 0.5;

        displacementImage.width = 300
        displacementImage.height = 300
        displacementImage.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT


        image.filters = [
            // new PIXI.filters.BlurFilter(3, 5),
            // new PIXI.filters.NoiseFilter(.1),
            new PIXI.filters.DisplacementFilter(displacementImage, 100)
        ]

    // add the image to the app
    app.stage.addChild(image)
    app.stage.addChild(displacementImage)

    app.ticker.add(() => {
        displacementImage.x = displacementImage.x + 0.01;
    })

    })

})