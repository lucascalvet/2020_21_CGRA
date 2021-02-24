import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //This enlarges the GUI to fit the bigger names
        this.gui.width = 305;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Checkbox element in GUI - Trangram
        this.gui.add(this.scene, 'displayTangram').name('Display Tangram (26)');

        //Checkbox element in GUI - UnitCube
        this.gui.add(this.scene, 'displayUnitCube').name('Display Unit Cube');
        
        //Checkbox element in GUI - UnitCube
        this.gui.add(this.scene, 'displayUnitCubeQuad').name('Display Unit CubeQuad');
        
        return true;
    }
}