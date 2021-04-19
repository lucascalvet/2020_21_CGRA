import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices) {
    super(scene);
    this.faces = slices;

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
    for (let base = 0; base <= 1; base++) {

      // in each base, create the vertices and build slices around, starting on vertex 0
      alpha = 0;
      for (let vertex = 0; vertex < this.faces; vertex++) {
        //--- Vertices coordinates
        var x = Math.cos(alpha);
        var y = base;
        var z = Math.sin(-alpha);
        this.vertices.push(x, y, z);

        //--- Indices
        if (base == 1 && vertex < this.faces) {
          var currentBase = vertex;
          var currentTop = currentBase + this.faces;
          // pushing two triangles using indices 
          //first the bottom one and then the top one
          
          //bottom triangle
          this.indices.push( currentBase, (currentBase + 1) % this.faces, currentTop);
            
          //top triangle
          //Adapt the last triangle - indexes from the beggining again - Existe uma melhor maneira de fazer isto ?
          if(currentTop + 1 >= 2*this.faces)
            this.indices.push( (currentBase + 1) % this.faces, (currentTop + 1) - this.faces, currentTop);
          else
            this.indices.push( (currentBase + 1) % this.faces, (currentTop + 1) % (2*this.faces), currentTop);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the cylinder to the vertex.
        // therefore, the value of the normal is equal to the position vector
        this.normals.push(x, y, z);

        //increment alpha
        alpha += alphaInc;


        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        
      }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
