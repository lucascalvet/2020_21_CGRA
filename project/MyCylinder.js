import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices, yHeight) {
    super(scene);
    this.faces = slices;
    this.height = yHeight; 

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the Cylinder buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alpha = 0;
    var alphaInc = (2 * Math.PI) / this.faces;

    // Create the vertices/indices and normals for each base (0 - base; 1 - top)
    for (let base = 0; base < 2; base++) {

      // in each base, create the vertices and build slices around, starting on vertex 0
      alpha = 0;
      for (let vertex = 0; vertex <= this.faces; vertex++) {
        //--- Vertices coordinates
        if(vertex != this.faces){
          var x = Math.cos(alpha);
          var y = base * this.height;
          var z = Math.sin(-alpha);
          this.vertices.push(x, y, z);
        }
        else{
          //repeated vertex for textures
          this.vertices.push(1, base * this.height, 0);
        }
        
        
        //--- Indices
        if (base == 1) {
          var currentBase = vertex;
          var currentTop = currentBase + this.faces + 1;
          // pushing two triangles using indices 
          //first the bottom one and then the top one
          
          if(vertex != this.faces){
            this.indices.push( currentBase, currentBase + 1, currentTop);
            this.indices.push( currentBase + 1, currentTop + 1, currentTop);
          }
          else {
            if(currentTop < 2*this.faces - 1){
              this.indices.push( currentBase - 1, currentBase, currentTop - 1);
              this.indices.push( currentBase, currentTop + 1, currentTop);
            }
          }
          
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the cylinder to the vertex.
        // therefore, the value of the normal is equal to the position vector
        if(vertex != this.faces){
          this.normals.push(x, y, z);
        }
        else{
          this.normals.push(1, base * this.height, 0);
        }

        //increment alpha
        alpha += alphaInc;


        //--- Texture Coordinates
        var xTex = vertex * 1/this.faces;
        this.texCoords.push(xTex, -base);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
