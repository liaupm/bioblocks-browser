<template>
  <div class='bioblocks'>
    <el-switch
      style="display: block"
      v-model="viewExperiment"
      active-color="black"
      inactive-color="black"
      active-text="Experimento"
      inactive-text="Hardware">
    </el-switch>
    <!-- v-show over v-if here is important (v-if just reloads the iframe all the time) -->
    <div id="bioblocks-editor" v-show="viewExperiment" v-loading="experimentLoading"></div>
    <div id="bioblocks-hardware" v-show="!viewExperiment">

    </div>
  </div>
</template>

<script>
import paper from 'paper'

// Pin location in the Arduino image
let pins = [
  { name: "A0", x: 213, y: 188, type: "analog" },
  { name: "A1", x: 222, y: 188, type: "analog" },
  { name: "A2", x: 232, y: 188, type: "analog" },
  { name: "A3", x: 241, y: 188, type: "analog" },
  { name: "A4", x: 251, y: 188, type: "analog" },
  { name: "A5", x: 260, y: 188, type: "analog" },
  { name: "A6", x: 270, y: 188, type: "analog" },
  { name: "A7", x: 279, y: 188, type: "analog" },
  { name: "A8", x: 300, y: 188, type: "analog" },
  { name: "A9", x: 309, y: 188, type: "analog" },
  { name: "A10", x: 318, y: 188, type: "analog" },
  { name: "A11", x: 328, y: 188, type: "analog" },
  { name: "A12", x: 337, y: 188, type: "analog" },
  { name: "A13", x: 346, y: 188, type: "analog" },
  { name: "A14", x: 356, y: 188, type: "analog" },
  { name: "A15", x: 365, y: 188, type: "analog" },

  { name: "D13", x: 132, y: 7, type: "digital" },
  { name: "D12", x: 141, y: 7, type: "digital" },
  { name: "D11", x: 151, y: 7, type: "digital" },
  { name: "D10", x: 160, y: 7, type: "digital" },
  { name: "D9", x: 169, y: 7, type: "digital" },
  { name: "D8", x: 179, y: 7, type: "digital" },
  { name: "D7", x: 194, y: 7, type: "digital" },
  { name: "D6", x: 204, y: 7, type: "digital" },
  { name: "D5", x: 214, y: 7, type: "digital" },
  { name: "D4", x: 223, y: 7, type: "digital" },
  { name: "D3", x: 233, y: 7, type: "digital" },
  { name: "D2", x: 242, y: 7, type: "digital" },
  { name: "D1", x: 252, y: 7, type: "digital" },
  { name: "D0", x: 261, y: 7, type: "digital" },
];

let hwPaperComponents = []; // List of paper.js rendered components (so we can rerender)
function getPinPoint(name) {
  let pin = pins.find((val) => {
      return val.name == name
  });

  if(!pin) {
      console.warn("Warning: Pin not found by name %s", name);
      return new Point(0, 0);
  }

  return new Point(pin.x, pin.y).add(raster.bounds.topLeft).add(new Size(3, 3));
}

/**
 * connectToPin links a rectangle and a pin by its name
 */
function connectToPin(rect, pin) {
  var pathToPin = new Path();
  pathToPin.strokeColor = 'black';
  pathToPin.add(rect.bounds.bottomCenter);
  pathToPin.add(getPinPoint(pin));
  pathToPin.remove(); // Only add it after we add it to group

  return pathToPin;
};

