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
uniform sampler2D uSampler4;

uniform float maxHeight;
uniform float nestX;
uniform float nestZ;
uniform float nestRadius;

void main() {
    vec3 offset;

    vTextureCoord = aTextureCoord;
    offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).r * maxHeight;

    coords = aVertexPosition;

    if (coords.x >= nestX && coords.z >= nestZ && coords.x < nestX + nestRadius && coords.z < nestZ + nestRadius) {
        offset = offset + (aVertexNormal * (texture2D(uSampler4, vec2((coords.x - nestX)/nestRadius, (coords.z - nestZ)/nestRadius)).r - 1.0));
    }

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}