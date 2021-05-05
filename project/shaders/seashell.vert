attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 coords;

uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

uniform float maxHeight;
uniform float nestX;
uniform float nestZ;
uniform float nestRadius;
uniform float length;

void main() {
    vec3 offset;

    vTextureCoord = aTextureCoord;

    coords = aVertexPosition;
    offset = aVertexNormal * (texture2D(uSampler2, vTextureCoord).r - 1.0 + 0.25
     + (texture2D(uSampler3, vec2((length/2.0 + coords.x)/length, (length/2.0 + coords.z)/length)).r * maxHeight));
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}