import { AbstractMesh } from './AbstractMesh';
import { Loop } from '../Loop';

class Indicator extends AbstractMesh {
    constructor(loop) {
        super();
        let n = 60;
        this.trajectory = [];
        while (n--) {
            this.trajectory.push(1);
        }
        this.getMesh();
        if (loop instanceof Loop) {
            this.join(loop);
        }
    }
    getMesh() {
        const THREE = window.THREE;
        const geometry	= new THREE.CircleGeometry(0.30, 32);
        const material	= new THREE.MeshPhongMaterial({
            color: 0xFFFFFF
        });
        this.mesh = new THREE.Mesh(geometry, material);
        return this.mesh;
    }
    animate() {
        this.trajectory.shift();

        if (!this.trajectory.length) {
            this.detach();
        }
    }
}

export { Indicator }