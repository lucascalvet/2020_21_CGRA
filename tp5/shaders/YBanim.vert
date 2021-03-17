#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float normScale;
uniform float timeFactor;

varying vec4 coords;

void main() {
    float offset = 0.0;

	vec4 vertex=vec4(aVertexPosition, 1.0);

    offset = normScale*0.1*sin(timeFactor);

	gl_Position = uPMatrix * uMVMatrix * (vertex + vec4(offset, 0.0, 0.0, 0.0));

	coords=gl_Position;
}
