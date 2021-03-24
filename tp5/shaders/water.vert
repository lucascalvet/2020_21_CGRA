attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler4;
uniform float timeFactor;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);

	vTextureCoord = aTextureCoord + vec2(timeFactor / 100.0, timeFactor / 100.0 );

    if (vTextureCoord.s > 1.0) vTextureCoord.s -= 1.0;
    if (vTextureCoord.t > 1.0) vTextureCoord.t -= 1.0;
    
    offset = aVertexNormal*texture2D(uSampler4, vTextureCoord).r * 0.05;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
