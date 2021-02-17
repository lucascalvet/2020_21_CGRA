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
        this.gui.width = 285;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        //Checkbox element in GUI - Diamond
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        //Checkbox element in GUI - Triangle
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        //Checkbox element in GUI - Parallelogram
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');

        //Checkbox element in GUI - Triangle Small
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display TriangleSmall');

        //Checkbox element in GUI - Triangle Big
        this.gui.add(this.scene, 'displayTriangleBig').name('Display TriangleBig');
        
        return true;
    }
}