export default {
  name: "todo-bio",
  data() {
    return {
      viewExperiment: true,
      experimentLoading: true,
      canvasReady: false, // Whether or not the canvas has been rendered on-screen once
      experimentWorkspaceBlocks: {}, // Set of blocks and connections currently on the experiment
    }
  },
  mounted() {
    paper.install(window);

    // Get a reference to the canvas object
    let canvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    // [Blockly is served at port 9000]
    const remoteOrigin = window.location.protocol+"//"+window.location.hostname+":9000";

    // Prepare communication with iframe
    let pthis = this;
    window.addEventListener("message", function(event) {
      if(event.origin != remoteOrigin) {
        console.warn("Discarding postMessage from origin %s", event.origin);
        return;
      }

      pthis.onWorkspaceEvent(event);
    }, false);

    // Create the blockly iframe
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", remoteOrigin + "/pxt-blockly/workspace.html?parent="+window.location);
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    iframe.onload = () => {
      this.experimentLoading = false;
    }

    document.getElementById("bioblocks-editor").appendChild(iframe);

  },
  methods: {
    prepareCanvas() {
      const paper = window.paper;
      const view = window.view; // Gets set up by paper

      var myImage = new Image(1014, 500);
      myImage.src = 'img/arduino_mega_clean.png';

      // Create a raster item using the image & put it on the center
      let raster = new paper.Raster({
        image: myImage,
        smoothing: true
      });
      raster.position = view.center;
      raster.scale(0.4);

      // Pin location
      window.raster = raster;

      for (let pin of pins) {
          var topLeft = new paper.Point(pin.x, pin.y);
          var rectSize = new paper.Size(4, 4);
          var rect = new paper.Rectangle(topLeft.add(raster.bounds.topLeft), rectSize);
          var shape = new paper.Shape.Rectangle(rect);
          shape.strokeColor = 'white';
          if(pin.type == "analog") {
              shape.fillColor = 'green';
          } else if(pin.type == "digital") {
              shape.fillColor = 'red';
          }

          raster.addChild(rect);
      }

      // Mark as ready
      this.canvasReady = true;
      paper.view.draw();
    },

    makeRectangle(topLeft, size, cornerSize, colour) {
      var rectangle = new Rectangle(topLeft, size);
      var cornerSize = cornerSize;
      var path = new Path.RoundRectangle(rectangle, cornerSize);
      path.fillColor = colour;
      return path;
    },

    onWorkspaceEvent(event) {
      if(event.data && event.data.type == "workspace_hw_status") {
        this.experimentWorkspaceBlocks = event.data.hw;
      }
    },

    renderComponents() {
      // Clean up the components first
      for(let component in hwPaperComponents) {
        hwPaperComponents[component].removeChildren();
        hwPaperComponents[component].remove();
      }

      hwPaperComponents = [];
      let rectCount = 0;
      for(let key in this.experimentWorkspaceBlocks) {
        let blockInfo = this.experimentWorkspaceBlocks[key];
        let componentName;

        switch(blockInfo.type) {
          case 'new_centrifuge':
            componentName = 'CENTRIFUGE';
            break;
          default:
            // TODO: Have the block supply its own name, instead of this hardcoded list
            componentName = "????";
            break;
        }

        rectCount++;

        // Create the hw rectangle
        var xy1 = view.center.subtract(new Size(0, 150 + 100*rectCount)); //Position of the rectangle.
        var size = new Size(100, 80); //Size
        var c = new Size(8,8); //Corner radius
        var col = "#167ee5"; //Colour

        let g = new Group();
        let rect = this.makeRectangle(xy1, size, c, col);
        var text = new PointText(rect.bounds.topLeft.add(new Point(10, 45)));
        text.content = componentName;
        text.style = {
          fillColor: 'white'
        };
        g.addChild(rect);
        g.addChild(text);

        for(let n in blockInfo.connections.analog) {
          let pin = blockInfo.connections.analog[n];

          if(pin) {
            g.addChild(connectToPin(rect, pin));
          }
        }

        for(let n in blockInfo.connections.digital) {
          let pin = blockInfo.connections.digital[n];

          if(pin) {
            g.addChild(connectToPin(rect, pin));
          }
        }


        hwPaperComponents.push(g); // Add the group of elements to the list
      }
    },
  },
  watch: {
    viewExperiment(newVal, oldVal) {
      if(!newVal) {
        // Redraw the canvas with the correct width to remove artifacting
        // The timeout works around some... browser processing? Without it,
        // both properties return 0 (as does the bounding box)

        setTimeout(() => {
          if(!this.canvasReady) {
            // Dynamically create a canvas. A canvas created out of render view
            // doesn't properly work
            let canvasParent = document.getElementById('bioblocks-hardware');
            let canvasEle = document.createElement('canvas');
            canvasEle.id = "myCanvas";
            canvasEle.setAttribute("resize", true);

            canvasParent.appendChild(canvasEle);
            paper.setup(canvasEle);
            this.prepareCanvas();

            const width = canvasParent.offsetWidth;
            const height = canvasParent.offsetHeight;
            paper.view.viewSize = new paper.Size(width, height);
          }

          this.renderComponents();
        }, 100);
      }
    }
  }
}
</script>

<style>
.bioblocks {
  height: 80%;
  width: 100%;
}

#bioblocks-editor,
#bioblocks-hardware {
  height: 100%;
  width: 100%;
}

#bioblocks-editor iframe {
  border: none;
}

.el-switch__label > span {
  font-size: 1.4em !important;
}

canvas {
  height: 90%;
  width: 100%;
}
</style>
